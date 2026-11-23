"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import HeroSearch from "@/components/home/HeroSearch";

const SCENES = [
  {
    src: "/images/editorial-hero.jpg",
    alt: "Golden-hour light on a palm-lined beach along Ghana's coast",
    label: "Atlantic Coastline",
    region: "Western & Central",
    pos: "object-[50%_60%]",
  },
  {
    src: "/images/att-cape-coast-castle.jpg",
    alt: "Cape Coast Castle overlooking the Atlantic Ocean",
    label: "Cape Coast Castle",
    region: "Central Region",
    pos: "object-center",
  },
  {
    src: "/images/att-kakum.jpg",
    alt: "Rainforest canopy walkway at Kakum National Park",
    label: "Kakum Canopy",
    region: "Rainforest",
    pos: "object-center",
  },
  {
    src: "/images/att-wli-falls.jpg",
    alt: "Wli Waterfalls cascading down lush cliffs in the Volta Region",
    label: "Wli Waterfalls",
    region: "Volta Region",
    pos: "object-[50%_35%]",
  },
  {
    src: "/images/editorial-volta.jpg",
    alt: "Calm waters and green hills along Lake Volta",
    label: "Lake Volta",
    region: "Eastern & Volta",
    pos: "object-center",
  },
];

const SLIDE_MS = 5500;

export default function Hero({
  counts: _counts,
  categories,
}: {
  counts: { destinations: number; experiences: number; stays: number };
  categories: { slug: string; name: string }[];
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % SCENES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="relative isolate flex min-h-[min(860px,94svh)] flex-col justify-end overflow-hidden bg-[#0c1411]">
      {/* Silky GPU-accelerated multi-scene backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {SCENES.map((scene, i) => {
          const active = i === sceneIndex;
          return (
            <div
              key={scene.src}
              aria-hidden={!active}
              className={clsx(
                "absolute inset-0 transition-opacity duration-[1400ms] ease-out",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scene.src}
                alt={scene.alt}
                className={clsx(
                  "h-full w-full object-cover brightness-[0.82] contrast-[1.04] saturate-[1.06] will-change-transform transition-transform ease-linear",
                  scene.pos,
                  active && !paused ? "scale-[1.07] duration-[6500ms]" : "scale-100 duration-[1400ms]",
                )}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 via-[45%] to-black/75" />
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-12 pt-[calc(var(--header-h)+4.5rem)] md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(3rem,7vw,5.6rem)] font-bold leading-[1.01] tracking-[-0.04em] text-white">
            Discover Ghana,
            <span className="block text-white/80">effortlessly.</span>
          </h1>

          <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/80 md:text-[1.12rem]">
            Curated destinations, verified local stays, and an interactive 3D map — everything you need to
            plan a trip across Ghana in one clean workspace.
          </p>
        </div>

        {/* Floating Airbnb-style search pill */}
        <div className="mt-8 max-w-4xl">
          <HeroSearch categories={categories} variant="hero" />
        </div>

        {/* Bottom bar: quick action + interactive scene switcher */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink transition hover:bg-white/90"
            >
              Launch 3D Globe
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.82rem] font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Build an itinerary
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-right sm:flex">
              <span className="font-mono text-[0.68rem] text-white/55">
                0{sceneIndex + 1}/0{SCENES.length}
              </span>
              <span className="text-[0.76rem] font-medium text-white/90">
                {SCENES[sceneIndex].label}
              </span>
              <span className="text-[0.72rem] text-white/55">· {SCENES[sceneIndex].region}</span>
            </div>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero scenes">
              {SCENES.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={i === sceneIndex}
                  aria-label={`Show ${s.label}`}
                  onClick={() => setSceneIndex(i)}
                  className={clsx(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === sceneIndex ? "w-5 bg-white" : "w-1.5 bg-white/35 hover:bg-white/65",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              {paused ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4l15 8-15 8V4z" />
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
