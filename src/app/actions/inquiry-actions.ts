"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveInquiryAction(input: {
  name: string;
  contact?: string;
  message: string;
  source: string;
}) {
  if (!input.name?.trim() || !input.message?.trim()) {
    return { ok: false as const };
  }

  await prisma.inquiry.create({
    data: {
      name: input.name.trim(),
      contact: input.contact?.trim() || null,
      message: input.message.trim(),
      source: input.source,
    },
  });

  revalidatePath("/admin/inquiries");
  return { ok: true as const };
}
