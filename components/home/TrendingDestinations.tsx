import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationEditorialCard from "@/components/destinations/DestinationEditorialCard";
import Reveal from "@/components/ui/Reveal";
import type { Destination } from "@/lib/types";

export default function TrendingDestinations({ destinations }: { destinations: Destination[] }) {
  const [feature, second, third, ...rest] = destinations;
  if (!feature) return null;

  return (
    <section id="trending" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured Destinations"
          title="Where will you go next?"
          description="From Atlantic forts and rainforest canopies to crater lakes and northern savannah."
          action={
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.82rem] font-semibold text-ink transition hover:border-ink/30 hover:bg-cream-50"
            >
              All destinations <span aria-hidden>→</span>
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <Reveal className="min-h-0 md:col-span-7">
            <DestinationEditorialCard destination={feature} variant="feature" priority />
          </Reveal>
          <div className="grid gap-4 md:col-span-5 md:grid-rows-2">
            {second && (
              <Reveal delay={60} className="h-full min-h-0">
                <DestinationEditorialCard destination={second} variant="wide" fillHeight className="h-full" />
              </Reveal>
            )}
            {third && (
              <Reveal delay={120} className="h-full min-h-0">
                <DestinationEditorialCard destination={third} variant="wide" fillHeight className="h-full" />
              </Reveal>
            )}
          </div>
          {rest.slice(0, 3).map((destination, i) => (
            <Reveal key={destination.id} delay={i * 60} className="md:col-span-4">
              <DestinationEditorialCard destination={destination} variant="compact" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
