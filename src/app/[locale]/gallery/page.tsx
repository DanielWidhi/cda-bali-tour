import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { GalleryLightbox } from "@/components/sections/gallery-lightbox";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("galleryPage");
  return {
    title: t("title"),
    description: t("hint"),
    alternates: { canonical: "/gallery" },
  };
}

export default async function GalleryPage() {
  const t = await getTranslations("galleryPage");
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
    select: { url: true, caption: true },
  });

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
        {t("label")}
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3">{t("title")}</h1>
      <p className="text-black/60 mt-2">{t("hint")}</p>

      {images.length === 0 ? (
        <p className="text-black/50 mt-10">{t("empty")}</p>
      ) : (
        <GalleryLightbox images={images} />
      )}
    </div>
  );
}
