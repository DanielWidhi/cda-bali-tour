import type { Locale } from "@/lib/localization";

export type Currency = "IDR" | "USD";

/**
 * Pilih harga sesuai bahasa: EN -> USD (kalau admin sudah mengisi), selain itu IDR.
 * Kalau harga USD belum diisi, pengunjung EN tetap melihat harga IDR (fallback),
 * bukan harga kosong/0.
 */
export function resolvePrice(
  idr: number,
  usd: number | null | undefined,
  locale: Locale
): { amount: number; currency: Currency } {
  if (locale === "en" && usd != null && usd > 0) return { amount: usd, currency: "USD" };
  return { amount: idr, currency: "IDR" };
}

export function formatPrice(amount: number, currency: Currency): string {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
