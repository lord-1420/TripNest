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

const POPULAR = ["Accra", "Cape Coast", "Kumasi", "Aburi", "Mole"];

export default function HeroSearch({
  categories,
  variant = "hero",
}: {
  categories: { slug: string; name: string }[];
  variant?: "hero" | "standalone";
}) {
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
        /* aborted or offline */
      } finally {
        setLoading(false);
      }
    }, 180);
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

  const isHero = variant === "hero";

  return (
    <div ref={boxRef} className="relative">
      <form
        onSubmit={submit}
        role="search"
        aria-label="Search destinations"
        className="rounded-2xl border border-black/[0.08] bg-white p-2 shadow-float md:rounded-full"
      >
        <div className="grid gap-1.5 md:grid-cols-[1.5fr_1fr_auto] md:items-center md:gap-0">
          {/* Where */}
          <div className="relative md:border-r md:border-line md:pr-2">
            <label htmlFor="hero-search" className="block px-4 pt-1.5 text-[0.68rem] font-semibold text-ink">
              Where
            </label>
            <div className="relative">
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
                placeholder="Search destinations, towns or regions"
                className="w-full bg-transparent px-4 pb-2 pt-0.5 text-[0.9rem] text-ink placeholder:text-muted/80 focus:outline-none"
              />
              {loading && (
                <span className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin rounded-full border-[1.5px] border-ink/20 border-t-ink" />
              )}
            </div>

            {open && results.length > 0 && (
              <ul
                id={listId}
                role="listbox"
                aria-label="Search suggestions"
                className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-40 max-h-80 overflow-auto rounded-2xl border border-line bg-white p-1.5 shadow-float"
              >
                {results.map((r, i) => (
                  <li
                    key={`${r.kind}-${r.slug}`}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    className={clsx(
                      "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                      i === active ? "bg-sand text-ink" : "hover:bg-cream-50",
                    )}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      router.push(r.href);
                    }}
                  >
                    <span className="font-medium text-ink">{r.name}</span>
                    <span className="font-mono text-[0.68rem] uppercase text-muted">
                      {r.kind === "destination" ? r.region : "Experience"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Vibe / Interest */}
          <div className="px-2">
            <label htmlFor="hero-interest" className="block px-2 pt-1.5 text-[0.68rem] font-semibold text-ink">
              Vibe
            </label>
            <select
              id="hero-interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full appearance-none bg-transparent px-2 pb-2 pt-0.5 pr-8 text-[0.9rem] text-ink focus:outline-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.5rem center",
              }}
            >
              <option value="">Any experience</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-ink px-6 text-[0.88rem] font-semibold text-white transition hover:bg-forest md:rounded-full"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            Search
          </button>
        </div>
      </form>

      {/* Subtle popular pills */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 px-1">
        <span
          className={clsx(
            "mr-1 font-mono text-[0.68rem] uppercase tracking-wider",
            isHero ? "text-white/60" : "text-muted",
          )}
        >
          Popular
        </span>
        {POPULAR.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => router.push(`/destinations?q=${encodeURIComponent(p)}`)}
            className={clsx(
              "rounded-full px-3 py-1 text-[0.76rem] font-medium transition",
              isHero
                ? "border border-white/20 bg-white/10 text-white/90 backdrop-blur-md hover:bg-white/20"
                : "border border-line bg-white text-ink hover:border-ink/30 hover:bg-sand",
            )}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
