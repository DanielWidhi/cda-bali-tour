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
  duration: string; // sudah diformat, misal "5 jam" / "5 hours"
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
  capacity: string; // sudah diformat, misal "4-5 orang" / "4-5 people"
  pricePerDay: number;
  hours: number;
  hoursLabel: string; // sudah diformat, misal "10 jam" / "10 hours"
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  phone: string | null;
  rating: number;
  quote: string;
  tourSlug?: string | null;
}
