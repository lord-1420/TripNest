# TripNest

A Ghana travel-discovery and trip-planning platform built with **pure HTML, CSS, and vanilla JavaScript** — zero frameworks, zero Node.js, and zero build tools required.

Discover destinations across Ghana, explore them on an interactive 3D satellite globe & 2D OpenStreetMap atlas, compare indicative local stays in cedis (GH₵), save favourites, and build a dated day-by-day itinerary with a live budget breakdown.

## Run it

Just open **`index.html`** in any modern browser, or serve the folder with VS Code Live Server / any static server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Demo accounts

All accounts, saved places, trips, budgets, provider listings, and admin edits persist in your browser via `localStorage`:

| Role      | Email                  | Password      |
| --------- | ---------------------- | ------------- |
| Traveller | traveller@tripnest.gh  | tripnest123   |
| Provider  | provider@tripnest.gh   | tripnest123   |
| Admin     | admin@tripnest.gh      | tripnest123   |

You can also create a brand-new Traveller or Provider account on `sign-up.html`, or reset demo data anytime from the dashboard sidebar.

## Project structure

```text
index.html          Homepage with multi-scene Ghana drone video hero & search typeahead
destinations.html   Destinations directory with search, region & vibe filters
destination.html    Destination guide (?slug=...) with gallery, Leaflet map & packing checklist
stays.html          Accommodation directory with type, destination & price filters
stay.html           Stay details (?slug=...) with direct provider contact links
experiences.html    Attractions & Hidden Gems directory
experience.html     Experience details (?slug=...) with Save & Add-to-Trip
explore.html        Interactive 3D Satellite Globe (MapLibre GL) + 2D Map (Leaflet OSM)
plan.html           Trip planner overview
sign-in.html        Split-screen sign-in with Accra drone video & 1-click demo accounts
sign-up.html        Split-screen sign-up with Accra coastline drone video
dashboard.html      Role-based workspace (Traveller itineraries/budgets, Provider portal, Admin moderation)
about.html          Platform overview & live dataset stats
contact.html        Contact channels & FAQ
credits.html        Wikimedia Commons photography & Pexels drone video credits
privacy.html        Privacy policy
terms.html          Terms of use
css/styles.css      Complete TripNest minimal design system (pure CSS)
js/data.js          Seeded Ghana dataset (17 destinations, 28 experiences, 16 stays, credits)
js/geo-data.js      Ghana Natural Earth country boundary & regional polygons (GeoJSON)
js/store.js         localStorage state & query engine
js/ui.js            Shared header, footer, video controller, cards, modals & map helper
js/home.js          Homepage controller
js/catalog.js       Destinations, Stays & Experiences filtering
js/detail.js        Detail pages, lightbox & localStorage packing checklist
js/explore.js       3D Globe + 2D Map explorer
js/auth.js          Sign-in & Sign-up handlers
js/dashboard.js     Traveller, Provider & Admin workspace
js/pages.js         Plan, About & Credits dynamic helpers
assets/             Self-hosted fonts, verified Wikimedia photos, and 4 Ghana drone videos
```

## Media credits

- Photography in `assets/images/` is sourced from Wikimedia Commons under open licences (full attribution on `credits.html`).
- Background drone clips in `assets/videos/` are trimmed and muted for the web under the [Pexels license](https://www.pexels.com/license/):
  - Cape Coast Castle by INDIGENA STUDIO
  - Accra coastline by Experience Africa Today
  - Peduase aerial landscape by LG Sekyere
  - Independence Arch, Accra by Bismark Dzahene-Quarshie Jnr.
- Ghana country and regional outline overlays in `js/geo-data.js` are public-domain Natural Earth boundaries via PiSpace Maps.
