"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AdminFooter() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="mt-10 border-t border-black/5 pt-5 pb-2 flex items-center justify-between text-xs text-black/40">
      <p>
        © {new Date().getFullYear()} {siteConfig.companyLegalName}. All rights reserved.
      </p>

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setOpen(true)}
          className="flex items-center gap-1.5 hover:text-black/70 transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Bantuan
        </button>

        {open && (
          <div
            onMouseLeave={() => setOpen(false)}
            className="absolute bottom-full right-0 mb-2 w-64 rounded-xl border border-black/10 bg-white p-4 shadow-lg text-black"
          >
            <p className="text-sm font-medium mb-2">Butuh bantuan operasional?</p>
            <div className="flex flex-col gap-2 text-xs text-black/60">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-[color:var(--color-amber-deep)]"
              >
                <Phone className="h-3.5 w-3.5" /> {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-[color:var(--color-amber-deep)]"
              >
                <Mail className="h-3.5 w-3.5" /> {siteConfig.email}
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
