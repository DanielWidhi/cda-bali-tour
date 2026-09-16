"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  function toggleMenu() {
    setOpen((v) => {
      const next = !v;
      if (!next) setMobileDropdown(false);
      return next;
    });
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[color:var(--color-mist)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/icon/cda-logo.webp"
            alt="CDA Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-serif text-lg leading-none">{siteConfig.brandName}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:text-[color:var(--color-amber-deep)] transition-colors">
                  {t(item.labelKey)}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                  <div className="w-56 rounded-xl border border-black/5 bg-white p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-[color:var(--color-mist)]"
                      >
                        {t(child.labelKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium hover:text-[color:var(--color-amber-deep)] transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-sm font-medium text-black/70 hover:text-[color:var(--color-ink)]"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Button asChild size="default">
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
              {t("bookNow")}
            </a>
          </Button>
        </div>

        <button className="lg:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav — full-screen, animasi halus via grid-rows trick */}
      <div
        className={cn(
          "lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex min-h-[calc(100dvh-4rem)] flex-col px-5 py-6 gap-1 border-t border-black/5">
            {siteConfig.nav.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileDropdown((v) => !v)}
                    className="flex w-full items-center justify-between py-2.5 text-sm font-medium"
                    aria-expanded={mobileDropdown}
                  >
                    {t(item.labelKey)}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform duration-300", mobileDropdown && "rotate-180")}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-in-out",
                      mobileDropdown ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-3 flex flex-col gap-1 pb-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={toggleMenu}
                            className="py-2 text-sm text-black/70"
                          >
                            {t(child.labelKey)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} onClick={toggleMenu} className="py-2.5 text-sm font-medium">
                  {t(item.labelKey)}
                </Link>
              )
            )}
            <div className="py-2.5">
              <LanguageSwitcher />
            </div>
            <Button asChild className="mt-2 w-full">
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                {t("bookViaWhatsapp")}
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
