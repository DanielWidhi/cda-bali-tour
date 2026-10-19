"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ZoomIn, X, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

interface ServiceBannerProps {
  badge: string;
  alt: string;
  hint: string;
  closeLabel: string;
  whatsappLabel: string;
}

export function ServiceBanner({
  badge,
  alt,
  hint,
  closeLabel,
  whatsappLabel,
}: ServiceBannerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen, close]);

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Halo CDA Bali Tour, saya ingin berkonsultasi mengenai paket layanan tour & transport di Bali."
  )}`;

  return (
    <>
      <div className="mb-12 sm:mb-16" data-aos="fade-up" data-aos-delay="100">
        <div
          role="button"
          tabIndex={0}
          aria-label={`${alt} - ${hint}`}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 p-2 sm:p-3 shadow-sm hover:shadow-xl transition-all duration-500 backdrop-blur-xs focus:outline-hidden focus:ring-2 focus:ring-[color:var(--color-amber-deep)]"
        >
          {/* Outer frame styling */}
          <div className="relative aspect-[1600/1131] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950">
            <Image
              src="/images/banner/Our Service CDA.jpeg"
              alt={alt}
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />

            {/* Subtle hover gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Top-left Badge */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[color:var(--color-ink)] shadow-md backdrop-blur-md border border-black/5">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--color-amber-deep)]" />
              <span>{badge}</span>
            </div>

            {/* Top-right Zoom Hint */}
            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-[color:var(--color-amber-deep)]">
              <ZoomIn className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{hint}</span>
              <span className="sm:hidden">Zoom</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Modal Header Bar */}
          <div
            className="flex w-full max-w-5xl items-center justify-between pb-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-[color:var(--color-amber)]" />
                {badge}
              </span>
              <span className="hidden sm:inline text-xs text-white/60">
                CDA Bali Tour &amp; Transport
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="bg-[color:var(--color-green)] hover:bg-[color:var(--color-green)]/90 text-white text-xs gap-1.5 h-8 px-3">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{whatsappLabel}</span>
                  <span className="sm:hidden">WhatsApp</span>
                </a>
              </Button>
              <button
                type="button"
                onClick={close}
                aria-label={closeLabel}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Modal Image Container */}
          <div
            className="relative aspect-[1600/1131] w-full max-w-5xl max-h-[82vh] overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/images/banner/Our Service CDA.jpeg"
              alt={alt}
              fill
              quality={95}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
