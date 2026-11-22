"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

async function requireSession(nextPath: string) {
  const user = await getSession();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);
  return user;
}

function num(value: FormDataEntryValue | null, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function str(value: FormDataEntryValue | null): string | null {
  const s = typeof value === "string" ? value.trim() : "";
  return s ? s : null;
}

export async function createTripAction(formData: FormData): Promise<void> {
  const user = await requireSession("/dashboard/trips/new");
  const db = getDb();

  const name = str(formData.get("name")) ?? "Untitled trip";
  const destinationId = num(formData.get("destinationId")) || null;
  const startDate = str(formData.get("startDate"));
  const endDate = str(formData.get("endDate"));
  const travellers = Math.max(1, Math.min(20, Math.round(num(formData.get("travellers"), 1))));

  if (startDate && endDate && endDate < startDate) {
    redirect(`/dashboard/trips/new?error=${encodeURIComponent("The end date is before the start date.")}`);
  }

  const result = db
    .prepare(
      `INSERT INTO trips (user_id, name, destination_id, start_date, end_date, travellers, notes)
       VALUES (?,?,?,?,?,?,?)`,
    )
    .run(
      user.id,
      name,
      destinationId,
      startDate && DATE_RE.test(startDate) ? startDate : null,
      endDate && DATE_RE.test(endDate) ? endDate : null,
      travellers,
      str(formData.get("notes")),
    );

  const tripId = Number(result.lastInsertRowid);

  const attractionId = num(formData.get("suggestedAttractionId")) || null;
  if (attractionId && startDate && DATE_RE.test(startDate)) {
    const attraction = db.prepare("SELECT name FROM attractions WHERE id = ?").get(attractionId) as
      | { name: string }
      | undefined;
    if (attraction) {
      db.prepare(
        `INSERT INTO itinerary_entries (trip_id, entry_date, start_time, title, attraction_id, notes, estimated_cost, sort)
         VALUES (?,?,?,?,?,?,?,?)`,
      ).run(tripId, startDate, "09:00", attraction.name, attractionId, null, 0, 0);
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/trips");
  redirect(`/dashboard/trips/${tripId}`);
}

export async function updateTripAction(formData: FormData): Promise<void> {
  const user = await requireSession("/dashboard/trips");
  const tripId = num(formData.get("tripId"));
  const trip = getDb().prepare("SELECT id FROM trips WHERE id = ? AND user_id = ?").get(tripId, user.id);
  if (!trip) redirect("/dashboard/trips");

  const startDate = str(formData.get("startDate"));
  const endDate = str(formData.get("endDate"));

  getDb()
    .prepare(
      `UPDATE trips SET name = ?, destination_id = ?, start_date = ?, end_date = ?, travellers = ?, notes = ?
       WHERE id = ? AND user_id = ?`,
    )
    .run(
      str(formData.get("name")) ?? "Untitled trip",
      num(formData.get("destinationId")) || null,
      startDate && DATE_RE.test(startDate) ? startDate : null,
      endDate && DATE_RE.test(endDate) ? endDate : null,
      Math.max(1, Math.min(20, Math.round(num(formData.get("travellers"), 1)))),
      str(formData.get("notes")),
      tripId,
      user.id,
    );

  revalidatePath(`/dashboard/trips/${tripId}`);
  revalidatePath("/dashboard/trips");
  redirect(`/dashboard/trips/${tripId}`);
}

export async function deleteTripAction(formData: FormData): Promise<void> {
  const user = await requireSession("/dashboard/trips");
  const tripId = num(formData.get("tripId"));
  getDb().prepare("DELETE FROM trips WHERE id = ? AND user_id = ?").run(tripId, user.id);
  revalidatePath("/dashboard/trips");
  revalidatePath("/dashboard");
  redirect("/dashboard/trips");
}

async function ownedTrip(tripId: number, nextPath: string) {
  const user = await requireSession(nextPath);
  const trip = getDb().prepare("SELECT * FROM trips WHERE id = ? AND user_id = ?").get(tripId, user.id) as
    | { id: number; start_date: string | null; end_date: string | null }
    | undefined;
  if (!trip) redirect("/dashboard/trips");
  return { user, trip };
}

export async function addItineraryEntryAction(formData: FormData): Promise<void> {
  const tripId = num(formData.get("tripId"));
  const { trip } = await ownedTrip(tripId, `/dashboard/trips/${tripId}`);
  const db = getDb();

  const entryDate = str(formData.get("entryDate")) ?? trip.start_date ?? new Date().toISOString().slice(0, 10);
  const title = str(formData.get("title")) ?? "Untitled stop";
  const attractionId = num(formData.get("attractionId")) || null;

  db.prepare(
    `INSERT INTO itinerary_entries (trip_id, entry_date, start_time, title, attraction_id, notes, estimated_cost, sort)
     VALUES (?,?,?,?,?,?,?,?)`,
  ).run(
    tripId,
    DATE_RE.test(entryDate) ? entryDate : new Date().toISOString().slice(0, 10),
    str(formData.get("startTime"))?.slice(0, 5) ?? null,
    title,
    attractionId,
    str(formData.get("notes")),
    Math.max(0, num(formData.get("estimatedCost"))),
    Math.round(num(formData.get("sort"), 99)),
  );

  revalidatePath(`/dashboard/trips/${tripId}`);
  revalidatePath("/dashboard/trips");
}

export async function updateItineraryEntryAction(formData: FormData): Promise<void> {
  const tripId = num(formData.get("tripId"));
  const entryId = num(formData.get("entryId"));
  await ownedTrip(tripId, `/dashboard/trips/${tripId}`);
  const entryDate = str(formData.get("entryDate")) ?? new Date().toISOString().slice(0, 10);

  getDb()
    .prepare(
      `UPDATE itinerary_entries
       SET title = ?, entry_date = ?, start_time = ?, notes = ?, estimated_cost = ?
       WHERE id = ? AND trip_id = ?`,
    )
    .run(
      str(formData.get("title")) ?? "Untitled stop",
      DATE_RE.test(entryDate) ? entryDate : new Date().toISOString().slice(0, 10),
      str(formData.get("startTime"))?.slice(0, 5) ?? null,
      str(formData.get("notes")),
      Math.max(0, num(formData.get("estimatedCost"))),
      entryId,
      tripId,
    );

  revalidatePath(`/dashboard/trips/${tripId}`);
  revalidatePath("/dashboard/trips");
}

export async function deleteItineraryEntryAction(formData: FormData): Promise<void> {
  const tripId = num(formData.get("tripId"));
  const entryId = num(formData.get("entryId"));
  await ownedTrip(tripId, `/dashboard/trips/${tripId}`);
  getDb().prepare("DELETE FROM itinerary_entries WHERE id = ? AND trip_id = ?").run(entryId, tripId);
  revalidatePath(`/dashboard/trips/${tripId}`);
  revalidatePath("/dashboard/trips");
}

export async function addAttractionToTripAction(formData: FormData): Promise<void> {
  const attractionId = num(formData.get("attractionId"));
  const tripId = num(formData.get("tripId"));
  const returnTo = str(formData.get("returnTo")) ?? "/dashboard/trips";
  const { trip } = await ownedTrip(tripId, returnTo);

  const db = getDb();
  const attraction = db.prepare("SELECT name FROM attractions WHERE id = ?").get(attractionId) as
    | { name: string }
    | undefined;
  if (!attraction) redirect(returnTo);

  const entryDate = str(formData.get("entryDate")) || trip.start_date || new Date().toISOString().slice(0, 10);

  db.prepare(
    `INSERT INTO itinerary_entries (trip_id, entry_date, start_time, title, attraction_id, notes, estimated_cost, sort)
     VALUES (?,?,?,?,?,?,?,?)`,
  ).run(tripId, entryDate, null, attraction.name, attractionId, null, 0, 99);

  revalidatePath(`/dashboard/trips/${tripId}`);
  revalidatePath(returnTo);
  redirect(`${returnTo}${returnTo.includes("?") ? "&" : "?"}added=${attractionId}`);
}

const BUDGET_CATEGORIES = ["ACCOMMODATION", "FOOD", "TRANSPORT", "ACTIVITIES", "OTHER"];

export async function addBudgetEntryAction(formData: FormData): Promise<void> {
  const tripId = num(formData.get("tripId"));
  await ownedTrip(tripId, `/dashboard/trips/${tripId}`);
  const category = String(formData.get("category") ?? "OTHER");
  const amount = Math.max(0, num(formData.get("amount")));

  getDb()
    .prepare("INSERT INTO budget_entries (trip_id, category, label, amount, notes) VALUES (?,?,?,?,?)")
    .run(
      tripId,
      BUDGET_CATEGORIES.includes(category) ? category : "OTHER",
      str(formData.get("label")) ?? "Expense",
      Math.round(amount * 100) / 100,
      str(formData.get("notes")),
    );

  revalidatePath(`/dashboard/trips/${tripId}`);
  revalidatePath("/dashboard/trips");
}

export async function deleteBudgetEntryAction(formData: FormData): Promise<void> {
  const tripId = num(formData.get("tripId"));
  const entryId = num(formData.get("entryId"));
  await ownedTrip(tripId, `/dashboard/trips/${tripId}`);
  getDb().prepare("DELETE FROM budget_entries WHERE id = ? AND trip_id = ?").run(entryId, tripId);
  revalidatePath(`/dashboard/trips/${tripId}`);
  revalidatePath("/dashboard/trips");
}
