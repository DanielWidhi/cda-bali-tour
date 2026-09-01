import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

function localizedUrl(path: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/tour", "/transport", "/gallery", "/tentang-kami", "/testimoni", "/kontak"];

  const staticPages = staticPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }))
  );

  const tours = await prisma.tourPackage.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const tourPages = tours.flatMap((tour) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(`/tour/${tour.slug}`, locale),
      lastModified: tour.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  return [...staticPages, ...tourPages];
}
