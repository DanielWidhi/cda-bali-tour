"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createGalleryImagesAction(formData: FormData) {
  const urls = String(formData.get("images") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const caption = String(formData.get("caption") ?? "").trim() || null;

  if (urls.length === 0) return;

  await prisma.galleryImage.createMany({
    data: urls.map((url) => ({ url, caption })),
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery?toast=create");
}

export async function deleteGalleryImageAction(id: string) {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
