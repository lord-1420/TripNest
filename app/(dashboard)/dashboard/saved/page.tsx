import Link from "next/link";
import { redirect } from "next/navigation";
import EmptyState from "@/components/ui/EmptyState";
import AddToTrip from "@/components/planning/AddToTrip";
import { removeSavedDestination, removeSavedAttraction } from "@/lib/actions/saved";
import { requireUser } from "@/lib/auth";
import { savedDestinations, savedAttractions, listTrips } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Saved places" };

export default async function SavedPage() {
  const user = await requireUser("/dashboard/saved");
  if (user.role === "ADMIN") redirect("/dashboard/admin");
  if (user.role === "PROVIDER") redirect("/dashboard/provider");

  const destinations = savedDestinations(user.id);
  const attractions = savedAttractions(user.id);
  const trips = listTrips(user.id).map((t) => ({ id: t.id, name: t.name, start_date: t.start_date }));

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow eyebrow-forest">Saved places</p>
          <h1 className="mt-2 display text-[clamp(1.9rem,3vw,2.6rem)] text-forest">Your shortlist</h1>
          <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-muted">
            {destinations.length + attractions.length} saved{" "}
            {destinations.length + attractions.length === 1 ? "place" : "places"}. Turn ideas into a plan by
            adding experiences to a trip.
          </p>
        </div>
        <Link href="/dashboard/trips/new" className="btn btn-primary btn-sm">New trip</Link>
      </header>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl text-forest">Destinations</h2>
          <span className="text-[0.74rem] text-muted">{destinations.length} saved</span>
        </div>
        {destinations.length === 0 ? (
          <EmptyState
            title="No saved destinations"
            description="Browse destinations and tap save to keep them here."
            action={<Link href="/destinations" className="btn btn-outline btn-sm">Explore destinations</Link>}
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {destinations.map((d) => (
              <li key={d.id} className="flex flex-col border border-line bg-white">
                <Link href={`/destinations/${d.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.hero_image} alt={`${d.name}, ${d.region}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">{d.region}</p>
                  <h3 className="mt-1 font-display text-[1.2rem] leading-tight text-forest">
                    <Link href={`/destinations/${d.slug}`} className="hover:text-forest-500">{d.name}</Link>
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <Link href={`/destinations/${d.slug}`} className="text-[0.76rem] font-semibold text-forest hover:text-gold-600">
                      View guide →
                    </Link>
                    <form action={removeSavedDestination.bind(null, d.id)}>
                      <button type="submit" className="text-[0.72rem] text-muted underline underline-offset-2 hover:text-[#8C3524]">
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl text-forest">Experiences</h2>
          <span className="text-[0.74rem] text-muted">{attractions.length} saved</span>
        </div>
        {attractions.length === 0 ? (
          <EmptyState
            title="No saved experiences"
            description="Save castles, canopy walks, waterfalls and wildlife sanctuaries as you browse."
            action={<Link href="/experiences" className="btn btn-outline btn-sm">Browse experiences</Link>}
          />
        ) : (
          <ul className="divide-y divide-line border border-line bg-white">
            {attractions.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-4 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" className="h-16 w-24 shrink-0 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    {a.region}
                    {a.destination_name ? ` · ${a.destination_name}` : ""}
                    {a.hidden_gem ? " · hidden gem" : ""}
                  </p>
                  <h3 className="mt-0.5 font-display text-[1.15rem] leading-tight text-forest">
                    <Link href={`/experiences/${a.slug}`} className="hover:text-forest-500">{a.name}</Link>
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[0.76rem] text-muted">{a.summary}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <AddToTrip attractionId={a.id} trips={trips} returnTo="/dashboard/saved" isSignedIn />
                  <form action={removeSavedAttraction.bind(null, a.id)}>
                    <button type="submit" className="text-[0.72rem] text-muted underline underline-offset-2 hover:text-[#8C3524]">
                      Remove
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
