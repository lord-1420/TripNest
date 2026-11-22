import Link from "next/link";
import { redirect } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import { requireUser } from "@/lib/auth";
import { listTrips, savedDestinations, savedAttractions, savedCounts, tripBudget, tripItinerary } from "@/lib/queries";
import { cedis, dateRange, formatDate, nights, pluralise } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function TravellerDashboard() {
  const user = await requireUser("/dashboard");
  if (user.role === "ADMIN") redirect("/dashboard/admin");
  if (user.role === "PROVIDER") redirect("/dashboard/provider");

  const trips = listTrips(user.id);
  const savedDest = savedDestinations(user.id);
  const savedAttr = savedAttractions(user.id);
  const counts = savedCounts(user.id);
  const upcoming = trips.find((t) => t.start_date && t.start_date >= new Date().toISOString().slice(0, 10)) ?? trips[0];

  const upcomingBudget = upcoming ? tripBudget(upcoming.id).reduce((sum, b) => sum + b.amount, 0) : 0;
  const upcomingEntries = upcoming ? tripItinerary(upcoming.id) : [];
  const upcomingSpend =
    upcomingBudget + upcomingEntries.reduce((sum, e) => sum + (e.estimated_cost ?? 0), 0);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow eyebrow-forest">Your workspace</p>
          <h1 className="mt-2 display text-[clamp(1.9rem,3vw,2.6rem)] text-forest">
            Hello, {user.name.split(" ")[0]}.
          </h1>
          <p className="mt-2 text-[0.92rem] text-muted">
            {trips.length > 0
              ? `You have ${trips.length} ${pluralise(trips.length, "trip")} and ${counts.destinations + counts.attractions} saved ${pluralise(counts.destinations + counts.attractions, "place")}.`
              : "Start by saving a few places you would like to see, then build a trip around them."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/trips/new" className="btn btn-primary btn-sm">Plan a new trip</Link>
          <Link href="/destinations" className="btn btn-outline btn-sm">Discover destinations</Link>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming trips" value={trips.filter((t) => t.start_date && t.start_date >= new Date().toISOString().slice(0, 10)).length} hint="Trips with a future start date" />
        <StatCard label="Saved destinations" value={counts.destinations} hint="Guides you have bookmarked" />
        <StatCard label="Saved experiences" value={counts.attractions} hint="Attractions you want to visit" />
        <StatCard label="Planned spend" value={cedis(upcomingSpend, { compact: true })} hint={upcoming ? upcoming.name : "No active trip yet"} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl text-forest">Next trip</h2>
            <Link href="/dashboard/trips" className="text-[0.78rem] font-semibold text-forest hover:text-gold-600">
              All trips →
            </Link>
          </div>

          {upcoming ? (
            <article className="border border-line bg-white">
              <div className="relative h-44">
                {upcoming.destination_image ? (
                  <SmartImage
                    src={upcoming.destination_image}
                    alt={`${upcoming.destination_name ?? "Trip"} landscape`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 bg-gradient-to-br from-forest to-forest-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[0.64rem] uppercase tracking-[0.16em] text-cream/85">
                    {dateRange(upcoming.start_date, upcoming.end_date)}
                    {upcoming.start_date && upcoming.end_date ? ` · ${nights(upcoming.start_date, upcoming.end_date)} nights` : ""}
                  </p>
                  <h3 className="mt-1 display text-[1.7rem] text-cream">{upcoming.name}</h3>
                  <p className="mt-1 text-[0.8rem] text-cream/75">
                    {upcoming.destination_name ?? "Multiple destinations"} · {upcoming.travellers}{" "}
                    {pluralise(upcoming.travellers, "traveller")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                <dl className="flex gap-8 text-[0.82rem]">
                  <div>
                    <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-muted">Stops</dt>
                    <dd className="mt-0.5 font-display text-xl text-forest">{upcomingEntries.length}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-muted">Budget</dt>
                    <dd className="mt-0.5 font-display text-xl text-forest">{cedis(upcomingSpend)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-muted">Starts</dt>
                    <dd className="mt-0.5 font-display text-xl text-forest">
                      {upcoming.start_date ? formatDate(upcoming.start_date) : "TBC"}
                    </dd>
                  </div>
                </dl>
                <Link href={`/dashboard/trips/${upcoming.id}`} className="btn btn-primary btn-sm">
                  Open itinerary
                </Link>
              </div>
            </article>
          ) : (
            <EmptyState
              title="No trips yet"
              description="Create a trip, pick your dates and start dropping in the places you saved."
              action={<Link href="/dashboard/trips/new" className="btn btn-primary btn-sm">Create your first trip</Link>}
            />
          )}

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-2xl text-forest">Recently saved</h2>
              <Link href="/dashboard/saved" className="text-[0.78rem] font-semibold text-forest hover:text-gold-600">
                See all →
              </Link>
            </div>
            {savedDest.length + savedAttr.length === 0 ? (
              <EmptyState
                title="Nothing saved yet"
                description="Tap save on any destination or experience and it will appear here."
                action={<Link href="/destinations" className="btn btn-outline btn-sm">Find places</Link>}
              />
            ) : (
              <ul className="divide-y divide-line border border-line bg-white">
                {[
                  ...savedDest.slice(0, 3).map((d) => ({
                    key: `d-${d.id}`,
                    href: `/destinations/${d.slug}`,
                    image: d.hero_image,
                    title: d.name,
                    sub: `${d.region} · Destination`,
                  })),
                  ...savedAttr.slice(0, 3).map((a) => ({
                    key: `a-${a.id}`,
                    href: `/experiences/${a.slug}`,
                    image: a.image,
                    title: a.name,
                    sub: `${a.region} · Experience`,
                  })),
                ].map((row) => (
                  <li key={row.key}>
                    <Link href={row.href} className="flex items-center gap-3.5 px-3 py-3 hover:bg-cream/60">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={row.image} alt="" className="h-12 w-16 shrink-0 object-cover" />
                      <span className="min-w-0">
                        <span className="block truncate font-display text-[1.05rem] text-forest">{row.title}</span>
                        <span className="block truncate text-[0.72rem] text-muted">{row.sub}</span>
                      </span>
                      <span aria-hidden className="ml-auto text-forest/30">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="border border-line bg-white p-5">
            <h2 className="font-display text-xl text-forest">Quick actions</h2>
            <div className="mt-3 space-y-2">
              <Link href="/dashboard/trips/new" className="btn btn-primary btn-sm w-full">New trip</Link>
              <Link href="/stays" className="btn btn-outline btn-sm w-full">Find a stay</Link>
              <Link href="/experiences?hidden=1" className="btn btn-outline btn-sm w-full">Hidden gems</Link>
              <Link href="/explore" className="btn btn-outline btn-sm w-full">Open the map</Link>
            </div>
          </div>

          <div className="border border-line bg-forest p-5 text-cream">
            <p className="eyebrow eyebrow-light">Planning tip</p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/80">
              Group stops by area rather than by day. A realistic Ghana itinerary usually allows for one main
              activity and a slower afternoon.
            </p>
            <Link href="/plan" className="mt-3 inline-flex text-[0.78rem] font-semibold text-gold-100 underline underline-offset-2">
              How planning works
            </Link>
          </div>

          <div className="border border-line bg-white p-5">
            <h2 className="font-display text-xl text-forest">Your account</h2>
            <dl className="mt-3 space-y-2 text-[0.82rem]">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Name</dt>
                <dd className="font-medium text-forest">{user.name}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Email</dt>
                <dd className="truncate font-medium text-forest">{user.email}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Role</dt>
                <dd><Badge tone="muted">{user.role}</Badge></dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
