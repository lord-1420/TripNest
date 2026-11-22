import clsx from "clsx";
import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  action,
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = as;
  return (
    <div
      className={clsx(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center",
        className,
      )}
    >
      <div className={clsx("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className={clsx("eyebrow mb-3", tone === "light" ? "eyebrow-light" : "eyebrow-forest")}>
            {eyebrow}
          </p>
        )}
        <Tag
          className={clsx(
            "display text-balance",
            tone === "light" ? "text-cream" : "text-forest",
            "text-[clamp(1.9rem,3.2vw,2.9rem)]",
          )}
        >
          {title}
        </Tag>
        {description && (
          <p
            className={clsx(
              "mt-4 max-w-xl text-[0.98rem] leading-relaxed",
              tone === "light" ? "text-cream/75" : "text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
