import { siteConfig } from "@/config/site";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
        "Halo CDA Bali Tour, saya ingin bertanya tentang paket tour."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.42a9.86 9.86 0 0 0 4.62 1.17h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.11c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.05.09-3.02-.63-2.54-.94-4.2-3.44-4.33-3.6-.13-.17-1.03-1.37-1.03-2.62 0-1.25.66-1.86.89-2.11.24-.25.52-.31.7-.31h.5c.16 0 .38-.06.59.45.24.57.8 1.98.87 2.12.07.15.11.32.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.72 1.19 1.55 1.93 1.06.94 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.53.72 1.79.85.26.13.44.19.5.3.06.11.06.63-.18 1.31Z" />
      </svg>
    </a>
  );
}
