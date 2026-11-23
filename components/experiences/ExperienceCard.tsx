import Link from "next/link";
import clsx from "clsx";
import SmartImage from "@/components/common/SmartImage";
import type { Attraction } from "@/lib/types";

export default function ExperienceCard({
  attraction,
  variant = "grid",
  className,
}: {
  attraction: Attraction;
  variant?: "grid" | "row" | "feature";
  className?: string;
}) {
  if (variant === "row") {
    return (
      <Link
        href={`/experiences/${attraction.slug}`}
        className={clsx("group flex items-center gap-4 py-3.5", className)}
      >
        <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-sand">
          <SmartImage
            src={attraction.image}
            alt={attraction.name}
            fill
            sizes="72px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-sans text-[0.98rem] font-semibold leading-snug tracking-[-0.015em] text-ink group-hover:text-forest">
            {attraction.name}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-[0.78rem] text-muted">
            {attraction.destination_name ?? attraction.region} · {attraction.region}
          </p>
        </div>
        <span aria-hidden className="ml-auto text-muted/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
          →
        </span>
      </Link>
    );
  }

  return (
    <article className={clsx("group flex h-full flex-col", className)}>
      <Link href={`/experiences/${attraction.slug}`} className="block">
        <div
          className={clsx(
            "media media-zoom rounded-2xl bg-sand",
            variant === "feature" ? "aspect-[16/11]" : "aspect-[4/3]",
          )}
        >
          <SmartImage
            src={attraction.image}
            alt={attraction.name}
            fill
            sizes={variant === "feature" ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 768px) 100vw, 30vw"}
            className="object-cover"
          />
          {attraction.hidden_gem ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[0.66rem] font-semibold text-ink backdrop-blur-md">
              Hidden gem
            </span>
          ) : null}
        </div>
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
          {attraction.region}
          {attraction.destination_name ? ` · ${attraction.destination_name}` : ""}
        </p>
        <h3
          className={clsx(
            "mt-1 font-sans font-semibold leading-snug tracking-[-0.02em] text-ink",
            variant === "feature" ? "text-[1.35rem]" : "text-[1.02rem]",
          )}
        >
          <Link href={`/experiences/${attraction.slug}`} className="transition-colors hover:text-forest">
            {attraction.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-[0.85rem] leading-relaxed text-muted">{attraction.summary}</p>
      </div>
    </article>
  );
}
