import "server-only";
import { getDb } from "./db";
import type {
  Accommodation,
  Attraction,
  Category,
  Destination,
  Trip,
  ItineraryEntry,
  BudgetEntry,
} from "./types";

const db = () => getDb();

/* ------------------------------------------------------------------ */
/* Reference data                                                      */
/* ------------------------------------------------------------------ */

export function listCategories(kind?: "DESTINATION" | "ATTRACTION"): Category[] {
  if (kind) {
    return db()
      .prepare("SELECT * FROM categories WHERE kind = ? OR kind = 'BOTH' ORDER BY sort, name")
      .all(kind) as Category[];
  }
  return db().prepare("SELECT * FROM categories ORDER BY sort, name").all() as Category[];
}

export function listRegions(): string[] {
  const rows = db()
    .prepare(
      `SELECT region, COUNT(*) AS n FROM destinations WHERE published = 1 GROUP BY region ORDER BY region`,
    )
    .all() as { region: string }[];
  return rows.map((r) => r.region);
}

export function listAmenities() {
  return db().prepare("SELECT * FROM amenities ORDER BY name").all() as {
    id: number;
    slug: string;
    name: string;
  }[];
}

export function categoryBySlug(slug: string): Category | undefined {
  return db().prepare("SELECT * FROM categories WHERE slug = ?").get(slug) as Category | undefined;
}

/* ------------------------------------------------------------------ */
/* Destinations                                                        */
/* ------------------------------------------------------------------ */

const DEST_CATS = `(
  SELECT group_concat(c.slug, '|') FROM destination_categories dc
  JOIN categories c ON c.id = dc.category_id WHERE dc.destination_id = d.id
) AS categories`;

function hydrateDestination(row: Record<string, unknown> | undefined): Destination | undefined {
  if (!row) return undefined;
  const d = row as unknown as Destination & { categories: string | null };
  return {
    ...d,
    categories: d.categories ? String(d.categories).split("|").filter(Boolean) : [],
  };
}

export interface DestinationFilters {
  q?: string;
  region?: string;
  category?: string;
  hiddenGem?: boolean;
  featured?: boolean;
  page?: number;
  perPage?: number;
  sort?: "featured" | "az" | "recent";
  includeUnpublished?: boolean;
}

export function listDestinations(filters: DestinationFilters = {}) {
  const {
    q,
    region,
    category,
    hiddenGem,
    featured,
    page = 1,
    perPage = 9,
    sort = "featured",
    includeUnpublished = false,
  } = filters;

  const where: string[] = [];
  const params: unknown[] = [];
  if (!includeUnpublished) where.push("d.published = 1");
  if (q && q.trim()) {
    where.push("(d.name LIKE ? OR d.region LIKE ? OR d.summary LIKE ? OR d.tagline LIKE ?)");
    const term = `%${q.trim()}%`;
    params.push(term, term, term, term);
  }
  if (region) {
    where.push("d.region = ?");
    params.push(region);
  }
  if (category) {
    where.push(
      "EXISTS (SELECT 1 FROM destination_categories dc JOIN categories c ON c.id = dc.category_id WHERE dc.destination_id = d.id AND c.slug = ?)",
    );
    params.push(category);
  }
  if (hiddenGem) where.push("EXISTS (SELECT 1 FROM attractions a WHERE a.destination_id = d.id AND a.hidden_gem = 1 AND a.published = 1)");
  if (featured) where.push("d.featured = 1");

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const orderSql =
    sort === "az" ? "ORDER BY d.name ASC" : sort === "recent" ? "ORDER BY d.created_at DESC, d.id DESC" : "ORDER BY d.featured DESC, d.sort ASC, d.name ASC";

  const total = (db()
    .prepare(`SELECT COUNT(*) AS n FROM destinations d ${whereSql}`)
    .get(...params) as { n: number }).n;

  const rows = db()
    .prepare(
      `SELECT d.*, ${DEST_CATS},
        (SELECT COUNT(*) FROM attractions a WHERE a.destination_id = d.id AND a.published = 1) AS attraction_count,
        (SELECT COUNT(*) FROM accommodations s WHERE s.destination_id = d.id AND s.status = 'APPROVED' AND s.published = 1) AS stay_count
       FROM destinations d ${whereSql} ${orderSql} LIMIT ? OFFSET ?`,
    )
    .all(...params, perPage, (page - 1) * perPage) as Record<string, unknown>[];

  return {
    items: rows.map((r) => hydrateDestination(r) as Destination),
    total,
    page,
    perPage,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

export function getDestination(slug: string): Destination | undefined {
  const row = db()
    .prepare(
      `SELECT d.*, ${DEST_CATS},
        (SELECT COUNT(*) FROM attractions a WHERE a.destination_id = d.id AND a.published = 1) AS attraction_count,
        (SELECT COUNT(*) FROM accommodations s WHERE s.destination_id = d.id AND s.status = 'APPROVED' AND s.published = 1) AS stay_count
       FROM destinations d WHERE d.slug = ?`,
    )
    .get(slug) as Record<string, unknown> | undefined;
  return hydrateDestination(row);
}

export function destinationById(id: number): Destination | undefined {
  const row = db().prepare("SELECT * FROM destinations WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  return hydrateDestination(row);
}

export function destinationGallery(destinationId: number) {
  return db()
    .prepare("SELECT * FROM destination_images WHERE destination_id = ? ORDER BY sort, id")
    .all(destinationId) as { id: number; url: string; alt: string; caption: string | null; credit: string | null }[];
}

export function destinationTips(destinationId: number) {
  return db()
    .prepare("SELECT * FROM destination_tips WHERE destination_id = ? ORDER BY sort, id")
    .all(destinationId) as { id: number; title: string; body: string }[];
}

export function destinationChecklist(destinationId: number) {
  return db()
    .prepare("SELECT * FROM destination_checklist WHERE destination_id = ? ORDER BY sort, id")
    .all(destinationId) as { id: number; label: string }[];
}

export function relatedDestinations(destination: Destination, limit = 3): Destination[] {
  const rows = db()
    .prepare(
      `SELECT d.*, ${DEST_CATS} FROM destinations d
       WHERE d.published = 1 AND d.id <> ?
       ORDER BY CASE WHEN d.region = ? THEN 0 ELSE 1 END, d.featured DESC, d.sort ASC LIMIT ?`,
    )
    .all(destination.id, destination.region, limit) as Record<string, unknown>[];
  return rows.map((r) => hydrateDestination(r) as Destination);
}

/* ------------------------------------------------------------------ */
/* Attractions                                                         */
/* ------------------------------------------------------------------ */

const ATTR_CATS = `(
  SELECT group_concat(c.slug, '|') FROM attraction_categories ac
  JOIN categories c ON c.id = ac.category_id WHERE ac.attraction_id = a.id
) AS categories`;

function hydrateAttraction(row: Record<string, unknown> | undefined): Attraction | undefined {
  if (!row) return undefined;
  const a = row as unknown as Attraction & { categories: string | null };
  return { ...a, categories: a.categories ? String(a.categories).split("|").filter(Boolean) : [] };
}

export interface AttractionFilters {
  q?: string;
  region?: string;
  category?: string;
  destinationId?: number;
  hiddenGem?: boolean;
  featured?: boolean;
  page?: number;
  perPage?: number;
  includeUnpublished?: boolean;
}

export function listAttractions(filters: AttractionFilters = {}) {
  const {
    q,
    region,
    category,
    destinationId,
    hiddenGem,
    featured,
    page = 1,
    perPage = 9,
    includeUnpublished = false,
  } = filters;
  const where: string[] = [];
  const params: unknown[] = [];
  if (!includeUnpublished) where.push("a.published = 1");
  if (q?.trim()) {
    where.push("(a.name LIKE ? OR a.summary LIKE ? OR a.region LIKE ? OR a.nearest_town LIKE ?)");
    const term = `%${q.trim()}%`;
    params.push(term, term, term, term);
  }
  if (region) {
    where.push("a.region = ?");
    params.push(region);
  }
  if (category) {
    where.push(
      "EXISTS (SELECT 1 FROM attraction_categories ac JOIN categories c ON c.id = ac.category_id WHERE ac.attraction_id = a.id AND c.slug = ?)",
    );
    params.push(category);
  }
  if (destinationId) {
    where.push("a.destination_id = ?");
    params.push(destinationId);
  }
  if (hiddenGem) where.push("a.hidden_gem = 1");
  if (featured) where.push("a.featured = 1");
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const total = (db()
    .prepare(`SELECT COUNT(*) AS n FROM attractions a ${whereSql}`)
    .get(...params) as { n: number }).n;

  const rows = db()
    .prepare(
      `SELECT a.*, ${ATTR_CATS}, d.name AS destination_name, d.slug AS destination_slug
       FROM attractions a LEFT JOIN destinations d ON d.id = a.destination_id
       ${whereSql} ORDER BY a.featured DESC, a.hidden_gem DESC, a.name ASC LIMIT ? OFFSET ?`,
    )
    .all(...params, perPage, (page - 1) * perPage) as Record<string, unknown>[];

  return {
    items: rows.map((r) => hydrateAttraction(r) as Attraction),
    total,
    page,
    perPage,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

export function getAttraction(slug: string): Attraction | undefined {
  const row = db()
    .prepare(
      `SELECT a.*, ${ATTR_CATS}, d.name AS destination_name, d.slug AS destination_slug
       FROM attractions a LEFT JOIN destinations d ON d.id = a.destination_id WHERE a.slug = ?`,
    )
    .get(slug) as Record<string, unknown> | undefined;
  return hydrateAttraction(row);
}

export function nearbyAttractions(attraction: Attraction, limit = 3): Attraction[] {
  const rows = db()
    .prepare(
      `SELECT a.*, ${ATTR_CATS}, d.name AS destination_name, d.slug AS destination_slug
       FROM attractions a LEFT JOIN destinations d ON d.id = a.destination_id
       WHERE a.published = 1 AND a.id <> ?
       ORDER BY CASE WHEN a.region = ? THEN 0 ELSE 1 END, a.hidden_gem DESC LIMIT ?`,
    )
    .all(attraction.id, attraction.region, limit) as Record<string, unknown>[];
  return rows.map((r) => hydrateAttraction(r) as Attraction);
}

export function featuredHiddenGems(limit = 6): Attraction[] {
  const rows = db()
    .prepare(
      `SELECT a.*, ${ATTR_CATS}, d.name AS destination_name, d.slug AS destination_slug
       FROM attractions a LEFT JOIN destinations d ON d.id = a.destination_id
       WHERE a.published = 1 AND a.hidden_gem = 1
       ORDER BY a.featured DESC, a.id ASC LIMIT ?`,
    )
    .all(limit) as Record<string, unknown>[];
  return rows.map((r) => hydrateAttraction(r) as Attraction);
}

/* ------------------------------------------------------------------ */
/* Accommodations                                                      */
/* ------------------------------------------------------------------ */

const STAY_AMENITIES = `(
  SELECT group_concat(am.name, '|') FROM accommodation_amenities aa
  JOIN amenities am ON am.id = aa.amenity_id WHERE aa.accommodation_id = s.id
) AS amenities`;

function hydrateStay(row: Record<string, unknown> | undefined): Accommodation | undefined {
  if (!row) return undefined;
  const s = row as unknown as Accommodation & { amenities: string | null };
  return { ...s, amenities: s.amenities ? String(s.amenities).split("|").filter(Boolean) : [] };
}

export interface StayFilters {
  q?: string;
  region?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc" | "recent";
  page?: number;
  perPage?: number;
  includeUnapproved?: boolean;
  destinationId?: number;
}

export function listAccommodations(filters: StayFilters = {}) {
  const {
    q,
    region,
    type,
    minPrice,
    maxPrice,
    sort = "price_asc",
    page = 1,
    perPage = 9,
    includeUnapproved = false,
    destinationId,
  } = filters;

  const where: string[] = [];
  const params: unknown[] = [];
  if (!includeUnapproved) {
    where.push("s.status = 'APPROVED' AND s.published = 1");
  }
  if (q?.trim()) {
    where.push("(s.name LIKE ? OR s.area LIKE ? OR s.description LIKE ? OR d.name LIKE ?)");
    const term = `%${q.trim()}%`;
    params.push(term, term, term, term);
  }
  if (region) {
    where.push("d.region = ?");
    params.push(region);
  }
  if (type && ["HOTEL", "HOSTEL", "APARTMENT"].includes(type)) {
    where.push("s.type = ?");
    params.push(type);
  }
  if (typeof minPrice === "number" && Number.isFinite(minPrice)) {
    where.push("s.price_per_night >= ?");
    params.push(minPrice);
  }
  if (typeof maxPrice === "number" && Number.isFinite(maxPrice)) {
    where.push("s.price_per_night <= ?");
    params.push(maxPrice);
  }
  if (destinationId) {
    where.push("s.destination_id = ?");
    params.push(destinationId);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const orderSql =
    sort === "price_desc"
      ? "ORDER BY s.price_per_night DESC"
      : sort === "recent"
        ? "ORDER BY s.created_at DESC, s.id DESC"
        : "ORDER BY s.price_per_night ASC";

  const total = (db()
    .prepare(
      `SELECT COUNT(*) AS n FROM accommodations s JOIN destinations d ON d.id = s.destination_id ${whereSql}`,
    )
    .get(...params) as { n: number }).n;

  const rows = db()
    .prepare(
      `SELECT s.*, ${STAY_AMENITIES}, d.name AS destination_name, d.slug AS destination_slug, d.region AS region
       FROM accommodations s JOIN destinations d ON d.id = s.destination_id
       ${whereSql} ${orderSql} LIMIT ? OFFSET ?`,
    )
    .all(...params, perPage, (page - 1) * perPage) as Record<string, unknown>[];

  return {
    items: rows.map((r) => hydrateStay(r) as Accommodation),
    total,
    page,
    perPage,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

export function getAccommodation(slug: string): Accommodation | undefined {
  const row = db()
    .prepare(
      `SELECT s.*, ${STAY_AMENITIES}, d.name AS destination_name, d.slug AS destination_slug, d.region AS region
       FROM accommodations s JOIN destinations d ON d.id = s.destination_id WHERE s.slug = ?`,
    )
    .get(slug) as Record<string, unknown> | undefined;
  return hydrateStay(row);
}

export function destinationStays(destinationId: number, limit = 3): Accommodation[] {
  const rows = db()
    .prepare(
      `SELECT s.*, ${STAY_AMENITIES}, d.name AS destination_name, d.slug AS destination_slug, d.region AS region
       FROM accommodations s JOIN destinations d ON d.id = s.destination_id
       WHERE s.destination_id = ? AND s.status = 'APPROVED' AND s.published = 1
       ORDER BY s.price_per_night ASC LIMIT ?`,
    )
    .all(destinationId, limit) as Record<string, unknown>[];
  return rows.map((r) => hydrateStay(r) as Accommodation);
}

export function stayPriceRange(): { min: number; max: number } {
  const row = db()
    .prepare(
      "SELECT MIN(price_per_night) AS min, MAX(price_per_night) AS max FROM accommodations WHERE status = 'APPROVED' AND published = 1",
    )
    .get() as { min: number | null; max: number | null };
  return { min: row?.min ?? 0, max: row?.max ?? 1000 };
}

/* ------------------------------------------------------------------ */
/* Saved places                                                        */
/* ------------------------------------------------------------------ */

export function savedDestinations(userId: number): Destination[] {
  const rows = db()
    .prepare(
      `SELECT d.*, ${DEST_CATS}, sp.id AS saved_id, sp.created_at AS saved_at
       FROM saved_places sp JOIN destinations d ON d.id = sp.destination_id
       WHERE sp.user_id = ? ORDER BY sp.created_at DESC`,
    )
    .all(userId) as Record<string, unknown>[];
  return rows.map((r) => hydrateDestination(r) as Destination);
}

export function savedAttractions(userId: number): Attraction[] {
  const rows = db()
    .prepare(
      `SELECT a.*, ${ATTR_CATS}, d.name AS destination_name, d.slug AS destination_slug,
              sp.id AS saved_id, sp.created_at AS saved_at
       FROM saved_places sp JOIN attractions a ON a.id = sp.attraction_id
       LEFT JOIN destinations d ON d.id = a.destination_id
       WHERE sp.user_id = ? ORDER BY sp.created_at DESC`,
    )
    .all(userId) as Record<string, unknown>[];
  return rows.map((r) => hydrateAttraction(r) as Attraction);
}

export function isDestinationSaved(userId: number | null, destinationId: number): boolean {
  if (!userId) return false;
  const row = db()
    .prepare("SELECT 1 AS ok FROM saved_places WHERE user_id = ? AND destination_id = ?")
    .get(userId, destinationId);
  return Boolean(row);
}

export function isAttractionSaved(userId: number | null, attractionId: number): boolean {
  if (!userId) return false;
  const row = db()
    .prepare("SELECT 1 AS ok FROM saved_places WHERE user_id = ? AND attraction_id = ?")
    .get(userId, attractionId);
  return Boolean(row);
}

export function savedCounts(userId: number) {
  const row = db()
    .prepare(
      `SELECT
         SUM(CASE WHEN destination_id IS NOT NULL THEN 1 ELSE 0 END) AS destinations,
         SUM(CASE WHEN attraction_id IS NOT NULL THEN 1 ELSE 0 END) AS attractions
       FROM saved_places WHERE user_id = ?`,
    )
    .get(userId) as { destinations: number | null; attractions: number | null };
  return { destinations: row?.destinations ?? 0, attractions: row?.attractions ?? 0 };
}

/* ------------------------------------------------------------------ */
/* Trips                                                               */
/* ------------------------------------------------------------------ */

export function listTrips(userId: number): Trip[] {
  return db()
    .prepare(
      `SELECT t.*, d.name AS destination_name, d.slug AS destination_slug, d.hero_image AS destination_image,
        (SELECT COUNT(*) FROM itinerary_entries e WHERE e.trip_id = t.id) AS entry_count,
        (SELECT COALESCE(SUM(b.amount), 0) FROM budget_entries b WHERE b.trip_id = t.id) +
        (SELECT COALESCE(SUM(e.estimated_cost), 0) FROM itinerary_entries e WHERE e.trip_id = t.id) AS budget_total
       FROM trips t LEFT JOIN destinations d ON d.id = t.destination_id
       WHERE t.user_id = ? ORDER BY COALESCE(t.start_date, t.created_at) DESC`,
    )
    .all(userId) as Trip[];
}

export function getTrip(tripId: number, userId?: number): Trip | undefined {
  const row = db()
    .prepare(
      `SELECT t.*, d.name AS destination_name, d.slug AS destination_slug, d.hero_image AS destination_image,
        (SELECT COUNT(*) FROM itinerary_entries e WHERE e.trip_id = t.id) AS entry_count
       FROM trips t LEFT JOIN destinations d ON d.id = t.destination_id WHERE t.id = ?`,
    )
    .get(tripId) as Trip | undefined;
  if (!row) return undefined;
  if (userId && row.user_id !== userId) return undefined;
  return row;
}

export function tripItinerary(tripId: number): ItineraryEntry[] {
  return db()
    .prepare(
      `SELECT e.*, a.slug AS attraction_slug, a.image AS attraction_image
       FROM itinerary_entries e LEFT JOIN attractions a ON a.id = e.attraction_id
       WHERE e.trip_id = ? ORDER BY e.entry_date ASC, COALESCE(e.start_time,'99:99') ASC, e.sort ASC, e.id ASC`,
    )
    .all(tripId) as ItineraryEntry[];
}

export function tripBudget(tripId: number): BudgetEntry[] {
  return db()
    .prepare("SELECT * FROM budget_entries WHERE trip_id = ? ORDER BY category, created_at")
    .all(tripId) as BudgetEntry[];
}

/* ------------------------------------------------------------------ */
/* Stats (admin / provider)                                            */
/* ------------------------------------------------------------------ */

export function adminStats() {
  const one = (sql: string, ...params: unknown[]) =>
    (db().prepare(sql).get(...params) as { n: number }).n;
  return {
    destinations: one("SELECT COUNT(*) AS n FROM destinations"),
    publishedDestinations: one("SELECT COUNT(*) AS n FROM destinations WHERE published = 1"),
    attractions: one("SELECT COUNT(*) AS n FROM attractions"),
    hiddenGems: one("SELECT COUNT(*) AS n FROM attractions WHERE hidden_gem = 1"),
    accommodations: one("SELECT COUNT(*) AS n FROM accommodations"),
    pendingStays: one("SELECT COUNT(*) AS n FROM accommodations WHERE status = 'PENDING'"),
    approvedStays: one("SELECT COUNT(*) AS n FROM accommodations WHERE status = 'APPROVED'"),
    travellers: one("SELECT COUNT(*) AS n FROM users WHERE role = 'TRAVELLER'"),
    providers: one("SELECT COUNT(*) AS n FROM users WHERE role = 'PROVIDER'"),
    trips: one("SELECT COUNT(*) AS n FROM trips"),
    savedPlaces: one("SELECT COUNT(*) AS n FROM saved_places"),
  };
}

export function providerStays(providerId: number): Accommodation[] {
  const rows = db()
    .prepare(
      `SELECT s.*, ${STAY_AMENITIES}, d.name AS destination_name, d.slug AS destination_slug
       FROM accommodations s JOIN destinations d ON d.id = s.destination_id
       WHERE s.provider_id = ? ORDER BY s.created_at DESC`,
    )
    .all(providerId) as Record<string, unknown>[];
  return rows.map((r) => hydrateStay(r) as Accommodation);
}

export function pendingStays(): Accommodation[] {
  const rows = db()
    .prepare(
      `SELECT s.*, ${STAY_AMENITIES}, d.name AS destination_name, d.slug AS destination_slug,
              u.name AS provider_name
       FROM accommodations s JOIN destinations d ON d.id = s.destination_id
       LEFT JOIN users u ON u.id = s.provider_id
       ORDER BY CASE s.status WHEN 'PENDING' THEN 0 WHEN 'APPROVED' THEN 1 ELSE 2 END, s.created_at DESC`,
    )
    .all() as Record<string, unknown>[];
  return rows.map((r) => hydrateStay(r) as Accommodation);
}

export function allUsers() {
  return db()
    .prepare("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC")
    .all() as { id: number; name: string; email: string; role: string; created_at: string }[];
}

export function mapPoints() {
  const destinations = db()
    .prepare(
      `SELECT d.id, d.slug, d.name, d.region, d.lat, d.lng, d.hero_image AS image,
              d.summary, d.description, d.tagline, d.best_time, d.getting_there, d.geo_precision,
              ${DEST_CATS}
       FROM destinations d
       WHERE d.published = 1 AND d.lat IS NOT NULL AND d.lng IS NOT NULL
       ORDER BY d.featured DESC, d.sort, d.name`,
    )
    .all() as (Omit<Destination, "categories" | "lat" | "lng"> & {
      categories: string | null;
      image: string;
      lat: number;
      lng: number;
    })[];
  const attractions = db()
    .prepare(
      `SELECT a.id, a.destination_id, a.slug, a.name, a.region, a.lat, a.lng, a.image, a.summary, a.description,
              a.geo_precision, a.hidden_gem, a.nearest_town, d.name AS destination_name,
              d.slug AS destination_slug, d.best_time, d.getting_there,
              ${ATTR_CATS}
       FROM attractions a LEFT JOIN destinations d ON d.id = a.destination_id
       WHERE a.published = 1 AND a.lat IS NOT NULL AND a.lng IS NOT NULL ORDER BY a.hidden_gem DESC`,
    )
    .all() as (Omit<Attraction, "categories" | "lat" | "lng"> & {
      categories: string | null;
      best_time: string | null;
      getting_there: string | null;
      lat: number;
      lng: number;
    })[];
  return {
    destinations: destinations.map(({ categories, ...place }) => ({
      ...place,
      categories: categories ? categories.split("|").filter(Boolean) : [],
      travelTips: destinationTips(place.id).map(({ title, body }) => ({ title, body })),
    })),
    attractions: attractions.map(({ categories, ...place }) => ({
      ...place,
      categories: categories ? categories.split("|").filter(Boolean) : [],
      travelTips: place.destination_id
        ? destinationTips(place.destination_id).map(({ title, body }) => ({ title, body }))
        : [],
    })),
  };
}

export function publicStats() {
  const one = (sql: string) => (getDb().prepare(sql).get() as { n: number }).n;
  return {
    destinations: one("SELECT COUNT(*) AS n FROM destinations WHERE published = 1"),
    experiences: one("SELECT COUNT(*) AS n FROM attractions WHERE published = 1"),
    stays: one("SELECT COUNT(*) AS n FROM accommodations WHERE status = 'APPROVED' AND published = 1"),
    hiddenGems: one("SELECT COUNT(*) AS n FROM attractions WHERE published = 1 AND hidden_gem = 1"),
  };
}
