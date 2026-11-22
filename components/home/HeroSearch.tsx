"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface Suggestion {
  slug: string;
  name: string;
  region: string;
  kind: "destination" | "attraction";
  href: string;
}

const POPULAR = ["Accra", "Cape Coast", "Kumasi", "Aburi"];

export default function HeroSearch({ categories }: { categories: { slug: string; name: string }[] }) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [interest, setInterest] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        const data = await res.json();
        setResults(data.results ?? []);
        setOpen(true);
      } catch {
        /* aborted or offline — the form submit still works */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (interest) params.set("category", interest);
    router.push(`/destinations${params.toString() ? `?${params}` : ""}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      router.push(results[active].href);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={boxRef} className="relative">
      <form
        onSubmit={submit}
        role="search"
        aria-label="Search destinations"
        className="rounded-lg border border-line/80 bg-white/[0.98] p-3 shadow-float backdrop-blur md:rounded-[18px] md:p-4"
      >
        <div className="grid gap-2 md:grid-cols-[1.45fr_1fr_auto] md:items-end md:gap-3">
          <div className="relative">
            <label htmlFor="hero-search" className="field-label px-1">
              Where do you want to explore?
            </label>
            <div className="relative">
              <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-forest/[0.45]">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="hero-search"
                role="combobox"
                aria-expanded={open}
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(-1);
                }}
                onFocus={() => results.length > 0 && setOpen(true)}
                onKeyDown={onKeyDown}
                placeholder="Destination, region or town"
                className="field h-[52px] pl-10 text-[0.95rem]"
              />
              {loading && (
                <span className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin rounded-full border-[1.5px] border-forest/20 border-t-forest/70" />
              )}
            </div>

            {open && results.length > 0 && (
              <ul
                id={listId}
                role="listbox"
                aria-label="Search suggestions"
                className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-30 max-h-80 overflow-auto rounded-md border border-line bg-white py-1.5 shadow-float"
              >
                {results.map((r, i) => (
                  <li
                    key={`${r.kind}-${r.slug}`}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    className={clsx(
                      "flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-sm",
                      i === active ? "bg-cream-200" : "hover:bg-cream/70",
                    )}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      router.push(r.href);
                    }}
                  >
                    <span className="font-medium text-forest">{r.name}</span>
                    <span className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                      {r.kind === "destination" ? r.region : "Experience"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label htmlFor="hero-interest" className="field-label px-1">
              Travel interest
            </label>
            <select
              id="hero-interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="field h-[52px] appearance-none pr-9"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2373776F' stroke-width='2.2'><path d='M6 9l6 6 6-6'/></svg>\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.8rem center",
              }}
            >
              <option value="">Any interest</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary h-[52px] md:px-7">
            Search
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-line/80 px-1 pt-3">
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Popular
          </span>
          {POPULAR.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => router.push(`/destinations?q=${encodeURIComponent(p)}`)}
              className="rounded-full border border-line px-3 py-1 text-[0.78rem] text-forest transition hover:border-forest/[0.35] hover:bg-cream/60"
            >
              {p}
            </button>
          ))}
          <span className="ml-auto hidden text-[0.72rem] text-muted sm:block">
            Searching published TripNest destinations
          </span>
        </div>
      </form>
    </div>
  );
}
