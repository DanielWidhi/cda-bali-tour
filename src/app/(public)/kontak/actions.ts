"use server";

import { saveInquiryAction } from "@/app/(public)/actions/inquiry-actions";

export async function submitContactAction(data: {
  name: string;
  message: string;
}) {
  return await saveInquiryAction({
    name: data.name,
    message: data.message,
    source: "contact-form",
  });
}

