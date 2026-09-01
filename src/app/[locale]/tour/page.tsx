import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TourCard } from "@/components/sections/tour-card";
import { prisma } from "@/lib/prisma";
import { mapTour } from "@/lib/mappers";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tourListing");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/tour" },
  };
}

async function TourFilterList({ activeCategory }: { activeCategory: string }) {
  const t = await getTranslations();
  const categories = [
    { label: t("tourListing.allPackages"), value: "all" },
    { label: t("nav.sunriseTour"), value: "sunrise" },
    { label: t("nav.dayTour"), value: "day-tour" },
    { label: t("nav.nusaPenida"), value: "nusa-penida" },
    { label: t("nav.adventure"), value: "adventure" },
  ];

  const tours = (
    await prisma.tourPackage.findMany({
      where: {
        published: true,
        ...(activeCategory !== "all" ? { category: activeCategory } : {}),
      },
      orderBy: { createdAt: "desc" },
    })
  ).map(mapTour);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={cat.value === "all" ? "/tour" : `/tour?category=${cat.value}`}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium border transition-colors",
              activeCategory === cat.value
                ? "bg-[color:var(--color-ink)] text-white border-[color:var(--color-ink)]"
                : "border-black/10 hover:border-black/30"
            )}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {tours.length === 0 ? (
        <p className="text-black/60">{t("tourListing.noPackages")}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <div key={tour.slug} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default async function TourListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category ?? "all";
  const t = await getTranslations("tourListing");

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
      <div className="max-w-2xl mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
          {t("label")}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl mt-3">{t("title")}</h1>
        <p className="text-black/60 mt-3">{t("description")}</p>
      </div>

      <Suspense fallback={<p>...</p>}>
        <TourFilterList activeCategory={activeCategory} />
      </Suspense>
    </div>
  );
}
