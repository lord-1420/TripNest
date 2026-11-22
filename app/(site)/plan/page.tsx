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
    body: "Destinations and experiences both have a save action. Nothing is duplicated — saving twice is just saving.",
  },
  {
    title: "Dated itineraries",
    body: "Trips have start and end dates. Every day gets its own section, with start times, notes and per-stop cost estimates.",
  },
  {
    title: "Budgets that add up",
    body: "Category totals, itinerary estimates and a grand total in cedis — rounded to two decimals so the numbers reconcile.",
  },
  {
    title: "Real places only",
    body: "Every destination, experience and stay in TripNest comes from the database. No invented reviews, ratings or availability.",
  },
];

export default async function PlanPage() {
  const user = await getSession();
  const cta = user ? "/dashboard/trips/new" : "/sign-up";

  return (
    <>
      <PageHeader
        eyebrow="Trip planning"
        title={
          <>
            Discover Ghana.
            <span className="block italic text-forest-500">Then actually plan it.</span>
          </>
        }
        description="TripNest is built around one idea: the places that catch your eye should become a plan you can follow — with dates, stops and a budget you can check."
      >
        <div className="flex flex-wrap gap-3">
          <Link href={cta} className="btn btn-primary">Start Planning Your Trip</Link>
          <Link href="/destinations" className="btn btn-outline">Explore destinations</Link>
        </div>
      </PageHeader>

      <TripPlanningSteps />

      <section className="border-t border-line bg-sand py-16 md:py-20">
        <div className="shell">
          <p className="eyebrow eyebrow-forest">What makes it work</p>
          <h2 className="mt-2 display text-display-md">Four things TripNest does properly</h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white p-6">
                <h3 className="font-display text-[1.3rem] text-forest">{f.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-forest">Who it is for</p>
            <h2 className="mt-2 display text-display-md">Built for first-time travellers</h2>
            <ul className="mt-5 space-y-3 text-[0.94rem] leading-relaxed text-ink/80">
              <li>· Students and budget-conscious travellers planning around long weekends.</li>
              <li>· First-time visitors who want the practical detail before they commit.</li>
              <li>· Solo travellers who want a clear plan without a tour group.</li>
              <li>· Anyone exploring Ghana who wants to understand a place, not just book it.</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow eyebrow-forest">What we do not do</p>
            <h2 className="mt-2 display text-display-md">No bookings, no invented reviews</h2>
            <ul className="mt-5 space-y-3 text-[0.94rem] leading-relaxed text-ink/80">
              <li>· TripNest does not take reservations or payments for accommodation.</li>
              <li>· We do not publish ratings, availability or opening hours we cannot verify.</li>
              <li>· We do not publish fares or journey times as fact — ask locally, then plan around it.</li>
              <li>· An enquiry with a provider is not a confirmed booking.</li>
            </ul>
            <p className="mt-5 text-[0.76rem] leading-relaxed text-muted">
              Read more about how content is handled on the{" "}
              <Link href="/about" className="underline decoration-line underline-offset-2 hover:text-forest">about page</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-forest py-16 text-cream">
        <div className="shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display text-display-md text-cream">Ready to build the plan?</h2>
            <p className="mt-2 max-w-lg text-[0.94rem] text-cream/70">
              Create a free account, save a few places and start a trip. You can add costs as you go.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={cta} className="btn btn-gold">Start planning</Link>
            <Link href="/experiences?hidden=1" className="btn btn-ghost-light">See hidden gems</Link>
          </div>
        </div>
      </section>
    </>
  );
}
