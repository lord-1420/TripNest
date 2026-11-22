import clsx from "clsx";
import type { ReactNode } from "react";
import SmartImage from "@/components/common/SmartImage";

/**
 * Interior page header. Handles the fixed-header offset and supports a
 * photography-led variant for editorial pages.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
  image,
  imageAlt,
  tone = "cream",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  tone?: "cream" | "forest" | "image";
  align?: "left" | "center";
}) {
  const isImage = tone === "image" && image;

  return (
    <header
      className={clsx(
        "relative isolate",
        isImage
          ? "overflow-hidden bg-forest pb-14 pt-[calc(var(--header-h)+3.5rem)] text-cream md:pb-20 md:pt-[calc(var(--header-h)+5rem)]"
          : tone === "forest"
            ? "bg-forest pb-12 pt-[calc(var(--header-h)+3rem)] text-cream"
            : "border-b border-line pb-12 pt-[calc(var(--header-h)+3rem)] md:pb-16",
      )}
    >
      {isImage && (
        <div className="absolute inset-0 -z-10">
          <SmartImage src={image!} alt={imageAlt ?? ""} fill priority sizes="100vw" fallbackTone="light" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/[0.55] to-forest/[0.92]" />
        </div>
      )}
      <div className="shell">
        <div className={clsx(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl")}>
          {eyebrow && (
            <p
              className={clsx(
                "eyebrow mb-3",
                tone === "cream" ? "eyebrow-forest" : "eyebrow-light",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={clsx(
              "display text-[clamp(2.1rem,4.4vw,3.6rem)]",
              tone === "cream" ? "text-forest" : "text-cream",
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={clsx(
                "mt-4 text-[1rem] leading-relaxed",
                tone === "cream" ? "text-muted" : "text-cream/75",
                align === "center" && "mx-auto max-w-xl",
              )}
            >
              {description}
            </p>
          )}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
