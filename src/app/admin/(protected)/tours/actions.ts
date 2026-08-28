"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  linesToArray,
  parseItinerary,
  parseFaq,
} from "@/lib/form-parsers";

function buildTourData(formData: FormData) {
  const price = Number(formData.get("price"));
  const originalPriceRaw = formData.get("originalPrice");
  const originalPrice = originalPriceRaw ? Number(originalPriceRaw) : null;

  return {
    slug: String(formData.get("slug")).trim(),
    title: String(formData.get("title")).trim(),
    category: String(formData.get("category")).trim(),
    categoryLabel: String(formData.get("categoryLabel")).trim(),
    location: String(formData.get("location")).trim(),
    duration: String(formData.get("duration")).trim(),
    price,
    originalPrice,
    rating: Number(formData.get("rating") ?? 5),
    reviewCount: Number(formData.get("reviewCount") ?? 0),
    coverImage: String(formData.get("coverImage")).trim(),
    gallery: linesToArray(String(formData.get("gallery") ?? "")),
    shortDescription: String(formData.get("shortDescription")).trim(),
    description: String(formData.get("description")).trim(),
    highlights: linesToArray(String(formData.get("highlights") ?? "")),
    itinerary: parseItinerary(String(formData.get("itinerary") ?? "")),
    includes: linesToArray(String(formData.get("includes") ?? "")),
    excludes: linesToArray(String(formData.get("excludes") ?? "")),
    faq: parseFaq(String(formData.get("faq") ?? "")),
    published: formData.get("published") === "on",
  };
}

export async function createTourAction(formData: FormData) {
  const data = buildTourData(formData);
  await prisma.tourPackage.create({ data });

  revalidatePath("/admin/tours");
  revalidatePath("/tour");
  revalidatePath("/");
  redirect("/admin/tours");
}

export async function updateTourAction(id: string, formData: FormData) {
  const data = buildTourData(formData);
  await prisma.tourPackage.update({ where: { id }, data });

  revalidatePath("/admin/tours");
  revalidatePath("/tour");
  revalidatePath(`/tour/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/tours");
}

export async function deleteTourAction(id: string) {
  const tour = await prisma.tourPackage.delete({ where: { id } });

  revalidatePath("/admin/tours");
  revalidatePath("/tour");
  revalidatePath(`/tour/${tour.slug}`);
  revalidatePath("/");
}
