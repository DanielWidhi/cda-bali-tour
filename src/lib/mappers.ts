import type { TourPackage as PrismaTourPackage, Transport as PrismaTransport } from "@prisma/client";
import type { TourPackage, TransportOption } from "@/types";
import {
  type Locale,
  resolveText,
  resolveArray,
  resolveItinerary,
  resolveFaq,
  formatDuration,
  formatCapacity,
  type LocalizedText,
  type LocalizedItineraryItem,
  type LocalizedFaqItem,
} from "@/lib/localization";
import { resolvePrice } from "@/lib/currency";

export function mapTour(t: PrismaTourPackage, locale: Locale): TourPackage {
  const main = resolvePrice(t.price, t.priceUsd, locale);
  // Harga coret harus sama mata uangnya dengan harga utama, kalau tidak persen diskon jadi salah
  const original = main.currency === "USD" ? t.originalPriceUsd : t.originalPrice;
  return {
    slug: t.slug,
    title: t.title,
    category: t.category as TourPackage["category"],
    categoryLabel: t.categoryLabel,
    location: t.location,
    duration: formatDuration(t.durationHours, locale),
    price: main.amount,
    currency: main.currency,
    originalPrice: original ?? undefined,
    rating: t.rating,
    reviewCount: t.reviewCount,
    coverImage: t.coverImage,
    gallery: t.gallery,
    shortDescription: resolveText(t.shortDescription as LocalizedText, locale),
    description: resolveText(t.description as LocalizedText, locale),
    highlights: resolveArray(t.highlights as LocalizedText[], locale),
    itinerary: resolveItinerary(t.itinerary as LocalizedItineraryItem[], locale),
    includes: resolveArray(t.includes as LocalizedText[], locale),
    excludes: resolveArray(t.excludes as LocalizedText[], locale),
    faq: resolveFaq(t.faq as LocalizedFaqItem[], locale),
  };
}

export function mapTransport(c: PrismaTransport, locale: Locale): TransportOption {
  const main = resolvePrice(c.pricePerDay, c.pricePerDayUsd, locale);
  return {
    slug: c.slug,
    name: c.name,
    capacity: formatCapacity(c.capacityMin, c.capacityMax, locale),
    pricePerDay: main.amount,
    currency: main.currency,
    hours: c.hours,
    hoursLabel: formatDuration(c.hours, locale),
    image: c.image,
  };
}
