"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createTestimonialAction(formData: FormData) {
  await prisma.testimonial.create({
    data: {
      name: String(formData.get("name")).trim(),
      origin: String(formData.get("origin")).trim(),
      phone: String(formData.get("phone") ?? "").trim() || null,
      rating: Number(formData.get("rating") ?? 5),
      quote: String(formData.get("quote")).trim(),
      tourSlug: String(formData.get("tourSlug") ?? "").trim() || null,
      published: true,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials?toast=create");
}

export async function toggleTestimonialPublishedAction(id: string, published: boolean) {
  await prisma.testimonial.update({ where: { id }, data: { published } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials?toast=toggle");
}

export async function deleteTestimonialAction(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
