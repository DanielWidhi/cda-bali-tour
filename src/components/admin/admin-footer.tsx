"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { HelpCircle, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

const ADMIN_HELP = {
  phone: "+62 812-3850-9385",
  whatsapp: "6281238509385",
  email: "admin-support@cdabalitour.com",
};

export function AdminFooter() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isEditing = pathname.includes("/edit") || pathname.includes("/new");

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  if (isEditing) {
    return (
      <footer className="border-t border-black/5 px-6 lg:px-10 py-4 flex items-center justify-between text-xs text-black/40">
        <p>© {new Date().getFullYear()} {siteConfig.companyLegalName}. All rights reserved.</p>
      </footer>
    );
  }

  return (
    <>
      <footer className="border-t border-black/5 px-6 lg:px-10 py-4 flex items-center justify-between text-xs text-black/40">
        <p>© {new Date().getFullYear()} {siteConfig.companyLegalName}. All rights reserved.</p>

        <div ref={containerRef} className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex items-center gap-1.5 hover:text-black/70 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Bantuan Teknisi
          </button>

          <div
            ref={contentRef}
            className={`absolute bottom-full right-0 mb-2 w-72 rounded-2xl bg-[color:var(--color-ink)] text-white p-5 shadow-2xl text-sm z-50 origin-bottom transition-all duration-300 ease-out ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
          >
            <p className="font-semibold mb-1 text-base">Butuh bantuan teknis?</p>
            <p className="text-white/60 text-xs mb-4 leading-relaxed">Hubungi teknisi jika ada kendala sistem.</p>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${ADMIN_HELP.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors"
              >
                <span className="bg-[#25D366] p-1.5 rounded-lg shrink-0"><Phone className="h-4 w-4 text-white" /></span>
                <span className="flex flex-col text-left">
                  <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">WhatsApp Teknisi</span>
                  <span className="font-medium tracking-tight">{ADMIN_HELP.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${ADMIN_HELP.email}`}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors"
              >
                <span className="bg-blue-500 p-1.5 rounded-lg shrink-0"><Mail className="h-4 w-4 text-white" /></span>
                <span className="flex flex-col text-left">
                  <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Email Teknisi</span>
                  <span className="font-medium tracking-tight break-all">{ADMIN_HELP.email}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div ref={containerRef} className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Bantuan Teknisi"
          className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1E88E5] text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${open ? "rotate-90 bg-[#25D366]" : ""}`}
        >
          <span className="text-[28px] font-bold leading-none transform transition-transform duration-300">{open ? "✕" : "?"}</span>
        </button>

        <div
          ref={contentRef}
          className={`fixed bottom-24 right-4 left-4 sm:left-auto sm:w-72 rounded-2xl bg-[color:var(--color-ink)] text-white p-5 shadow-2xl text-sm z-50 origin-bottom transition-all duration-300 ease-out ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
        >
          <p className="font-semibold mb-1 text-base">Butuh bantuan teknis?</p>
          <p className="text-white/60 text-xs mb-4 leading-relaxed">Hubungi teknisi jika ada kendala sistem.</p>
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/${ADMIN_HELP.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors"
            >
              <span className="bg-[#25D366] p-1.5 rounded-lg shrink-0"><Phone className="h-4 w-4 text-white" /></span>
              <span className="flex flex-col text-left">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">WhatsApp Teknisi</span>
                <span className="font-medium tracking-tight">{ADMIN_HELP.phone}</span>
              </span>
            </a>
            <a
              href={`mailto:${ADMIN_HELP.email}`}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors"
            >
              <span className="bg-blue-500 p-1.5 rounded-lg shrink-0"><Mail className="h-4 w-4 text-white" /></span>
              <span className="flex flex-col text-left">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Email Teknisi</span>
                <span className="font-medium tracking-tight break-all">{ADMIN_HELP.email}</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/20 transition-opacity duration-300 ease-out" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}
