"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fireAlert } from "@/lib/swal";

export function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = searchParams.get("toast");

  useEffect(() => {
    if (!toast) return;

    const messages = {
      create: { title: "Berhasil", text: "Data berhasil ditambahkan.", icon: "success" as const },
      update: { title: "Berhasil", text: "Data berhasil diperbarui.", icon: "success" as const },
      toggle: { title: "Berhasil", text: "Status berhasil diubah.", icon: "success" as const },
    };

    const message = messages[toast as keyof typeof messages];
    if (message) {
      fireAlert({
        ...message,
        timer: 2000,
        showConfirmButton: false,
        confirmButtonColor: "#b5601c",
      });
      router.replace(window.location.pathname);
    }
  }, [toast, router]);

  return null;
}
