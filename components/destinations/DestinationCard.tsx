import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import type { Destination } from "@/lib/types";

/**
 * Paper card used in result grids — image first, then a compact information
 * block with region, categories and the destination's headline.
 */
export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-white transition-shadow duration-500 hover:shadow-card">
      <Link href={`/destinations/${destination.slug}`} className="block">
        <div className="media media-zoom aspect-[4/3]">
          <SmartImage
            src={destination.hero_image}
            alt={`${destination.name}, ${destination.region}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {destination.attraction_count ? (
              <span className="rounded-full bg-cream/[0.92] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-forest">
                {destination.attraction_count} experiences
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
          {destination.region}
        </p>
        <h3 className="mt-1.5 font-display text-[1.45rem] leading-tight text-forest">
          <Link href={`/destinations/${destination.slug}`} className="transition-colors hover:text-forest-500">
            {destination.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{destination.summary}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3.5">
          <span className="text-[0.72rem] text-muted">
            {destination.categories?.slice(0, 2).join(" · ") || destination.region}
          </span>
          <Link
            href={`/destinations/${destination.slug}`}
            className="flex items-center gap-1 text-[0.78rem] font-semibold text-forest transition-colors hover:text-gold-600"
          >
            View guide
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
