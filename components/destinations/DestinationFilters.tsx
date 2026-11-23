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
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update({ q: term || null });
        }}
        className="rounded-2xl border border-line bg-white p-3 shadow-soft"
        role="search"
        aria-label="Filter destinations"
      >
        <div className="grid gap-2.5 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center">
          <input
            id="dest-q"
            aria-label="Search destinations"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search destination, region or keyword…"
            className="field rounded-xl"
          />
          <select
            id="dest-region"
            aria-label="Filter by region"
            className="field appearance-none rounded-xl bg-[right_0.8rem_center] bg-no-repeat pr-9"
            value={region}
            onChange={(e) => update({ region: e.target.value || null })}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")",
            }}
          >
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            id="dest-sort"
            aria-label="Sort destinations"
            className="field appearance-none rounded-xl pr-9"
            value={sort}
            onChange={(e) => update({ sort: e.target.value })}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.8rem center",
            }}
          >
            <option value="featured">Featured first</option>
            <option value="az">A – Z</option>
            <option value="recent">Recently added</option>
          </select>
          <button type="submit" className="btn btn-primary h-[46px] rounded-xl px-6">
            Search
          </button>
        </div>
      </form>

      {/* Airbnb-style horizontal category pill bar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => update({ category: null })}
          className={clsx(
            "rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium transition",
            !category
              ? "border-ink bg-ink text-white"
              : "border-line bg-white text-ink hover:border-ink/30 hover:bg-sand",
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
              "rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium transition",
              category === c.slug
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink hover:border-ink/30 hover:bg-sand",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[0.78rem]">
        <span className="font-mono text-muted" aria-live="polite">
          {total} {total === 1 ? "destination" : "destinations"}
        </span>
        {active.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={a.clear}
            className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-[0.74rem] font-medium text-ink hover:bg-line"
          >
            {a.label}
            <span aria-hidden className="text-muted">✕</span>
            <span className="sr-only">Remove filter</span>
          </button>
        ))}
        {active.length > 1 && (
          <button
            type="button"
            onClick={() => router.push("/destinations")}
            className="text-[0.74rem] font-semibold text-ink underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
