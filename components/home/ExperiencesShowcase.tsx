import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/common/SmartImage";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import type { Attraction } from "@/lib/types";

export default function ExperiencesShowcase({ attractions }: { attractions: Attraction[] }) {
  const [lead, ...rest] = attractions;
  if (!lead) return null;

  return (
    <section className="border-y border-line bg-white py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Things worth doing"
          title="Experiences worth discovering"
          description="Heritage tours, canopy walks, waterfalls, wildlife sanctuaries and long beach afternoons — save the ones you want to remember."
          action={
            <Link href="/experiences" className="link-underline text-sm">
              All experiences <span aria-hidden>→</span>
            </Link>
          }
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="group lg:col-span-6">
            <Link href={`/experiences/${lead.slug}`} className="block">
              <div className="media media-zoom aspect-[4/3] shadow-[0_28px_70px_-38px_rgba(23,63,53,.65)]">
                <SmartImage
                  src={lead.image}
                  alt={lead.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.045]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-cream/[0.92] px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-forest">
                  {lead.categories?.[0] ?? "Experience"}
                </span>
              </div>
              <h3 className="mt-5 display text-[clamp(1.6rem,2.4vw,2.15rem)] text-forest group-hover:text-forest-500">
                {lead.name}
              </h3>
              <p className="mt-2 max-w-lg text-[0.92rem] leading-relaxed text-muted">{lead.summary}</p>
              <p className="mt-3 text-[0.72rem] uppercase tracking-[0.16em] text-muted/80">
                {lead.region}
                {lead.destination_name ? ` · ${lead.destination_name}` : ""}
              </p>
            </Link>
          </article>

          <div className="lg:col-span-6">
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {rest.slice(0, 4).map((a) => (
                <ExperienceCard key={a.id} attraction={a} variant="row" className="border-b border-line" />
              ))}
            </div>
            <div className="mt-6 border border-line bg-white p-5">
              <p className="eyebrow eyebrow-forest">Save as you browse</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                Signed-in travellers can save attractions and destinations, then drop them straight into a
                trip itinerary with an estimated cost.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/sign-up" className="btn btn-primary btn-sm">
                  Create a free account
                </Link>
                <Link href="/dashboard/saved" className="btn btn-outline btn-sm">
                  View saved places
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
