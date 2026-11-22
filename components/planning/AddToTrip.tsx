"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { addAttractionToTripAction } from "@/lib/actions/trips";

/**
 * Adds an attraction to one of the traveller's existing trips (or signposts
 * creating a trip if they have none). Uses a real server action + form post.
 */
export default function AddToTrip({
  attractionId,
  trips,
  returnTo,
  isSignedIn,
  tone = "light",
}: {
  attractionId: number;
  trips: { id: number; name: string; start_date: string | null }[];
  returnTo: string;
  isSignedIn: boolean;
  /** "dark" renders light-on-dark styling for use over photography. */
  tone?: "light" | "dark";
}) {
  const outline = tone === "dark" ? "btn btn-ghost-light btn-sm" : "btn btn-outline btn-sm";
  const caret = tone === "dark" ? "text-cream/60" : "text-forest/50";
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  if (!isSignedIn) {
    return (
      <Link href={`/sign-in?next=${encodeURIComponent(returnTo)}`} className={outline}>
        Sign in to add to a trip
      </Link>
    );
  }

  if (trips.length === 0) {
    return (
      <Link href="/dashboard/trips/new" className={outline}>
        Create a trip to add this
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={outline}
      >
        Add to a trip
        <span aria-hidden className={caret}>▾</span>
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-72 border border-line bg-white p-3 shadow-float">
          <p className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Choose a trip
          </p>
          <form ref={formRef} action={addAttractionToTripAction} className="space-y-1.5">
            <input type="hidden" name="attractionId" value={attractionId} />
            <input type="hidden" name="returnTo" value={returnTo} />
            {trips.map((trip) => (
              <button
                key={trip.id}
                type="submit"
                name="tripId"
                value={trip.id}
                className="flex w-full items-center justify-between gap-3 rounded px-2 py-2 text-left text-[0.84rem] text-forest hover:bg-cream-200"
              >
                <span className="font-medium">{trip.name}</span>
                <span className="text-[0.7rem] text-muted">{trip.start_date ?? "No dates"}</span>
              </button>
            ))}
          </form>
        </div>
      )}
    </div>
  );
}
