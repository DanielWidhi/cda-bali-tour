"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell, ShieldCheck, UserCog } from "lucide-react";
import { AdminSidebarContent } from "./admin-sidebar-content";
import { AdminFooter } from "./admin-footer";

type Profile = { name: string; role: "SUPERADMIN" | "ADMIN" } | null;

export function AdminShell({
  profile,
  unreadInquiryCount,
  children,
}: {
  profile: Profile;
  unreadInquiryCount: number;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[color:var(--color-mist)]">
      {/* Sidebar desktop — sticky penuh tinggi layar, tombol bawah selalu terlihat */}
      <aside className="hidden md:flex md:sticky md:top-0 md:h-screen w-64 shrink-0 flex-col bg-[color:var(--color-ink)] text-white/80 p-5">
        <AdminSidebarContent />
      </aside>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-72 flex flex-col bg-[color:var(--color-ink)] text-white/80 p-5">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Tutup menu"
              className="absolute top-5 right-5 text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <AdminSidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header — profil (nama + role, tanpa foto) + lonceng notifikasi inquiry */}
        <header className="flex items-center justify-between gap-4 border-b border-black/5 bg-white px-5 lg:px-10 py-3">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <Link
            href="/admin/inquiries"
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Inquiry belum selesai"
          >
            <Bell className="h-5 w-5 text-black/60" />
            {unreadInquiryCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadInquiryCount > 99 ? "99+" : unreadInquiryCount}
              </span>
            )}
          </Link>

          {profile && (
            <div className="flex items-center gap-2 pl-3 border-l border-black/10">
              <div className="text-right leading-tight">
                <p className="text-sm font-medium">{profile.name}</p>
                <p className="flex items-center justify-end gap-1 text-xs text-black/50">
                  {profile.role === "SUPERADMIN" ? (
                    <ShieldCheck className="h-3 w-3" />
                  ) : (
                    <UserCog className="h-3 w-3" />
                  )}
                  {profile.role === "SUPERADMIN" ? "Super Admin" : "Admin"}
                </p>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 p-6 lg:p-10">{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}
