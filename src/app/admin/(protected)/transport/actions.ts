"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function buildTransportData(formData: FormData) {
  return {
    slug: String(formData.get("slug")).trim(),
    name: String(formData.get("name")).trim(),
    capacity: String(formData.get("capacity")).trim(),
    pricePerDay: Number(formData.get("pricePerDay")),
    hours: Number(formData.get("hours")),
    image: String(formData.get("image")).trim(),
    published: formData.get("published") === "on",
  };
}

export async function createTransportAction(formData: FormData) {
  const data = buildTransportData(formData);
  await prisma.transport.create({ data });

  revalidatePath("/admin/transport");
  revalidatePath("/transport");
  redirect("/admin/transport");
}

export async function updateTransportAction(id: string, formData: FormData) {
  const data = buildTransportData(formData);
  await prisma.transport.update({ where: { id }, data });

  revalidatePath("/admin/transport");
  revalidatePath("/transport");
  redirect("/admin/transport");
}

export async function deleteTransportAction(id: string) {
  await prisma.transport.delete({ where: { id } });

  revalidatePath("/admin/transport");
  revalidatePath("/transport");
}
