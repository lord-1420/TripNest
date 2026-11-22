import type { Metadata } from "next";
import MapExplorer from "@/components/map/MapExplorer";
import { getSession } from "@/lib/auth";
import { isAttractionSaved, isDestinationSaved, mapPoints } from "@/lib/queries";
import type { ExplorerLocation } from "@/components/map/explorer-types";

export const metadata: Metadata = {
  title: "Explore Ghana in 3D | TripNest",
  description:
    "Explore Ghana's destinations on an interactive 3D globe, with real terrain, destination photography and travel information.",
};

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const user = await getSession();
  const { destinations, attractions } = mapPoints();

  const locations: ExplorerLocation[] = [
    ...destinations.map((place) => ({
      ...place,
      kind: "destination" as const,
      href: `/destinations/${place.slug}`,
      saved: isDestinationSaved(user?.id ?? null, place.id),
    })),
    ...attractions.map((place) => ({
      ...place,
      kind: "attraction" as const,
      href: `/experiences/${place.slug}`,
      saved: isAttractionSaved(user?.id ?? null, place.id),
    })),
  ];

  return (
    <MapExplorer
      locations={locations}
      ionToken={process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN ?? ""}
      isSignedIn={Boolean(user)}
    />
  );
}
