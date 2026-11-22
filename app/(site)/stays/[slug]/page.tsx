import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";
import Badge from "@/components/ui/Badge";
import AccommodationCard, { TYPE_LABEL } from "@/components/stays/AccommodationCard";
import StaticLocationMap from "@/components/map/StaticLocationMap";
import { cedis } from "@/lib/format";
import { getAccommodation, listAccommodations } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stay = getAccommodation(slug);
  if (!stay) return { title: "Listing not found" };
  return {
    title: `${stay.name} — ${stay.area ?? stay.destination_name}`,
    description: `${TYPE_LABEL[stay.type]} in ${stay.area ?? stay.destination_name} from ${cedis(stay.price_per_night)} per night.`,
  };
}

export default async function StayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stay = getAccommodation(slug);
  if (!stay || stay.status !== "APPROVED" || !stay.published) notFound();

  const similar = listAccommodations({ perPage: 4, destinationId: stay.destination_id }).items.filter((s) => s.id !== stay.id);

  return (
    <>
      <div className="shell pt-[calc(var(--header-h)+1.5rem)]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-3 text-[0.72rem] text-muted">
          <Link href="/" className="hover:text-forest">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/stays" className="hover:text-forest">Stays</Link>
          <span aria-hidden>/</span>
          <Link href={`/destinations/${stay.destination_slug}`} className="hover:text-forest">{stay.destination_name}</Link>
          <span aria-hidden>/</span>
          <span className="text-forest">{stay.name}</span>
        </nav>

        <div className="grid gap-2 md:grid-cols-[1.6fr_1fr]">
          <div className="media relative aspect-[16/10] overflow-hidden">
            <SmartImage
              src={stay.image}
              alt={`${stay.name} — ${stay.area ?? stay.destination_name}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 62vw"
              className="object-cover"
            />
            {stay.image_kind !== "PROPERTY_PHOTO" && (
              <p className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-[rgba(9,22,18,0.78)] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.12em] text-cream/90">
                <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-gold" />
                Area illustration, not the property
              </p>
            )}
          </div>
          <div className="grid grid-rows-2 gap-2">
            <div className="flex flex-col justify-center border-l-2 border-gold bg-cream-200 p-4">
              <p className="eyebrow eyebrow-forest">Photography</p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-ink/80">
                This is an illustration of {stay.area ?? stay.destination_name} and its surroundings — not a
                photograph of the property. Verified property photos are added once the provider uploads them.
              </p>
              <Link
                href={`/destinations/${stay.destination_slug}`}
                className="mt-3 text-[0.76rem] font-semibold text-forest underline decoration-line underline-offset-2 hover:text-gold-600"
              >
                See the {stay.destination_name} guide →
              </Link>
            </div>
            <div className="flex flex-col justify-between border border-line bg-white p-4">
              <div>
                <p className="eyebrow eyebrow-forest">Nightly rate</p>
                <p className="mt-1 font-display text-[2rem] leading-none text-forest">
                  {cedis(stay.price_per_night)}
                  <span className="ml-1 font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted">/ night</span>
                </p>
                <p className="mt-2 text-[0.76rem] leading-relaxed text-muted">
                  Indicative price in cedis, confirmed by the provider. TripNest does not process bookings.
                </p>
              </div>
              <a href="#contact" className="btn btn-primary btn-sm mt-3">
                Contact provider
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="shell grid gap-10 py-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14 lg:py-14">
        <article>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="forest">{TYPE_LABEL[stay.type]}</Badge>
            <Badge tone="muted">{stay.region}</Badge>
            {stay.content_status === "SEED" && <Badge tone="gold">Sample listing</Badge>}
          </div>
          <h1 className="mt-4 display text-display-lg text-forest">{stay.name}</h1>
          <p className="mt-2 text-[0.9rem] text-muted">
            {[stay.area ?? stay.destination_name, stay.region]
              .filter((v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i)
              .join(", ")}{" "}
            ·{" "}
            <Link href={`/destinations/${stay.destination_slug}`} className="underline decoration-line underline-offset-2 hover:text-forest">
              {stay.destination_name} guide
            </Link>
          </p>

          <div className="prose-editorial mt-6 body-copy">
            <p>{stay.description}</p>
            {stay.address && (
              <p>
                <span className="font-semibold text-forest">Address:</span>{" "}
                {stay.address}
                {stay.area && !stay.address.includes(stay.area) ? `, ${stay.area}` : ""}
              </p>
            )}
          </div>

          {stay.image_kind !== "PROPERTY_PHOTO" && (
            <p className="mt-5 border-l-2 border-gold/60 pl-3 text-[0.78rem] leading-relaxed text-muted">
              Photography note: the image shown is an illustration of the surrounding area, not a photograph of
              this property. Providers can upload verified property photos from their dashboard.
            </p>
          )}

          <section className="mt-10 border-t border-line pt-6">
            <h2 className="font-display text-2xl text-forest">Amenities</h2>
            {stay.amenities && stay.amenities.length > 0 ? (
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.88rem] text-ink/80 sm:grid-cols-3">
                {stay.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">No amenities have been published for this listing yet.</p>
            )}
          </section>

          <section className="mt-10 border-t border-line pt-6">
            <h2 className="font-display text-2xl text-forest">Location</h2>
            <div className="mt-4">
              <StaticLocationMap
                name={stay.name}
                lat={stay.lat}
                lng={stay.lng}
                region={stay.region ?? ""}
                precision="approximate"
                height="300px"
              />
            </div>
          </section>
        </article>

        <aside id="contact" className="scroll-mt-28 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <div className="border border-line bg-white p-5 md:p-6">
            <h2 className="font-display text-xl text-forest">Contact the provider</h2>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">
              Check availability, ask about the room and agree the rate directly. Nothing is charged through
              TripNest.
            </p>

            <div className="mt-4 space-y-2">
              {stay.phone ? (
                <a href={`tel:${stay.phone.replace(/\s/g, "")}`} className="btn btn-primary btn-sm w-full">
                  Call {stay.phone}
                </a>
              ) : (
                <div className="flex items-center justify-between gap-3 border border-dashed border-line px-3 py-2 text-[0.78rem] text-muted">
                  <span>Phone contact not published</span>
                  <span className="text-[0.66rem] uppercase tracking-[0.1em]">Awaiting verification</span>
                </div>
              )}
              {stay.whatsapp ? (
                <a
                  href={`https://wa.me/${stay.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm w-full"
                >
                  Message on WhatsApp
                </a>
              ) : null}
              {stay.email ? (
                <a href={`mailto:${stay.email}`} className="btn btn-outline btn-sm w-full">
                  Email the provider
                </a>
              ) : null}
            </div>

            <div className="mt-4 border-t border-line pt-4 text-[0.74rem] leading-relaxed text-muted">
              <p className="font-semibold text-forest">No booking or payment</p>
              <p className="mt-1">
                TripNest is a discovery platform. Enquiries are between you and the provider — a reply is not a
                confirmed reservation.
              </p>
            </div>
          </div>

          <div className="mt-4 border border-line bg-cream-50 p-5">
            <p className="eyebrow eyebrow-forest">Planning</p>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">
              Add {stay.destination_name} to a trip to keep this stay alongside your itinerary and budget.
            </p>
            <Link href={`/dashboard/trips/new?destination=${stay.destination_slug}`} className="btn btn-outline btn-sm mt-3 w-full">
              Plan a trip here
            </Link>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="border-t border-line bg-sand py-14">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="display text-display-md">Other stays in {stay.destination_name}</h2>
              <Link href={`/stays?q=${encodeURIComponent(stay.destination_name ?? "")}`} className="link-underline text-sm">
                See all <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.slice(0, 3).map((s) => (
                <AccommodationCard key={s.id} stay={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
