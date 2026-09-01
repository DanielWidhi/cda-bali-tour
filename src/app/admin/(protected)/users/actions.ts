"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentProfile } from "@/lib/current-profile";
import { createAdminClient } from "@/lib/supabase/admin";

export type UserActionState = { error?: string };

async function requireSuperadmin() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "SUPERADMIN") {
    return null;
  }
  return profile;
}

export async function createUserAction(
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const actor = await requireSuperadmin();
  if (!actor) {
    return { error: "Hanya Super Admin yang bisa menambah akun admin." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "ADMIN") as "SUPERADMIN" | "ADMIN";

  if (!email || !password || !name) {
    return { error: "Semua field wajib diisi." };
  }
  if (password.length < 6) {
    return { error: "Password minimal 6 karakter." };
  }

  const supabaseAdmin = createAdminClient();
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    return { error: error?.message ?? "Gagal membuat akun di Supabase Auth." };
  }

  await prisma.profile.create({
    data: { id: data.user.id, email, name, role },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUserAction(
  id: string,
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const actor = await requireSuperadmin();
  if (!actor) {
    return { error: "Hanya Super Admin yang bisa mengedit akun admin lain." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "ADMIN") as "SUPERADMIN" | "ADMIN";
  const newPassword = String(formData.get("password") ?? "").trim();

  if (!name) {
    return { error: "Nama wajib diisi." };
  }

  // Cegah superadmin menurunkan role diri sendiri sampai tidak ada superadmin tersisa
  if (actor.id === id && role !== "SUPERADMIN") {
    const superadminCount = await prisma.profile.count({ where: { role: "SUPERADMIN" } });
    if (superadminCount <= 1) {
      return { error: "Tidak bisa menurunkan role — minimal harus ada 1 Super Admin." };
    }
  }

  if (newPassword) {
    if (newPassword.length < 6) {
      return { error: "Password baru minimal 6 karakter." };
    }
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      password: newPassword,
    });
    if (error) return { error: error.message };
  }

  await prisma.profile.update({ where: { id }, data: { name, role } });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUserAction(id: string) {
  const actor = await requireSuperadmin();
  if (!actor) {
    throw new Error("Hanya Super Admin yang bisa menghapus akun admin.");
  }
  if (actor.id === id) {
    throw new Error("Tidak bisa menghapus akun sendiri.");
  }

  const supabaseAdmin = createAdminClient();
  await supabaseAdmin.auth.admin.deleteUser(id);
  await prisma.profile.delete({ where: { id } });

  revalidatePath("/admin/users");
}
