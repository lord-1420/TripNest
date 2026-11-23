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
        eyebrow="Stays"
        title="Find somewhere to stay."
        description="Compare hostels, apartments and hotels across Ghana with transparent rates in cedis — contact providers directly with zero booking fees."
      />

      <section className="shell grid gap-8 py-10 lg:grid-cols-[296px_1fr] lg:gap-10 lg:py-14">
        <aside className="lg:self-start">
          <AccommodationSearch regions={regions} priceRange={priceRange} total={result.total} />
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[0.78rem]">
            <span className="hidden font-mono text-muted lg:inline">
              {result.total} {result.total === 1 ? "stay" : "stays"}
            </span>
            {activeChips.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-[0.74rem] font-medium text-ink hover:bg-line"
              >
                {chip.label}
                <span aria-hidden className="text-muted">✕</span>
                <span className="sr-only">Remove filter</span>
              </Link>
            ))}
          </div>

          {result.items.length === 0 ? (
            <EmptyState
              title="No stays match those filters"
              description="Widen the price range or try a different region."
              action={
                <Link href="/stays" className="btn btn-primary btn-sm">
                  Reset search
                </Link>
              }
            />
          ) : (
            <>
              <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
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

          <div className="mt-12 rounded-2xl border border-line bg-cream-50 p-6">
            <h2 className="font-sans text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
              How TripNest stays work
            </h2>
            <ul className="mt-3 space-y-2 text-[0.86rem] leading-relaxed text-muted">
              <li>Every listing is submitted by a local provider and reviewed before publishing.</li>
              <li>Nightly rates are indicative prices in Ghana cedis confirmed directly with the host.</li>
              <li>No middleman fees — reach providers directly via phone, WhatsApp, or email.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
