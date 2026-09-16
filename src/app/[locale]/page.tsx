import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/sections/hero";
import { ValueProps } from "@/components/sections/value-props";
import { TourCard } from "@/components/sections/tour-card";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { mapTour } from "@/lib/mappers";
import type { Locale } from "@/lib/localization";

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  const tours = (
    await prisma.tourPackage.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    })
  ).map((tour) => mapTour(tour, locale as Locale));

  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const ratingAgg = await prisma.testimonial.aggregate({
    where: { published: true },
    _avg: { rating: true },
    _count: { rating: true },
  });
  const averageRating = ratingAgg._avg.rating ?? 5;
  const reviewCount = ratingAgg._count.rating;

  return (
    <>
      <Hero averageRating={averageRating} reviewCount={reviewCount} />
      <ValueProps />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
              {t("popularLabel")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl mt-3">{t("popularTitle")}</h2>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto">
            <Link href="/tour">{t("viewAll")}</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </section>

      <Testimonials testimonials={testimonials} />
      <FAQSection />
      <CtaBanner />
    </>
  );
}
