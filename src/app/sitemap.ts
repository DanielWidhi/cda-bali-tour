import type { MetadataRoute } from "next";
import { tours } from "@/data/tours";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const tourPages = tours.map((tour) => ({
    url: `${siteConfig.url}/tour/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...tourPages];
}
