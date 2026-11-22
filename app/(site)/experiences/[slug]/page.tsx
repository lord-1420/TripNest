import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";
import SaveButton from "@/components/planning/SaveButton";
import AddToTrip from "@/components/planning/AddToTrip";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import StaticLocationMap from "@/components/map/StaticLocationMap";
import Badge from "@/components/ui/Badge";
import { getSession } from "@/lib/auth";
import { getAttraction, nearbyAttractions, isAttractionSaved, listTrips, listCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const attraction = getAttraction(slug);
  if (!attraction) return { title: "Experience not found" };
  return { title: attraction.name, description: attraction.summary, openGraph: { images: [attraction.image] } };
}

export default async function AttractionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const attraction = getAttraction(slug);
  if (!attraction || !attraction.published) notFound();

  const user = await getSession();
  const saved = isAttractionSaved(user?.id ?? null, attraction.id);
  const nearby = nearbyAttractions(attraction, 3);
  const categories = listCategories("ATTRACTION");
  const trips = user ? listTrips(user.id).map((t) => ({ id: t.id, name: t.name, start_date: t.start_date })) : [];
  const path = `/experiences/${attraction.slug}`;

  return (
    <>
      <header className="relative isolate flex min-h-[52vh] items-end overflow-hidden bg-forest">
        <div className="absolute inset-0 -z-10">
          <SmartImage src={attraction.image} alt={attraction.name} fill priority sizes="100vw" fallbackTone="light" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,22,18,0.94)] via-[rgba(9,22,18,0.55)] to-[rgba(9,22,18,0.5)]" />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[rgba(9,22,18,0.72)] to-transparent" />
        </div>
        <div className="shell w-full pb-10 pt-[calc(var(--header-h)+4rem)] md:pb-14">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[0.72rem] text-cream/75">
            <Link href="/" className="hover:text-cream">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/experiences" className="hover:text-cream">Experiences</Link>
            <span aria-hidden>/</span>
            <span className="text-cream/80">{attraction.region}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {attraction.hidden_gem ? <Badge tone="gold">Hidden gem</Badge> : null}
              {attraction.categories?.slice(0, 3).map((c) => (
                <Link key={c} href={`/experiences?category=${c}`} className="chip chip-outline-light">
                  {categories.find((x) => x.slug === c)?.name ?? c}
                </Link>
              ))}
            </div>
            <h1 className="mt-3 display text-display-xl text-cream">{attraction.name}</h1>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-cream/80">{attraction.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SaveButton kind="attraction" id={attraction.id} initialSaved={saved} nextPath={path} tone="dark" label="Save experience" />
              <AddToTrip attractionId={attraction.id} trips={trips} returnTo={path} isSignedIn={Boolean(user)} tone="dark" />
            </div>
            <p className="mt-5 text-[0.7rem] uppercase tracking-[0.14em] text-cream/75">
              {attraction.region} Region
              {attraction.destination_name ? ` · ${attraction.destination_name}` : attraction.nearest_town ? ` · near ${attraction.nearest_town}` : ""}
            </p>
          </div>
        </div>
      </header>

      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16 md:py-16">
        <article>
          <div className="prose-editorial body-copy text-[1rem]">
            {attraction.description.split("\n\n").map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <h2 className="font-display text-2xl text-forest">Practical notes</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] text-muted">
              <li>
                <span className="font-semibold text-forest">Nearest town:</span>{" "}
                {attraction.nearest_town ?? attraction.region}
              </li>
              {attraction.destination_name && (
                <li>
                  <span className="font-semibold text-forest">In destination:</span>{" "}
                  <Link href={`/destinations/${attraction.destination_slug}`} className="underline decoration-line underline-offset-2 hover:text-forest">
                    {attraction.destination_name}
                  </Link>
                </li>
              )}
              <li>
                <span className="font-semibold text-forest">Entry &amp; guides:</span> Visitor fees and guide
                arrangements are set locally and are not published here — confirm on arrival or through your
                accommodation.
              </li>
              <li>
                <span className="font-semibold text-forest">Content status:</span>{" "}
                {attraction.content_status === "VERIFIED"
                  ? "Editorially verified."
                  : "Seed content awaiting editorial verification."}
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl text-forest">Location</h2>
            <div className="mt-4">
              <StaticLocationMap
                name={attraction.name}
                lat={attraction.lat}
                lng={attraction.lng}
                region={attraction.region}
                precision={attraction.geo_precision}
                height="300px"
              />
            </div>
          </div>
        </article>

        <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <div className="border border-line bg-white p-5">
            <h2 className="font-display text-xl text-forest">Plan around this</h2>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">
              Add this experience to a trip and it appears in your itinerary with a cost you can estimate.
            </p>
            <div className="mt-4 space-y-2">
              <AddToTrip attractionId={attraction.id} trips={trips} returnTo={path} isSignedIn={Boolean(user)} />
              <Link href="/dashboard/trips/new" className="btn btn-primary btn-sm w-full">
                Start a new trip
              </Link>
              <Link href="/dashboard/saved" className="btn btn-outline btn-sm w-full">
                View saved places
              </Link>
            </div>
          </div>

          {attraction.destination_name && (
            <div className="mt-4 border border-line bg-white p-5">
              <p className="eyebrow eyebrow-forest">While you are there</p>
              <h2 className="mt-2 font-display text-xl text-forest">{attraction.destination_name}</h2>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">
                Read the full destination guide for travel notes, places to stay and other things to do.
              </p>
              <Link href={`/destinations/${attraction.destination_slug}`} className="mt-3 inline-flex link-underline text-sm">
                Open the guide <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </aside>
      </div>

      <section className="border-t border-line bg-sand py-14">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-display-md">More experiences nearby</h2>
            <Link href="/experiences" className="link-underline text-sm">
              All experiences <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((a) => (
              <ExperienceCard key={a.id} attraction={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
