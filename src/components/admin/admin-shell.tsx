"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell, ShieldCheck, UserCog } from "lucide-react";
import { AdminSidebarContent } from "./admin-sidebar-content";
import { AdminFooter } from "./admin-footer";
import { cn } from "@/lib/utils";

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
      {/* Sidebar — desktop: sticky penuh tinggi layar, tidak ikut scroll halaman */}
      <aside className="hidden md:flex md:sticky md:top-0 md:h-screen w-64 shrink-0 flex-col bg-[color:var(--color-ink)] text-white/80 p-5">
        <AdminSidebarContent />
      </aside>

      {/* Sidebar — mobile: drawer overlay. AdminSidebarContent memanggil
          onNavigate (langsung dari onClick link, bukan effect) untuk menutup
          drawer setiap kali salah satu menu diklik. */}
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
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-black/5 bg-white px-4 sm:px-6 lg:px-10 py-3.5">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
            className="md:hidden p-1.5 -ml-1.5 text-black/70"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/admin/inquiries"
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Notifikasi inquiry"
            >
              <Bell className="h-5 w-5 text-black/60" />
              {unreadInquiryCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadInquiryCount > 9 ? "9+" : unreadInquiryCount}
                </span>
              )}
            </Link>

            {profile && (
              <div className="flex items-center gap-2 pl-3 sm:pl-4 border-l border-black/10">
                <div className="hidden sm:flex flex-col items-end leading-tight">
                  <span className="text-sm font-medium">{profile.name}</span>
                  <span
                    className={cn(
                      "flex items-center gap-1 text-[11px]",
                      profile.role === "SUPERADMIN" ? "text-[color:var(--color-amber-deep)]" : "text-black/40"
                    )}
                  >
                    {profile.role === "SUPERADMIN" ? (
                      <ShieldCheck className="h-3 w-3" />
                    ) : (
                      <UserCog className="h-3 w-3" />
                    )}
                    {profile.role === "SUPERADMIN" ? "Super Admin" : "Admin"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 min-w-0 p-5 sm:p-6 lg:p-10">
          {children}
          <AdminFooter />
        </main>
      </div>
    </div>
  );
}
