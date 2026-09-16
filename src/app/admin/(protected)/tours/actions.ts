"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  buildLocalizedText,
  buildLocalizedArray,
  buildLocalizedItinerary,
  buildLocalizedFaq,
} from "@/lib/form-parsers";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function buildTourData(formData: FormData) {
  const price = Number(formData.get("price"));
  const originalPriceRaw = formData.get("originalPrice");
  const originalPrice = originalPriceRaw ? Number(originalPriceRaw) : null;

  return {
    slug: field(formData, "slug").trim(),
    title: field(formData, "title").trim(),
    category: field(formData, "category").trim(),
    categoryLabel: field(formData, "categoryLabel").trim(),
    location: field(formData, "location").trim(),
    durationHours: Number(formData.get("durationHours")),
    price,
    originalPrice,
    rating: Number(formData.get("rating") ?? 5),
    reviewCount: Number(formData.get("reviewCount") ?? 0),
    coverImage: field(formData, "coverImage").trim(),
    gallery: field(formData, "gallery")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    shortDescription: buildLocalizedText(field(formData, "shortDescriptionId"), field(formData, "shortDescriptionEn")),
    description: buildLocalizedText(field(formData, "descriptionId"), field(formData, "descriptionEn")),
    highlights: buildLocalizedArray(field(formData, "highlightsId"), field(formData, "highlightsEn")),
    itinerary: buildLocalizedItinerary(field(formData, "itineraryId"), field(formData, "itineraryEn")),
    includes: buildLocalizedArray(field(formData, "includesId"), field(formData, "includesEn")),
    excludes: buildLocalizedArray(field(formData, "excludesId"), field(formData, "excludesEn")),
    faq: buildLocalizedFaq(field(formData, "faqId"), field(formData, "faqEn")),
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
