import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Tombol buka WhatsApp langsung ke nomor yang bersangkutan, TANPA pesan
 * pre-fill — admin sengaja mengetik sendiri (lihat diskusi: testimoni/inquiry
 * bisa datang dari wisatawan berbagai bahasa, template otomatis malah bisa
 * tidak nyambung). Otomatis tersembunyi kalau nomor kosong/tidak valid.
 */
export function WhatsAppLinkButton({
  phone,
  className,
}: {
  phone: string | null | undefined;
  className?: string;
}) {
  const url = buildWhatsAppUrl(phone);
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat via WhatsApp"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-[#25D366] hover:bg-[#25D366]/10 transition-colors",
        className
      )}
    >
      <MessageCircle className="h-4 w-4" />
    </a>
  );
}
