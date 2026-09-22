"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "id", label: "Bahasa Indonesia", short: "ID" },
  { code: "en", label: "English", short: "EN" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function switchTo(next: "id" | "en") {
    if (next === locale) {
      setIsOpen(false);
      return;
    }
    const query = Object.fromEntries(searchParams.entries());
    router.replace({ pathname, query }, { locale: next });
    setIsOpen(false);
  }

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 py-1 px-1.5 rounded-lg text-sm font-semibold tracking-wide transition-opacity hover:opacity-80 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 shrink-0" />
        <span className="font-bold">{locale.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-black/10 bg-white p-1.5 shadow-xl text-black z-50 animate-in fade-in zoom-in-95 duration-150">
          {languages.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => switchTo(lang.code)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left",
                  isActive
                    ? "bg-[color:var(--color-mist)] text-[color:var(--color-amber-deep)] font-semibold"
                    : "text-black/80 hover:bg-[color:var(--color-mist)] hover:text-black"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[11px] px-1.5 py-0.5 rounded bg-black/5 text-black/70">
                    {lang.short}
                  </span>
                  <span>{lang.label}</span>
                </div>
                {isActive && <Check className="h-3.5 w-3.5 text-[color:var(--color-amber-deep)] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
