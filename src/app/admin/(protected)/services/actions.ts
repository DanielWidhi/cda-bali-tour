"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  buildLocalizedText,
  buildLocalizedArray,
  buildLocalizedFaq,
} from "@/lib/form-parsers";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

// Link tujuan hanya boleh alamat internal (diawali "/"), supaya tidak ada link keluar yang terisi tidak sengaja
function internalHrefOrNull(raw: string) {
  const v = raw.trim();
  return v.startsWith("/") && !v.startsWith("//") ? v : null;
}

function buildServiceData(formData: FormData) {
  return {
    title: buildLocalizedText(field(formData, "titleId"), field(formData, "titleEn")),
    shortDescription: buildLocalizedText(field(formData, "shortDescriptionId"), field(formData, "shortDescriptionEn")),
    description: buildLocalizedText(field(formData, "descriptionId"), field(formData, "descriptionEn")),
    highlights: buildLocalizedArray(field(formData, "highlightsId"), field(formData, "highlightsEn")),
    includes: buildLocalizedArray(field(formData, "includesId"), field(formData, "includesEn")),
    excludes: buildLocalizedArray(field(formData, "excludesId"), field(formData, "excludesEn")),
    faq: buildLocalizedFaq(field(formData, "faqId"), field(formData, "faqEn")),
    coverImage: field(formData, "coverImage").trim() || null,
    gallery: field(formData, "gallery")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    linkHref: internalHrefOrNull(field(formData, "linkHref")),
    showTransportCta: formData.get("showTransportCta") === "on",
    sortOrder: Number(field(formData, "sortOrder") || 0),
    published: formData.get("published") === "on",
  };
}

function revalidateServices(slug?: string) {
  revalidatePath("/admin/services");
  for (const prefix of ["", "/en"]) {
    revalidatePath(`${prefix}/services`);
    if (slug) revalidatePath(`${prefix}/services/${slug}`);
  }
}

export async function createServiceAction(formData: FormData) {
  const slug = field(formData, "slug").trim();
  await prisma.service.create({ data: { slug, ...buildServiceData(formData) } });

  revalidateServices(slug);
  redirect("/admin/services?toast=create");
}

// Slug sengaja tidak diubah saat edit: beberapa slug dipakai langsung oleh menu navbar.
export async function updateServiceAction(id: string, formData: FormData) {
  const updated = await prisma.service.update({ where: { id }, data: buildServiceData(formData) });

  revalidateServices(updated.slug);
  redirect("/admin/services?toast=update");
}

export async function deleteServiceAction(id: string) {
  const service = await prisma.service.delete({ where: { id } });
  revalidateServices(service.slug);
}
