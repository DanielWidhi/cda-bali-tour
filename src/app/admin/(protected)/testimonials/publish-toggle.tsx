"use client";

import { useTransition } from "react";
import { Check, EyeOff } from "lucide-react";
import { toggleTestimonialPublishedAction } from "./actions";

export function PublishToggle({ id, published }: { id: string; published: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleTestimonialPublishedAction(id, !published))}
      className={
        published
          ? "flex items-center gap-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 hover:bg-green-200 transition-colors disabled:opacity-50"
          : "flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 hover:bg-amber-200 transition-colors disabled:opacity-50"
      }
    >
      {published ? (
        <>
          <Check className="h-3.5 w-3.5" /> Tayang
        </>
      ) : (
        <>
          <EyeOff className="h-3.5 w-3.5" /> Setujui & Tayangkan
        </>
      )}
    </button>
  );
}
