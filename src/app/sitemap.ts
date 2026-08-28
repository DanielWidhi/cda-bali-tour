import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/tour",
    "/transport",
    "/gallery",
    "/tentang-kami",
    "/kontak",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const tours = await prisma.tourPackage.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const tourPages = tours.map((tour) => ({
    url: `${siteConfig.url}/tour/${tour.slug}`,
    lastModified: tour.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...tourPages];
}
