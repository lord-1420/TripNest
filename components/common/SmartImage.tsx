"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { LogoMark } from "@/components/brand/Logo";

type Props = Omit<ImageProps, "onError"> & {
  fallbackLabel?: string;
  fallbackTone?: "light" | "dark";
};

/**
 * next/image with a graceful, branded fallback so a missing asset never becomes
 * a broken image icon on a hero or card.
 */
export default function SmartImage({ fallbackLabel, fallbackTone = "dark", className, alt, ...props }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={typeof alt === "string" ? alt : "Image unavailable"}
        className={clsx(
          "flex flex-col items-center justify-center gap-2 px-4 text-center",
          fallbackTone === "light" ? "bg-forest/[0.85] text-cream/[0.85]" : "bg-cream-200 text-forest/60",
          className,
        )}
        style={{ position: "absolute", inset: 0 }}
      >
        <LogoMark tone={fallbackTone === "light" ? "light" : "dark"} size={22} />
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
          {fallbackLabel ?? "Image unavailable"}
        </span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      sizes={props.sizes}
    />
  );
}
