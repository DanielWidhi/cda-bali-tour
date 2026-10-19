"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "../actions-auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#14171a] px-4 py-8 sm:px-6">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner/Cda Banner admin.jpg"
          alt="CDA Bali Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 filter brightness-[0.85] contrast-[1.05]"
        />
        {/* Multi-layered gradients for depth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Decorative Warm Ambient Glow Behind Card */}
      <div className="absolute z-0 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none -top-10 -left-10 sm:w-[500px] sm:h-[500px]" />
      <div className="absolute z-0 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none -bottom-10 -right-10 sm:w-[500px] sm:h-[500px]" />

      {/* Top Bar Navigation */}
      <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between max-w-6xl mx-auto pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white text-xs font-medium backdrop-blur-md border border-white/10 transition-all shadow-md group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Website</span>
        </Link>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs backdrop-blur-md border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Sistem Manajemen Resmi</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Glow halo around card */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-amber-500/30 via-white/10 to-amber-600/20 blur-md opacity-75" />

        <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl p-7 sm:p-9 shadow-2xl border border-white/40 overflow-hidden">
          {/* Top Amber Brand Accent Strip */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

          {/* Header & Logo */}
          <div className="text-center mb-6">
            <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-gradient-to-b from-amber-50/80 to-white shadow-md border border-amber-200/60 flex items-center justify-center mb-3 transition-transform hover:scale-105 duration-200">
              <Image
                src="/images/icon/cda-logo.webp"
                alt="CDA Bali Tour Logo"
                width={72}
                height={72}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Admin Control Center</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
              CDA Admin Panel
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Masuk untuk mengelola konten dan operasional website
            </p>
          </div>

          {/* Login Form */}
          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-neutral-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoFocus
                  placeholder="admin@domain.com"
                  className="pl-10 h-11 sm:h-12 bg-neutral-50/80 hover:bg-neutral-50 focus:bg-white border-neutral-200 focus-visible:border-[color:var(--color-amber)] rounded-xl transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-neutral-700">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="pl-10 pr-11 h-11 sm:h-12 bg-neutral-50/80 hover:bg-neutral-50 focus:bg-white border-neutral-200 focus-visible:border-[color:var(--color-amber)] rounded-xl transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 rounded-md transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {state.error && (
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-red-700 bg-red-50/90 border border-red-200 rounded-xl px-3.5 py-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="leading-snug">{state.error}</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="group w-full mt-2 h-11 sm:h-12 rounded-xl bg-gradient-to-r from-amber-500 via-[color:var(--color-amber)] to-amber-600 hover:brightness-105 active:scale-[0.99] text-white font-semibold shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              disabled={pending}
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memproses...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <span>Masuk ke Panel</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer Card Info */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Akses Terenkripsi</span>
            </span>
            <span>CDA Bali Tour</span>
          </div>
        </div>

        {/* Outer Brand Copyright */}
        <p className="text-center text-xs text-white/60 mt-5 tracking-wide drop-shadow">
          © {new Date().getFullYear()} PT. Cahaya Dimbo Abadi. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}
