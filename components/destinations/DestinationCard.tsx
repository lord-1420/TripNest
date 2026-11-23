import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import type { Destination } from "@/lib/types";

/**
 * Airbnb-inspired minimal destination card — rounded photo first, crisp
 * typographic metadata directly below with zero bulky chrome.
 */
export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/destinations/${destination.slug}`} className="block">
        <div className="media media-zoom aspect-[4/3] rounded-2xl bg-sand">
          <SmartImage
            src={destination.hero_image}
            alt={`${destination.name}, ${destination.region}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          {destination.attraction_count ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-semibold text-ink backdrop-blur-md">
              {destination.attraction_count} experiences
            </span>
          ) : null}
        </div>
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-sans text-[1.04rem] font-semibold tracking-[-0.02em] text-ink">
            <Link href={`/destinations/${destination.slug}`} className="transition-colors hover:text-forest">
              {destination.name}
            </Link>
          </h3>
          <span className="shrink-0 font-mono text-[0.68rem] text-muted">{destination.region}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-[0.86rem] leading-relaxed text-muted">{destination.summary}</p>
        <p className="mt-2 text-[0.76rem] font-medium text-ink/60">
          {destination.categories?.slice(0, 2).join(" · ") || destination.region}
        </p>
      </div>
    </article>
  );
}
