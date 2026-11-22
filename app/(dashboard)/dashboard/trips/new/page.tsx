import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createTripAction } from "@/lib/actions/trips";
import { listDestinations, listAttractions } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Plan a new trip" };

export default async function NewTripPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; error?: string }>;
}) {
  await requireUser("/dashboard/trips/new");
  const { destination, error } = await searchParams;
  const destinations = listDestinations({ perPage: 50, sort: "az" }).items;
  const selected = destination ? destinations.find((d) => d.slug === destination) : undefined;
  const suggestions = selected ? listAttractions({ destinationId: selected.id, perPage: 6 }).items : [];

  return (
    <div className="max-w-3xl">
      <header>
        <p className="eyebrow eyebrow-forest">Trip planner</p>
        <h1 className="mt-2 display text-[clamp(1.9rem,3vw,2.6rem)] text-forest">Plan a new trip</h1>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
          Give it a name and dates. You can add stops, notes and costs once the trip exists.
        </p>
      </header>

      {error && (
        <p role="alert" className="mt-5 border border-[#F0CFC7] bg-[#FBEAE6] px-3 py-2 text-[0.82rem] text-[#8C3524]">
          {decodeURIComponent(error)}
        </p>
      )}

      <form action={createTripAction} className="mt-7 border border-line bg-white p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="field-label">Trip name</span>
            <input
              name="name"
              required
              defaultValue={selected ? `${selected.name} trip` : ""}
              placeholder="Coast & Castles"
              className="field"
            />
          </label>
          <label>
            <span className="field-label">Destination</span>
            <select name="destinationId" defaultValue={selected?.id ?? ""} className="field">
              <option value="">Multiple destinations / not sure yet</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.region}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="field-label">Travellers</span>
            <input type="number" name="travellers" min={1} max={20} defaultValue={1} className="field" />
          </label>
          <label>
            <span className="field-label">Start date</span>
            <input type="date" name="startDate" className="field" />
          </label>
          <label>
            <span className="field-label">End date</span>
            <input type="date" name="endDate" className="field" />
          </label>
          <label className="sm:col-span-2">
            <span className="field-label">Notes (optional)</span>
            <textarea name="notes" rows={3} className="field" placeholder="What matters most on this trip?" />
          </label>
        </div>

        {suggestions.length > 0 && (
          <fieldset className="mt-5 border-t border-line pt-4">
            <legend className="field-label">Start with an experience (optional)</legend>
            <p className="mb-2 text-[0.76rem] text-muted">
              We will add it to day one of your itinerary so the plan is never empty.
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((a) => (
                <label
                  key={a.id}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[0.78rem] text-forest has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-cream"
                >
                  <input type="radio" name="suggestedAttractionId" value={a.id} className="sr-only" />
                  {a.name}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" className="btn btn-primary">Create trip</button>
          <Link href="/dashboard/trips" className="btn btn-outline">Cancel</Link>
        </div>
        <p className="mt-3 text-[0.72rem] text-muted">
          Dates are optional — but they make the day-by-day itinerary much more useful.
        </p>
      </form>
    </div>
  );
}
