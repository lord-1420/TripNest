"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeroSearch from "@/components/home/HeroSearch";

const SCENES = [
  { label: "Atlantic Coastline", region: "Western & Central" },
  { label: "Cape Coast Castle", region: "Central Region" },
  { label: "Kakum Canopy", region: "Rainforest" },
  { label: "Wli Waterfalls", region: "Volta Region" },
  { label: "Lake Volta", region: "Eastern & Volta" },
];

export default function Hero({
  counts,
  categories,
}: {
  counts: { destinations: number; experiences: number; stays: number };
  categories: { slug: string; name: string }[];
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const idx = Math.min(
        SCENES.length - 1,
        Math.floor((video.currentTime / video.duration) * SCENES.length),
      );
      setSceneIndex(idx);
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <section className="relative isolate flex min-h-[min(860px,94svh)] flex-col justify-end overflow-hidden bg-[#0c1411]">
      {/* Multi-scene Ghana background video with instant poster fallback */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/editorial-hero.jpg"
          className="h-full w-full object-cover object-center brightness-[0.82] contrast-[1.04] saturate-[1.06]"
        >
          <source src="/videos/hero-ghana.mp4" type="video/mp4" />
        </video>
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

        {/* Floating Airbnb-style search pill inside hero */}
        <div className="mt-8 max-w-4xl">
          <HeroSearch categories={categories} variant="hero" />
        </div>

        {/* Bottom bar: quick action + live scene indicator */}
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
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={paused ? "Play hero video" : "Pause hero video"}
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
