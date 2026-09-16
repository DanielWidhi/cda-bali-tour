export type LocalizedText = { id: string; en?: string };
export type Locale = "id" | "en";

/**
 * Ambil teks sesuai locale aktif. Kalau versi EN belum diisi admin,
 * otomatis fallback ke Bahasa Indonesia (bukan tampil kosong).
 */
export function resolveText(text: LocalizedText | null | undefined, locale: Locale): string {
  if (!text) return "";
  if (locale === "en" && text.en?.trim()) return text.en;
  return text.id ?? "";
}

export function resolveArray(arr: LocalizedText[] | null | undefined, locale: Locale): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => resolveText(item, locale));
}

export type LocalizedItineraryItem = { time: string; activity: LocalizedText };
export type ItineraryItem = { time: string; activity: string };

export function resolveItinerary(
  items: LocalizedItineraryItem[] | null | undefined,
  locale: Locale
): ItineraryItem[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({ time: item.time, activity: resolveText(item.activity, locale) }));
}

export type LocalizedFaqItem = { question: LocalizedText; answer: LocalizedText };
export type FaqItem = { question: string; answer: string };

export function resolveFaq(
  items: LocalizedFaqItem[] | null | undefined,
  locale: Locale
): FaqItem[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    question: resolveText(item.question, locale),
    answer: resolveText(item.answer, locale),
  }));
}

// Satuan otomatis mengikuti locale — dipakai untuk durasi (jam/hours) & kapasitas (orang/people)
export const UNITS: Record<Locale, { hours: string; people: string }> = {
  id: { hours: "jam", people: "orang" },
  en: { hours: "hours", people: "people" },
};

export function formatDuration(hours: number, locale: Locale): string {
  return `${hours} ${UNITS[locale].hours}`;
}

export function formatCapacity(min: number, max: number, locale: Locale): string {
  const range = min === max ? `${min}` : `${min}-${max}`;
  return `${range} ${UNITS[locale].people}`;
}
