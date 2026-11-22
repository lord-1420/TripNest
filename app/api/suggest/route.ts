import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

/**
 * Type-ahead for the hero and destination search.
 * Queries the real destination + attraction tables; no hardcoded suggestions.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = String(searchParams.get("q") ?? "").trim();
  if (q.length < 1) return NextResponse.json({ results: [] });

  const db = getDb();
  const term = `%${q}%`;
  const destinations = db
    .prepare(
      `SELECT slug, name, region, 'destination' AS kind FROM destinations
       WHERE published = 1 AND (name LIKE ? OR region LIKE ? OR summary LIKE ?)
       ORDER BY featured DESC, name ASC LIMIT 5`,
    )
    .all(term, term, term) as { slug: string; name: string; region: string; kind: string }[];

  const attractions = db
    .prepare(
      `SELECT slug, name, region, 'attraction' AS kind FROM attractions
       WHERE published = 1 AND (name LIKE ? OR summary LIKE ? OR nearest_town LIKE ?)
       ORDER BY featured DESC, hidden_gem DESC, name ASC LIMIT 4`,
    )
    .all(term, term, term) as { slug: string; name: string; region: string; kind: string }[];

  return NextResponse.json({
    results: [
      ...destinations.map((d) => ({ ...d, href: `/destinations/${d.slug}` })),
      ...attractions.map((a) => ({ ...a, href: `/experiences/${a.slug}` })),
    ],
  });
}
