"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ZonePricingCardItem = {
  number: number;
  title: string;
  priceFormatted: string;
  description: string;
  image: string | null;
  waLink: string;
  bookLabel: string;
};

export function ZonePricingCards({
  zones,
  vehicleName,
  zoomLabel = "Lihat Peta",
}: {
  zones: ZonePricingCardItem[];
  vehicleName?: string;
  zoomLabel?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const zonesWithImages = zones.filter(
    (z): z is ZonePricingCardItem & { image: string } => Boolean(z.image)
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setActiveImageIndex(null), []);
  const prev = useCallback(
    () =>
      setActiveImageIndex((i) =>
        i === null ? null : (i - 1 + zonesWithImages.length) % zonesWithImages.length
      ),
    [zonesWithImages.length]
  );
  const next = useCallback(
    () =>
      setActiveImageIndex((i) =>
        i === null ? null : (i + 1) % zonesWithImages.length
      ),
    [zonesWithImages.length]
  );

  useEffect(() => {
    if (activeImageIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = origOverflow;
    };
  }, [activeImageIndex, close, prev, next]);

  const activeZone = activeImageIndex !== null ? zonesWithImages[activeImageIndex] : null;

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {zones.map((zone) => {
          const imageIdx = zonesWithImages.findIndex((z) => z.number === zone.number);

          return (
            <div
              key={zone.number}
              className="rounded-2xl border border-black/10 bg-white overflow-hidden flex flex-col"
            >
              {zone.image && (
                <button
                  type="button"
                  onClick={() => setActiveImageIndex(imageIdx)}
                  className="relative aspect-[16/9] w-full text-left group overflow-hidden cursor-pointer block bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-amber-deep)]"
                  aria-label={`${zoomLabel} - ${zone.title}`}
                >
                  <Image
                    src={zone.image}
                    alt={zone.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    quality={75}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />

                  {/* Subtle hover gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Top-right Zoom Hint badge (styling like service-banner) */}
                  <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-[color:var(--color-amber-deep)]">
                    <ZoomIn className="h-3.5 w-3.5" />
                    <span>{zoomLabel}</span>
                  </div>
                </button>
              )}

              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-lg">{zone.title}</h3>
                  <p className="font-serif text-xl text-[color:var(--color-amber-deep)]">
                    {zone.priceFormatted}
                  </p>
                </div>
                {zone.description && (
                  <p className="text-sm text-black/60 leading-relaxed whitespace-pre-line flex-1">
                    {zone.description}
                  </p>
                )}
                <Button asChild size="sm" variant="outline" className="mt-2 w-full">
                  <a href={zone.waLink} target="_blank" rel="noopener noreferrer">
                    {zone.bookLabel}
                  </a>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal (Portal ke document.body agar tidak terpotong stacking context layout) */}
      {mounted &&
        activeZone &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeZone.title} - ${vehicleName ?? "CDA Bali Tour"}`}
            onClick={close}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 p-3 sm:p-5 md:p-6 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          >
            <div className="w-full max-w-5xl flex flex-col my-auto max-h-[96vh]">
              {/* Modal Header Bar */}
              <div
                className="flex w-full items-center justify-between pb-3 text-white shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm border border-white/10 shrink-0">
                    <Sparkles className="h-3 w-3 text-[color:var(--color-amber)]" />
                    {activeZone.title}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-bold text-[color:var(--color-amber)] shrink-0">
                    {activeZone.priceFormatted}
                  </span>
                  <span className="hidden sm:inline text-xs text-white/60 truncate">
                    {vehicleName ? `${vehicleName} • CDA Bali Tour` : "CDA Bali Tour & Transport"}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    asChild
                    size="sm"
                    className="bg-[color:var(--color-green)] hover:bg-[color:var(--color-green)]/90 text-white text-xs gap-1.5 h-8 px-3 rounded-full shadow-sm"
                  >
                    <a href={activeZone.waLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{activeZone.bookLabel}</span>
                      <span className="sm:hidden">WhatsApp</span>
                    </a>
                  </Button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Tutup"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Modal Image Container */}
              <div
                className="relative w-full h-[55vh] sm:h-[65vh] max-h-[72vh] overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  key={activeZone.image}
                  src={activeZone.image}
                  alt={activeZone.title}
                  fill
                  quality={95}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-contain"
                  priority
                />

                {/* Previous and Next Navigation Arrows */}
                {zonesWithImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prev();
                      }}
                      aria-label="Zona Sebelumnya"
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[color:var(--color-amber-deep)] backdrop-blur-md border border-white/15 transition-all shadow-lg focus:outline-none"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      aria-label="Zona Selanjutnya"
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[color:var(--color-amber-deep)] backdrop-blur-md border border-white/15 transition-all shadow-lg focus:outline-none"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </>
                )}

                {/* Counter badge inside image top right */}
                {zonesWithImages.length > 1 && activeImageIndex !== null && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md border border-white/10">
                    <span>
                      {activeImageIndex + 1} / {zonesWithImages.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Detail Bar: Active Zone, Description, Price & Quick Switcher */}
              <div
                className="w-full mt-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/10 p-3 sm:p-4 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-white shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Active Zone Title, Price & Description */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-serif text-base sm:text-lg font-semibold text-white">
                      {activeZone.title}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[color:var(--color-amber)]">
                      {activeZone.priceFormatted}
                    </span>
                  </div>
                  {activeZone.description && (
                    <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
                      📍 {activeZone.description}
                    </p>
                  )}
                </div>

                {/* Quick Zone Switcher Tabs without native scrollbar */}
                {zonesWithImages.length > 1 && (
                  <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto py-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {zonesWithImages.map((z, idx) => {
                      const isActive = idx === activeImageIndex;
                      return (
                        <button
                          key={z.number}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 shrink-0 border cursor-pointer",
                            isActive
                              ? "bg-white text-black font-semibold border-white shadow-md scale-105"
                              : "bg-white/10 text-white/75 border-white/10 hover:bg-white/20 hover:text-white"
                          )}
                        >
                          <span>{z.title}</span>
                          <span
                            className={cn(
                              "font-medium",
                              isActive
                                ? "text-[color:var(--color-amber-deep)] font-bold"
                                : "text-white/60"
                            )}
                          >
                            {z.priceFormatted}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
