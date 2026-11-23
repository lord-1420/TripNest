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
 * Airbnb-inspired photo-first stay card — rounded photography, clean type pill,
 * crisp title, location, and monospaced price per night.
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
  const location = [stay.area ?? stay.destination_name, stay.region]
    .filter((v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i)
    .join(", ");

  return (
    <article className={clsx("group flex h-full flex-col", className)}>
      <Link href={`/stays/${stay.slug}`} className="block">
        <div
          className={clsx(
            "media media-zoom rounded-2xl bg-sand",
            compact ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        >
          <SmartImage
            src={stay.image}
            alt={`${stay.name} — ${stay.area ?? stay.destination_name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute left-3 top-3 flex items-center gap-1.5">
            <span className="rounded-full bg-white/92 px-2.5 py-1 text-[0.68rem] font-semibold text-ink backdrop-blur-md">
              {TYPE_LABEL[stay.type]}
            </span>
          </div>
          {stay.image_kind !== "PROPERTY_PHOTO" && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[0.62rem] font-medium text-white/90 backdrop-blur-sm">
              Area photo
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans text-[1.02rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
            <Link href={`/stays/${stay.slug}`} className="transition-colors hover:text-forest">
              {stay.name}
            </Link>
          </h3>
          <span className="shrink-0 font-mono text-[0.84rem] font-semibold text-ink">
            {cedis(stay.price_per_night)}
            <span className="font-sans text-[0.72rem] font-normal text-muted"> / night</span>
          </span>
        </div>

        <p className="mt-0.5 text-[0.82rem] text-muted">{location}</p>

        {!compact && stay.amenities && stay.amenities.length > 0 && (
          <p className="mt-1.5 line-clamp-1 text-[0.76rem] text-muted/85">
            {stay.amenities.slice(0, 3).join(" · ")}
            {stay.amenities.length > 3 ? ` · +${stay.amenities.length - 3}` : ""}
          </p>
        )}
      </div>
    </article>
  );
}
