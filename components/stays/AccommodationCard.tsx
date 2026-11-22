import Link from "next/link";
import clsx from "clsx";
import SmartImage from "@/components/common/SmartImage";
import { cedis } from "@/lib/format";
import type { Accommodation } from "@/lib/types";

export const TYPE_LABEL: Record<Accommodation["type"], string> = {
  HOTEL: "Hotel",
  HOSTEL: "Hostel",
  APARTMENT: "Apartment",
};

/**
 * Photography-led accommodation card. TripNest never takes bookings, so the
 * action is always "View property" — enquiries happen with the provider.
 */
export default function AccommodationCard({
  stay,
  className,
  compact = false,
}: {
  stay: Accommodation;
  className?: string;
  compact?: boolean;
}) {
  return (
    <article
      className={clsx(
        "group flex h-full flex-col border border-line bg-white transition-shadow duration-500 hover:shadow-card",
        className,
      )}
    >
      <Link href={`/stays/${stay.slug}`} className="block">
        <div className={clsx("media media-zoom", compact ? "aspect-[16/10]" : "aspect-[4/3]")}>
          <SmartImage
            src={stay.image}
            alt={`${stay.name} — ${stay.area ?? stay.destination_name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-cream/[0.92] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-forest">
              {TYPE_LABEL[stay.type]}
            </span>
          </div>
          <div className="absolute bottom-2.5 right-2.5 rounded-full bg-forest/[0.85] px-3 py-1.5 text-[0.78rem] font-semibold text-cream backdrop-blur">
            {cedis(stay.price_per_night)}
            <span className="ml-1 text-[0.66rem] font-normal text-cream/70">/ night</span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {[stay.area ?? stay.destination_name, stay.region]
            .filter((v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i)
            .join(" · ")}
        </p>
        <h3 className="mt-1.5 font-display text-[1.32rem] leading-tight text-forest">
          <Link href={`/stays/${stay.slug}`} className="transition-colors hover:text-forest-500">
            {stay.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.86rem] leading-relaxed text-muted">{stay.description}</p>

        {!compact && stay.amenities && stay.amenities.length > 0 && (
          <ul className="mt-3.5 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.72rem] text-forest/70">
            {stay.amenities.slice(0, 3).map((a) => (
              <li key={a} className="flex items-center gap-1.5">
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                {a}
              </li>
            ))}
            {stay.amenities.length > 3 && (
              <li className="text-muted">+{stay.amenities.length - 3} more</li>
            )}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3.5 pt-4">
          <Link
            href={`/stays/${stay.slug}`}
            className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-forest transition-colors hover:text-gold-600"
          >
            View property <span aria-hidden>→</span>
          </Link>
          <span
            className="text-[0.6rem] uppercase tracking-[0.1em] text-muted/70"
            title="Photography note"
          >
            {stay.image_kind === "PROPERTY_PHOTO" ? "Property photo" : "Area photo"}
          </span>
        </div>
      </div>
    </article>
  );
}
