"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import LeafletMap, { type MapPoint } from "./LeafletMap";
import DestinationGlobe, { type DestinationGlobeHandle } from "./DestinationGlobe";
import DestinationInfoPanel from "./DestinationInfoPanel";
import GlobeLoadingScreen from "./GlobeLoadingScreen";
import { explorerId, FEATURED_EXPLORER_SLUGS, type ExplorerLocation } from "./explorer-types";

const CATEGORY_LABELS: Record<string, string> = {
  adventure: "Adventure",
  beaches: "Beaches",
  city: "City",
  culture: "Culture",
  food: "Food",
  heritage: "Heritage",
  nature: "Nature",
  waterfalls: "Waterfalls",
  wildlife: "Wildlife",
};

type Status = "loading" | "ready" | "error";

export default function MapExplorer({
  locations,
  ionToken,
  isSignedIn,
}: {
  locations: ExplorerLocation[];
  ionToken: string;
  isSignedIn: boolean;
}) {
  const globeRef = useRef<DestinationGlobeHandle>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);

  const selected = locations.find((place) => explorerId(place) === selectedId) ?? null;
  const hovered = locations.find((place) => explorerId(place) === hoveredId) ?? null;
  const categories = useMemo(
    () => Array.from(new Set(locations.flatMap((place) => place.categories))).sort(),
    [locations],
  );
  const featured = useMemo(() => {
    const ordered = FEATURED_EXPLORER_SLUGS.map((slug) => locations.find((place) => place.slug === slug)).filter(
      (place): place is ExplorerLocation => Boolean(place),
    );
    return ordered.length ? ordered : locations.slice(0, 6);
  }, [locations]);
  const related = useMemo(() => {
    if (!selected) return [];
    const parentSlug = selected.kind === "destination" ? selected.slug : selected.destination_slug;
    if (parentSlug) {
      return locations.filter(
        (place) => place.kind === "attraction" && place.destination_slug === parentSlug && place.slug !== selected.slug,
      );
    }
    return locations.filter((place) => place.slug !== selected.slug && place.region === selected.region).slice(0, 3);
  }, [locations, selected]);

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return locations
      .filter((place) => category === "all" || place.categories.includes(category))
      .filter(
        (place) =>
          !needle ||
          [place.name, place.region, place.summary, ...place.categories]
            .join(" ")
            .toLocaleLowerCase()
            .includes(needle),
      )
      .slice(0, 7);
  }, [category, locations, query]);

  const selectLocation = useCallback(
    (id: string) => {
      const place = locations.find((item) => explorerId(item) === id);
      if (!place) return;
      setSelectedId(id);
      setHoveredId(null);
      setSearchOpen(false);
      globeRef.current?.focus(place);
    },
    [locations],
  );

  const onGlobeReady = useCallback(() => setStatus("ready"), []);
  const onGlobeError = useCallback((message: string) => {
    setError(message);
    setStatus("error");
  }, []);

  useEffect(() => {
    if (status !== "ready" || !storyRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let context: { revert: () => void } | null = null;
    let cancelled = false;

    async function attachScrollStory() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled || !storyRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => {
          storyRef.current?.querySelectorAll<HTMLElement>("[data-explorer-stop]").forEach((card) => {
            const id = card.dataset.explorerStop;
            if (!id) return;
            const focus = () => selectLocation(id);
            ScrollTrigger.create({
              trigger: card,
              start: "top 58%",
              end: "bottom 42%",
              onEnter: focus,
              onEnterBack: focus,
            });
          });
        }, storyRef.current);
      } catch {
        // Camera selection and all map controls remain available without GSAP.
      }
    }

    void attachScrollStory();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [selectLocation, status]);

  const fallbackPoints: MapPoint[] = locations.map((place) => ({
    id: explorerId(place),
    name: place.name,
    sublabel: place.region,
    lat: place.lat,
    lng: place.lng,
    href: place.href,
    kind: place.kind,
    approximate: place.geo_precision === "approximate",
  }));

  return (
    <section className="min-h-[calc(100svh-var(--header-h))] bg-white pb-16 pt-[calc(var(--header-h)+2.25rem)] text-ink md:pb-24">
      <div className="shell">
        <header className="mb-7 flex flex-col gap-3 md:mb-9 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">3D Atlas · Ghana</p>
            <h1 className="mt-2 font-sans text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[1.04] tracking-[-0.036em] text-ink">
              Explore Ghana in 3D.
            </h1>
            <p className="mt-2.5 text-[0.96rem] leading-relaxed text-muted">
              Spin the globe, click any marker, or pick a curated stop to inspect destinations and nearby
              experiences.
            </p>
          </div>
          <p className="font-mono text-[0.72rem] text-muted">
            {locations.length} mapped places
          </p>
        </header>

        {status === "error" && (
          <div role="status" className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <p className="font-semibold">Showing the 2D OpenStreetMap fallback</p>
            <p className="mt-0.5 text-[0.82rem] text-amber-900/80">
              {error} Add <code className="font-mono">NEXT_PUBLIC_CESIUM_ION_TOKEN</code> in <code className="font-mono">.env.local</code> and restart to enable 3D terrain.
            </p>
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)] lg:gap-8">
          {/* Interactive Globe / Map container */}
          <div className="sticky top-[calc(var(--header-h)+16px)] z-10">
            <div className="relative h-[min(70svh,720px)] min-h-[420px] overflow-hidden rounded-3xl border border-line bg-[#0b1210] shadow-float md:min-h-[520px]">
              {status !== "error" ? (
                <DestinationGlobe
                  ref={globeRef}
                  ionToken={ionToken}
                  locations={locations}
                  selectedId={selectedId}
                  onSelect={selectLocation}
                  onHover={setHoveredId}
                  onReady={onGlobeReady}
                  onError={onGlobeError}
                />
              ) : (
                <LeafletMap
                  points={fallbackPoints}
                  selectedId={selectedId}
                  onSelect={selectLocation}
                  height="100%"
                  zoom={7}
                  className="h-full w-full border-0"
                />
              )}

              {status === "loading" && <GlobeLoadingScreen label="Streaming 3D terrain and satellite imagery" />}

              {/* Floating Airbnb/Gumloop search pill */}
              <div className="absolute inset-x-3 top-3 z-20 md:left-4 md:right-4 md:top-4">
                <div className="relative flex max-w-lg items-center gap-2 rounded-full border border-black/[0.08] bg-white/95 px-3.5 py-1.5 shadow-float backdrop-blur-xl">
                  <svg className="ml-0.5 shrink-0 text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                  </svg>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setSearchOpen(false);
                      if (event.key === "Enter" && matches[0]) selectLocation(explorerId(matches[0]));
                    }}
                    aria-label="Search Ghana destinations and experiences"
                    placeholder="Search places, regions or vibes…"
                    className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-[0.84rem] text-ink outline-none placeholder:text-muted/80"
                  />
                  <select
                    aria-label="Filter places by category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="max-w-[120px] border-l border-line bg-transparent py-1.5 pl-2.5 text-[0.76rem] font-medium text-ink outline-none"
                  >
                    <option value="all">All vibes</option>
                    {categories.map((value) => (
                      <option key={value} value={value}>
                        {CATEGORY_LABELS[value] ?? value}
                      </option>
                    ))}
                  </select>
                </div>

                <AnimatePresence>
                  {searchOpen && (query || category !== "all") && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-2 max-w-lg overflow-hidden rounded-2xl border border-line bg-white/98 p-1.5 shadow-float backdrop-blur-xl"
                    >
                      {matches.length ? (
                        matches.map((place) => (
                          <button
                            key={explorerId(place)}
                            type="button"
                            onClick={() => selectLocation(explorerId(place))}
                            className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition hover:bg-sand"
                          >
                            <span className="relative h-10 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                              <span
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${JSON.stringify(place.image).slice(1, -1)})` }}
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[0.88rem] font-semibold text-ink">
                                {place.name}
                              </span>
                              <span className="block truncate font-mono text-[0.66rem] uppercase text-muted">
                                {place.region} ·{" "}
                                {place.categories[0] ? (CATEGORY_LABELS[place.categories[0]] ?? place.categories[0]) : "Place"}
                              </span>
                            </span>
                            <span aria-hidden className="text-muted">→</span>
                          </button>
                        ))
                      ) : (
                        <p className="px-3 py-3 text-sm text-muted">No published places match that search.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clean rounded map controls */}
              <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => globeRef.current?.overview()}
                  disabled={status !== "ready"}
                  className="inline-flex h-9 items-center rounded-full border border-white/20 bg-black/60 px-3.5 text-[0.76rem] font-semibold text-white backdrop-blur-md transition hover:bg-black/80 disabled:opacity-40"
                >
                  Reset view
                </button>
                <button
                  type="button"
                  onClick={() => globeRef.current?.zoomIn()}
                  disabled={status !== "ready"}
                  aria-label="Zoom in"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-base font-semibold text-white backdrop-blur-md transition hover:bg-black/80 disabled:opacity-40"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => globeRef.current?.zoomOut()}
                  disabled={status !== "ready"}
                  aria-label="Zoom out"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-base font-semibold text-white backdrop-blur-md transition hover:bg-black/80 disabled:opacity-40"
                >
                  −
                </button>
              </div>

              {hovered && !selected && (
                <div className="pointer-events-none absolute bottom-16 right-4 z-20 max-w-[230px] rounded-2xl border border-line bg-white/95 px-3.5 py-2.5 text-ink shadow-float backdrop-blur-md">
                  <p className="text-[0.92rem] font-semibold leading-tight">{hovered.name}</p>
                  <p className="mt-0.5 font-mono text-[0.66rem] text-muted">
                    {hovered.region} · {hovered.geo_precision === "approximate" ? "Approximate" : "Mapped"}
                  </p>
                </div>
              )}
            </div>

            <p className="mt-2.5 text-[0.72rem] text-muted">
              Terrain and satellite imagery via Cesium ion · Coordinates use TripNest’s published dataset.
            </p>
          </div>

          {/* Right rail: selected info card + curated stops */}
          <div ref={storyRef} className="min-w-0 pb-6">
            <div className="mb-3.5 flex items-baseline justify-between gap-3">
              <div>
                <p className="eyebrow">Featured route</p>
                <h2 className="mt-1 font-sans text-[1.4rem] font-semibold tracking-[-0.025em] text-ink">
                  Choose a stop
                </h2>
              </div>
              <span className="font-mono text-[0.7rem] text-muted">{featured.length} stops</span>
            </div>

            <div className="sticky top-[calc(var(--header-h)+16px)] z-20 mb-4 lg:static">
              {selected ? (
                <DestinationInfoPanel
                  location={selected}
                  related={related}
                  isSignedIn={isSignedIn}
                  onClose={() => setSelectedId(null)}
                />
              ) : (
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-line bg-cream-50 p-5">
                  <div>
                    <p className="font-mono text-[0.66rem] uppercase tracking-wider text-muted">
                      Interactive preview
                    </p>
                    <p className="mt-1 text-[0.94rem] font-medium text-ink">
                      Click any marker on the globe or a stop below to inspect it.
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink"
                  >
                    +
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              {featured.map((place, index) => {
                const id = explorerId(place);
                const active = id === selectedId;
                return (
                  <button
                    key={id}
                    type="button"
                    data-explorer-stop={id}
                    onClick={() => selectLocation(id)}
                    aria-pressed={active}
                    className={clsx(
                      "explorer-stop-card group flex w-full items-center gap-3.5 rounded-2xl border p-2.5 text-left transition duration-300",
                      active
                        ? "border-ink bg-sand shadow-soft"
                        : "border-line bg-white hover:border-ink/25 hover:bg-cream-50",
                    )}
                  >
                    <span className="relative h-[68px] w-[84px] shrink-0 overflow-hidden rounded-xl bg-sand">
                      <span
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${JSON.stringify(place.image).slice(1, -1)})` }}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-wider text-muted">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>·</span>
                        <span>{place.region}</span>
                      </span>
                      <span className="mt-0.5 block truncate font-sans text-[1rem] font-semibold tracking-[-0.02em] text-ink">
                        {place.name}
                      </span>
                      <span className="mt-0.5 block line-clamp-1 text-[0.78rem] text-muted">
                        {place.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={clsx(
                        "pr-1 text-sm transition-transform duration-300 group-hover:translate-x-0.5",
                        active ? "text-ink" : "text-muted/60 group-hover:text-ink",
                      )}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
