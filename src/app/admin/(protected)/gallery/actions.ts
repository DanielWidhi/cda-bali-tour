"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { linesToArray } from "@/lib/form-parsers";

export async function createGalleryImagesAction(formData: FormData) {
  const urls = linesToArray(String(formData.get("images") ?? ""));
  const caption = String(formData.get("caption") ?? "").trim() || null;

  if (urls.length === 0) return;

  await prisma.galleryImage.createMany({
    data: urls.map((url) => ({ url, caption })),
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImageAction(id: string) {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
