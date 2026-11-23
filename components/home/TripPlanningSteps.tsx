import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

const STEPS = [
  { n: "01", title: "Discover", body: "Explore destinations, hidden gems and experiences across Ghana." },
  { n: "02", title: "Save", body: "Keep the places that appeal to you in one clean list." },
  { n: "03", title: "Organise", body: "Build a dated day-by-day itinerary with stops and notes." },
  { n: "04", title: "Budget", body: "Estimate accommodation, food, transport and activities in cedis." },
];

export default function TripPlanningSteps() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">From idea to itinerary</p>
            <h2 className="mt-2.5 font-sans text-[clamp(1.85rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink">
              Plan your journey,
              <span className="block text-muted">not just a wish list.</span>
            </h2>
            <p className="mt-4 max-w-md text-[0.96rem] leading-relaxed text-muted">
              Turn the places you save into a clear day-by-day plan with a live budget breakdown in Ghana
              cedis.
            </p>

            <ol className="mt-8 divide-y divide-line border-y border-line">
              {STEPS.map((step) => (
                <li key={step.n} className="grid grid-cols-[2.2rem_1fr] items-baseline gap-3 py-4">
                  <span className="font-mono text-[0.76rem] font-semibold text-muted">{step.n}</span>
                  <div>
                    <h3 className="font-sans text-[1rem] font-semibold text-ink">{step.title}</h3>
                    <p className="mt-0.5 text-[0.86rem] leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard/trips/new" className="btn btn-primary">
                Start planning
              </Link>
              <Link href="/plan" className="btn btn-outline">
                How it works
              </Link>
            </div>
          </div>

          {/* Minimal Gumloop-style interface preview */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-float">
              <div className="flex items-center justify-between border-b border-line bg-cream-50 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <LogoMark size={18} />
                  <span className="text-[0.8rem] font-semibold text-ink">Coast &amp; Castles</span>
                </div>
                <span className="font-mono text-[0.7rem] text-muted">3 nights · 2 travellers</span>
              </div>

              <div className="px-5 py-3">
                {[
                  { day: "Sat 12 Dec", time: "15:00", title: "Arrive, walk the old town", cost: "GH₵ 60" },
                  { day: "Sun 13 Dec", time: "08:30", title: "Cape Coast Castle tour", cost: "GH₵ 120" },
                  { day: "Sun 13 Dec", time: "14:00", title: "Elmina harbour, golden hour", cost: "GH₵ 180" },
                  { day: "Mon 14 Dec", time: "07:00", title: "Kakum canopy walkway", cost: "GH₵ 150" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3.5 border-b border-line/70 py-3.5 last:border-0">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-forest" />
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.66rem] uppercase text-muted">
                        {row.day} · {row.time}
                      </p>
                      <p className="mt-0.5 text-[0.9rem] font-medium text-ink">{row.title}</p>
                    </div>
                    <span className="font-mono text-[0.8rem] font-semibold text-ink">{row.cost}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-line bg-cream-50 px-5 py-4">
                <div className="flex items-center justify-between text-[0.76rem]">
                  <span className="font-medium text-muted">Estimated total</span>
                  <span className="font-mono text-[0.9rem] font-semibold text-ink">GH₵ 2,650</span>
                </div>
                <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-line">
                  <span className="h-full bg-ink" style={{ width: "38%" }} />
                  <span className="h-full bg-forest-500" style={{ width: "23%" }} />
                  <span className="h-full bg-gold" style={{ width: "13%" }} />
                  <span className="h-full bg-[#9CA3AF]" style={{ width: "18%" }} />
                  <span className="h-full bg-[#D1D5DB]" style={{ width: "8%" }} />
                </div>
                <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.65rem] text-muted">
                  <span>Stay 38%</span>
                  <span>Food 23%</span>
                  <span>Activities 13%</span>
                  <span>Transport 18%</span>
                  <span>Other 8%</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[0.68rem] text-muted">
              Sample itinerary built with TripNest Planner
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
