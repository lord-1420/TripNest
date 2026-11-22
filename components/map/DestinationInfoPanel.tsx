"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import SaveButton from "@/components/planning/SaveButton";
import SmartImage from "@/components/common/SmartImage";
import type { ExplorerLocation } from "./explorer-types";

export default function DestinationInfoPanel({
  location,
  related,
  isSignedIn,
  onClose,
}: {
  location: ExplorerLocation | null;
  related: ExplorerLocation[];
  isSignedIn: boolean;
  onClose: () => void;
}) {
  const tripDestinationSlug = location
    ? location.kind === "destination"
      ? location.slug
      : location.destination_slug
    : undefined;
  const tripPath = tripDestinationSlug
    ? `/dashboard/trips/new?destination=${encodeURIComponent(tripDestinationSlug)}`
    : undefined;
  const planHref = tripPath
    ? isSignedIn
      ? tripPath
      : `/sign-in?next=${encodeURIComponent(tripPath)}`
    : undefined;

  return (
    <AnimatePresence mode="wait">
      {location && (
        <motion.aside
          key={`${location.kind}-${location.slug}`}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
          aria-label={`${location.name} destination details`}
          className="relative overflow-hidden border border-cream/20 bg-[#10231f]/95 text-cream shadow-[0_24px_80px_-30px_rgba(0,0,0,.75)] backdrop-blur-xl"
        >
          <div className="grid grid-cols-[112px_1fr]">
            <div className="relative min-h-[148px] bg-forest">
              <SmartImage
                src={location.image}
                alt={location.name}
                fill
                sizes="112px"
                fallbackLabel={location.name}
                fallbackTone="light"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
            </div>
            <div className="min-w-0 p-4 pr-10">
              <p className="eyebrow eyebrow-light text-[0.58rem]">{location.region}, Ghana</p>
              <h2 className="mt-1 font-display text-[1.42rem] leading-tight text-cream">{location.name}</h2>
              <p className="mt-2 line-clamp-3 text-[0.78rem] leading-relaxed text-cream/70">{location.description}</p>
              {location.categories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {location.categories.slice(0, 2).map((item) => (
                    <span key={item} className="rounded-full border border-gold-100/20 px-2 py-0.5 text-[0.57rem] uppercase tracking-[0.1em] text-gold-100/75">{item.replaceAll("-", " ")}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close destination details"
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 bg-ink/35 text-cream transition hover:bg-cream/15 focus-visible:outline-cream"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          <div className="grid grid-cols-2 gap-4 border-t border-cream/10 px-4 py-3">
            <div>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold-100/75">Best time</p>
              <p className="mt-1 line-clamp-2 text-[0.72rem] leading-snug text-cream/80">
                {location.best_time ?? "Check local conditions before travelling."}
              </p>
            </div>
            <div>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold-100/75">Travel note</p>
              <p className="mt-1 line-clamp-2 text-[0.72rem] leading-snug text-cream/80">
                {location.getting_there ?? location.nearest_town ?? "Open the guide for local travel information."}
              </p>
            </div>
          </div>

          {location.travelTips && location.travelTips.length > 0 && (
            <div className="border-t border-cream/10 px-4 py-3">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold-100/75">Travel tips</p>
              <p className="mt-1 line-clamp-2 text-[0.72rem] leading-relaxed text-cream/75">
                {location.travelTips[0].title}: {location.travelTips[0].body}
              </p>
            </div>
          )}

          {related.length > 0 && (
            <div className="border-t border-cream/10 px-4 py-3">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold-100/75">
                Nearby experiences &amp; activities
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {related.slice(0, 3).map((place) => (
                  <Link
                    key={`${place.kind}-${place.slug}`}
                    href={place.href}
                    className="rounded-full border border-cream/15 px-2.5 py-1 text-[0.67rem] text-cream/80 transition hover:border-gold/60 hover:text-cream"
                  >
                    {place.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 border-t border-cream/10 p-3.5">
            <Link href={location.href} className="btn btn-gold btn-sm">
              Explore guide <span aria-hidden>→</span>
            </Link>
            {planHref && <Link href={planHref} className="btn btn-ghost-light btn-sm">Plan a trip</Link>}
            <SaveButton
              kind={location.kind}
              id={location.id}
              initialSaved={location.saved}
              nextPath="/explore"
              label="Save place"
              tone="dark"
            />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
