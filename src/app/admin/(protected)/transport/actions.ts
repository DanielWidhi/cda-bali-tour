"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildLocalizedText } from "@/lib/form-parsers";
import { ZONE_NUMBERS } from "@/lib/zones";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function optionalNumber(raw: string) {
  const v = raw.trim();
  return v ? Number(v) : null;
}

function buildTransportData(formData: FormData) {
  return {
    slug: field(formData, "slug").trim(),
    name: field(formData, "name").trim(),
    capacityMin: Number(formData.get("capacityMin")),
    capacityMax: Number(formData.get("capacityMax")),
    pricePerDay: Number(formData.get("pricePerDay")),
    pricePerDayUsd: optionalNumber(field(formData, "pricePerDayUsd")),
    hours: Number(formData.get("hours")),
    image: field(formData, "image").trim(),
    gallery: field(formData, "gallery")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    description: buildLocalizedText(field(formData, "descriptionId"), field(formData, "descriptionEn")),
    luggage: buildLocalizedText(field(formData, "luggageId"), field(formData, "luggageEn")),
    published: formData.get("published") === "on",
  };
}

/**
 * Simpan harga kendaraan per zona (zona 1-4). Aturannya:
 * - kolom IDR diisi  -> harga zona itu dibuat/diperbarui (USD opsional)
 * - kolom IDR kosong -> zona itu tidak ditawarkan untuk kendaraan ini (harga dihapus)
 * Baris zona dibuat otomatis kalau belum ada, jadi admin tidak perlu setup zona dulu.
 */
async function saveZonePrices(transportId: string, formData: FormData) {
  for (const n of ZONE_NUMBERS) {
    const idr = field(formData, `zone${n}Idr`).trim();
    const usd = optionalNumber(field(formData, `zone${n}Usd`));

    const zone = await prisma.transportZone.upsert({
      where: { number: n },
      update: {},
      create: { number: n, description: { id: "" } },
    });

    if (!idr) {
      await prisma.transportZonePrice.deleteMany({ where: { transportId, zoneId: zone.id } });
      continue;
    }

    await prisma.transportZonePrice.upsert({
      where: { transportId_zoneId: { transportId, zoneId: zone.id } },
      update: { priceIdr: Number(idr), priceUsd: usd },
      create: { transportId, zoneId: zone.id, priceIdr: Number(idr), priceUsd: usd },
    });
  }
}

function revalidateTransport(slug?: string) {
  for (const prefix of ["", "/en"]) {
    revalidatePath(`${prefix}/transport`);
    if (slug) revalidatePath(`${prefix}/transport/${slug}`);
  }
}

export async function createTransportAction(formData: FormData) {
  const data = buildTransportData(formData);
  const created = await prisma.transport.create({ data });
  await saveZonePrices(created.id, formData);

  revalidatePath("/admin/transport");
  revalidateTransport(data.slug);
  redirect("/admin/transport?toast=create");
}

export async function updateTransportAction(id: string, formData: FormData) {
  const data = buildTransportData(formData);
  await prisma.transport.update({ where: { id }, data });
  await saveZonePrices(id, formData);

  revalidatePath("/admin/transport");
  revalidateTransport(data.slug);
  redirect("/admin/transport?toast=update");
}

export async function deleteTransportAction(id: string) {
  const car = await prisma.transport.delete({ where: { id } });
  revalidatePath("/admin/transport");
  revalidateTransport(car.slug);
}
