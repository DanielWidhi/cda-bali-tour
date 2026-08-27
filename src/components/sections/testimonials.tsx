import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-[color:var(--color-ink)] text-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber)]">
            Testimoni
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl mt-3">
            Cerita dari wisatawan yang sudah menjelajah bersama kami
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col"
            >
              <Quote className="h-6 w-6 text-[color:var(--color-amber)] mb-4" />
              <p className="text-white/80 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-1 mt-5 mb-2 text-[color:var(--color-amber)]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-white/50">{t.origin}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
