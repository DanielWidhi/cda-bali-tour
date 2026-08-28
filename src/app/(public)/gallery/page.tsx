import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery",
  description: "Kumpulan foto destinasi dan aktivitas wisata dari perjalanan bersama PT. CDA di Bali.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const tours = await prisma.tourPackage.findMany({
    where: { published: true },
    select: { title: true, gallery: true },
  });

  const images = tours.flatMap((t) => t.gallery.map((src) => ({ src, alt: t.title })));

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
        Gallery
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3">Momen dari setiap perjalanan</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {images.map((img, i) => (
          <div
            key={i}
            data-aos="zoom-in"
            data-aos-delay={(i % 8) * 60}
            className="relative aspect-square rounded-xl overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
        {images.length === 0 && (
          <p className="col-span-full text-black/50">Belum ada foto tersedia.</p>
        )}
      </div>
    </div>
  );
}
