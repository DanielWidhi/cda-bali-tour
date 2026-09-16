/**
 * Normalisasi nomor telepon ke format yang diterima wa.me (kode negara, tanpa +/0/spasi/strip).
 * "08123456789"  -> "628123456789"
 * "+62 812-3456" -> "62812 3456" (spasi/strip dibuang) -> "628123456"
 * Return null kalau nomor kosong/tidak valid, supaya pemanggil bisa sembunyikan tombolnya.
 */
export function toWhatsAppNumber(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;

  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  return `62${digits}`; // asumsi nomor lokal tanpa awalan 0/62
}

export function buildWhatsAppUrl(raw: string | null | undefined, message?: string): string | null {
  const number = toWhatsAppNumber(raw);
  if (!number) return null;
  return message
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${number}`;
}
