import Link from "next/link";
import clsx from "clsx";
import SmartImage from "@/components/common/SmartImage";
import type { Destination } from "@/lib/types";

type Variant = "feature" | "wide" | "grid" | "compact";

/**
 * Photography-led destination card. One component, four compositions, so the
 * homepage can use an asymmetric editorial rhythm rather than a grid of clones.
 */
export default function DestinationEditorialCard({
  destination,
  variant = "grid",
  priority = false,
  fillHeight = false,
  className,
}: {
  destination: Destination;
  variant?: Variant;
  priority?: boolean;
  fillHeight?: boolean;
  className?: string;
}) {
  const aspect = fillHeight
    ? variant === "feature"
      ? "aspect-[4/5] md:aspect-auto md:h-full"
      : "aspect-[16/10] md:aspect-auto md:h-full"
    : variant === "feature"
      ? "aspect-[4/5]"
      : variant === "wide"
        ? "aspect-[16/10]"
        : variant === "compact"
          ? "aspect-[5/4]"
          : "aspect-[4/3]";

  const titleSize =
    variant === "feature"
      ? "text-[clamp(2rem,3.2vw,3rem)]"
      : variant === "wide"
        ? "text-[clamp(1.45rem,2vw,2rem)]"
        : "text-[clamp(1.25rem,1.6vw,1.6rem)]";

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={clsx(
        "group relative block overflow-hidden bg-forest shadow-[0_24px_50px_-40px_rgba(23,63,53,0.9)]",
        aspect,
        className,
      )}
      aria-label={`${destination.name}, ${destination.region} — view destination guide`}
    >
      <div className="absolute inset-0">
        <SmartImage
          src={destination.hero_image}
          alt={`${destination.name}, ${destination.region}`}
          fill
          sizes={
            variant === "feature"
              ? "(max-width: 768px) 100vw, 58vw"
              : variant === "grid"
                ? "(max-width: 768px) 100vw, 33vw"
                : "(max-width: 768px) 100vw, 42vw"
          }
          priority={priority}
          className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.045]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,24,20,0.92)] via-[rgba(10,24,20,0.32)] via-45% to-[rgba(10,24,20,0)]" />

      <span
        aria-hidden
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-cream/40 text-cream backdrop-blur-sm transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-forest"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <p
          className={clsx(
            "mb-1.5 font-semibold uppercase tracking-[0.2em] text-cream/75",
            variant === "feature" ? "text-[0.66rem]" : "text-[0.6rem]",
          )}
        >
          {destination.region}
        </p>
        <h3 className={clsx("display text-cream", titleSize)}>{destination.name}</h3>
        {variant !== "compact" && destination.tagline && (
          <p className="mt-2 hidden max-w-md text-[0.82rem] leading-snug text-cream/80 sm:block">
            {destination.tagline}
          </p>
        )}
      </div>
    </Link>
  );
}
