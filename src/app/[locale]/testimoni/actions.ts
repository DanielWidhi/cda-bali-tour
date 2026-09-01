"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitTestimonialAction(input: {
  name: string;
  origin: string;
  phone: string;
  rating: number;
  tourSlug?: string;
  quote: string;
}) {
  if (!input.name.trim() || !input.origin.trim() || !input.quote.trim()) {
    return { ok: false as const, error: "Mohon lengkapi semua field wajib." };
  }

  await prisma.testimonial.create({
    data: {
      name: input.name.trim(),
      origin: input.origin.trim(),
      phone: input.phone.trim() || null,
      rating: Math.min(5, Math.max(1, input.rating)),
      tourSlug: input.tourSlug?.trim() || null,
      quote: input.quote.trim(),
      published: false, // menunggu approval admin sebelum tampil di homepage
    },
  });

  revalidatePath("/admin/testimonials");
  return { ok: true as const };
}
