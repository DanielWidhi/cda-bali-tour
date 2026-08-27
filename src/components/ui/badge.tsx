import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--color-amber)]/15 text-[color:var(--color-amber-deep)]",
        outline: "border border-white/40 text-white",
        green: "bg-[color:var(--color-green)]/15 text-[color:var(--color-green)]",
        solid: "bg-[color:var(--color-ink)] text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
