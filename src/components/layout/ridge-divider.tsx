import { cn } from "@/lib/utils";

export function RidgeDivider({
  color = "var(--color-mist)",
  flip = false,
  className,
}: {
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("ridge-divider", flip && "rotate-180", className)} aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,40 L60,32 L120,44 L180,20 L240,36 L300,10 L360,30 L420,42 L480,18 L540,34 L600,8 L660,28 L720,38 L780,16 L840,32 L900,44 L960,22 L1020,36 L1080,12 L1140,30 L1200,40 L1200,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
