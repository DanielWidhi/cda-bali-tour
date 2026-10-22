import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Users, Luggage, Clock3, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GalleryLightbox } from "@/components/sections/gallery-lightbox";
import { ZonePricingCards } from "@/components/sections/zone-pricing-cards";
import { prisma } from "@/lib/prisma";
import { mapTransport } from "@/lib/mappers";
import { formatPrice, resolvePrice } from "@/lib/currency";
import { resolveText, type Locale, type LocalizedText } from "@/lib/localization";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const cars = await prisma.transport.findMany({ where: { published: true }, select: { slug: true } });
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const car = await prisma.transport.findUnique({ where: { slug } });
  if (!car) return {};
  const description = resolveText(car.description as LocalizedText | null, locale as Locale);
  return {
    title: car.name,
    description: description || undefined,
    alternates: { canonical: `/transport/${car.slug}` },
    openGraph: { title: car.name, images: car.image ? [{ url: car.image }] : undefined },
  };
}

export default async function TransportDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  const raw = await prisma.transport.findUnique({
    where: { slug },
    include: { zonePrices: { include: { zone: true } } },
  });
  if (!raw || !raw.published) notFound();

  const t = await getTranslations("transportDetail");
  const car = mapTransport(raw, locale);
  const description = resolveText(raw.description as LocalizedText | null, locale);
  const luggage = resolveText(raw.luggage as LocalizedText | null, locale);

  // Hanya zona yang punya harga untuk armada ini, urut zona 1 -> 4
  const zones = [...raw.zonePrices]
    .sort((a, b) => a.zone.number - b.zone.number)
    .map((zp) => ({
      number: zp.zone.number,
      price: resolvePrice(zp.priceIdr, zp.priceUsd, locale),
      description: resolveText(zp.zone.description as LocalizedText | null, locale),
      image: zp.zone.image,
    }));

  const showUsdNote = car.currency === "USD" || zones.some((z) => z.price.currency === "USD");
  const waLink = (text: string) => `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
  const gallery = raw.gallery.map((url) => ({ url, caption: car.name }));

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
      <nav className="text-xs text-black/50 mb-6">
        <Link href="/">{t("home")}</Link> / <Link href="/transport">{t("breadcrumb")}</Link> /{" "}
        <span className="text-black/80">{car.name}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2" data-aos="fade-up">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight">{car.name}</h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-black/60">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {t("capacity")}: <strong className="text-black">{car.capacity}</strong>
            </span>
            {luggage && (
              <span className="flex items-center gap-1.5">
                <Luggage className="h-4 w-4" /> {t("luggage")}: <strong className="text-black">{luggage}</strong>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" /> {car.hoursLabel}
            </span>
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mt-6">
            <Image
              src={car.image || "/images/icon/images-404.webp"}
              alt={car.name}
              fill
              priority
              quality={75}
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>

          {gallery.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl">{t("photos")}</h2>
              <div className="-mt-6">
                <GalleryLightbox images={gallery} />
              </div>
            </section>
          )}

          {description && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl mb-3">{t("aboutVehicle")}</h2>
              <p className="text-black/70 leading-relaxed whitespace-pre-line">{description}</p>
            </section>
          )}

          <section className="mt-10">
            <h2 className="font-serif text-2xl mb-2">{t("zonePricing")}</h2>
            <p className="text-sm text-black/60 mb-5 max-w-2xl">{t("zonePricingIntro")}</p>

            {zones.length === 0 ? (
              <p className="text-sm text-black/50">{t("noZonePrices")}</p>
            ) : (
              <ZonePricingCards
                zones={zones.map((zone) => ({
                  number: zone.number,
                  title: t("zone", { number: zone.number }),
                  priceFormatted: formatPrice(zone.price.amount, zone.price.currency),
                  description: zone.description,
                  image: zone.image,
                  waLink: waLink(t("waZone", { vehicle: car.name, number: zone.number })),
                  bookLabel: t("bookZone", { number: zone.number }),
                }))}
                vehicleName={car.name}
                zoomLabel={t("viewMap")}
              />
            )}

            {showUsdNote && <p className="text-[11px] text-black/40 mt-3">{t("usdNote")}</p>}

            <div className="mt-6 rounded-2xl bg-[color:var(--color-green)] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg">{t("customRouteTitle")}</h3>
                <p className="text-sm text-white/75 mt-1 max-w-xl">{t("customRouteText")}</p>
              </div>
              <Button asChild variant="inverse" className="shrink-0 w-full sm:w-auto">
                <a href={waLink(t("waCustom", { vehicle: car.name }))} target="_blank" rel="noopener noreferrer">
                  {t("customRouteCta")}
                </a>
              </Button>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1" data-aos="fade-up" data-aos-delay="150">
          <div className="sticky top-24 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-black/50">{t("dayRate")}</p>
            <p className="font-serif text-3xl text-[color:var(--color-amber-deep)] mt-1">
              {formatPrice(car.pricePerDay, car.currency)}
            </p>
            <p className={car.currency === "USD" ? "text-xs text-black/50 mb-2" : "text-xs text-black/50 mb-6"}>
              {t("perHours", { hours: raw.hours })}
            </p>
            {car.currency === "USD" && <p className="text-[11px] leading-snug text-black/40 mb-6">{t("usdNote")}</p>}

            <Button asChild size="lg" className="w-full">
              <a href={waLink(t("waVehicle", { vehicle: car.name }))} target="_blank" rel="noopener noreferrer">
                {t("bookDay")}
              </a>
            </Button>

            <div className="mt-6 pt-6 border-t border-black/10 text-xs text-black/50 flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> {t("noDeposit")}</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> {t("payAfter")}</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> {t("freeCancel")}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
