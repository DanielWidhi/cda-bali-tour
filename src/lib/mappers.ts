import type { TourPackage as PrismaTourPackage } from "@prisma/client";
import type { TourPackage } from "@/types";

export function mapTour(t: PrismaTourPackage): TourPackage {
  return {
    slug: t.slug,
    title: t.title,
    category: t.category as TourPackage["category"],
    categoryLabel: t.categoryLabel,
    location: t.location,
    duration: t.duration,
    price: t.price,
    originalPrice: t.originalPrice ?? undefined,
    rating: t.rating,
    reviewCount: t.reviewCount,
    coverImage: t.coverImage,
    gallery: t.gallery,
    shortDescription: t.shortDescription,
    description: t.description,
    highlights: t.highlights,
    itinerary: t.itinerary as { time: string; activity: string }[],
    includes: t.includes,
    excludes: t.excludes,
    faq: t.faq as { question: string; answer: string }[],
  };
}
