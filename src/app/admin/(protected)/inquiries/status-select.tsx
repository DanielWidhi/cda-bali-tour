"use client";

import { useTransition } from "react";
import { InquiryStatus } from "@prisma/client";
import { updateInquiryStatusAction } from "./actions";
import { cn } from "@/lib/utils";

const statusStyles: Record<InquiryStatus, string> = {
  NEW: "bg-amber-100 text-amber-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
};

const statusLabels: Record<InquiryStatus, string> = {
  NEW: "Baru",
  IN_PROGRESS: "Diproses",
  DONE: "Selesai",
};

export function StatusSelect({ id, status }: { id: string; status: InquiryStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          updateInquiryStatusAction(id, e.target.value as InquiryStatus);
        })
      }
      className={cn(
        "text-xs font-semibold rounded-full px-3 py-1.5 border-0 outline-none cursor-pointer",
        statusStyles[status]
      )}
    >
      {Object.values(InquiryStatus).map((s) => (
        <option key={s} value={s}>
          {statusLabels[s]}
        </option>
      ))}
    </select>
  );
}
