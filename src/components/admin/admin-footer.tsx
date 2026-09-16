"use client";

import { useState } from "react";
import { HelpCircle, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AdminFooter() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="border-t border-black/5 px-6 lg:px-10 py-4 flex items-center justify-between text-xs text-black/40">
      <p>
        © {new Date().getFullYear()} {siteConfig.companyLegalName}. All rights reserved.
      </p>

      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 hover:text-black/70 transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Bantuan
        </button>

        {open && (
          <div className="absolute bottom-full right-0 mb-2 w-64 rounded-xl bg-[color:var(--color-ink)] text-white p-4 shadow-xl text-sm">
            <p className="font-medium mb-2">Butuh bantuan?</p>
            <div className="flex flex-col gap-2 text-white/70">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
