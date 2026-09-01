"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";

const locales = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function handleChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- pathname bertipe generik dari next-intl, params bisa berisi slug dinamis
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <div className={`flex items-center gap-1 text-sm ${className ?? ""}`}>
      <Globe className="h-4 w-4 text-black/40" />
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleChange(l.code)}
            className={
              locale === l.code
                ? "font-semibold text-[color:var(--color-amber-deep)]"
                : "text-black/50 hover:text-black/80 transition-colors"
            }
          >
            {l.label}
          </button>
          {i < locales.length - 1 && <span className="text-black/20">/</span>}
        </span>
      ))}
    </div>
  );
}
