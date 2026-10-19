import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

function localizedUrl(path: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/services", "/tour", "/transport", "/gallery", "/tentang-kami", "/testimoni", "/kontak"];

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

  // Detail layanan (kecuali yang hanya mengalihkan ke halaman lain lewat linkHref)
  const services = await prisma.service.findMany({
    where: { published: true, linkHref: null },
    select: { slug: true, updatedAt: true },
  });
  const servicePages = services.flatMap((service) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(`/services/${service.slug}`, locale),
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const cars = await prisma.transport.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const carPages = cars.flatMap((car) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(`/transport/${car.slug}`, locale),
      lastModified: car.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...tourPages, ...servicePages, ...carPages];
}
