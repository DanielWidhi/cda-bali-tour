import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactPage");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/kontak" },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  return (
    <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
        {t("label")}
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3">{t("title")}</h1>
      <p className="text-black/60 mt-3 max-w-xl">{t("description")}</p>

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
