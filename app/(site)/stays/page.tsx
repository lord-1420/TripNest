import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import AccommodationSearch from "@/components/stays/AccommodationSearch";
import AccommodationCard from "@/components/stays/AccommodationCard";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { listAccommodations, listRegions, stayPriceRange } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Places to stay in Ghana",
  description:
    "Hostels, apartments and hotels across Ghana — filter by region, type and nightly price. TripNest links you to providers directly; no booking fees.",
};

export const dynamic = "force-dynamic";

export default async function StaysPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const read = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const q = read("q");
  const region = read("region");
  const type = read("type");
  const minPrice = read("minPrice") ? Number(read("minPrice")) : undefined;
  const maxPrice = read("maxPrice") ? Number(read("maxPrice")) : undefined;
  const sortRaw = read("sort");
  const sort = sortRaw === "price_desc" || sortRaw === "recent" ? sortRaw : "price_asc";
  const page = Math.max(1, Number(read("page") ?? 1) || 1);

  const regions = listRegions();
  const priceRange = stayPriceRange();
  const result = listAccommodations({ q, region, type, minPrice, maxPrice, sort, page, perPage: 9 });

  const activeChips = [
    q ? { label: `“${q}”`, href: `/stays?${new URLSearchParams({ ...(region ? { region } : {}), ...(type ? { type } : {}) })}` } : null,
    region ? { label: region, href: `/stays?${new URLSearchParams({ ...(q ? { q } : {}), ...(type ? { type } : {}) })}` } : null,
    type ? { label: type.charAt(0) + type.slice(1).toLowerCase() + "s", href: `/stays?${new URLSearchParams({ ...(q ? { q } : {}), ...(region ? { region } : {}) })}` } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <PageHeader
        eyebrow="Accommodation"
        title={
          <>
            Find somewhere to stay.
            <span className="block italic text-forest-500">From hostels to harbour houses.</span>
          </>
        }
        description="Search real, published listings across Ghana. Filter by region, type and nightly price, then contact the provider directly — TripNest never takes a booking or a payment."
      />

      <section className="shell grid gap-8 py-10 lg:grid-cols-[300px_1fr] lg:gap-10 lg:py-14">
        <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <AccommodationSearch regions={regions} priceRange={priceRange} total={result.total} />
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[0.78rem]">
            <span className="hidden text-muted lg:inline">
              {result.total} {result.total === 1 ? "place" : "places"} to stay
            </span>
            {activeChips.map((chip) => (
              <Link key={chip.label} href={chip.href} className="inline-flex items-center gap-1.5 rounded-full bg-cream-200 px-2.5 py-1 text-[0.72rem] font-medium text-forest">
                {chip.label}
                <span aria-hidden className="text-forest/50">✕</span>
                <span className="sr-only">Remove filter</span>
              </Link>
            ))}
          </div>

          {result.items.length === 0 ? (
            <EmptyState
              title="No stays match those filters"
              description="Widen the price range or try a different region. New listings are added as providers submit them for review."
              action={
                <Link href="/stays" className="btn btn-primary btn-sm">
                  Reset search
                </Link>
              }
            />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {result.items.map((stay) => (
                  <AccommodationCard key={stay.id} stay={stay} />
                ))}
              </div>
              <Pagination
                page={result.page}
                pageCount={result.pageCount}
                basePath="/stays"
                params={{ q, region, type, minPrice: read("minPrice"), maxPrice: read("maxPrice"), sort }}
              />
            </>
          )}

          <div className="mt-10 border border-line bg-white p-5">
            <h2 className="font-display text-xl text-forest">How TripNest stays work</h2>
            <ul className="mt-3 space-y-2 text-[0.85rem] leading-relaxed text-muted">
              <li>· Every listing is submitted by a provider and reviewed before it is published.</li>
              <li>· Prices are indicative nightly rates in cedis and are confirmed by the provider.</li>
              <li>· You contact the provider by phone, WhatsApp or email — there is no booking engine.</li>
              <li>· Some photographs are labelled area illustrations rather than property photos.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
