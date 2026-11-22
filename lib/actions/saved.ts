"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

type Result = { ok: boolean; saved?: boolean; message?: string };

async function requireSession(nextPath: string) {
  const user = await getSession();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);
  return user;
}

export async function toggleDestinationSave(destinationId: number, nextPath: string): Promise<Result> {
  const user = await requireSession(nextPath);
  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM saved_places WHERE user_id = ? AND destination_id = ?")
    .get(user.id, destinationId) as { id: number } | undefined;

  if (existing) {
    db.prepare("DELETE FROM saved_places WHERE id = ?").run(existing.id);
  } else {
    db.prepare("INSERT OR IGNORE INTO saved_places (user_id, destination_id) VALUES (?,?)").run(
      user.id,
      destinationId,
    );
  }
  revalidatePath("/dashboard/saved");
  revalidatePath(nextPath);
  return { ok: true, saved: !existing };
}

export async function toggleAttractionSave(attractionId: number, nextPath: string): Promise<Result> {
  const user = await requireSession(nextPath);
  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM saved_places WHERE user_id = ? AND attraction_id = ?")
    .get(user.id, attractionId) as { id: number } | undefined;

  if (existing) {
    db.prepare("DELETE FROM saved_places WHERE id = ?").run(existing.id);
  } else {
    db.prepare("INSERT OR IGNORE INTO saved_places (user_id, attraction_id) VALUES (?,?)").run(
      user.id,
      attractionId,
    );
  }
  revalidatePath("/dashboard/saved");
  revalidatePath(nextPath);
  return { ok: true, saved: !existing };
}

export async function removeSavedPlace(savedId: number): Promise<void> {
  const user = await requireSession("/dashboard/saved");
  getDb().prepare("DELETE FROM saved_places WHERE id = ? AND user_id = ?").run(savedId, user.id);
  revalidatePath("/dashboard/saved");
}

export async function removeSavedDestination(destinationId: number): Promise<void> {
  const user = await requireSession("/dashboard/saved");
  getDb()
    .prepare("DELETE FROM saved_places WHERE destination_id = ? AND user_id = ?")
    .run(destinationId, user.id);
  revalidatePath("/dashboard/saved");
}

export async function removeSavedAttraction(attractionId: number): Promise<void> {
  const user = await requireSession("/dashboard/saved");
  getDb()
    .prepare("DELETE FROM saved_places WHERE attraction_id = ? AND user_id = ?")
    .run(attractionId, user.id);
  revalidatePath("/dashboard/saved");
}
