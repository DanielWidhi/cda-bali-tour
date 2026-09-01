import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@prisma/client";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations("testimonialsSection");

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-[color:var(--color-ink)] text-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber)]">
            {t("label")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl mt-3">{t("title")}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col"
            >
              <Quote className="h-6 w-6 text-[color:var(--color-amber)] mb-4" />
              <p className="text-white/80 text-sm leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-1 mt-5 mb-2 text-[color:var(--color-amber)]">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-white/50">{item.origin}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
