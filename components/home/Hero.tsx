"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import HeroSearch from "@/components/home/HeroSearch";
import BackgroundVideo from "@/components/common/BackgroundVideo";

const SCENES = [
  { asset: "cape-coast", label: "Cape Coast Castle", region: "Central Region" },
  { asset: "accra-shore", label: "Accra Coastline", region: "Greater Accra" },
  { asset: "peduase", label: "Peduase Hills", region: "Eastern Region" },
];

export default function Hero({
  counts: _counts,
  categories,
}: {
  counts: { destinations: number; experiences: number; stays: number };
  categories: { slug: string; name: string }[];
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene = SCENES[sceneIndex];

  return (
    <section className="relative isolate flex min-h-[min(860px,94svh)] flex-col justify-end overflow-hidden bg-[#0c1411]">
      <div className="shell flex flex-1 flex-col justify-end pb-12 pt-[calc(var(--header-h)+4.5rem)] md:pb-16">
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
                {scene.label}
              </span>
              <span className="text-[0.72rem] text-white/55">· {scene.region}</span>
            </div>

            <div className="flex items-center gap-1.5" role="group" aria-label="Ghana video scenes">
              {SCENES.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={i === sceneIndex}
                  aria-label={`Show ${s.label}`}
                  onClick={() => setSceneIndex(i)}
                  className={clsx(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === sceneIndex ? "w-5 bg-white" : "w-1.5 bg-white/35 hover:bg-white/65",
                  )}
                />
              ))}
            </div>

            <BackgroundVideo
              src={`/videos/${scene.asset}.mp4`}
              poster={`/videos/${scene.asset}.webp`}
              overlayClassName="absolute inset-0 bg-gradient-to-b from-black/45 via-black/45 via-[45%] to-black/75"
              onEnded={() => setSceneIndex((index) => (index + 1) % SCENES.length)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
