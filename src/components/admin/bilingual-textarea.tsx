"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function BilingualTextarea({
  label,
  hint,
  idName,
  enName,
  defaultId,
  defaultEn,
  className,
}: {
  label: string;
  hint?: string;
  idName: string;
  enName: string;
  defaultId?: string;
  defaultEn?: string;
  className?: string;
}) {
  const [tab, setTab] = useState<"id" | "en">("id");

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <Label className="mb-0">{label}</Label>
        <div className="flex rounded-full bg-black/5 p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab("id")}
            className={cn(
              "px-3 py-1 rounded-full transition-colors",
              tab === "id" ? "bg-white shadow-sm" : "text-black/50"
            )}
          >
            🇮🇩 ID
          </button>
          <button
            type="button"
            onClick={() => setTab("en")}
            className={cn(
              "px-3 py-1 rounded-full transition-colors",
              tab === "en" ? "bg-white shadow-sm" : "text-black/50"
            )}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>
      {hint && <p className="text-xs text-black/40 mb-1.5">{hint}</p>}

      {/* Kedua textarea tetap ada di DOM (supaya isinya ke-submit walau tab tidak aktif),
          cuma yang tidak aktif disembunyikan visualnya. */}
      <div className={cn(tab !== "id" && "hidden")}>
        <Textarea name={idName} defaultValue={defaultId} className={className} />
      </div>
      <div className={cn(tab !== "en" && "hidden")}>
        <Textarea
          name={enName}
          defaultValue={defaultEn}
          placeholder="Kosongkan kalau belum sempat diterjemahkan (otomatis pakai versi ID)"
          className={className}
        />
      </div>
    </div>
  );
}
