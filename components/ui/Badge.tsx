import clsx from "clsx";
import type { ReactNode } from "react";

export default function Badge({
  children,
  tone = "forest",
  className,
}: {
  children: ReactNode;
  tone?: "forest" | "gold" | "light" | "outline" | "muted" | "danger" | "success";
  className?: string;
}) {
  const tones: Record<string, string> = {
    forest: "bg-forest text-cream border-forest",
    gold: "bg-gold-100 text-[#6d4f18] border-[#e3cd9f]",
    light: "bg-cream/95 text-forest border-cream/60",
    outline: "bg-transparent text-forest border-forest/25",
    muted: "bg-[#F1EFE6] text-muted border-line",
    danger: "bg-[#FBEAE6] text-[#8C3524] border-[#F0CFC7]",
    success: "bg-[#E8F0EA] text-forest-500 border-[#CFE0D5]",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
