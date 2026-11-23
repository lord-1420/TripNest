import clsx from "clsx";
import type { ReactNode } from "react";
import SmartImage from "@/components/common/SmartImage";

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
  const isDark = isImage || tone === "forest";

  return (
    <header
      className={clsx(
        "relative isolate",
        isImage
          ? "overflow-hidden bg-[#0e1412] pb-14 pt-[calc(var(--header-h)+3.5rem)] text-white md:pb-20 md:pt-[calc(var(--header-h)+5rem)]"
          : tone === "forest"
            ? "bg-[#0e1412] pb-12 pt-[calc(var(--header-h)+3rem)] text-white"
            : "border-b border-line bg-white pb-10 pt-[calc(var(--header-h)+2.75rem)] md:pb-12",
      )}
    >
      {isImage && (
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src={image!}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            fallbackTone="light"
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />
        </div>
      )}
      <div className="shell">
        <div className={clsx(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl")}>
          {eyebrow && (
            <p className={clsx("eyebrow mb-2.5", isDark ? "eyebrow-light" : "text-muted")}>
              {eyebrow}
            </p>
          )}
          <h1
            className={clsx(
              "font-sans text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[1.06] tracking-[-0.036em]",
              isDark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={clsx(
                "mt-3.5 text-[0.98rem] leading-relaxed",
                isDark ? "text-white/75" : "text-muted",
                align === "center" && "mx-auto max-w-xl",
              )}
            >
              {description}
            </p>
          )}
        </div>
        {children && <div className="mt-7">{children}</div>}
      </div>
    </header>
  );
}
