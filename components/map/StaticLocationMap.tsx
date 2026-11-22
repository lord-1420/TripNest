import Link from "next/link";
import LeafletMap from "./LeafletMap";

/**
 * Location panel for a destination or attraction detail page. If coordinates
 * are missing we show a location label instead of inventing a marker.
 */
export default function StaticLocationMap({
  name,
  lat,
  lng,
  region,
  precision,
  height = "340px",
}: {
  name: string;
  lat: number | null;
  lng: number | null;
  region: string;
  precision: "exact" | "approximate";
  height?: string;
}) {
  if (lat == null || lng == null) {
    return (
      <div className="flex h-[220px] flex-col items-center justify-center border border-dashed border-line bg-cream/60 px-6 text-center">
        <p className="font-display text-lg text-forest">{name}</p>
        <p className="mt-1 text-sm text-muted">Location: {region}, Ghana</p>
        <p className="mt-3 max-w-xs text-[0.72rem] text-muted/80">
          We do not have verified coordinates for this place yet, so no map marker is shown.
        </p>
      </div>
    );
  }

  return (
    <div>
      <LeafletMap
        points={[
          {
            id: `${name}-${lat}-${lng}`,
            name,
            sublabel: `${region}, Ghana`,
            lat,
            lng,
            kind: "destination",
          },
        ]}
        center={[lat, lng]}
        zoom={precision === "exact" ? 11 : 9}
        height={height}
        interactive
        className="w-full"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-muted">
        <span>
          {lat.toFixed(4)}° N, {Math.abs(lng).toFixed(4)}° {lng < 0 ? "W" : "E"} ·{" "}
          {precision === "exact" ? "exact coordinates" : "approximate area"}
        </span>
        <Link href="/explore" className="font-semibold text-forest hover:text-gold-600">
          Open map explorer →
        </Link>
      </div>
    </div>
  );
}
