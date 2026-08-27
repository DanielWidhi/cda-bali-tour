export type TourCategory =
  | "sunrise"
  | "day-tour"
  | "nusa-penida"
  | "adventure"
  | "honeymoon"
  | "water-sport";

export interface TourPackage {
  slug: string;
  title: string;
  category: TourCategory;
  categoryLabel: string;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  itinerary: { time: string; activity: string }[];
  includes: string[];
  excludes: string[];
  faq: { question: string; answer: string }[];
}

export interface TransportOption {
  slug: string;
  name: string;
  capacity: string;
  pricePerDay: number;
  hours: number;
  image: string;
}

export interface Testimonial {
  name: string;
  origin: string;
  rating: number;
  quote: string;
  tourSlug?: string;
}
