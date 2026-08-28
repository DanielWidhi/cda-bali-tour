"use server";

import { saveInquiry } from "@/lib/inquiries";

export async function submitContactAction(data: {
  name: string;
  message: string;
}) {
  await saveInquiry({
    name: data.name,
    message: data.message,
    source: "contact-form",
  });
}
