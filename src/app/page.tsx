import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { ValueProps } from "@/components/sections/value-props";
import { TourCard } from "@/components/sections/tour-card";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { tours } from "@/data/tours";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
              Paket Favorit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl mt-3">
              Tour yang paling banyak dipesan
            </h2>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto">
            <Link href="/tour">Lihat Semua Paket</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </section>

      <Testimonials />
      <FAQSection />
      <CtaBanner />
    </>
  );
}
