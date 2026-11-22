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
        className={clsx("group flex items-center gap-4 py-4", className)}
      >
        <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden">
          <SmartImage
            src={attraction.image}
            alt={attraction.name}
            fill
            sizes="76px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-[1.15rem] leading-tight text-forest group-hover:text-forest-500">
            {attraction.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-[0.78rem] text-muted">
            {attraction.destination_name ?? attraction.region} · {attraction.region}
          </p>
        </div>
        <span aria-hidden className="ml-auto text-forest/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-forest">
          →
        </span>
      </Link>
    );
  }

  return (
    <article className={clsx("group flex h-full flex-col", className)}>
      <Link href={`/experiences/${attraction.slug}`} className="block">
        <div className={clsx("media media-zoom", variant === "feature" ? "aspect-[16/11]" : "aspect-[3/2]")}>
          <SmartImage
            src={attraction.image}
            alt={attraction.name}
            fill
            sizes={variant === "feature" ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 768px) 100vw, 30vw"}
            className="object-cover"
          />
          {attraction.hidden_gem ? (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-gold px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#22180a]">
              Hidden gem
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-3.5">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {attraction.region}
          {attraction.destination_name ? ` · ${attraction.destination_name}` : ""}
        </p>
        <h3 className={clsx("mt-1.5 font-display leading-tight text-forest", variant === "feature" ? "text-[1.6rem]" : "text-[1.2rem]")}>
          <Link href={`/experiences/${attraction.slug}`} className="hover:text-forest-500">
            {attraction.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.85rem] leading-relaxed text-muted">{attraction.summary}</p>
      </div>
    </article>
  );
}
