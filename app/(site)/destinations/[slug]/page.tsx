import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";
import SaveButton from "@/components/planning/SaveButton";
import SectionNav from "@/components/site/SectionNav";
import ImageGallery from "@/components/destinations/ImageGallery";
import Checklist from "@/components/destinations/Checklist";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import AccommodationCard from "@/components/stays/AccommodationCard";
import DestinationEditorialCard from "@/components/destinations/DestinationEditorialCard";
import StaticLocationMap from "@/components/map/StaticLocationMap";
import { getSession } from "@/lib/auth";
import {
  getDestination,
  destinationGallery,
  destinationTips,
  destinationChecklist,
  listAttractions,
  destinationStays,
  relatedDestinations,
  isDestinationSaved,
  listCategories,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: "Destination not found" };
  return {
    title: `${destination.name}, ${destination.region}`,
    description: destination.summary,
    openGraph: { images: [destination.hero_image], title: destination.name },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination || !destination.published) notFound();

  const [user, gallery, tips, checklist, attractions, stays, related, categories] = await Promise.all([
    getSession(),
    Promise.resolve(destinationGallery(destination.id)),
    Promise.resolve(destinationTips(destination.id)),
    Promise.resolve(destinationChecklist(destination.id)),
    Promise.resolve(listAttractions({ destinationId: destination.id, perPage: 6 })),
    Promise.resolve(destinationStays(destination.id, 3)),
    Promise.resolve(relatedDestinations(destination, 3)),
    Promise.resolve(listCategories("DESTINATION")),
  ]);

  const saved = isDestinationSaved(user?.id ?? null, destination.id);
  const path = `/destinations/${destination.slug}`;
  const galleryImages = [
    {
      url: destination.hero_image,
      alt: `${destination.name}, ${destination.region}`,
      caption: destination.tagline,
      credit: destination.hero_credit,
    },
    ...gallery,
  ].filter((img, i, arr) => arr.findIndex((x) => x.url === img.url) === i);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Things to do" },
    { id: "best-time", label: "Best time" },
    { id: "area", label: "Explore the area" },
    ...(stays.length ? [{ id: "stay", label: "Where to stay" }] : []),
    { id: "getting-there", label: "Getting there" },
    ...(tips.length ? [{ id: "tips", label: "Travel tips" }] : []),
    ...(checklist.length ? [{ id: "checklist", label: "Checklist" }] : []),
    { id: "related", label: "Nearby & related" },
  ];

  return (
    <>
      {/* Destination hero */}
      <header className="relative isolate flex min-h-[64vh] items-end overflow-hidden bg-forest">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src={destination.hero_image}
            alt={`${destination.name}, ${destination.region}`}
            fill
            priority
            sizes="100vw"
            fallbackLabel={destination.name}
            fallbackTone="light"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,22,18,0.94)] via-[rgba(9,22,18,0.4)] to-[rgba(9,22,18,0.25)]" />
        </div>

        <div className="shell w-full pb-10 pt-[calc(var(--header-h)+4rem)] md:pb-14">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[0.72rem] text-cream/75">
            <Link href="/" className="hover:text-cream">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/destinations" className="hover:text-cream">Destinations</Link>
            <span aria-hidden>/</span>
            <Link href={`/destinations?region=${encodeURIComponent(destination.region)}`} className="hover:text-cream">
              {destination.region}
            </Link>
          </nav>

          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-light">{destination.region} Region · Ghana</p>
            <h1 className="mt-3 display text-display-xl text-cream">{destination.name}</h1>
            {destination.tagline && (
              <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-cream/80">{destination.tagline}</p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <SaveButton
                kind="destination"
                id={destination.id}
                initialSaved={saved}
                nextPath={path}
                tone="dark"
                label="Save destination"
              />
              <Link
                href={`/dashboard/trips/new?destination=${destination.slug}`}
                className="btn btn-gold btn-sm"
              >
                Plan a trip here
              </Link>
              <a
                href="#highlights"
                className="btn btn-ghost-light btn-sm"
              >
                See what to do
              </a>
            </div>
            {destination.hero_credit && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[rgba(9,22,18,0.78)] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.12em] text-cream/90">
                <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-gold" />
                Photo: {destination.hero_credit}
              </p>
            )}
          </div>
        </div>
      </header>

      <SectionNav items={sections} />

      {/* Overview */}
      <section id="overview" className="shell scroll-mt-32 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-forest">The destination</p>
            <h2 className="mt-2 display text-display-md">{destination.summary}</h2>
            <div className="prose-editorial mt-6 max-w-2xl body-copy">
              {destination.description.split("\n\n").map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {destination.categories?.map((c) => {
                const cat = categories.find((x) => x.slug === c);
                return (
                  <Link
                    key={c}
                    href={`/destinations?category=${c}`}
                    className="chip hover:border-forest/40 hover:bg-white"
                  >
                    {cat?.name ?? c}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* At a glance */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:self-start">
            <div className="border border-line bg-white p-5 md:p-6">
              <h2 className="font-display text-xl text-forest">At a glance</h2>
              <dl className="mt-4 divide-hair text-[0.86rem]">
                {[
                  { label: "Region", value: destination.region },
                  { label: "Experiences", value: `${destination.attraction_count ?? 0} published` },
                  { label: "Places to stay", value: `${destination.stay_count ?? 0} listed` },
                  {
                    label: "Location",
                    value:
                      destination.lat != null && destination.lng != null
                        ? `${destination.lat.toFixed(3)}° N, ${Math.abs(destination.lng).toFixed(3)}° ${destination.lng < 0 ? "W" : "E"}`
                        : "Coordinates pending",
                  },
                  { label: "Content status", value: destination.content_status === "VERIFIED" ? "Editorially verified" : "Seed content — pending review" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 py-2.5">
                    <dt className="text-muted">{row.label}</dt>
                    <dd className="text-right font-medium text-forest">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#best-time"
                className="mt-4 flex items-start gap-3 border-t border-line pt-4 text-[0.85rem] leading-relaxed text-ink/80 hover:text-forest"
              >
                <span className="mt-0.5 text-gold-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" strokeLinecap="round" />
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold text-forest">Best time to visit</span>
                  <span className="mt-1 block text-muted">{destination.best_time}</span>
                </span>
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <ImageGallery images={galleryImages} label={destination.name} />
        </div>
      </section>

      {/* Things to do */}
      <section id="highlights" className="scroll-mt-32 border-y border-line bg-sand py-14 md:py-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow eyebrow-forest">Highlights</p>
              <h2 className="mt-2 display text-display-md">Things to do in {destination.name}</h2>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
                Published experiences connected to this destination. Save the ones you like, or add them
                straight to a trip.
              </p>
            </div>
            <Link
              href={`/experiences?q=${encodeURIComponent(destination.name)}`}
              className="link-underline text-sm"
            >
              All experiences <span aria-hidden>→</span>
            </Link>
          </div>

          {attractions.items.length === 0 ? (
            <p className="mt-8 border border-dashed border-line bg-white/60 p-6 text-sm text-muted">
              No experiences are linked to this destination yet. Try the{" "}
              <Link href="/experiences" className="underline">experiences index</Link> or explore nearby
              destinations below.
            </p>
          ) : (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {attractions.items.map((a) => (
                <ExperienceCard key={a.id} attraction={a} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Best time + area */}
      <section id="best-time" className="shell scroll-mt-32 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-forest">When to go</p>
            <h2 className="mt-2 display text-display-md">Best time to visit</h2>
            <div className="mt-5 border-l-2 border-gold/60 pl-5 text-[0.95rem] leading-relaxed text-ink/85">
              {destination.best_time}
            </div>
            <p className="mt-4 text-[0.76rem] leading-relaxed text-muted">
              General seasonal guidance for the region — not a forecast. Check current conditions before you
              travel, and confirm anything time-sensitive with local operators.
            </p>
          </div>
          <div>
            <p className="eyebrow eyebrow-forest">Practicalities</p>
            <h2 className="mt-2 display text-display-md">Getting around</h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/85">{destination.getting_around}</p>
          </div>
        </div>
      </section>

      <section id="area" className="shell scroll-mt-32 pb-14 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
          <div>
            <p className="eyebrow eyebrow-forest">Location</p>
            <h2 className="mt-2 display text-display-md">Explore the area</h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
              {destination.name} sits in the {destination.region} Region. Use the map to orient yourself,
              then open the explorer to see attractions and other destinations nearby.
            </p>
            <Link href="/explore" className="mt-5 inline-flex link-underline text-sm">
              Open the full map explorer <span aria-hidden>→</span>
            </Link>
          </div>
          <StaticLocationMap
            name={destination.name}
            lat={destination.lat}
            lng={destination.lng}
            region={destination.region}
            precision={destination.geo_precision}
          />
        </div>
      </section>

      {/* Where to stay */}
      {stays.length > 0 && (
        <section id="stay" className="scroll-mt-32 border-y border-line bg-white py-14 md:py-20">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow eyebrow-forest">Accommodation</p>
                <h2 className="mt-2 display text-display-md">Where to stay in {destination.name}</h2>
              </div>
              <Link href={`/stays?q=${encodeURIComponent(destination.name)}`} className="link-underline text-sm">
                All stays in the area <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stays.map((stay) => (
                <AccommodationCard key={stay.id} stay={stay} />
              ))}
            </div>
            <p className="mt-4 text-[0.72rem] text-muted">
              TripNest does not handle bookings. Pricing is indicative and confirmed with the provider.
            </p>
          </div>
        </section>
      )}

      {/* Getting there */}
      <section id="getting-there" className="shell scroll-mt-32 py-14 md:py-20">
        <p className="eyebrow eyebrow-forest">Before you go</p>
        <h2 className="mt-2 display text-display-md">Getting there</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { title: "Getting there", body: destination.getting_there, icon: "→" },
            { title: "Getting around", body: destination.getting_around, icon: "⟲" },
          ].map((block) => (
            <div key={block.title} className="border border-line bg-white p-6">
              <h3 className="font-display text-xl text-forest">{block.title}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">{block.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[0.72rem] text-muted">
          Route, fare and timetable details are not published unless verified. Ask locally, or check with
          transport operators before you set out.
        </p>
      </section>

      {/* Tips + checklist */}
      <section id="tips" className="scroll-mt-32 border-y border-line bg-sand py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-forest">Travel tips</p>
            <h2 className="mt-2 display text-display-md">Notes for {destination.name}</h2>
            <ul className="mt-7 divide-hair">
              {tips.map((tip) => (
                <li key={tip.id} className="py-4">
                  <h3 className="font-display text-[1.25rem] text-forest">{tip.title}</h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">{tip.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div id="checklist" className="scroll-mt-32">
            <div className="border border-line bg-white p-5 md:p-6">
              <p className="eyebrow eyebrow-forest">Preparation</p>
              <h2 className="mt-2 font-display text-2xl text-forest">Packing checklist</h2>
              <p className="mt-1.5 text-[0.85rem] text-muted">Tick these off as you pack — saved on this device.</p>
              <div className="mt-4">
                <Checklist slug={destination.slug} items={checklist} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section id="related" className="shell scroll-mt-32 py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow eyebrow-forest">Keep going</p>
            <h2 className="mt-2 display text-display-md">Nearby &amp; related destinations</h2>
          </div>
          <Link href={`/destinations?region=${encodeURIComponent(destination.region)}`} className="link-underline text-sm">
            More in {destination.region} <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <DestinationEditorialCard key={r.id} destination={r} variant="grid" />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-5 border border-line bg-white p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display text-display-sm">Turn {destination.name} into a plan.</h2>
            <p className="mt-1.5 text-[0.9rem] text-muted">
              Add this destination to a trip, build a day-by-day itinerary and estimate the cost in cedis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/dashboard/trips/new?destination=${destination.slug}`} className="btn btn-primary">
              Start a trip here
            </Link>
            <SaveButton
              kind="destination"
              id={destination.id}
              initialSaved={saved}
              nextPath={path}
              label="Save for later"
            />
          </div>
        </div>
      </section>
    </>
  );
}
