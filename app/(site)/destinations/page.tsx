import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import DestinationFilters from "@/components/destinations/DestinationFilters";
import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationEditorialCard from "@/components/destinations/DestinationEditorialCard";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { listCategories, listDestinations, listRegions, featuredHiddenGems } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Destinations across Ghana",
  description:
    "Browse Ghanaian destinations by region and interest — coast, forest, savannah and city — with practical guides, attractions and places to stay.",
};

export const dynamic = "force-dynamic";

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const read = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const q = read("q");
  const region = read("region");
  const category = read("category");
  const sortRaw = read("sort");
  const sort = sortRaw === "az" || sortRaw === "recent" ? sortRaw : "featured";
  const page = Math.max(1, Number(read("page") ?? 1) || 1);

  const categories = listCategories("DESTINATION");
  const regions = listRegions();
  const result = listDestinations({ q, region, category, sort, page, perPage: 9 });
  const isFiltered = Boolean(q || region || category);
  const gems = !isFiltered ? featuredHiddenGems(3) : [];

  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="Explore Ghana, region by region."
        description="Seventeen curated destinations across coast, rainforest, savannah and city — each with local stays, experiences, and practical notes."
      >
        <DestinationFilters regions={regions} categories={categories} total={result.total} />
      </PageHeader>

      <section className="shell py-12 md:py-16">
        {isFiltered && (
          <p className="mb-6 font-mono text-[0.78rem] text-muted">
            {result.total} result{result.total === 1 ? "" : "s"}
            {q ? ` for “${q}”` : ""}
            {region ? ` in ${region}` : ""}
            {category ? ` · ${categories.find((c) => c.slug === category)?.name ?? category}` : ""}
          </p>
        )}

        {result.items.length === 0 ? (
          <EmptyState
            title="No destinations match those filters"
            description="Try a broader region, a different vibe, or search for a town like Cape Coast or Kumasi."
            action={
              <Link href="/destinations" className="btn btn-primary btn-sm">
                Reset filters
              </Link>
            }
          />
        ) : (
          <>
            <div className="grid gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
              {result.items.map((d, i) =>
                i === 0 && page === 1 && !isFiltered ? (
                  <div key={d.id} className="md:col-span-2 lg:col-span-2">
                    <DestinationEditorialCard destination={d} variant="wide" priority className="h-full" />
                  </div>
                ) : (
                  <DestinationCard key={d.id} destination={d} />
                ),
              )}
            </div>
            <Pagination
              page={result.page}
              pageCount={result.pageCount}
              basePath="/destinations"
              params={{ q, region, category, sort }}
            />
          </>
        )}

        {gems.length > 0 && (
          <div className="mt-16 border-t border-line pt-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Off the beaten path</p>
                <h2 className="mt-2 font-sans text-[1.6rem] font-semibold tracking-[-0.03em] text-ink">
                  Hidden gems in Ghana
                </h2>
              </div>
              <Link
                href="/experiences?hidden=1"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.8rem] font-semibold text-ink transition hover:border-ink/30 hover:bg-cream-50"
              >
                All hidden gems <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {gems.map((gem) => (
                <Link
                  key={gem.id}
                  href={`/experiences/${gem.slug}`}
                  className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white p-3 transition hover:border-ink/25 hover:bg-cream-50"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-sand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={gem.image}
                      alt={gem.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                      {gem.region}
                    </p>
                    <h3 className="mt-0.5 truncate font-sans text-[0.98rem] font-semibold text-ink group-hover:text-forest">
                      {gem.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[0.76rem] text-muted">{gem.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
