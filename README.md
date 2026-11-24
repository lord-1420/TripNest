# TripNest

A Ghana travel-discovery and trip-planning platform: discover destinations, browse stays and experiences,
save places, build a dated itinerary and keep a running budget in cedis.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, SQLite (better-sqlite3),
Leaflet + OpenStreetMap, and cookie-based auth with `jose` + `bcryptjs`.

## Run it

```bash
npm install
npx tsx data/seed.ts     # rebuild data/tripnest.db from the seed files
npm run dev              # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

The app is fully server-rendered; no client-side data fetching is required. The only API route is
`/api/suggest?q=` used by the hero destination search.

## Demo accounts

| Role      | Email                  | Password      |
| --------- | ---------------------- | ------------- |
| Admin     | admin@tripnest.gh      | tripnest123   |
| Provider  | provider@tripnest.gh   | tripnest123   |
| Traveller | traveller@tripnest.gh  | tripnest123   |

## Content status and seed data

Every seeded record carries `content_status = 'SEED'` and is labelled in the admin tables as
"Seed content — pending review". Public pages only render records where `published = 1`.
Admins can feature destinations and experiences, mark hidden gems, publish/unpublish, and verify
seed records once an editor has checked the details. Accommodation listings move through
`PENDING → APPROVED / REJECTED` before they appear publicly.

Nothing on the site invents ratings, reviews, availability, telephone numbers, routes, fares or
journey times. Prices and coordinates come from the seeded/verified dataset, and the coordinate
source for each destination is stored in `geo_precision`/`lat`/`lng` (OpenStreetMap/Nominatim).

## Images

`public/images` holds photographs fetched from Wikimedia Commons; the licence and author for each
file are recorded in `public/image-credits.json` and rendered on `/credits`. Where a verified
photograph of a specific property was unavailable, the listing is marked `AREA_ILLUSTRATION` and the
card labels it "Area photo" rather than implying it shows the property.

The background clips in `public/videos` are trimmed and muted for the web. The source footage is available under the [Pexels license](https://www.pexels.com/license/).

- [Cape Coast Castle](https://www.pexels.com/video/cape-coast-castle-ghana-20543532/) by INDIGENA STUDIO
- [Accra coastline](https://www.pexels.com/video/people-on-shore-by-boat-near-accra-in-ghana-10295867/) by Experience Africa Today
- [Peduase](https://www.pexels.com/video/4k-aerial-view-of-peduase-ghana-landscape-29798054/) by LG Sekyere
- [Independence Arch](https://www.pexels.com/video/aerial-view-of-independence-arch-in-accra-ghana-30444352/) by Bismark Dzahene-Quarshie Jnr.

## Project layout

```
app/(site)         public marketing, discovery, stays, experiences, map, legal
app/(auth)         sign in / sign up
app/(dashboard)    traveller, provider and admin dashboards
app/api/suggest    typeahead endpoint for the hero search
components/        brand, home, destinations, stays, experiences, planning, map, dashboard, ui
lib/               db, types, formatting, auth, queries, server actions
data/              seed content + generated SQLite database
scripts/           image build, geocoding, QA screenshots
```

## QA scripts

- `./scripts/qa.sh <url> <outPrefix> [width] [height] [steps]` — boots a dev server on :3100, screenshots
  and reports HTTP status, console errors and page height.
- `node scripts/session-shots.js <email> <password> <prefix> <paths...>` — signs in, then screenshots
  authenticated routes (set `VW`/`VH` for a mobile viewport).
# Cesium ion for the 3D destination explorer

The `/explore` route uses CesiumJS World Terrain and Cesium ion imagery. Create a restricted browser token in the [Cesium ion access-token settings](https://ion.cesium.com/tokens), allow only the assets and website origins the app needs, then copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CESIUM_ION_TOKEN`.

`NEXT_PUBLIC_` values are exposed to browsers. Treat this as a public, restricted token: do not use an unrestricted secret token. The token is required for the hosted 3D terrain and imagery. If it is missing or the provider cannot load, `/explore` explains the issue and shows TripNest's OpenStreetMap 2D map instead.

The project copies Cesium's Workers, ThirdParty, Assets, and Widgets directories into `public/cesium` before `npm run dev` and `npm run build`. Keep that generated directory out of source control; the copy script skips the work when the installed Cesium version has not changed.

The globe's Ghana country and regional outline overlays are Natural Earth boundaries distributed by [PiSpace Maps](https://maps.pispace.eu/data/ghana/) as public-domain GeoJSON in `public/geo`. They are generalized map outlines, not legal or survey boundaries.

If dependency installation previously failed with `ENOSPC`, free disk space before running `npm ci`. Then start the app with `npm run dev` and visit `/explore`.
