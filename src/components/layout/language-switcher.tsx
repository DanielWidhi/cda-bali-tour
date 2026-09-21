"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function switchTo(next: "id" | "en") {
    const query = Object.fromEntries(searchParams.entries());
    router.replace({ pathname, query }, { locale: next });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        type="button"
        onClick={() => switchTo("id")}
        className={cn("font-medium", locale === "id" ? "text-[color:var(--color-amber-deep)]" : "opacity-60")}
      >
        ID
      </button>
      <span className="opacity-30">/</span>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={cn("font-medium", locale === "en" ? "text-[color:var(--color-amber-deep)]" : "opacity-60")}
      >
        EN
      </button>
    </div>
  );
}
