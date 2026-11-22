import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import type { Attraction } from "@/lib/types";

export default function HiddenGems({ gems }: { gems: Attraction[] }) {
  const [lead, ...others] = gems;
  if (!lead) return null;

  return (
    <section className="relative overflow-hidden bg-forest py-24 text-cream md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(201,154,69,0.5) 0, transparent 42%), radial-gradient(circle at 82% 78%, rgba(201,154,69,0.35) 0, transparent 45%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -left-28 top-1/4 h-96 w-96 rounded-full border border-gold-100/10" />
      <div className="shell relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-light">Beyond the usual trail</p>
            <h2 className="mt-3 display text-display-lg text-cream">Hidden gems in Ghana</h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cream/70">
              Discover remarkable places beyond the usual tourist trail — stilt villages, hill shrines,
              forest sanctuaries and the far corners of the country.
            </p>
          </div>
          <Link href="/experiences?hidden=1" className="link-underline shrink-0 text-sm text-cream">
            All hidden gems <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="lg:col-span-7">
            <Link href={`/experiences/${lead.slug}`} className="group block">
              <div className="media media-zoom aspect-[16/10] shadow-[0_32px_80px_-36px_rgba(0,0,0,.8)]">
                <SmartImage
                  src={lead.image}
                  alt={`${lead.name}, ${lead.region}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  fallbackTone="light"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-cream/[0.55]">
                <span className="text-gold-100">{lead.region}</span>
                <span aria-hidden>·</span>
                <span>{lead.destination_name ?? lead.nearest_town}</span>
              </div>
              <h3 className="mt-2.5 display text-[clamp(1.8rem,3vw,2.6rem)] text-cream transition-colors group-hover:text-gold-100">
                {lead.name}
              </h3>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-cream/[0.72]">
                {lead.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-gold-100">
                Read the story
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </article>

          <div className="lg:col-span-5">
            <ul className="divide-y divide-cream/[0.12] border-y border-cream/[0.12]">
              {others.slice(0, 4).map((gem) => (
                <li key={gem.id}>
                  <Link href={`/experiences/${gem.slug}`} className="group flex items-center gap-4 py-4">
                    <div className="relative h-[74px] w-[92px] shrink-0 overflow-hidden">
                      <SmartImage
                        src={gem.image}
                        alt={gem.name}
                        fill
                        sizes="92px"
                        fallbackTone="light"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-100/80">
                        {gem.region}
                      </p>
                      <h4 className="mt-1 font-display text-[1.15rem] leading-tight text-cream group-hover:text-gold-100">
                        {gem.name}
                      </h4>
                      <p className="mt-1 line-clamp-1 text-[0.78rem] text-cream/[0.55]">
                        {gem.destination_name ?? gem.nearest_town}
                      </p>
                    </div>
                    <span aria-hidden className="ml-auto text-cream/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.72rem] leading-relaxed text-cream/[0.45]">
              Featured hidden gems are selected by TripNest editors from published attractions. Every place
              listed here is a real, publicly accessible site — descriptions come from our attraction
              records, not guesswork.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
