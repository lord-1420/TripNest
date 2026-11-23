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
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center",
        className,
      )}
    >
      <div className={clsx("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className={clsx("eyebrow mb-2.5", tone === "light" ? "eyebrow-light" : "text-muted")}>
            {eyebrow}
          </p>
        )}
        <Tag
          className={clsx(
            "font-sans font-semibold tracking-[-0.032em] text-balance leading-[1.08]",
            tone === "light" ? "text-white" : "text-ink",
            "text-[clamp(1.75rem,3vw,2.6rem)]",
          )}
        >
          {title}
        </Tag>
        {description && (
          <p
            className={clsx(
              "mt-3 max-w-xl text-[0.96rem] leading-relaxed",
              tone === "light" ? "text-white/70" : "text-muted",
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
