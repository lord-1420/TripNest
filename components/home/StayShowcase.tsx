import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AccommodationCard, { TYPE_LABEL } from "@/components/stays/AccommodationCard";
import type { Accommodation } from "@/lib/types";

const TILES: { type: Accommodation["type"]; blurb: string }[] = [
  { type: "HOTEL", blurb: "Rooms & reliable basics" },
  { type: "HOSTEL", blurb: "Budget & social stays" },
  { type: "APARTMENT", blurb: "Kitchens & slower pace" },
];

export default function StayShowcase({ stays }: { stays: Accommodation[] }) {
  return (
    <section className="border-y border-line bg-cream-50 py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Places to stay"
          title="Stays across Ghana."
          description="Transparent indicative rates in cedis — from budget hostels to coastal apartments and city hotels."
          action={
            <Link
              href="/stays"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink transition hover:border-ink/30 hover:bg-sand"
            >
              Explore all stays <span aria-hidden>→</span>
            </Link>
          }
        />

        {/* Airbnb-style minimal filter pills */}
        <div className="mt-7 flex flex-wrap gap-2">
          {TILES.map((tile) => (
            <Link
              key={tile.type}
              href={`/stays?type=${tile.type}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.82rem] font-medium text-ink transition hover:border-ink/35 hover:bg-sand"
            >
              <span className="font-semibold">{TYPE_LABEL[tile.type]}s</span>
              <span className="text-muted">· {tile.blurb}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {stays.slice(0, 6).map((stay) => (
            <AccommodationCard key={stay.id} stay={stay} />
          ))}
        </div>

        <p className="mt-8 text-[0.75rem] leading-relaxed text-muted">
          TripNest does not take bookings or online payments — every listing links directly to the provider
          so you can confirm availability with them.
        </p>
      </div>
    </section>
  );
}
