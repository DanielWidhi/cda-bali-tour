import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TourCard } from "@/components/sections/tour-card";
import { prisma } from "@/lib/prisma";
import { mapTour } from "@/lib/mappers";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Paket Tour Bali — Sunrise, Nusa Penida, Day Tour & Adventure",
  description:
    "Pilih paket tour Bali sesuai kebutuhan Anda: sunrise Mount Batur, Nusa Penida, heritage Ubud, hingga adventure. Harga transparan, driver berpengalaman.",
  alternates: { canonical: "/tour" },
};

const categories = [
  { label: "Semua Paket", value: "all" },
  { label: "Sunrise Tour", value: "sunrise" },
  { label: "Day Tour", value: "day-tour" },
  { label: "Nusa Penida", value: "nusa-penida" },
  { label: "Adventure", value: "adventure" },
];

async function TourFilterList({ activeCategory }: { activeCategory: string }) {
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
        <p className="text-black/60">Belum ada paket untuk kategori ini.</p>
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

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
      <div className="max-w-2xl mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
          Tour Packages
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl mt-3">
          Paket tour Bali untuk setiap gaya perjalanan
        </h1>
        <p className="text-black/60 mt-3">
          Semua paket sudah termasuk driver berbahasa Inggris, mobil ber-AC,
          dan bisa disesuaikan itinerarinya.
        </p>
      </div>

      <Suspense fallback={<p>Memuat paket tour...</p>}>
        <TourFilterList activeCategory={activeCategory} />
      </Suspense>
    </div>
  );
}
