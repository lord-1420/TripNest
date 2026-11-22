"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { cedis } from "@/lib/format";

const TYPES = [
  { value: "HOTEL", label: "Hotels" },
  { value: "HOSTEL", label: "Hostels" },
  { value: "APARTMENT", label: "Apartments" },
];

/**
 * Accommodation search + filter panel. Inline on desktop, a slide-up sheet on
 * mobile. Every filter maps to a real query parameter consumed by the server.
 */
export default function AccommodationSearch({
  regions,
  priceRange,
  total,
}: {
  regions: string[];
  priceRange: { min: number; max: number };
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const [q, setQ] = useState(params.get("q") ?? "");
  const [region, setRegion] = useState(params.get("region") ?? "");
  const [type, setType] = useState(params.get("type") ?? "");
  const [minPrice, setMinPrice] = useState(params.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") ?? "");
  const [sort, setSort] = useState(params.get("sort") ?? "price_asc");

  const apply = (next?: Partial<Record<string, string>>) => {
    const search = new URLSearchParams();
    const values = { q, region, type, minPrice, maxPrice, sort, ...next };
    Object.entries(values).forEach(([k, v]) => {
      if (v && !(k === "sort" && v === "price_asc")) search.set(k, String(v));
    });
    router.push(`/stays${search.toString() ? `?${search}` : ""}`);
    setOpen(false);
  };

  const reset = () => {
    setQ(""); setRegion(""); setType(""); setMinPrice(""); setMaxPrice(""); setSort("price_asc");
    router.push("/stays");
    setOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const activeCount = [region, type, minPrice, maxPrice].filter(Boolean).length + (q ? 1 : 0);

  const fields = (
    <div className="space-y-4">
      <div>
        <label htmlFor="stay-q" className="field-label">Location or property</label>
        <input
          id="stay-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Town, city or name"
          className="field"
        />
      </div>
      <div>
        <label htmlFor="stay-region" className="field-label">Region</label>
        <select id="stay-region" value={region} onChange={(e) => setRegion(e.target.value)} className="field">
          <option value="">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="field-label">Accommodation type</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(type === t.value ? "" : t.value)}
              aria-pressed={type === t.value}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-[0.78rem] transition",
                type === t.value ? "border-forest bg-forest text-cream" : "border-line bg-white text-forest hover:border-forest/35",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="stay-min" className="field-label">Min price</label>
          <input
            id="stay-min"
            type="number"
            min={0}
            inputMode="numeric"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder={`${priceRange.min}`}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="stay-max" className="field-label">Max price</label>
          <input
            id="stay-max"
            type="number"
            min={0}
            inputMode="numeric"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder={`${priceRange.max}`}
            className="field"
          />
        </div>
      </div>
      <p className="text-[0.7rem] text-muted">
        Nightly prices in cedis. Listed range: {cedis(priceRange.min)} – {cedis(priceRange.max)}.
      </p>
      <div>
        <label htmlFor="stay-sort" className="field-label">Sort by</label>
        <select id="stay-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="field">
          <option value="price_asc">Lowest price</option>
          <option value="price_desc">Highest price</option>
          <option value="recent">Recently added</option>
        </select>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="button" onClick={() => apply()} className="btn btn-primary flex-1">Apply filters</button>
        <button type="button" onClick={reset} className="btn btn-outline">Reset</button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop panel */}
      <div className="hidden lg:block">
        <div className="border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-forest">Filters</h2>
          </div>
          {fields}
        </div>
      </div>

      {/* Mobile trigger + count */}
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <button type="button" onClick={() => setOpen(true)} className="btn btn-outline btn-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
          </svg>
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
        <span className="text-[0.78rem] text-muted">{total} results</span>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Accommodation filters">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-cream p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl text-forest">Filters</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-sm font-semibold text-forest">Close</button>
            </div>
            {fields}
          </div>
        </div>
      )}
    </>
  );
}
