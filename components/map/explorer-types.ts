export type ExplorerKind = "destination" | "attraction";

export interface ExplorerLocation {
  id: number;
  slug: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  image: string;
  summary: string;
  description: string;
  categories: string[];
  geo_precision: "exact" | "approximate";
  kind: ExplorerKind;
  href: string;
  saved: boolean;
  tagline?: string | null;
  best_time?: string | null;
  getting_there?: string | null;
  hidden_gem?: number;
  nearest_town?: string | null;
  destination_name?: string | null;
  destination_slug?: string | null;
  travelTips?: { title: string; body: string }[];
}

export const FEATURED_EXPLORER_SLUGS = [
  "accra",
  "kumasi",
  "cape-coast",
  "kakum-national-park",
  "lake-bosumtwi",
  "aburi",
] as const;

export function explorerId(location: Pick<ExplorerLocation, "kind" | "slug">) {
  return `${location.kind}-${location.slug}`;
}
