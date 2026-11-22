"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/format";

async function requireProvider(path: string) {
  const user = await getSession();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(path)}`);
  if (user.role !== "PROVIDER" && user.role !== "ADMIN") redirect("/dashboard");
  return user;
}

function str(v: FormDataEntryValue | null): string | null {
  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : null;
}

function num(v: FormDataEntryValue | null, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function uniqueSlug(base: string, ignoreId?: number): string {
  const db = getDb();
  let slug = slugify(base) || `listing-${Date.now()}`;
  let i = 1;
  while (
    db
      .prepare(`SELECT id FROM accommodations WHERE slug = ? AND id IS NOT ?`)
      .get(slug, ignoreId ?? null)
  ) {
    slug = `${slugify(base)}-${++i}`;
  }
  return slug;
}

export async function createListingAction(formData: FormData): Promise<void> {
  const user = await requireProvider("/dashboard/provider/listings/new");
  const db = getDb();

  const name = str(formData.get("name"));
  const destinationId = num(formData.get("destinationId"));
  const type = String(formData.get("type") ?? "HOTEL");
  const price = Math.max(0, Math.round(num(formData.get("price"))));

  if (!name || !destinationId) {
    redirect("/dashboard/provider/listings/new?error=missing");
  }

  const destination = db
    .prepare("SELECT name, hero_image, lat, lng FROM destinations WHERE id = ?")
    .get(destinationId) as { name: string; hero_image: string; lat: number | null; lng: number | null } | undefined;
  if (!destination) redirect("/dashboard/provider/listings/new?error=destination");

  const result = db
    .prepare(
      `INSERT INTO accommodations
        (slug, name, destination_id, provider_id, type, price_per_night, description, address, area,
         lat, lng, phone, whatsapp, email, image, image_kind, status, published, content_status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'PENDING', 0, 'SEED')`,
    )
    .run(
      uniqueSlug(name),
      name,
      destinationId,
      user.id,
      ["HOTEL", "HOSTEL", "APARTMENT"].includes(type) ? type : "HOTEL",
      price,
      str(formData.get("description")) ?? "",
      str(formData.get("address")),
      str(formData.get("area")) ?? destination.name,
      destination.lat,
      destination.lng,
      str(formData.get("phone")),
      str(formData.get("whatsapp")),
      str(formData.get("email")),
      destination.hero_image,
      "AREA_ILLUSTRATION",
    );

  const listingId = Number(result.lastInsertRowid);
  const amenities = formData.getAll("amenities").map(String);
  const insertAmenity = db.prepare(
    "INSERT OR IGNORE INTO accommodation_amenities (accommodation_id, amenity_id) VALUES (?,?)",
  );
  for (const slug of amenities) {
    const amenity = db.prepare("SELECT id FROM amenities WHERE slug = ?").get(slug) as
      | { id: number }
      | undefined;
    if (amenity) insertAmenity.run(listingId, amenity.id);
  }

  revalidatePath("/dashboard/provider");
  revalidatePath("/dashboard/admin/accommodations");
  redirect(`/dashboard/provider?created=${listingId}`);
}

export async function updateListingAction(formData: FormData): Promise<void> {
  const user = await requireProvider("/dashboard/provider");
  const listingId = num(formData.get("listingId"));
  const db = getDb();

  const listing = db
    .prepare("SELECT id, provider_id FROM accommodations WHERE id = ?")
    .get(listingId) as { id: number; provider_id: number | null } | undefined;
  if (!listing || (listing.provider_id !== user.id && user.role !== "ADMIN")) {
    redirect("/dashboard/provider");
  }

  const type = String(formData.get("type") ?? "HOTEL");
  db.prepare(
    `UPDATE accommodations SET name = ?, type = ?, price_per_night = ?, description = ?, address = ?, area = ?,
       phone = ?, whatsapp = ?, email = ?, status = 'PENDING', updated_at = datetime('now')
     WHERE id = ?`,
  ).run(
    str(formData.get("name")) ?? "Untitled listing",
    ["HOTEL", "HOSTEL", "APARTMENT"].includes(type) ? type : "HOTEL",
    Math.max(0, Math.round(num(formData.get("price")))),
    str(formData.get("description")) ?? "",
    str(formData.get("address")),
    str(formData.get("area")),
    str(formData.get("phone")),
    str(formData.get("whatsapp")),
    str(formData.get("email")),
    listingId,
  );

  db.prepare("DELETE FROM accommodation_amenities WHERE accommodation_id = ?").run(listingId);
  for (const slug of formData.getAll("amenities").map(String)) {
    const amenity = db.prepare("SELECT id FROM amenities WHERE slug = ?").get(slug) as
      | { id: number }
      | undefined;
    if (amenity) {
      db.prepare("INSERT OR IGNORE INTO accommodation_amenities (accommodation_id, amenity_id) VALUES (?,?)").run(
        listingId,
        amenity.id,
      );
    }
  }

  revalidatePath("/dashboard/provider");
  revalidatePath("/dashboard/admin/accommodations");
  redirect(`/dashboard/provider?updated=1`);
}
