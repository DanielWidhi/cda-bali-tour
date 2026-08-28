"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export function DeleteButton({
  action,
  itemLabel,
}: {
  action: () => Promise<void>;
  itemLabel: string;
}) {
  const [pending, startTransition] = useTransition();

  async function handleClick() {
    const result = await Swal.fire({
      title: "Hapus data ini?",
      text: `"${itemLabel}" akan dihapus permanen dan tidak bisa dikembalikan.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#b5601c",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    startTransition(async () => {
      await action();
      await Swal.fire({
        title: "Terhapus",
        text: "Data berhasil dihapus.",
        icon: "success",
        confirmButtonColor: "#b5601c",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
      aria-label={`Hapus ${itemLabel}`}
      type="button"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
