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
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.99 }}
          transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          aria-label={`${location.name} destination details`}
          className="relative overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-float"
        >
          <div className="grid grid-cols-[110px_1fr]">
            <div className="relative min-h-[144px] bg-sand">
              <SmartImage
                src={location.image}
                alt={location.name}
                fill
                sizes="110px"
                fallbackLabel={location.name}
                className="object-cover"
              />
            </div>
            <div className="min-w-0 p-4 pr-10">
              <p className="font-mono text-[0.64rem] uppercase tracking-wider text-muted">
                {location.region}, Ghana
              </p>
              <h2 className="mt-0.5 font-sans text-[1.22rem] font-semibold leading-tight tracking-[-0.025em] text-ink">
                {location.name}
              </h2>
              <p className="mt-1.5 line-clamp-3 text-[0.8rem] leading-relaxed text-muted">
                {location.description}
              </p>
              {location.categories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {location.categories.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-sand px-2.5 py-0.5 text-[0.66rem] font-medium capitalize text-ink"
                    >
                      {item.replaceAll("-", " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close destination details"
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-muted transition hover:border-ink/30 hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          <div className="grid grid-cols-2 gap-4 border-t border-line bg-cream-50 px-4 py-3">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">Best time</p>
              <p className="mt-1 line-clamp-2 text-[0.76rem] leading-snug text-ink">
                {location.best_time ?? "Check local conditions before travelling."}
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">Travel note</p>
              <p className="mt-1 line-clamp-2 text-[0.76rem] leading-snug text-ink">
                {location.getting_there ?? location.nearest_town ?? "Open the guide for local travel details."}
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <div className="border-t border-line px-4 py-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                Nearby experiences
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {related.slice(0, 3).map((place) => (
                  <Link
                    key={`${place.kind}-${place.slug}`}
                    href={place.href}
                    className="rounded-full border border-line bg-white px-2.5 py-1 text-[0.72rem] font-medium text-ink transition hover:border-ink/30 hover:bg-sand"
                  >
                    {place.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 border-t border-line p-3.5">
            <Link href={location.href} className="btn btn-primary btn-sm">
              Open guide <span aria-hidden>→</span>
            </Link>
            {planHref && (
              <Link href={planHref} className="btn btn-outline btn-sm">
                Plan a trip
              </Link>
            )}
            <SaveButton
              kind={location.kind}
              id={location.id}
              initialSaved={location.saved}
              nextPath="/explore"
              label="Save"
            />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
