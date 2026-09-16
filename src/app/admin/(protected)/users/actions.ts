"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentProfile } from "@/lib/current-profile";

export type UserActionState = { error?: string };

async function requireSuperadmin() {
  const profile = await getCurrentProfile();
  if (profile?.role !== "SUPERADMIN") {
    throw new Error("Hanya Super Admin yang bisa melakukan aksi ini.");
  }
  return profile;
}

export async function createUserAction(
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  try {
    await requireSuperadmin();
  } catch {
    return { error: "Hanya Super Admin yang bisa menambah akun." };
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
    return { error: error?.message ?? "Gagal membuat akun." };
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
  const currentProfile = await getCurrentProfile();
  if (currentProfile?.role !== "SUPERADMIN") {
    return { error: "Hanya Super Admin yang bisa mengedit akun." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const isSelf = currentProfile.id === id;
  // Superadmin tidak boleh ubah role akun sendiri (jaga-jaga supaya tidak
  // "mengunci diri sendiri" jadi Admin biasa tanpa akses Users).
  const role = isSelf
    ? currentProfile.role
    : (String(formData.get("role") ?? "ADMIN") as "SUPERADMIN" | "ADMIN");

  if (!name) return { error: "Nama wajib diisi." };
  if (password && password.length < 6) {
    return { error: "Password minimal 6 karakter." };
  }

  if (password) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.auth.admin.updateUserById(id, { password });
    if (error) return { error: error.message };
  }

  await prisma.profile.update({ where: { id }, data: { name, role } });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUserAction(id: string) {
  const currentProfile = await getCurrentProfile();
  if (currentProfile?.role !== "SUPERADMIN") {
    throw new Error("Hanya Super Admin yang bisa menghapus akun.");
  }
  if (currentProfile.id === id) {
    throw new Error("Tidak bisa menghapus akun sendiri.");
  }

  const supabaseAdmin = createAdminClient();
  await supabaseAdmin.auth.admin.deleteUser(id);
  await prisma.profile.delete({ where: { id } });

  revalidatePath("/admin/users");
}
