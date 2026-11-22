export type Role = "TRAVELLER" | "PROVIDER" | "ADMIN";
export type ContentStatus = "SEED" | "VERIFIED";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  kind: "DESTINATION" | "ATTRACTION";
  description: string | null;
  image: string | null;
  sort: number;
}

export interface Destination {
  id: number;
  slug: string;
  name: string;
  region: string;
  tagline: string | null;
  summary: string;
  description: string;
  hero_image: string;
  hero_credit: string | null;
  lat: number | null;
  lng: number | null;
  geo_precision: "exact" | "approximate";
  best_time: string | null;
  getting_there: string | null;
  getting_around: string | null;
  featured: number;
  published: number;
  content_status: ContentStatus;
  sort: number;
  categories?: string[];
  attraction_count?: number;
  stay_count?: number;
}

export interface Attraction {
  id: number;
  slug: string;
  name: string;
  destination_id: number | null;
  destination_name?: string | null;
  destination_slug?: string | null;
  region: string;
  nearest_town: string | null;
  summary: string;
  description: string;
  image: string;
  lat: number | null;
  lng: number | null;
  geo_precision: "exact" | "approximate";
  hidden_gem: number;
  featured: number;
  published: number;
  content_status: ContentStatus;
  categories?: string[];
}

export interface Accommodation {
  id: number;
  slug: string;
  name: string;
  destination_id: number;
  destination_name?: string;
  destination_slug?: string;
  region?: string;
  provider_id: number | null;
  type: "HOTEL" | "HOSTEL" | "APARTMENT";
  price_per_night: number;
  description: string;
  address: string | null;
  area: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  image: string;
  image_kind: "AREA_ILLUSTRATION" | "PROPERTY_PHOTO" | "PLACEHOLDER";
  status: "PENDING" | "APPROVED" | "REJECTED";
  published: number;
  content_status: ContentStatus;
  amenities?: string[];
}

export interface Trip {
  id: number;
  user_id: number;
  name: string;
  destination_id: number | null;
  destination_name?: string | null;
  destination_slug?: string | null;
  destination_image?: string | null;
  start_date: string | null;
  end_date: string | null;
  travellers: number;
  notes: string | null;
  entry_count?: number;
  budget_total?: number;
  created_at?: string | null;
}

export interface ItineraryEntry {
  id: number;
  trip_id: number;
  entry_date: string;
  start_time: string | null;
  title: string;
  attraction_id: number | null;
  notes: string | null;
  estimated_cost: number;
  sort: number;
}

export interface BudgetEntry {
  id: number;
  trip_id: number;
  category: "ACCOMMODATION" | "FOOD" | "TRANSPORT" | "ACTIVITIES" | "OTHER";
  label: string;
  amount: number;
  notes: string | null;
}

export interface SavedDestination extends Destination {
  saved_id: number;
  saved_at: string;
}
export interface SavedAttraction extends Attraction {
  saved_id: number;
  saved_at: string;
}

export const BUDGET_CATEGORIES = [
  "ACCOMMODATION",
  "FOOD",
  "TRANSPORT",
  "ACTIVITIES",
  "OTHER",
] as const;

export const BUDGET_LABELS: Record<string, string> = {
  ACCOMMODATION: "Accommodation",
  FOOD: "Food & drink",
  TRANSPORT: "Transport",
  ACTIVITIES: "Activities",
  OTHER: "Other",
};
