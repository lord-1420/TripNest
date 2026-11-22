"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import {
  createSession,
  destroySession,
  hashPassword,
  verifyPassword,
  dashboardHome,
} from "@/lib/auth";
import type { Role } from "@/lib/types";

export interface AuthState {
  error?: string;
  values?: { name?: string; email?: string; role?: string };
}

function safeNext(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

export async function signInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email address and password.", values: { email } };
  }

  const row = getDb()
    .prepare("SELECT id, name, email, password_hash, role FROM users WHERE lower(email) = ?")
    .get(email) as
    | { id: number; name: string; email: string; password_hash: string; role: Role }
    | undefined;

  if (!row || !(await verifyPassword(password, row.password_hash))) {
    return { error: "Those details do not match an account. Please try again.", values: { email } };
  }

  await createSession({ id: row.id, name: row.name, email: row.email, role: row.role });
  redirect(safeNext(formData.get("next")) ?? dashboardHome(row.role));
}

export async function signUpAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const requestedRole = String(formData.get("role") ?? "TRAVELLER");
  const role: Role = requestedRole === "PROVIDER" ? "PROVIDER" : "TRAVELLER";
  const values = { name, email, role: requestedRole };

  if (name.length < 2) return { error: "Please enter your name.", values };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Enter a valid email address.", values };
  if (password.length < 8) return { error: "Passwords need at least 8 characters.", values };

  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE lower(email) = ?").get(email);
  if (existing) return { error: "An account already exists with that email. Try signing in.", values };

  const hash = await hashPassword(password);
  const result = db
    .prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)")
    .run(name, email, hash, role);

  await createSession({ id: Number(result.lastInsertRowid), name, email, role });
  redirect(role === "PROVIDER" ? "/dashboard/provider" : "/dashboard");
}

export async function signOutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
