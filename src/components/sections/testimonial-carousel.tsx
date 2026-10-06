"use client";

import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/types";

export function TestimonialCarousel({
  testimonials,
  title,
}: {
  testimonials: Testimonial[];
  title?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || testimonials.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.ceil(testimonials.length / 3) - 1;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isDesktop, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85;
      let newPos;
      if (direction === "left") {
        newPos = scrollLeft - scrollAmount;
        if (newPos <= 0) newPos = scrollWidth - clientWidth; // loop to end
      } else {
        newPos = scrollLeft + scrollAmount;
        if (newPos + clientWidth >= scrollWidth) newPos = 0; // loop to start
      }
      scrollRef.current.scrollTo({ left: newPos, behavior: "smooth" });
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = isDesktop
    ? testimonials.slice(currentIndex * 3, currentIndex * 3 + 3)
    : testimonials;

  const totalSlides = isDesktop ? Math.ceil(testimonials.length / 3) : testimonials.length;

  return (
    <div className="w-full my-12">
      {title && (
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[color:var(--color-ink)] font-semibold">
            {title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[color:var(--color-amber)] to-[color:var(--color-amber-deep)] mx-auto mt-3 rounded-full"></div>
        </div>
      )}

      {isDesktop ? (
        <div className="relative">
          <button
            onClick={() => goToSlide(currentIndex > 0 ? currentIndex - 1 : totalSlides - 1)}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gradient-to-br from-[color:var(--color-amber)] to-[color:var(--color-amber-deep)] shadow-lg text-white hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-amber)] focus:ring-offset-2 transition-all duration-200 opacity-90 hover:opacity-100"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-3 gap-6 px-4">
            {visibleTestimonials.map((item, index) => (
              <div
                key={item.id}
                className="opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-7 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[color:var(--color-amber)]/10 to-transparent rounded-full -mr-16 -mt-16"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <Quote className="h-10 w-10 text-[color:var(--color-amber)] opacity-80" />
                      <div className="flex items-center gap-1 text-[color:var(--color-amber)]">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed italic min-h-[120px]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-5 border-t-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[color:var(--color-amber)] to-[color:var(--color-amber-deep)] flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-gray-900">{item.name}</p>
                        {item.origin && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-[color:var(--color-amber)]"></span>
                            {item.origin}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => goToSlide(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0)}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gradient-to-br from-[color:var(--color-amber)] to-[color:var(--color-amber-deep)] shadow-lg text-white hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-amber)] focus:ring-offset-2 transition-all duration-200 opacity-90 hover:opacity-100"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-gradient-to-br from-[color:var(--color-amber)] to-[color:var(--color-amber-deep)] shadow-lg text-white hover:shadow-xl hover:scale-110 focus:outline-none transition-all duration-200 opacity-90 hover:opacity-100"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

    <div
      ref={scrollRef}
      className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={() => {
          if (scrollRef.current) {
            const slideWidth = scrollRef.current.clientWidth;
            const newIdx = Math.round(scrollRef.current.scrollLeft / slideWidth);
            setCurrentIndex(newIdx);
          }
        }}
    >
            {testimonials.map((item) => (
              <div key={item.id} className="snap-center shrink-0 w-[85vw]">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[color:var(--color-amber)]/10 to-transparent rounded-full -mr-16 -mt-16"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <Quote className="h-8 w-8 text-[color:var(--color-amber)] opacity-80" />
                      <div className="flex items-center gap-1 text-[color:var(--color-amber)]">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-5 italic min-h-[100px]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-5 border-t-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[color:var(--color-amber)] to-[color:var(--color-amber-deep)] flex items-center justify-center text-white font-bold text-base shadow-md">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        {item.origin && (
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-[color:var(--color-amber)]"></span>
                            {item.origin}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-gradient-to-br from-[color:var(--color-amber)] to-[color:var(--color-amber-deep)] shadow-lg text-white hover:shadow-xl hover:scale-110 focus:outline-none transition-all duration-200 opacity-90 hover:opacity-100"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

{isDesktop && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => (isDesktop ? goToSlide(index) : null)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                (isDesktop && currentIndex === index) || (!isDesktop && index === 0)
                  ? "w-8 bg-[color:var(--color-amber)]"
                  : "bg-gray-300 hover:bg-[color:var(--color-amber)]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
