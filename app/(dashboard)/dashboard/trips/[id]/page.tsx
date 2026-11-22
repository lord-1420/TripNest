import Link from "next/link";
import { notFound } from "next/navigation";
import ItineraryTimeline from "@/components/planning/ItineraryTimeline";
import BudgetOverview from "@/components/planning/BudgetOverview";
import { deleteTripAction, updateTripAction } from "@/lib/actions/trips";
import { requireUser } from "@/lib/auth";
import { getTrip, tripItinerary, tripBudget, listDestinations, listAttractions } from "@/lib/queries";
import { dateRange, nights, pluralise } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Itinerary" };

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tripId = Number(id);
  const user = await requireUser(`/dashboard/trips/${id}`);
  const trip = getTrip(tripId, user.id);
  if (!trip) notFound();

  const entries = tripItinerary(trip.id);
  const budget = tripBudget(trip.id);
  const destinations = listDestinations({ perPage: 50, sort: "az" }).items;
  const attractions = listAttractions({ perPage: 60 }).items.map((a) => ({ id: a.id, name: a.name }));
  const itineraryTotal = entries.reduce((s, e) => s + (e.estimated_cost ?? 0), 0);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="text-[0.74rem] text-muted">
        <Link href="/dashboard/trips" className="hover:text-forest">My trips</Link>
        <span aria-hidden className="mx-1.5">/</span>
        <span className="text-forest">{trip.name}</span>
      </nav>

      <header className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow eyebrow-forest">
            {trip.destination_name ?? "Multi-destination trip"} · {trip.travellers}{" "}
            {pluralise(trip.travellers, "traveller")}
          </p>
          <h1 className="mt-2 display text-[clamp(1.9rem,3.2vw,2.7rem)] text-forest">{trip.name}</h1>
          <p className="mt-2 text-[0.9rem] text-muted">
            {dateRange(trip.start_date, trip.end_date)}
            {trip.start_date && trip.end_date ? ` · ${nights(trip.start_date, trip.end_date)} nights` : ""}
            {trip.destination_slug ? (
              <>
                {" · "}
                <Link href={`/destinations/${trip.destination_slug}`} className="underline decoration-line underline-offset-2 hover:text-forest">
                  View destination guide
                </Link>
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <details className="relative">
            <summary className="btn btn-outline btn-sm list-none cursor-pointer">Edit trip</summary>
            <div className="absolute right-0 z-30 mt-2 w-[min(90vw,26rem)] border border-line bg-white p-4 shadow-float">
              <form action={updateTripAction} className="grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="tripId" value={trip.id} />
                <label className="sm:col-span-2">
                  <span className="field-label">Trip name</span>
                  <input name="name" defaultValue={trip.name} className="field" required />
                </label>
                <label className="sm:col-span-2">
                  <span className="field-label">Destination</span>
                  <select name="destinationId" defaultValue={trip.destination_id ?? ""} className="field">
                    <option value="">Multiple destinations</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} — {d.region}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="field-label">Start</span>
                  <input type="date" name="startDate" defaultValue={trip.start_date ?? ""} className="field" />
                </label>
                <label>
                  <span className="field-label">End</span>
                  <input type="date" name="endDate" defaultValue={trip.end_date ?? ""} className="field" />
                </label>
                <label>
                  <span className="field-label">Travellers</span>
                  <input type="number" min={1} max={20} name="travellers" defaultValue={trip.travellers} className="field" />
                </label>
                <label className="sm:col-span-2">
                  <span className="field-label">Notes</span>
                  <textarea name="notes" rows={3} defaultValue={trip.notes ?? ""} className="field" />
                </label>
                <button type="submit" className="btn btn-primary btn-sm sm:col-span-2">Save changes</button>
              </form>
              <form action={deleteTripAction} className="mt-3 border-t border-line pt-3">
                <input type="hidden" name="tripId" value={trip.id} />
                <button type="submit" className="text-[0.74rem] font-semibold text-[#8C3524] underline underline-offset-2">
                  Delete this trip
                </button>
              </form>
            </div>
          </details>
          <Link href="/dashboard/trips/new" className="btn btn-outline btn-sm">New trip</Link>
        </div>
      </header>

      {trip.notes && (
        <p className="mt-5 max-w-2xl border-l-2 border-gold/60 pl-4 text-[0.9rem] leading-relaxed text-ink/80">
          {trip.notes}
        </p>
      )}

      <div className="mt-7 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <ItineraryTimeline trip={trip} entries={entries} attractions={attractions} />
        <div className="space-y-6">
          <BudgetOverview
            tripId={trip.id}
            entries={budget}
            itineraryTotal={itineraryTotal}
            itineraryCount={entries.length}
            travellers={trip.travellers}
          />
          <div className="border border-line bg-cream-50 p-5">
            <h2 className="font-display text-xl text-forest">Keep planning</h2>
            <div className="mt-3 space-y-2">
              <Link href="/experiences" className="btn btn-outline btn-sm w-full">Find more experiences</Link>
              <Link href="/stays" className="btn btn-outline btn-sm w-full">Look for a stay</Link>
              {trip.destination_slug && (
                <Link href={`/destinations/${trip.destination_slug}`} className="btn btn-outline btn-sm w-full">
                  Read the destination guide
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
