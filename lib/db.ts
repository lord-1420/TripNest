import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DB_PATH = process.env.TRIPNEST_DB ?? path.join(process.cwd(), "data", "tripnest.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'TRAVELLER' CHECK (role IN ('TRAVELLER','PROVIDER','ADMIN')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('DESTINATION','ATTRACTION','BOTH')),
  description TEXT,
  image TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS destinations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  tagline TEXT,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  hero_credit TEXT,
  lat REAL, lng REAL,
  geo_precision TEXT NOT NULL DEFAULT 'exact',
  best_time TEXT,
  getting_there TEXT,
  getting_around TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  content_status TEXT NOT NULL DEFAULT 'SEED' CHECK (content_status IN ('SEED','VERIFIED')),
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS destination_categories (
  destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (destination_id, category_id)
);

CREATE TABLE IF NOT EXISTS destination_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT,
  credit TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS destination_tips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS destination_checklist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS attractions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  destination_id INTEGER REFERENCES destinations(id) ON DELETE SET NULL,
  region TEXT NOT NULL,
  nearest_town TEXT,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  lat REAL, lng REAL,
  geo_precision TEXT NOT NULL DEFAULT 'exact',
  hidden_gem INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  content_status TEXT NOT NULL DEFAULT 'SEED' CHECK (content_status IN ('SEED','VERIFIED')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS attraction_categories (
  attraction_id INTEGER NOT NULL REFERENCES attractions(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (attraction_id, category_id)
);

CREATE TABLE IF NOT EXISTS amenities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS accommodations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  provider_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('HOTEL','HOSTEL','APARTMENT')),
  price_per_night INTEGER NOT NULL,
  description TEXT NOT NULL,
  address TEXT,
  area TEXT,
  lat REAL, lng REAL,
  phone TEXT, whatsapp TEXT, email TEXT,
  image TEXT NOT NULL,
  image_kind TEXT NOT NULL DEFAULT 'AREA_ILLUSTRATION' CHECK (image_kind IN ('AREA_ILLUSTRATION','PROPERTY_PHOTO','PLACEHOLDER')),
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','REJECTED')),
  published INTEGER NOT NULL DEFAULT 0,
  content_status TEXT NOT NULL DEFAULT 'SEED' CHECK (content_status IN ('SEED','VERIFIED')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS accommodation_amenities (
  accommodation_id INTEGER NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
  amenity_id INTEGER NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (accommodation_id, amenity_id)
);

CREATE TABLE IF NOT EXISTS saved_places (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
  attraction_id INTEGER REFERENCES attractions(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK ((destination_id IS NOT NULL) <> (attraction_id IS NOT NULL))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_saved_dest ON saved_places(user_id, destination_id) WHERE destination_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_saved_attr ON saved_places(user_id, attraction_id) WHERE attraction_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  destination_id INTEGER REFERENCES destinations(id) ON DELETE SET NULL,
  start_date TEXT,
  end_date TEXT,
  travellers INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS itinerary_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  entry_date TEXT NOT NULL,
  start_time TEXT,
  title TEXT NOT NULL,
  attraction_id INTEGER REFERENCES attractions(id) ON DELETE SET NULL,
  notes TEXT,
  estimated_cost REAL NOT NULL DEFAULT 0,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS budget_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('ACCOMMODATION','FOOD','TRANSPORT','ACTIVITIES','OTHER')),
  label TEXT NOT NULL,
  amount REAL NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_attr_dest ON attractions(destination_id);
CREATE INDEX IF NOT EXISTS idx_stays_dest ON accommodations(destination_id);
CREATE INDEX IF NOT EXISTS idx_trips_user ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_trip ON itinerary_entries(trip_id);
CREATE INDEX IF NOT EXISTS idx_budget_trip ON budget_entries(trip_id);
`;

function create(): Database.Database {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA);
  return db;
}

const globalForDb = globalThis as unknown as { __tripnestDb?: Database.Database };

export function getDb(): Database.Database {
  if (!globalForDb.__tripnestDb) {
    globalForDb.__tripnestDb = create();
  }
  return globalForDb.__tripnestDb;
}

export type Row = Record<string, unknown>;
