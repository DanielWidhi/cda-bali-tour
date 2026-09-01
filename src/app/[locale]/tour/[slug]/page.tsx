import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Star, Clock, MapPin, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/lib/prisma";
import { mapTour } from "@/lib/mappers";
import { formatIDR } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const tours = await prisma.tourPackage.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await prisma.tourPackage.findUnique({ where: { slug } });
  if (!tour) return {};

  return {
    title: `${tour.title} — ${formatIDR(tour.price)}`,
    description: tour.shortDescription,
    alternates: { canonical: `/tour/${tour.slug}` },
    openGraph: {
      title: tour.title,
      description: tour.shortDescription,
      images: [{ url: tour.coverImage, width: 1200, height: 800 }],
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = await prisma.tourPackage.findUnique({ where: { slug } });
  if (!raw || !raw.published) notFound();
  const tour = mapTour(raw);
  const t = await getTranslations("tourDetail");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    image: `${siteConfig.url}${tour.coverImage}`,
    touristType: tour.categoryLabel,
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/tour/${tour.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs text-black/50 mb-6">
        <Link href="/">{t("home")}</Link> / <Link href="/tour">{t("breadcrumb")}</Link> /{" "}
        <span className="text-black/80">{tour.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2" data-aos="fade-up">
          <Badge variant="default" className="mb-3">
            {tour.categoryLabel}
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight">
            {tour.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-black/60">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-[color:var(--color-amber)] text-[color:var(--color-amber)]" />
              <strong className="text-black">{tour.rating}</strong> (
              {tour.reviewCount} {t("reviews")})
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {tour.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {tour.duration}
            </span>
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mt-6">
            <Image
              src={tour.coverImage}
              alt={tour.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>

          <section className="mt-10">
            <h2 className="font-serif text-2xl mb-3">{t("description")}</h2>
            <p className="text-black/70 leading-relaxed">{tour.description}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl mb-4">{t("highlights")}</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {tour.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-black/70">
                  <Check className="h-4 w-4 text-[color:var(--color-green)] shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-2xl mb-4">{t("itinerary")}</h2>
            <ol className="relative border-l border-black/10 ml-2">
              {tour.itinerary.map((step, i) => (
                <li key={i} className="ml-6 pb-6 last:pb-0">
                  <span className="absolute -left-[7px] flex h-3.5 w-3.5 rounded-full bg-[color:var(--color-amber)]" />
                  <p className="text-xs font-semibold text-[color:var(--color-amber-deep)]">
                    {step.time}
                  </p>
                  <p className="text-sm text-black/70 mt-0.5">{step.activity}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-xl mb-3">{t("includes")}</h3>
              <ul className="flex flex-col gap-2">
                {tour.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-black/70">
                    <Check className="h-4 w-4 text-[color:var(--color-green)] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3">{t("excludes")}</h3>
              <ul className="flex flex-col gap-2">
                {tour.excludes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-black/70">
                    <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {tour.faq.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl mb-2">{t("faq")}</h2>
              <Accordion type="single" collapsible>
                {tour.faq.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionContent>{f.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}
        </div>

        {/* Sticky booking card */}
        <aside className="lg:col-span-1" data-aos="fade-up" data-aos-delay="150">
          <div className="sticky top-24 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            {tour.originalPrice && (
              <p className="text-sm text-black/40 line-through">
                {formatIDR(tour.originalPrice)}
              </p>
            )}
            <p className="font-serif text-3xl text-[color:var(--color-amber-deep)]">
              {formatIDR(tour.price)}
            </p>
            <p className="text-xs text-black/50 mb-6">{t("perPerson")}</p>

            <Button asChild size="lg" className="w-full mb-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  `Halo, saya ingin booking paket "${tour.title}"`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("bookWhatsapp")}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/kontak">{t("askFirst")}</Link>
            </Button>

            <div className="mt-6 pt-6 border-t border-black/10 text-xs text-black/50 flex flex-col gap-1.5">
              <span>✓ {t("noDeposit")}</span>
              <span>✓ {t("payAfter")}</span>
              <span>✓ {t("freeCancel")}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
