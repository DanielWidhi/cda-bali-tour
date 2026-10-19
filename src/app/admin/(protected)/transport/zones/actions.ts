"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildLocalizedText } from "@/lib/form-parsers";
import { ZONE_NUMBERS } from "@/lib/zones";

export async function saveZonesAction(formData: FormData) {
  for (const n of ZONE_NUMBERS) {
    const description = buildLocalizedText(
      String(formData.get(`desc${n}Id`) ?? ""),
      String(formData.get(`desc${n}En`) ?? "")
    );
    const image = String(formData.get(`image${n}`) ?? "").trim() || null;

    await prisma.transportZone.upsert({
      where: { number: n },
      update: { description, image },
      create: { number: n, description, image },
    });
  }

  revalidatePath("/admin/transport/zones");
  for (const prefix of ["", "/en"]) revalidatePath(`${prefix}/transport`, "layout");
  redirect("/admin/transport/zones?toast=update");
}
