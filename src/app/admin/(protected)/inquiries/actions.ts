"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { InquiryStatus } from "@prisma/client";

export async function updateInquiryStatusAction(id: string, status: InquiryStatus) {
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiryAction(id: string) {
  await prisma.inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
}
