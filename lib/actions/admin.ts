"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function requireAdmin(path: string) {
  const user = await getSession();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(path)}`);
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}

function num(v: FormDataEntryValue | null): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function bool(v: FormDataEntryValue | null): 0 | 1 {
  return v === "1" || v === "true" || v === "on" ? 1 : 0;
}

export async function setStayStatusAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/accommodations");
  const id = num(formData.get("id"));
  const status = String(formData.get("status") ?? "PENDING");
  if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) return;

  getDb()
    .prepare(
      `UPDATE accommodations SET status = ?, published = ?, updated_at = datetime('now') WHERE id = ?`,
    )
    .run(status, status === "APPROVED" ? 1 : 0, id);

  revalidatePath("/dashboard/admin/accommodations");
  revalidatePath("/dashboard/admin");
  revalidatePath("/stays");
}

export async function toggleStayPublishedAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/accommodations");
  const id = num(formData.get("id"));
  const published = bool(formData.get("published"));
  getDb().prepare("UPDATE accommodations SET published = ? WHERE id = ?").run(published ? 0 : 1, id);
  revalidatePath("/dashboard/admin/accommodations");
  revalidatePath("/stays");
}

export async function toggleDestinationFeaturedAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/destinations");
  const id = num(formData.get("id"));
  const next = bool(formData.get("featured")) ? 0 : 1;
  getDb().prepare("UPDATE destinations SET featured = ? WHERE id = ?").run(next, id);
  revalidatePath("/dashboard/admin/destinations");
  revalidatePath("/");
  revalidatePath("/destinations");
}

export async function toggleDestinationPublishedAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/destinations");
  const id = num(formData.get("id"));
  const next = bool(formData.get("published")) ? 0 : 1;
  getDb().prepare("UPDATE destinations SET published = ? WHERE id = ?").run(next, id);
  revalidatePath("/dashboard/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/");
}

export async function setDestinationStatusAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/destinations");
  const id = num(formData.get("id"));
  const status = String(formData.get("contentStatus") ?? "SEED") === "VERIFIED" ? "VERIFIED" : "SEED";
  getDb().prepare("UPDATE destinations SET content_status = ? WHERE id = ?").run(status, id);
  revalidatePath("/dashboard/admin/destinations");
  revalidatePath("/destinations");
}

export async function toggleHiddenGemAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/attractions");
  const id = num(formData.get("id"));
  const next = bool(formData.get("hiddenGem")) ? 0 : 1;
  getDb().prepare("UPDATE attractions SET hidden_gem = ? WHERE id = ?").run(next, id);
  revalidatePath("/dashboard/admin/attractions");
  revalidatePath("/experiences");
  revalidatePath("/");
}

export async function toggleAttractionFeaturedAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/attractions");
  const id = num(formData.get("id"));
  const next = bool(formData.get("featured")) ? 0 : 1;
  getDb().prepare("UPDATE attractions SET featured = ? WHERE id = ?").run(next, id);
  revalidatePath("/dashboard/admin/attractions");
  revalidatePath("/experiences");
  revalidatePath("/");
}

export async function toggleAttractionPublishedAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/attractions");
  const id = num(formData.get("id"));
  const next = bool(formData.get("published")) ? 0 : 1;
  getDb().prepare("UPDATE attractions SET published = ? WHERE id = ?").run(next, id);
  revalidatePath("/dashboard/admin/attractions");
  revalidatePath("/experiences");
}

export async function setAttractionStatusAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/attractions");
  const id = num(formData.get("id"));
  const status = String(formData.get("contentStatus") ?? "SEED") === "VERIFIED" ? "VERIFIED" : "SEED";
  getDb().prepare("UPDATE attractions SET content_status = ? WHERE id = ?").run(status, id);
  revalidatePath("/dashboard/admin/attractions");
  revalidatePath("/experiences");
}

export async function setStayContentStatusAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/accommodations");
  const id = num(formData.get("id"));
  const status = String(formData.get("contentStatus") ?? "SEED") === "VERIFIED" ? "VERIFIED" : "SEED";
  getDb().prepare("UPDATE accommodations SET content_status = ? WHERE id = ?").run(status, id);
  revalidatePath("/dashboard/admin/accommodations");
}

export async function setUserRoleAction(formData: FormData): Promise<void> {
  await requireAdmin("/dashboard/admin/users");
  const id = num(formData.get("id"));
  const role = String(formData.get("role") ?? "TRAVELLER");
  if (!["TRAVELLER", "PROVIDER", "ADMIN"].includes(role)) return;
  getDb().prepare("UPDATE users SET role = ? WHERE id = ?").run(role, id);
  revalidatePath("/dashboard/admin/users");
}
