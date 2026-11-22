import "server-only";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "./db";
import type { Role, SessionUser } from "./types";

const COOKIE = "tripnest_session";
const SECRET = new TextEncoder().encode(
  process.env.TRIPNEST_SECRET ?? "tripnest-development-secret-change-in-production-2025",
);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({ name: user.name, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET);

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const id = Number(payload.sub);
    if (!Number.isFinite(id)) return null;
    const row = getDb()
      .prepare("SELECT id, name, email, role FROM users WHERE id = ?")
      .get(id) as SessionUser | undefined;
    return row ?? null;
  } catch {
    return null;
  }
}

export async function requireUser(nextPath?: string): Promise<SessionUser> {
  const user = await getSession();
  if (!user) {
    redirect(`/sign-in${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`);
  }
  return user;
}

export async function requireRole(role: Role, nextPath?: string): Promise<SessionUser> {
  const user = await requireUser(nextPath);
  if (user.role !== role && user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return user;
}

export const DASHBOARD_HOME: Record<Role, string> = {
  TRAVELLER: "/dashboard",
  PROVIDER: "/dashboard/provider",
  ADMIN: "/dashboard/admin",
};

export function dashboardHome(role: Role): string {
  return DASHBOARD_HOME[role] ?? "/dashboard";
}
