import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

const STEPS = [
  { n: "01", title: "Discover", body: "Explore destinations, hidden gems and experiences across all ten regions of Ghana." },
  { n: "02", title: "Save", body: "Keep the places that appeal to you in one list, ready for when you start planning." },
  { n: "03", title: "Organise", body: "Add destinations and attractions to a dated itinerary, day by day, with notes." },
  { n: "04", title: "Budget", body: "Estimate accommodation, food, transport and activities in cedis before you go." },
];

export default function TripPlanningSteps() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full border border-forest/[0.06]" />
      <div className="shell relative">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <p className="eyebrow eyebrow-forest">From idea to itinerary</p>
          <h2 className="mt-3 display text-display-lg text-forest">
            Plan your journey,
            <span className="block italic text-forest-500">not just your wish list.</span>
          </h2>
          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
            Discovery is only half of it. TripNest turns the places you like into a dated plan with stops,
            notes and a budget you can actually check against your bank balance.
          </p>

          <ol className="mt-9 space-y-0 border-t border-line">
            {STEPS.map((step) => (
              <li key={step.n} className="grid grid-cols-[auto_1fr] gap-4 border-b border-line py-5">
                <span className="font-display text-[1.05rem] text-gold-600">{step.n}</span>
                <div>
                  <h3 className="font-display text-[1.32rem] leading-none text-forest">{step.title}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard/trips/new" className="btn btn-primary">
              Start Planning Your Trip
            </Link>
            <Link href="/plan" className="btn btn-outline">
              How TripNest works
            </Link>
          </div>
        </div>

        {/* Interface preview */}
        <div className="relative">
          <div className="absolute -inset-x-4 -inset-y-6 -z-10 bg-gradient-to-br from-cream-200/70 to-transparent" />
          <div className="border border-line/80 bg-white shadow-[0_35px_90px_-46px_rgba(23,63,53,.5)] transition-transform duration-700 ease-editorial hover:-translate-y-1">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-2">
                <LogoMark size={18} />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-forest">
                  Coast &amp; Castles
                </span>
              </div>
              <span className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">3 nights · 2 people</span>
            </div>

            <div className="px-5 py-4">
              {[
                { day: "Sat 12 Dec", time: "15:00", title: "Arrive, walk the old town", cost: "GH₵ 60" },
                { day: "Sun 13 Dec", time: "08:30", title: "Cape Coast Castle tour", cost: "GH₵ 120" },
                { day: "Sun 13 Dec", time: "14:00", title: "Elmina harbour, golden hour", cost: "GH₵ 180" },
                { day: "Mon 14 Dec", time: "07:00", title: "Kakum canopy walkway", cost: "GH₵ 150" },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-line/70 py-3 last:border-0">
                  <div className="mt-1 flex flex-col items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {i < 3 && <span className="mt-1 h-full w-px flex-1 bg-line" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                      {row.day} · {row.time}
                    </p>
                    <p className="mt-0.5 text-[0.88rem] font-medium text-forest">{row.title}</p>
                  </div>
                  <span className="text-[0.78rem] font-semibold text-forest/70">{row.cost}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-line bg-cream-50 px-5 py-4">
              <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                <span>Budget estimate</span>
                <span className="font-semibold text-forest">GH₵ 2,650</span>
              </div>
              <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-cream-200">
                <span className="h-full bg-forest" style={{ width: "38%" }} />
                <span className="h-full bg-forest-400" style={{ width: "23%" }} />
                <span className="h-full bg-gold" style={{ width: "13%" }} />
                <span className="h-full bg-[#8A9B8E]" style={{ width: "18%" }} />
                <span className="h-full bg-[#D8D3C4]" style={{ width: "8%" }} />
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[0.64rem] text-muted">
                <span>Accommodation 38%</span>
                <span>Food 23%</span>
                <span>Activities 13%</span>
                <span>Transport 18%</span>
                <span>Other 8%</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-[0.68rem] uppercase tracking-[0.14em] text-muted/70">
            Example itinerary from the TripNest planner
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
