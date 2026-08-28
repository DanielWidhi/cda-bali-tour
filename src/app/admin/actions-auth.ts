"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const adminHash = process.env.ADMIN_PASSWORD_HASH ?? "";

  if (!adminEmail || !adminHash) {
    return { error: "ADMIN_EMAIL / ADMIN_PASSWORD_HASH belum diatur di .env" };
  }

  if (email !== adminEmail) {
    return { error: "Email atau password salah." };
  }

  const valid = await bcrypt.compare(password, adminHash);
  if (!valid) {
    return { error: "Email atau password salah." };
  }

  const token = await createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
