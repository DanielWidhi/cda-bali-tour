"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "../actions-auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-ink)] px-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-ink)] text-[color:var(--color-amber)] font-serif text-lg mx-auto mb-3">
            C
          </span>
          <h1 className="font-serif text-xl">CDA Admin Panel</h1>
          <p className="text-sm text-black/50">Masuk untuk mengelola konten website</p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoFocus placeholder="admin@cdabalitour.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>

          {state.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full mt-2" disabled={pending}>
            {pending ? "Memproses..." : "Masuk"}
          </Button>
        </form>
        <div className="mt-6 pt-5 border-t border-black/8 text-center">
          <p className="text-xs text-black/35">
            © {new Date().getFullYear()} CDA Bali Tour. Published by{" "}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/55 hover:text-black font-medium underline underline-offset-2 transition-colors"
            >
              Daniel Widhi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
