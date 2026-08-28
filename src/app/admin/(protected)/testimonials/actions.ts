"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createTestimonialAction(formData: FormData) {
  await prisma.testimonial.create({
    data: {
      name: String(formData.get("name")).trim(),
      origin: String(formData.get("origin")).trim(),
      rating: Number(formData.get("rating") ?? 5),
      quote: String(formData.get("quote")).trim(),
      tourSlug: String(formData.get("tourSlug") ?? "").trim() || null,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonialAction(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
