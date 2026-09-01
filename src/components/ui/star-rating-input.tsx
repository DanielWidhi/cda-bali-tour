"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const displayValue = hover ?? value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          aria-label={`Beri rating ${star} bintang`}
          className="p-0.5"
        >
          <Star
            className={cn(
              "h-7 w-7 transition-colors",
              star <= displayValue
                ? "fill-[color:var(--color-amber)] text-[color:var(--color-amber)]"
                : "text-black/20"
            )}
          />
        </button>
      ))}
    </div>
  );
}
