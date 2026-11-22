"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
    if (parentSlug) return locations.filter((place) => place.kind === "attraction" && place.destination_slug === parentSlug && place.slug !== selected.slug);
    return locations.filter((place) => place.slug !== selected.slug && place.region === selected.region).slice(0, 3);
  }, [locations, selected]);

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return locations
      .filter((place) => category === "all" || place.categories.includes(category))
      .filter((place) =>
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

  // ScrollTrigger links each editorial stop to a camera focus, without pinning
  // the page or hijacking normal scroll. A reduced-motion preference disables it.
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
            ScrollTrigger.create({ trigger: card, start: "top 58%", end: "bottom 42%", onEnter: focus, onEnterBack: focus });
          });
          gsap.fromTo(
            ".explorer-stop-card",
            { opacity: 0.68, y: 16 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: { trigger: storyRef.current, start: "top 78%", once: true },
            },
          );
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
    <section className="min-h-[calc(100svh-var(--header-h))] overflow-hidden bg-[#071714] pb-16 pt-[calc(var(--header-h)+1rem)] text-cream md:pb-24">
      <div className="shell">
        <header className="mb-6 max-w-4xl md:mb-9">
          <p className="eyebrow eyebrow-light">TripNest Atlas · Ghana</p>
          <h1 className="mt-3 font-display text-[clamp(2.3rem,5vw,4.5rem)] leading-[.98] tracking-[-.035em] text-cream">
            Find your way into <em className="text-gold-100">Ghana.</em>
          </h1>
          <p className="mt-4 max-w-2xl text-[0.94rem] leading-relaxed text-cream/65 md:text-base">
            Drift from the continent to the coast, then explore the places and experiences that make each journey your own.
          </p>
        </header>

        {status === "error" && (
          <div role="status" className="mb-4 border border-gold/35 bg-gold/[0.08] px-4 py-3 text-sm text-cream/85">
            <p className="font-semibold text-gold-100">Showing the 2D map fallback</p>
            <p className="mt-1 text-[0.82rem] leading-relaxed">{error} Configure the token and restart the app to enable terrain and satellite imagery.</p>
          </div>
        )}

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,.8fr)] lg:gap-7">
          <div className="sticky top-[calc(var(--header-h)+12px)] z-10">
            <div className="relative h-[min(68svh,760px)] min-h-[390px] overflow-hidden border border-cream/15 bg-[#10231f] shadow-[0_35px_100px_-50px_rgba(0,0,0,.9)] md:min-h-[500px]">
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

              {status === "loading" && <GlobeLoadingScreen label="Streaming terrain and imagery from Cesium ion" />}

              <div className="absolute inset-x-3 top-3 z-20 md:left-4 md:right-4 md:top-4">
                <div className="relative flex max-w-xl items-center gap-2 border border-white/15 bg-[#0d211d]/90 p-2 shadow-float backdrop-blur-xl">
                  <svg className="ml-1 shrink-0 text-gold-100/80" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
                    placeholder="Search places, regions or interests"
                    className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[0.8rem] text-cream outline-none placeholder:text-cream/45"
                  />
                  <select
                    aria-label="Filter places by category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="max-w-[116px] border-l border-white/15 bg-transparent py-2 pl-2 text-[0.72rem] text-cream outline-none"
                  >
                    <option value="all" className="bg-[#10231f]">All interests</option>
                    {categories.map((value) => (
                      <option key={value} value={value} className="bg-[#10231f]">
                        {CATEGORY_LABELS[value] ?? value}
                      </option>
                    ))}
                  </select>
                </div>

                <AnimatePresence>
                  {searchOpen && (query || category !== "all") && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-1 max-w-xl border border-white/10 bg-[#10231f]/95 p-1.5 shadow-float backdrop-blur-xl"
                    >
                      {matches.length ? matches.map((place) => (
                        <button
                          key={explorerId(place)}
                          type="button"
                          onClick={() => selectLocation(explorerId(place))}
                          className="flex w-full items-center gap-3 px-2 py-2 text-left transition hover:bg-white/[0.07]"
                        >
                          <span className="relative h-10 w-12 shrink-0 overflow-hidden bg-forest">
                            <span className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${JSON.stringify(place.image).slice(1, -1)})` }} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-base text-cream">{place.name}</span>
                            <span className="block truncate text-[0.66rem] uppercase tracking-[0.1em] text-cream/50">{place.region} · {place.categories[0] ? (CATEGORY_LABELS[place.categories[0]] ?? place.categories[0]) : "Place"}</span>
                          </span>
                          <span aria-hidden className="text-gold-100">â†’</span>
                        </button>
                      )) : (
                        <p className="px-3 py-3 text-sm text-cream/60">No published places match that search.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2 md:bottom-4 md:left-4">
                <button type="button" onClick={() => globeRef.current?.overview()} disabled={status !== "ready"} className="tn-map-control">
                  Ghana overview
                </button>
                <button type="button" onClick={() => globeRef.current?.zoomIn()} disabled={status !== "ready"} aria-label="Zoom in" className="tn-map-control tn-map-icon">
                  +
                </button>
                <button type="button" onClick={() => globeRef.current?.zoomOut()} disabled={status !== "ready"} aria-label="Zoom out" className="tn-map-control tn-map-icon">
                  −
                </button>
              </div>

              {status === "ready" && (
                <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden items-center gap-2 text-[0.62rem] uppercase tracking-[0.15em] text-white/65 md:flex">
                  <span className="tn-marker-pulse h-2 w-2 rounded-full bg-gold" /> Select a marker to explore
                </div>
              )}

              {hovered && !selected && (
                <div className="pointer-events-none absolute bottom-16 right-4 z-20 max-w-[220px] border border-white/15 bg-[#10231f]/90 px-3 py-2 text-cream shadow-float backdrop-blur">
                  <p className="font-display text-lg leading-tight">{hovered.name}</p>
                  <p className="mt-0.5 text-[0.68rem] text-cream/60">{hovered.region} · {hovered.geo_precision === "approximate" ? "Approximate area" : "Mapped location"}</p>
                </div>
              )}
            </div>

            <p className="mt-2 flex items-start gap-2 text-[0.65rem] leading-relaxed text-cream/45">
              <span aria-hidden className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
              Terrain and imagery via Cesium ion. Coordinates use TripNest’s published records; approximate areas are labelled.
            </p>
          </div>

          <div ref={storyRef} className="min-w-0 pb-6">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <p className="eyebrow eyebrow-light text-[0.6rem]">A route through Ghana</p>
                <h2 className="mt-1 font-display text-[1.8rem] leading-tight text-cream">Choose your first stop.</h2>
              </div>
              <span className="pb-1 text-[0.65rem] uppercase tracking-[0.14em] text-cream/45">{featured.length} places</span>
            </div>

            <div className="sticky top-[calc(var(--header-h)+12px)] z-20 mb-4 min-h-[194px] lg:static">
              {selected ? (
                <DestinationInfoPanel
                  location={selected}
                  related={related}
                  isSignedIn={isSignedIn}
                  onClose={() => setSelectedId(null)}
                />
              ) : (
                <div className="flex min-h-[194px] items-center justify-between gap-4 border border-white/10 bg-white/[0.035] p-5 text-cream/55">
                  <div>
                    <p className="eyebrow eyebrow-light text-[0.58rem]">Your next stop</p>
                    <p className="mt-2 max-w-xs font-display text-xl leading-tight text-cream/80">Select a marker or place to see the story behind it.</p>
                  </div>
                  <span aria-hidden className="tn-marker-pulse flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/45 text-gold-100">+</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
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
                    className={`explorer-stop-card group flex w-full items-center gap-3 border p-2.5 text-left transition duration-500 md:gap-4 md:p-3 ${
                      active
                        ? "border-gold/55 bg-[#16352c] shadow-[0_18px_45px_-32px_rgba(201,154,69,.65)]"
                        : "border-white/10 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="relative h-[72px] w-[88px] shrink-0 overflow-hidden bg-forest md:h-[82px] md:w-[108px]">
                      {/* These records use locally credited TripNest photography. */}
                      <span className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${JSON.stringify(place.image).slice(1, -1)})` }} />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold-100/75">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span className="h-px w-5 bg-gold/50" />
                        <span>{place.region}</span>
                      </span>
                      <span className="mt-1 block truncate font-display text-[1.2rem] leading-tight text-cream md:text-[1.35rem]">{place.name}</span>
                      <span className="mt-1 block line-clamp-1 text-[0.7rem] leading-snug text-cream/55">{place.summary}</span>
                    </span>
                    <span aria-hidden className="shrink-0 text-gold-100/60 transition-transform duration-300 group-hover:translate-x-1">â†’</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[0.7rem] leading-relaxed text-cream/45">
              Scroll to travel between the featured stops, or select any marker. Drag to orbit and use the controls to zoom.
            </p>
          </div>
        </div>

        {status === "error" && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((place) => (
              <button key={explorerId(place)} type="button" onClick={() => selectLocation(explorerId(place))} className="border border-white/10 bg-white/[0.04] p-4 text-left hover:bg-white/[0.08]">
                <span className="eyebrow eyebrow-light text-[0.58rem]">{place.region}</span>
                <span className="mt-1 block font-display text-xl">{place.name}</span>
                <span className="mt-1 block line-clamp-2 text-xs text-cream/60">{place.summary}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
