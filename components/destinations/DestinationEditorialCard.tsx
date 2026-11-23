import Link from "next/link";
import clsx from "clsx";
import SmartImage from "@/components/common/SmartImage";
import type { Destination } from "@/lib/types";

type Variant = "feature" | "wide" | "grid" | "compact";

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
          ? "aspect-[4/3]"
          : "aspect-[4/3]";

  const titleSize =
    variant === "feature"
      ? "text-[clamp(1.75rem,2.6vw,2.4rem)]"
      : variant === "wide"
        ? "text-[clamp(1.3rem,1.8vw,1.65rem)]"
        : "text-[clamp(1.15rem,1.4vw,1.35rem)]";

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={clsx(
        "group relative block overflow-hidden rounded-2xl bg-[#111]",
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
          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 via-45% to-transparent" />

      <span
        aria-hidden
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/75">
          {destination.region}
        </p>
        <h3 className={clsx("mt-1 font-sans font-semibold tracking-[-0.028em] text-white leading-tight", titleSize)}>
          {destination.name}
        </h3>
        {variant !== "compact" && destination.tagline && (
          <p className="mt-1.5 hidden max-w-md text-[0.84rem] leading-snug text-white/80 sm:block">
            {destination.tagline}
          </p>
        )}
      </div>
    </Link>
  );
}
