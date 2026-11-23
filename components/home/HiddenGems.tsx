import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import type { Attraction } from "@/lib/types";

export default function HiddenGems({ gems }: { gems: Attraction[] }) {
  const [lead, ...others] = gems;
  if (!lead) return null;

  return (
    <section className="bg-[#0e1412] py-20 text-white md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-light">Off the usual trail</p>
            <h2 className="mt-2.5 font-sans text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.032em] text-white">
              Hidden gems in Ghana
            </h2>
            <p className="mt-3 max-w-xl text-[0.96rem] leading-relaxed text-white/65">
              Stilt villages, hill shrines, forest sanctuaries and quiet corners beyond the standard itinerary.
            </p>
          </div>
          <Link
            href="/experiences?hidden=1"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-[0.82rem] font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            All hidden gems <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="lg:col-span-7">
            <Link href={`/experiences/${lead.slug}`} className="group block">
              <div className="media media-zoom aspect-[16/10] rounded-2xl bg-white/5">
                <SmartImage
                  src={lead.image}
                  alt={`${lead.name}, ${lead.region}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  fallbackTone="light"
                  className="object-cover"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-white/55">
                <span className="text-gold-100">{lead.region}</span>
                <span aria-hidden>·</span>
                <span>{lead.destination_name ?? lead.nearest_town}</span>
              </div>
              <h3 className="mt-2 font-sans text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold tracking-[-0.03em] text-white transition-colors group-hover:text-gold-100">
                {lead.name}
              </h3>
              <p className="mt-2.5 max-w-xl text-[0.92rem] leading-relaxed text-white/70">
                {lead.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-white">
                Explore place <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </article>

          <div className="lg:col-span-5">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {others.slice(0, 4).map((gem) => (
                <li key={gem.id}>
                  <Link href={`/experiences/${gem.slug}`} className="group flex items-center gap-4 py-4">
                    <div className="relative h-[68px] w-[86px] shrink-0 overflow-hidden rounded-xl bg-white/5">
                      <SmartImage
                        src={gem.image}
                        alt={gem.name}
                        fill
                        sizes="86px"
                        fallbackTone="light"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.65rem] uppercase tracking-wider text-gold-100/80">
                        {gem.region}
                      </p>
                      <h4 className="mt-0.5 font-sans text-[1rem] font-semibold leading-snug tracking-[-0.015em] text-white group-hover:text-gold-100">
                        {gem.name}
                      </h4>
                      <p className="mt-0.5 line-clamp-1 text-[0.78rem] text-white/55">
                        {gem.destination_name ?? gem.nearest_town}
                      </p>
                    </div>
                    <span aria-hidden className="ml-auto text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
