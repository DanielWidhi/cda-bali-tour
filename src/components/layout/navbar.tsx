"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { siteConfig, type NavItem } from "@/config/site";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";
import Image from "next/image";

type T = (key: string) => string;

// ---------- logika menu aktif ----------
// Link yang memakai query (mis. /tour?category=sunrise) tidak pernah dianggap aktif,
// sama seperti perilaku sebelumnya.
const isExact = (href: string, path: string) => !href.includes("?") && href === path;
const isPrefix = (href: string, path: string) =>
  !href.includes("?") && href !== "/" && path.startsWith(href + "/");

function descendantActive(item: NavItem, path: string): boolean {
  return Boolean(
    item.children?.some(
      (c) =>
        isExact(c.href, path) ||
        (c.children ? isPrefix(c.href, path) : false) ||
        descendantActive(c, path)
    )
  );
}

// ---------- Desktop ----------
function DesktopSubmenu({
  items,
  t,
  pathname,
}: {
  items: NavItem[];
  t: T;
  pathname: string;
}) {
  return (
    <div className="w-56 rounded-xl border border-black/5 bg-white p-2 shadow-lg text-black">
      {items.map((child) => {
        const isChildActive = isExact(child.href, pathname);
        if (child.children) {
          // submenu bertingkat: panel muncul di samping saat di-hover
          const parentActive = isPrefix(child.href, pathname) || descendantActive(child, pathname);
          return (
            <div key={child.labelKey} className="relative group/sub">
              <Link
                href={child.href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  parentActive
                    ? "bg-[color:var(--color-mist)] text-[color:var(--color-amber-deep)] font-medium"
                    : "text-black/80 hover:bg-[color:var(--color-mist)] hover:text-[color:var(--color-amber-deep)]"
                )}
              >
                {t(child.labelKey)}
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
              <div className="absolute left-full top-0 pl-2 hidden group-hover/sub:block">
                <DesktopSubmenu items={child.children} t={t} pathname={pathname} />
              </div>
            </div>
          );
        }
        return (
          <Link
            key={child.labelKey}
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
  );
}

// ---------- Mobile (accordion bertingkat) ----------
function MobileItem({
  item,
  depth,
  t,
  pathname,
  openMenus,
  onToggleMenu,
  onNavigate,
  active,
}: {
  item: NavItem;
  depth: number;
  t: T;
  pathname: string;
  openMenus: string[];
  onToggleMenu: (key: string) => void;
  onNavigate: () => void;
  active: boolean;
}) {
  if (item.children) {
    const isOpen = openMenus.includes(item.labelKey);
    return (
      <div>
        <button
          onClick={() => onToggleMenu(item.labelKey)}
          className={cn(
            "flex w-full items-center justify-between text-sm transition-colors",
            depth === 0 ? "py-2.5 font-medium" : "py-2 text-black/70",
            active ? "text-[color:var(--color-amber-deep)] font-semibold" : depth === 0 ? "text-black" : ""
          )}
          aria-expanded={isOpen}
        >
          {t(item.labelKey)}
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
        </button>
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="pl-3 flex flex-col gap-1 pb-1">
              {item.children.map((child) => (
                <MobileItem
                  key={child.labelKey}
                  item={child}
                  depth={depth + 1}
                  t={t}
                  pathname={pathname}
                  openMenus={openMenus}
                  onToggleMenu={onToggleMenu}
                  onNavigate={onNavigate}
                  active={child.children ? isPrefix(child.href, pathname) || descendantActive(child, pathname) : isExact(child.href, pathname)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "text-sm transition-colors",
        depth === 0 ? "py-2.5 font-medium" : "py-2",
        active
          ? "text-[color:var(--color-amber-deep)] font-semibold"
          : depth === 0
            ? "text-black hover:text-[color:var(--color-amber-deep)]"
            : "text-black/70 hover:text-black"
      )}
    >
      {t(item.labelKey)}
    </Link>
  );
}

export function Navbar() {
  const t = useTranslations("nav") as unknown as T;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMenu() {
    setOpen((v) => {
      const next = !v;
      if (!next) setOpenMenus([]);
      return next;
    });
  }

  function toggleSubmenu(key: string) {
    setOpenMenus((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHome = pathname === "/" || pathname === "";
  const isTransparent = isHome && !scrolled && !open;

  // Menu induk hanya menyala karena anaknya kalau tidak ada menu utama lain yang cocok langsung
  // (mis. di /transport yang menyala "Transport", bukan "Our Service" lewat "Group Trip").
  const directTop = (item: NavItem) => isExact(item.href, pathname) || isPrefix(item.href, pathname);
  const anyDirectTop = siteConfig.nav.some(directTop);
  const isTopActive = (item: NavItem) =>
    directTop(item) || (!anyDirectTop && descendantActive(item, pathname));

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
          <Image src="/images/icon/cda-webp.webp" alt="CDA Logo" width={36} height={36} className="rounded-full" />
          <span className={cn("font-serif text-lg leading-none transition-colors", isTransparent ? "text-white" : "text-black")}>
            {siteConfig.brandName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            const isItemActive = isTopActive(item);

            return item.children ? (
              <div key={item.labelKey} className="relative group">
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
                  <DesktopSubmenu items={item.children} t={t} pathname={pathname} />
                </div>
              </div>
            ) : (
              <Link
                key={item.labelKey}
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
          <nav className="flex min-h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] overflow-y-auto flex-col px-5 py-6 gap-1 border-t border-black/5">
            {siteConfig.nav.map((item) => (
              <MobileItem
                key={item.labelKey}
                item={item}
                depth={0}
                t={t}
                pathname={pathname}
                openMenus={openMenus}
                onToggleMenu={toggleSubmenu}
                onNavigate={toggleMenu}
                active={isTopActive(item)}
              />
            ))}
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
