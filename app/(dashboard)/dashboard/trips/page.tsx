import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import { requireUser } from "@/lib/auth";
import { listTrips, tripItinerary } from "@/lib/queries";
import { cedis, dateRange, formatDate, nights, pluralise } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "My trips" };

export default async function TripsPage() {
  const user = await requireUser("/dashboard/trips");
  const trips = listTrips(user.id);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow eyebrow-forest">Trip planner</p>
          <h1 className="mt-2 display text-[clamp(1.9rem,3vw,2.6rem)] text-forest">My trips</h1>
          <p className="mt-2 text-[0.92rem] text-muted">
            {trips.length} {pluralise(trips.length, "trip")} · dated itineraries with estimates in cedis.
          </p>
        </div>
        <Link href="/dashboard/trips/new" className="btn btn-primary btn-sm">Plan a new trip</Link>
      </header>

      <div className="mt-8">
        {trips.length === 0 ? (
          <EmptyState
            title="No trips yet"
            description="Create a trip with dates and a destination, then add stops day by day."
            action={<Link href="/dashboard/trips/new" className="btn btn-primary btn-sm">Create a trip</Link>}
          />
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {trips.map((trip) => {
              const entries = tripItinerary(trip.id);
              const upcoming = trip.start_date ? trip.start_date >= today : false;
              return (
                <li key={trip.id} className="flex flex-col border border-line bg-white">
                  <Link href={`/dashboard/trips/${trip.id}`} className="relative block aspect-[16/9] overflow-hidden bg-forest">
                    {trip.destination_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={trip.destination_image} alt="" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                    ) : (
                      <span className="absolute inset-0 bg-gradient-to-br from-forest to-forest-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/90 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[0.6rem] uppercase tracking-[0.16em] text-cream/70">
                        {trip.destination_name ?? "Multiple destinations"}
                      </p>
                      <h2 className="font-display text-[1.3rem] leading-tight text-cream">{trip.name}</h2>
                    </div>
                    <span className="absolute right-3 top-3 rounded-full bg-cream/95 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-forest">
                      {upcoming ? "Upcoming" : trip.start_date ? "Past" : "No dates"}
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <dl className="grid grid-cols-2 gap-3 text-[0.78rem]">
                      <div>
                        <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">Dates</dt>
                        <dd className="mt-0.5 font-medium text-forest">{dateRange(trip.start_date, trip.end_date)}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">Night count</dt>
                        <dd className="mt-0.5 font-medium text-forest">
                          {trip.start_date && trip.end_date ? `${nights(trip.start_date, trip.end_date)} nights` : "—"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">Itinerary</dt>
                        <dd className="mt-0.5 font-medium text-forest">{entries.length} stops</dd>
                      </div>
                      <div>
                        <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">Estimated</dt>
                        <dd className="mt-0.5 font-medium text-forest">
                          {cedis(trip.budget_total ?? 0)}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <Link href={`/dashboard/trips/${trip.id}`} className="text-[0.78rem] font-semibold text-forest hover:text-gold-600">
                        Open itinerary →
                      </Link>
                      <span className="text-[0.7rem] text-muted">
                        {trip.travellers} {pluralise(trip.travellers, "traveller")}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.68rem] text-muted/70">Created {formatDate((trip.created_at ?? "").slice(0, 10) || null)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
