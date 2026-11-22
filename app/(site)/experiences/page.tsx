import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { listAttractions, listCategories } from "@/lib/queries";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Experiences & attractions in Ghana",
  description:
    "Heritage sites, canopy walks, waterfalls, wildlife sanctuaries and city experiences across Ghana — including hidden gems beyond the usual trail.",
};

export const dynamic = "force-dynamic";

export default async function ExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const read = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const q = read("q");
  const category = read("category");
  const hidden = read("hidden") === "1";
  const page = Math.max(1, Number(read("page") ?? 1) || 1);

  const categories = listCategories("ATTRACTION");
  const result = listAttractions({ q, category, hiddenGem: hidden || undefined, page, perPage: 12 });

  const buildHref = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (category) next.set("category", category);
    if (hidden) next.set("hidden", "1");
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    next.delete("page");
    return `/experiences${next.toString() ? `?${next}` : ""}`;
  };

  return (
    <>
      <PageHeader
        eyebrow="Experiences"
        title={
          <>
            Things worth doing,
            <span className="block italic text-forest-500">places worth the detour.</span>
          </>
        }
        description="Every published attraction in TripNest — from the castles of the Central Region to shrines in the Upper East. Save what appeals, then add it to a trip."
      >
        <form action="/experiences" role="search" className="flex flex-wrap gap-2">
          <label htmlFor="exp-q" className="sr-only">
            Search experiences
          </label>
          <input
            id="exp-q"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search experiences, towns or regions"
            className="field max-w-sm flex-1"
          />
          {category && <input type="hidden" name="category" value={category} />}
          {hidden && <input type="hidden" name="hidden" value="1" />}
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={buildHref({ category: null, hidden: null })}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-[0.78rem] transition",
              !category && !hidden ? "border-forest bg-forest text-cream" : "border-line bg-white text-forest hover:border-forest/35",
            )}
          >
            All experiences
          </Link>
          <Link
            href={buildHref({ hidden: hidden ? null : "1" })}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-[0.78rem] transition",
              hidden ? "border-gold bg-gold text-[#22180a]" : "border-line bg-white text-forest hover:border-gold",
            )}
          >
            Hidden gems only
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={buildHref({ category: category === c.slug ? null : c.slug })}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-[0.78rem] transition",
                category === c.slug
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-white text-forest hover:border-forest/35",
              )}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </PageHeader>

      <section className="shell py-12 md:py-16">
        <p className="mb-6 text-[0.82rem] text-muted">
          {result.total} experience{result.total === 1 ? "" : "s"}
          {hidden ? " flagged as hidden gems" : ""}
          {category ? ` in ${categories.find((c) => c.slug === category)?.name}` : ""}
          {q ? ` matching “${q}”` : ""}
        </p>

        {result.items.length === 0 ? (
          <EmptyState
            title="Nothing matches those filters"
            description="Try another interest, or search for a region such as Volta or Central."
            action={
              <Link href="/experiences" className="btn btn-primary btn-sm">
                Reset filters
              </Link>
            }
          />
        ) : (
          <>
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {result.items.map((a) => (
                <ExperienceCard key={a.id} attraction={a} />
              ))}
            </div>
            <Pagination
              page={result.page}
              pageCount={result.pageCount}
              basePath="/experiences"
              params={{ q, category, hidden: hidden ? "1" : undefined }}
            />
          </>
        )}
      </section>
    </>
  );
}
