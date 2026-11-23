import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import TripPlanningSteps from "@/components/home/TripPlanningSteps";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Plan a trip",
  description:
    "How TripNest turns discovery into an itinerary: save places, organise them by day and estimate accommodation, food, transport and activity costs in Ghana cedis.",
};
export const dynamic = "force-dynamic";

const FEATURES = [
  {
    title: "Save as you browse",
    body: "Destinations and experiences both have one-click saving so your shortlist stays in one clean place.",
  },
  {
    title: "Dated itineraries",
    body: "Set trip start and end dates, organise every day with stops, times, notes, and cost estimates.",
  },
  {
    title: "Budgets in cedis",
    body: "Category totals, per-stop estimates, and a live grand total in GHS that reconciles automatically.",
  },
  {
    title: "Real places only",
    body: "Every destination, experience and stay comes directly from our dataset — no invented ratings or clutter.",
  },
];

export default async function PlanPage() {
  const user = await getSession();
  const cta = user ? "/dashboard/trips/new" : "/sign-up";

  return (
    <>
      <PageHeader
        eyebrow="Trip Planner"
        title="Discover Ghana, then plan it cleanly."
        description="Turn the places that catch your eye into a real day-by-day itinerary with dates, stops, and a realistic budget in Ghana cedis."
      >
        <div className="flex flex-wrap gap-3">
          <Link href={cta} className="btn btn-primary">
            Start planning
          </Link>
          <Link href="/destinations" className="btn btn-outline">
            Browse destinations
          </Link>
        </div>
      </PageHeader>

      <TripPlanningSteps />

      <section className="border-y border-line bg-cream-50 py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">Built for clarity</p>
          <h2 className="mt-2 font-sans text-[clamp(1.65rem,2.8vw,2.3rem)] font-semibold tracking-[-0.03em] text-ink">
            Four things TripNest does properly
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-sans text-[1.08rem] font-semibold tracking-[-0.02em] text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Who it is for</p>
            <h2 className="mt-2 font-sans text-[1.5rem] font-semibold tracking-[-0.028em] text-ink">
              Built for first-time travellers
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.92rem] leading-relaxed text-muted">
              <li>Students and budget-conscious travellers planning weekend or holiday trips.</li>
              <li>First-time visitors who want practical regional details before committing.</li>
              <li>Solo travellers who want a structured plan without booking a tour group.</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Transparent by design</p>
            <h2 className="mt-2 font-sans text-[1.5rem] font-semibold tracking-[-0.028em] text-ink">
              No hidden fees, no invented reviews
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.92rem] leading-relaxed text-muted">
              <li>TripNest does not process reservations or take commissions on stays.</li>
              <li>We never invent ratings, reviews, or unverified opening hours.</li>
              <li>Enquiries go straight to local providers so you confirm directly.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 pt-4">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#0e1412] p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="font-sans text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
                Ready to build your itinerary?
              </h2>
              <p className="mt-2 max-w-lg text-[0.94rem] text-white/70">
                Create a free account, save a few places, and put together your trip in minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={cta} className="btn btn-gold">
                Start planning
              </Link>
              <Link href="/explore" className="btn btn-ghost-light">
                Open 3D map
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
