import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { getDb } from "../lib/db";
import { destinations, categories } from "./seed-content";
import { attractions, stays, amenities } from "./seed-attractions";

const db = getDb();
const credits: Record<string, { artist?: string; license?: string; title?: string }> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "public", "image-credits.json"), "utf8"),
);

function creditFor(imagePath: string): string | null {
  const key = Object.keys(credits).find((k) => credits[k] && `/images/${k}.jpg` === imagePath);
  if (!key) return null;
  const c = credits[key];
  return `${c.artist ?? "Wikimedia Commons"} / ${c.license ?? "see credits"}`;
}

console.log("Resetting TripNest development database…");
db.pragma("foreign_keys = OFF");
for (const table of [
  "budget_entries",
  "itinerary_entries",
  "trips",
  "saved_places",
  "accommodation_amenities",
  "accommodations",
  "amenities",
  "attraction_categories",
  "attractions",
  "destination_checklist",
  "destination_tips",
  "destination_images",
  "destination_categories",
  "destinations",
  "categories",
  "users",
]) {
  db.prepare(`DELETE FROM ${table}`).run();
  db.prepare("DELETE FROM sqlite_sequence WHERE name = ?").run(table);
}
db.pragma("foreign_keys = ON");

/* Users ------------------------------------------------------------- */
const password = bcrypt.hashSync("tripnest123", 10);
const insertUser = db.prepare(
  "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
);
const adminId = Number(insertUser.run("Ama Boateng", "admin@tripnest.gh", password, "ADMIN").lastInsertRowid);
const providerId = Number(insertUser.run("Kwesi Mensah", "provider@tripnest.gh", password, "PROVIDER").lastInsertRowid);
const travellerId = Number(insertUser.run("Akosua Danso", "traveller@tripnest.gh", password, "TRAVELLER").lastInsertRowid);
const traveller2 = Number(insertUser.run("Yaw Owusu", "yaw@tripnest.gh", password, "TRAVELLER").lastInsertRowid);

/* Categories -------------------------------------------------------- */
const insertCategory = db.prepare(
  "INSERT INTO categories (slug, name, kind, description, image, sort) VALUES (?,?,?,?,?,?)",
);
const categoryIds = new Map<string, number>();
categories.forEach((c, i) => {
  const id = Number(insertCategory.run(c.slug, c.name, c.kind, c.description, c.image, i).lastInsertRowid);
  categoryIds.set(c.slug, id);
});

/* Destinations ------------------------------------------------------ */
const insertDestination = db.prepare(`
  INSERT INTO destinations
    (slug, name, region, tagline, summary, description, hero_image, hero_credit, lat, lng, geo_precision,
     best_time, getting_there, getting_around, featured, published, content_status, sort)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,'SEED',?)
`);
const destinationIds = new Map<string, number>();
destinations.forEach((d, i) => {
  const id = Number(
    insertDestination.run(
      d.slug, d.name, d.region, d.tagline, d.summary, d.description.join("\n\n"),
      d.hero_image, creditFor(d.hero_image), d.lat, d.lng, d.geo_precision,
      d.best_time, d.getting_there, d.getting_around, d.featured ? 1 : 0, i,
    ).lastInsertRowid,
  );
  destinationIds.set(d.slug, id);
  for (const slug of d.categories) {
    const cid = categoryIds.get(slug);
    if (cid) db.prepare("INSERT OR IGNORE INTO destination_categories VALUES (?,?)").run(id, cid);
  }
  d.gallery.forEach((g, gi) =>
    db.prepare(
      "INSERT INTO destination_images (destination_id, url, alt, caption, credit, sort) VALUES (?,?,?,?,?,?)",
    ).run(id, g.url, g.alt, g.caption ?? null, creditFor(g.url), gi),
  );
  d.tips.forEach((t, ti) =>
    db.prepare("INSERT INTO destination_tips (destination_id, title, body, sort) VALUES (?,?,?,?)").run(
      id, t.title, t.body, ti,
    ),
  );
  d.checklist.forEach((label, ci) =>
    db.prepare("INSERT INTO destination_checklist (destination_id, label, sort) VALUES (?,?,?)").run(id, label, ci),
  );
});

/* Attractions ------------------------------------------------------- */
const insertAttraction = db.prepare(`
  INSERT INTO attractions
    (slug, name, destination_id, region, nearest_town, summary, description, image, lat, lng, geo_precision,
     hidden_gem, featured, published, content_status)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,1,'SEED')
`);
const attractionIds = new Map<string, number>();
attractions.forEach((a) => {
  const id = Number(
    insertAttraction.run(
      a.slug, a.name, a.destination ? destinationIds.get(a.destination) ?? null : null,
      a.region, a.nearest_town, a.summary, a.description.join("\n\n"), a.image,
      a.lat, a.lng, a.geo_precision, a.hidden_gem ? 1 : 0, a.featured ? 1 : 0,
    ).lastInsertRowid,
  );
  attractionIds.set(a.slug, id);
  for (const slug of a.categories) {
    const cid = categoryIds.get(slug);
    if (cid) db.prepare("INSERT OR IGNORE INTO attraction_categories VALUES (?,?)").run(id, cid);
  }
});

/* Amenities --------------------------------------------------------- */
const amenityIds = new Map<string, number>();
for (const a of amenities) {
  const id = Number(db.prepare("INSERT INTO amenities (slug, name) VALUES (?,?)").run(a.slug, a.name).lastInsertRowid);
  amenityIds.set(a.slug, id);
}

/* Accommodation ----------------------------------------------------- */
const insertStay = db.prepare(`
  INSERT INTO accommodations
    (slug, name, destination_id, provider_id, type, price_per_night, description, address, area, lat, lng,
     phone, whatsapp, email, image, image_kind, status, published, content_status)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'SEED')
`);
stays.forEach((s) => {
  const destId = destinationIds.get(s.destination);
  if (!destId) return;
  const status = s.status ?? "APPROVED";
  const id = Number(
    insertStay.run(
      s.slug, s.name, destId, providerId, s.type, s.price,
      s.description, s.address, s.area, null, null,
      null, null, `${s.slug}@tripnest.example`,
      s.image, "AREA_ILLUSTRATION", status, s.published === false ? 0 : 1,
    ).lastInsertRowid,
  );
  for (const slug of s.amenities) {
    const aid = amenityIds.get(slug);
    if (aid) db.prepare("INSERT OR IGNORE INTO accommodation_amenities VALUES (?,?)").run(id, aid);
  }
});

/* Demo traveller data ----------------------------------------------- */
const saveDestination = db.prepare("INSERT INTO saved_places (user_id, destination_id) VALUES (?,?)");
saveDestination.run(travellerId, destinationIds.get("cape-coast"));
saveDestination.run(travellerId, destinationIds.get("mole-national-park"));
saveDestination.run(traveller2, destinationIds.get("accra"));
const saveAttraction = db.prepare("INSERT INTO saved_places (user_id, attraction_id) VALUES (?,?)");
saveAttraction.run(travellerId, attractionIds.get("kakum-national-park"));
saveAttraction.run(travellerId, attractionIds.get("wli-waterfalls"));
saveAttraction.run(traveller2, attractionIds.get("jamestown-lighthouse"));

const insertTrip = db.prepare(`
  INSERT INTO trips (user_id, name, destination_id, start_date, end_date, travellers, notes)
  VALUES (?,?,?,?,?,?,?)
`);
const trip1 = Number(
  insertTrip.run(
    travellerId, "Coast & Castles", destinationIds.get("cape-coast"),
    "2026-12-12", "2026-12-15", 2,
    "A long weekend for the castles and the canopy walk. Hoping to get to Elmina one afternoon.",
  ).lastInsertRowid,
);
const trip2 = Number(
  insertTrip.run(
    travellerId, "Volta Hills Weekend", destinationIds.get("wli"),
    "2027-01-16", "2027-01-18", 3,
    "Waterfalls and the mountain village. Pack for rain.",
  ).lastInsertRowid,
);
const insertEntry = db.prepare(`
  INSERT INTO itinerary_entries (trip_id, entry_date, start_time, title, attraction_id, notes, estimated_cost, sort)
  VALUES (?,?,?,?,?,?,?,?)
`);
insertEntry.run(trip1, "2026-12-12", "15:00", "Arrive and walk the old town", null,
  "Check in, then a slow loop between the castle and the market to get bearings.", 60, 0);
insertEntry.run(trip1, "2026-12-13", "08:30", "Cape Coast Castle tour", attractionIds.get("cape-coast-castle"),
  "Guided tour, then time on our own in the courtyard.", 120, 1);
insertEntry.run(trip1, "2026-12-13", "14:00", "Elmina harbour at golden hour", attractionIds.get("elmina-castle"),
  "Drive over after lunch. Fish by the harbour if the boats are in.", 180, 2);
insertEntry.run(trip1, "2026-12-14", "07:00", "Kakum canopy walkway", attractionIds.get("kakum-national-park"),
  "Early start to beat the heat and the coaches.", 150, 3);
insertEntry.run(trip2, "2027-01-16", "13:00", "Travel to Wli via Hohoe", null,
  "Shared taxi from Hohoe. Leave bags and walk to the lower falls before dark.", 220, 0);
insertEntry.run(trip2, "2027-01-17", "08:00", "Agumatsa falls walk", attractionIds.get("wli-waterfalls"),
  "Lower falls in the morning, swim if the water is calm.", 80, 1);

const insertBudget = db.prepare(
  "INSERT INTO budget_entries (trip_id, category, label, amount, notes) VALUES (?,?,?,?,?)",
);
insertBudget.run(trip1, "ACCOMMODATION", "Guesthouse, 3 nights", 1020, "GH₵ 340 per night, two people");
insertBudget.run(trip1, "TRANSPORT", "Accra return + local taxis", 480, "Intercity bus and a driver for Kakum");
insertBudget.run(trip1, "FOOD", "Meals for two", 600, "Mostly chop bars, one restaurant dinner");
insertBudget.run(trip1, "ACTIVITIES", "Castle tours and canopy walk", 350, "Entry fees and guides");
insertBudget.run(trip1, "OTHER", "Buffer", 200, "Souvenirs, water, unexpected");
insertBudget.run(trip2, "ACCOMMODATION", "Guesthouse, 2 nights", 300, "Two rooms");
insertBudget.run(trip2, "TRANSPORT", "Hohoe–Wli return", 260, "");
insertBudget.run(trip2, "FOOD", "Meals", 240, "");

const counts = {
  destinations: (db.prepare("SELECT COUNT(*) n FROM destinations").get() as { n: number }).n,
  attractions: (db.prepare("SELECT COUNT(*) n FROM attractions").get() as { n: number }).n,
  stays: (db.prepare("SELECT COUNT(*) n FROM accommodations").get() as { n: number }).n,
  hiddenGems: (db.prepare("SELECT COUNT(*) n FROM attractions WHERE hidden_gem=1").get() as { n: number }).n,
};
console.log("Seeded:", counts);
console.log("Demo accounts (password: tripnest123):");
console.log("  traveller@tripnest.gh · provider@tripnest.gh · admin@tripnest.gh");
