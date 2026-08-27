import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi PT. CDA untuk pertanyaan seputar paket tour, sewa mobil, atau permintaan itinerary khusus di Bali.",
  alternates: { canonical: "/kontak" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
        Kontak
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3">Ada yang bisa kami bantu?</h1>
      <p className="text-black/60 mt-3 max-w-xl">
        Isi form di bawah dan pesan Anda akan langsung terkirim ke WhatsApp
        tim kami, atau hubungi kontak berikut secara langsung.
      </p>

      <div className="grid lg:grid-cols-2 gap-12 mt-10">
        <ContactForm />

        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-[color:var(--color-amber-deep)] shrink-0 mt-0.5" />
            <p className="text-sm text-black/70">{siteConfig.address}</p>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-[color:var(--color-amber-deep)] shrink-0 mt-0.5" />
            <p className="text-sm text-black/70">{siteConfig.phone}</p>
          </div>
          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-[color:var(--color-amber-deep)] shrink-0 mt-0.5" />
            <p className="text-sm text-black/70">{siteConfig.email}</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-black/10 mt-3 aspect-video">
            <iframe
              title="Lokasi PT. CDA"
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Batubulan,Sukawati,Gianyar,Bali&output=embed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
