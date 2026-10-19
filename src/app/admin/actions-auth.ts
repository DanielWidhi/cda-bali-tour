"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login error from Supabase:", error.message, error.status);
    if (error.message?.toLowerCase().includes("invalid api key")) {
      return {
        error:
          "NEXT_PUBLIC_SUPABASE_ANON_KEY di .env tidak valid (Invalid API key). Harap periksa di Supabase Dashboard > Project Settings > API (anon public key).",
      };
    }
    return { error: "Email atau password salah." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
