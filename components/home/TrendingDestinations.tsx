import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationEditorialCard from "@/components/destinations/DestinationEditorialCard";
import Reveal from "@/components/ui/Reveal";
import type { Destination } from "@/lib/types";

export default function TrendingDestinations({ destinations }: { destinations: Destination[] }) {
  const [feature, second, third, ...rest] = destinations;
  if (!feature) return null;

  return (
    <section id="trending" className="relative overflow-hidden bg-cream-50 py-20 md:py-32">
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-gold-100/20 blur-3xl" />
      <div className="shell relative">
      <SectionHeading
        eyebrow="Explore Ghana"
        title="Where will you go next?"
        description="Discover places worth experiencing across Ghana — from Atlantic forts and rainforest canopies to crater lakes and northern savannah."
        action={
          <Link href="/destinations" className="link-underline text-sm">
            All destinations <span aria-hidden>→</span>
          </Link>
        }
      />

      <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-12 md:gap-4">
        <Reveal className="md:col-span-7 min-h-0">
          <DestinationEditorialCard destination={feature} variant="feature" priority />
        </Reveal>
        <div className="grid gap-3 md:col-span-5 md:grid-rows-2 md:gap-4">
          {second && (
            <Reveal delay={80} className="h-full min-h-0">
              <DestinationEditorialCard destination={second} variant="wide" fillHeight className="h-full" />
            </Reveal>
          )}
          {third && (
            <Reveal delay={160} className="h-full min-h-0">
              <DestinationEditorialCard destination={third} variant="wide" fillHeight className="h-full" />
            </Reveal>
          )}
        </div>
        {rest.slice(0, 3).map((destination, i) => (
          <Reveal key={destination.id} delay={i * 80} className="md:col-span-4">
            <DestinationEditorialCard destination={destination} variant="compact" />
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
