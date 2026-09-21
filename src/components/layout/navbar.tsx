"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const isHome = pathname === "/" || pathname === "";
  const isTransparent = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "top-0 left-0 right-0 z-50 border-b transition-colors duration-300",
        isHome ? "fixed" : "sticky",
        isTransparent
          ? "bg-transparent border-transparent text-white"
          : "border-black/5 bg-[color:var(--color-mist)]/90 backdrop-blur-md text-black"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image src="/images/icon/cda-logo.webp" alt="CDA Logo" width={36} height={36} className="rounded-full" />
          <span className={cn("font-serif text-lg leading-none transition-colors", isTransparent ? "text-white" : "text-black")}>
            {siteConfig.brandName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            const isItemActive =
              item.href === pathname ||
              Boolean(item.children?.some((child) => child.href === pathname));

            return item.children ? (
              <div key={item.href} className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
                    isItemActive
                      ? "text-[color:var(--color-amber-deep)] font-semibold"
                      : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-black/80 hover:text-[color:var(--color-amber-deep)]"
                  )}
                >
                  {t(item.labelKey)}
                  <ChevronDown className="h-3.5 w-3.5 opacity-75" />
                </button>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                  <div className="w-56 rounded-xl border border-black/5 bg-white p-2 shadow-lg text-black">
                    {item.children.map((child) => {
                      const isChildActive = child.href === pathname;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                            isChildActive
                              ? "bg-[color:var(--color-mist)] text-[color:var(--color-amber-deep)] font-medium"
                              : "text-black/80 hover:bg-[color:var(--color-mist)] hover:text-[color:var(--color-amber-deep)]"
                          )}
                        >
                          {t(child.labelKey)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors",
                  isItemActive
                    ? "text-[color:var(--color-amber-deep)] font-semibold"
                    : isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-black/80 hover:text-[color:var(--color-amber-deep)]"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Button asChild size="default">
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
              {t("bookNow")}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button className="p-2" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav — full-screen, animasi halus via grid-rows trick */}
      <div
        className={cn(
          "lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out bg-[color:var(--color-mist)] text-black",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex min-h-[calc(100dvh-4rem)] flex-col px-5 py-6 gap-1 border-t border-black/5">
            {siteConfig.nav.map((item) => {
              const isItemActive =
                item.href === pathname ||
                Boolean(item.children?.some((child) => child.href === pathname));

              return item.children ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileDropdown((v) => !v)}
                    className={cn(
                      "flex w-full items-center justify-between py-2.5 text-sm font-medium transition-colors",
                      isItemActive ? "text-[color:var(--color-amber-deep)] font-semibold" : "text-black"
                    )}
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
                        {item.children.map((child) => {
                          const isChildActive = child.href === pathname;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={toggleMenu}
                              className={cn(
                                "py-2 text-sm transition-colors",
                                isChildActive
                                  ? "text-[color:var(--color-amber-deep)] font-medium"
                                  : "text-black/70 hover:text-black"
                              )}
                            >
                              {t(child.labelKey)}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleMenu}
                  className={cn(
                    "py-2.5 text-sm font-medium transition-colors",
                    isItemActive
                      ? "text-[color:var(--color-amber-deep)] font-semibold"
                      : "text-black hover:text-[color:var(--color-amber-deep)]"
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
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
