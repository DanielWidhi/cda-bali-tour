import type { Metadata } from "next";
import Image from "next/image";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Kumpulan foto destinasi dan aktivitas wisata dari perjalanan bersama PT. CDA di Bali.",
  alternates: { canonical: "/gallery" },
};

const images = tours.flatMap((t) => t.gallery.map((src) => ({ src, alt: t.title })));

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
        Gallery
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3">Momen dari setiap perjalanan</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
