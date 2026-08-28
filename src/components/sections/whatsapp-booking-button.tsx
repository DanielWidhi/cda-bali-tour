"use client";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { saveInquiryAction } from "@/app/(public)/actions/inquiry-actions";
import { cn } from "@/lib/utils";

export function WhatsAppBookingButton({
  source,
  message,
  className,
}: {
  source: string;
  message: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await saveInquiryAction({
        name: "Booking dari website",
        message,
        source,
      });

      const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");

      Swal.fire({
        title: "Membuka WhatsApp...",
        text: "Lanjutkan percakapan booking Anda di sana.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
    });
  }

  return (
    <Button
      type="button"
      size="lg"
      className={cn("w-full", className)}
      onClick={handleClick}
      disabled={pending}
    >
      {pending ? "Memproses..." : "Booking via WhatsApp"}
    </Button>
  );
}
