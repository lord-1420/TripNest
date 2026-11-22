"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import type { Category } from "@/lib/types";

export default function DestinationFilters({
  regions,
  categories,
  total,
}: {
  regions: string[];
  categories: Category[];
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const region = params.get("region") ?? "";
  const category = params.get("category") ?? "";
  const sort = params.get("sort") ?? "featured";
  const [term, setTerm] = useState(q);

  useEffect(() => setTerm(q), [q]);

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, value);
    });
    next.delete("page");
    router.push(`/destinations${next.toString() ? `?${next}` : ""}`);
  };

  const active: { label: string; clear: () => void }[] = [];
  if (q) active.push({ label: `“${q}”`, clear: () => update({ q: null }) });
  if (region) active.push({ label: region, clear: () => update({ region: null }) });
  if (category) {
    const cat = categories.find((c) => c.slug === category);
    active.push({ label: cat?.name ?? category, clear: () => update({ category: null }) });
  }

  return (
    <div className="border border-line bg-white p-4 md:p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update({ q: term || null });
        }}
        className="grid gap-3 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-end"
        role="search"
        aria-label="Filter destinations"
      >
        <div>
          <label htmlFor="dest-q" className="field-label">
            Search destinations
          </label>
          <input
            id="dest-q"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Name, region or keyword"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="dest-region" className="field-label">
            Region
          </label>
          <select
            id="dest-region"
            className="field appearance-none bg-[right_0.8rem_center] bg-no-repeat pr-9"
            value={region}
            onChange={(e) => update({ region: e.target.value || null })}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2373776F' stroke-width='2.2'><path d='M6 9l6 6 6-6'/></svg>\")",
            }}
          >
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dest-sort" className="field-label">
            Sort
          </label>
          <select
            id="dest-sort"
            className="field appearance-none pr-9"
            value={sort}
            onChange={(e) => update({ sort: e.target.value })}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2373776F' stroke-width='2.2'><path d='M6 9l6 6 6-6'/></svg>\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.8rem center",
            }}
          >
            <option value="featured">Editor&apos;s picks first</option>
            <option value="az">A – Z</option>
            <option value="recent">Recently added</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary h-[46px]">
          Apply
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">Interest</span>
        <button
          type="button"
          onClick={() => update({ category: null })}
          className={clsx(
            "rounded-full border px-3 py-1.5 text-[0.78rem] transition",
            !category
              ? "border-forest bg-forest text-cream"
              : "border-line text-forest hover:border-forest/35",
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => update({ category: category === c.slug ? null : c.slug })}
            aria-pressed={category === c.slug}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-[0.78rem] transition",
              category === c.slug
                ? "border-forest bg-forest text-cream"
                : "border-line text-forest hover:border-forest/35",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.78rem]">
        <span className="text-muted" aria-live="polite">
          {total} {total === 1 ? "destination" : "destinations"}
          {active.length > 0 ? " match" : " available"}
        </span>
        {active.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={a.clear}
            className="inline-flex items-center gap-1.5 rounded-full bg-cream-200 px-2.5 py-1 text-[0.72rem] font-medium text-forest hover:bg-cream-200/70"
          >
            {a.label}
            <span aria-hidden className="text-forest/50">✕</span>
            <span className="sr-only">Remove filter</span>
          </button>
        ))}
        {active.length > 1 && (
          <button
            type="button"
            onClick={() => router.push("/destinations")}
            className="text-[0.72rem] font-semibold text-forest underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
