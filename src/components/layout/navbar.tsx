"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[color:var(--color-mist)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-ink)] text-[color:var(--color-amber)] font-serif text-lg">
            C
          </span>
          <span className="font-serif text-lg leading-none">
            {siteConfig.brandName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:text-[color:var(--color-amber-deep)] transition-colors">
                  {item.label}
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
                        {child.label}
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
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-sm font-medium text-black/70 hover:text-[color:var(--color-ink)]"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Button asChild size="default">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
            </a>
          </Button>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 border-t border-black/5",
          open ? "max-h-[28rem]" : "max-h-0 border-t-0"
        )}
      >
        <nav className="flex flex-col px-5 py-3 gap-1">
          {siteConfig.nav.map((item) =>
            item.children ? (
              <div key={item.href}>
                <button
                  onClick={() => setMobileDropdown((v) => !v)}
                  className="flex w-full items-center justify-between py-2.5 text-sm font-medium"
                >
                  {item.label}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", mobileDropdown && "rotate-180")}
                  />
                </button>
                <div className={cn("pl-3 flex flex-col", mobileDropdown ? "block" : "hidden")}>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-black/70"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium"
              >
                {item.label}
              </Link>
            )
          )}
          <Button asChild className="mt-2 w-full">
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
              Book via WhatsApp
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
