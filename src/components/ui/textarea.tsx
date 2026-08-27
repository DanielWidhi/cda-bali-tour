import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/40 outline-none transition-colors focus-visible:border-[color:var(--color-amber)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
