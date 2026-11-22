import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AccommodationCard, { TYPE_LABEL } from "@/components/stays/AccommodationCard";
import SmartImage from "@/components/common/SmartImage";
import type { Accommodation } from "@/lib/types";

const TILES: { type: Accommodation["type"]; blurb: string; image: string }[] = [
  { type: "HOTEL", blurb: "Comfortable rooms and reliable basics", image: "/images/dest-accra.jpg" },
  { type: "HOSTEL", blurb: "Budget beds and sociable common rooms", image: "/images/att-jamestown.jpg" },
  { type: "APARTMENT", blurb: "Your own kitchen and a slower pace", image: "/images/dest-ada-foah.jpg" },
];

export default function StayShowcase({ stays }: { stays: Accommodation[] }) {
  return (
    <section className="bg-cream-50 py-20 md:py-28">
      <div className="shell">
      <SectionHeading
        eyebrow="Sleep well, travel further"
        title="Find somewhere to stay."
        description="From comfortable hostels to welcoming apartments and hotels, find a place that suits your journey."
        action={
          <Link href="/stays" className="btn btn-outline btn-sm">
            Explore all stays
          </Link>
        }
      />

      <div className="mt-9 grid gap-3 sm:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.type}
            href={`/stays?type=${tile.type}`}
          className="group flex items-center gap-4 border border-line/80 bg-white/70 p-3 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-float"
          >
            <div className="relative h-[62px] w-[62px] shrink-0 overflow-hidden">
              <SmartImage src={tile.image} alt="" fill sizes="62px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div>
              <p className="font-display text-[1.1rem] leading-tight text-forest">{TYPE_LABEL[tile.type]}s</p>
              <p className="mt-0.5 text-[0.74rem] leading-snug text-muted">{tile.blurb}</p>
            </div>
            <span aria-hidden className="ml-auto text-forest/30 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stays.slice(0, 3).map((stay) => (
          <AccommodationCard key={stay.id} stay={stay} />
        ))}
      </div>

      <p className="mt-4 text-[0.72rem] leading-relaxed text-muted">
        TripNest does not take bookings or payments. Every listing links to the provider directly so you
        can confirm availability with them. Sample listings in this development build are labelled, and
        current prices are indicative only.
      </p>
      </div>
    </section>
  );
}
