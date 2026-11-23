import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/common/SmartImage";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import type { Attraction } from "@/lib/types";

export default function ExperiencesShowcase({ attractions }: { attractions: Attraction[] }) {
  const [lead, ...rest] = attractions;
  if (!lead) return null;

  return (
    <section className="border-b border-line bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Things to do"
          title="Experiences worth saving"
          description="Heritage tours, canopy walks, waterfalls, wildlife sanctuaries and long beach afternoons."
          action={
            <Link
              href="/experiences"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.82rem] font-semibold text-ink transition hover:border-ink/30 hover:bg-cream-50"
            >
              All experiences <span aria-hidden>→</span>
            </Link>
          }
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="group lg:col-span-6">
            <Link href={`/experiences/${lead.slug}`} className="block">
              <div className="media media-zoom aspect-[4/3] rounded-2xl bg-sand">
                <SmartImage
                  src={lead.image}
                  alt={lead.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[0.68rem] font-semibold text-ink backdrop-blur-md">
                  {lead.categories?.[0] ?? "Experience"}
                </span>
              </div>
              <h3 className="mt-4 font-sans text-[clamp(1.35rem,2vw,1.75rem)] font-semibold tracking-[-0.025em] text-ink group-hover:text-forest">
                {lead.name}
              </h3>
              <p className="mt-1.5 max-w-lg text-[0.9rem] leading-relaxed text-muted">{lead.summary}</p>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-wider text-muted/80">
                {lead.region}
                {lead.destination_name ? ` · ${lead.destination_name}` : ""}
              </p>
            </Link>
          </article>

          <div className="lg:col-span-6">
            <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {rest.slice(0, 4).map((a) => (
                <ExperienceCard key={a.id} attraction={a} variant="row" className="border-b border-line" />
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-line bg-cream-50 p-6">
              <p className="eyebrow">Save as you browse</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                Signed-in travellers can bookmark attractions and destinations, then drop them straight into
                a dated itinerary with a running budget.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/sign-up" className="btn btn-primary btn-sm">
                  Create free account
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
