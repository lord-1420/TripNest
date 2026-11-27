/* ==========================================================================
   TripNest — Interactive Ghana 3D Globe & 2D Map Explorer (Pure Vanilla JS)
   Uses MapLibre GL JS (free 3D Globe + Esri World Imagery + Ghana GeoJSON)
   with seamless 2D Leaflet OpenStreetMap toggle — zero API tokens required.
   ========================================================================== */
(function () {
  const Store = window.TripNestStore;
  const UI = window.TripNestUI;

  const FEATURED_SLUGS = [
    "accra",
    "kumasi",
    "cape-coast",
    "kakum-national-park",
    "lake-bosumtwi",
    "aburi",
  ];

  const CATEGORY_LABELS = {
    adventure: "Adventure",
    beaches: "Beaches",
    city: "City",
    culture: "Culture",
    food: "Food",
    heritage: "Heritage",
    nature: "Nature",
    waterfalls: "Waterfalls",
    wildlife: "Wildlife",
  };

  let mode = "3d"; // '3d' (MapLibre Globe) or '2d' (Leaflet OSM)
  let glMap = null;
  let glMarkers = new Map();
  let leafletMap = null;
  let leafletMarkers = new Map();
  let locations = [];
  let selectedId = null;

  document.addEventListener("DOMContentLoaded", () => {
    UI.mountHeader({ active: "explore", overlay: false });
    UI.mountFooter();
    initExplorer();
  });

  function locId(p) {
    return `${p.kind}-${p.slug}`;
  }

  function initExplorer() {
    const dests = Store.listDestinations().filter((d) => d.lat != null && d.lng != null);
    const atts = Store.listAttractions().filter((a) => a.lat != null && a.lng != null);

    locations = [
      ...dests.map((d) => ({
        id: d.id,
        slug: d.slug,
        name: d.name,
        region: d.region,
        lat: d.lat,
        lng: d.lng,
        image: d.hero_image,
        summary: d.summary,
        categories: d.categories || [],
        geo_precision: d.geo_precision,
        kind: "destination",
        href: `destination.html?slug=${encodeURIComponent(d.slug)}`,
      })),
      ...atts.map((a) => ({
        id: a.id,
        slug: a.slug,
        name: a.name,
        region: a.region,
        lat: a.lat,
        lng: a.lng,
        image: a.image,
        summary: a.summary,
        categories: a.categories || [],
        geo_precision: a.geo_precision,
        kind: "attraction",
        destination_slug: a.destination_slug,
        href: `experience.html?slug=${encodeURIComponent(a.slug)}`,
      })),
    ];

    const countEl = document.getElementById("explore-count");
    if (countEl) countEl.textContent = `${locations.length} mapped places`;

    initSearchAndFilters();
    renderFeaturedStops();
    renderInfoPanel(null);
    bindControls();

    // Try 3D Globe first; if WebGL / MapLibre CDN unavailable, fall back cleanly to 2D Leaflet
    if (window.maplibregl && supportsWebGL()) {
      initMapLibreGlobe();
    } else {
      switchMode("2d");
    }
  }

  function supportsWebGL() {
    try {
      const c = document.createElement("canvas");
      return Boolean(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      return false;
    }
  }

  function initMapLibreGlobe() {
    const container = document.getElementById("globe-canvas");
    const statusBanner = document.getElementById("explore-status");
    try {
      glMap = new window.maplibregl.Map({
        container,
        style: {
          version: 8,
          sources: {
            esri: {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics",
            },
            labels: {
              type: "raster",
              tiles: [
                "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
            },
          },
          layers: [
            { id: "esri-imagery", type: "raster", source: "esri" },
            { id: "esri-labels", type: "raster", source: "labels", paint: { "raster-opacity": 0.85 } },
          ],
        },
        center: [-1.2, 7.6],
        zoom: 6.1,
        pitch: 36,
        bearing: -6,
        antialias: true,
      });

      glMap.on("style.load", () => {
        if (typeof glMap.setProjection === "function") {
          try {
            glMap.setProjection({ type: "globe" });
          } catch {}
        }
        // Add Ghana boundary & regions GeoJSON overlays
        const geo = window.TRIPNEST_GEO;
        if (geo && geo.regions) {
          glMap.addSource("ghana-regions", { type: "geojson", data: geo.regions });
          glMap.addLayer({
            id: "ghana-regions-line",
            type: "line",
            source: "ghana-regions",
            paint: { "line-color": "#f6e7c8", "line-width": 1.1, "line-opacity": 0.55 },
          });
        }
        if (geo && geo.boundary) {
          glMap.addSource("ghana-boundary", { type: "geojson", data: geo.boundary });
          glMap.addLayer({
            id: "ghana-boundary-line",
            type: "line",
            source: "ghana-boundary",
            paint: { "line-color": "#d49b38", "line-width": 2.4, "line-opacity": 0.9 },
          });
        }
      });

      locations.forEach((place) => {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "tn-pin-wrap";
        el.setAttribute("aria-label", `${place.name}, ${place.region}`);
        const pin = document.createElement("span");
        pin.className = `tn-pin ${place.kind === "attraction" ? "is-attraction" : ""}`;
        el.appendChild(pin);
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          selectLocation(locId(place));
        });
        el.addEventListener("mouseenter", () => showHoverTooltip(place));
        el.addEventListener("mouseleave", () => hideHoverTooltip());

        const marker = new window.maplibregl.Marker({ element: el })
          .setLngLat([place.lng, place.lat])
          .addTo(glMap);
        // Set after addTo() because MapLibre overwrites aria-label with "Map marker".
        el.setAttribute("aria-label", `${place.name}, ${place.region}`);
        glMarkers.set(locId(place), { marker, el, pin });
      });

      if (statusBanner) statusBanner.classList.add("hidden");
    } catch {
      switchMode("2d");
    }
  }

  function initLeaflet2D() {
    if (leafletMap) {
      setTimeout(() => leafletMap.invalidateSize(), 60);
      return;
    }
    const container = document.getElementById("leaflet-canvas");
    if (!window.L || !container) return;

    leafletMap = window.L.map(container, { zoomControl: false }).setView([7.6, -1.2], 7);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(leafletMap);

    const geo = window.TRIPNEST_GEO;
    if (geo && geo.regions) {
      window.L.geoJSON(geo.regions, {
        style: { color: "#1c4f40", weight: 1, fillOpacity: 0.04 },
      }).addTo(leafletMap);
    }
    if (geo && geo.boundary) {
      window.L.geoJSON(geo.boundary, {
        style: { color: "#0f2d24", weight: 2.2, fillOpacity: 0 },
      }).addTo(leafletMap);
    }

    locations.forEach((place) => {
      const icon = window.L.divIcon({
        className: "",
        html: `<div class="tn-pin ${place.kind === "attraction" ? "is-attraction" : ""}"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      const marker = window.L.marker([place.lat, place.lng], { icon })
        .addTo(leafletMap)
        .on("click", () => selectLocation(locId(place)));
      marker.bindTooltip(`${UI.esc(place.name)} · ${UI.esc(place.region)}`, { direction: "top", offset: [0, -8] });
      leafletMarkers.set(locId(place), marker);
    });
    syncSelectedStyles();
  }

  function switchMode(nextMode) {
    mode = nextMode;
    const globeEl = document.getElementById("globe-canvas");
    const leafEl = document.getElementById("leaflet-canvas");
    const btn3d = document.getElementById("btn-mode-3d");
    const btn2d = document.getElementById("btn-mode-2d");
    const caption = document.getElementById("explore-attribution");

    if (mode === "3d" && glMap) {
      globeEl.classList.remove("hidden");
      leafEl.classList.add("hidden");
      btn3d.classList.add("is-active");
      btn2d.classList.remove("is-active");
      glMap.resize();
      if (caption) {
        caption.textContent = "3D Satellite Globe via MapLibre GL & Esri World Imagery · Ghana borders via Natural Earth.";
      }
    } else {
      mode = "2d";
      globeEl.classList.add("hidden");
      leafEl.classList.remove("hidden");
      btn3d.classList.remove("is-active");
      btn2d.classList.add("is-active");
      initLeaflet2D();
      if (caption) {
        caption.textContent = "2D Interactive Map via Leaflet & OpenStreetMap · Coordinates use TripNest's published dataset.";
      }
    }
  }

  function bindControls() {
    document.getElementById("btn-mode-3d").addEventListener("click", () => {
      if (!glMap && window.maplibregl && supportsWebGL()) initMapLibreGlobe();
      if (glMap) switchMode("3d");
      else UI.showToast("WebGL 3D mode is unavailable in this browser — using 2D map.");
    });
    document.getElementById("btn-mode-2d").addEventListener("click", () => switchMode("2d"));

    document.getElementById("btn-map-reset").addEventListener("click", () => {
      selectedId = null;
      syncSelectedStyles();
      renderInfoPanel(null);
      if (mode === "3d" && glMap) {
        glMap.flyTo({ center: [-1.2, 7.6], zoom: 6.1, pitch: 36, bearing: -6, duration: 1100 });
      } else if (leafletMap) {
        leafletMap.flyTo([7.6, -1.2], 7, { duration: 0.9 });
      }
    });

    document.getElementById("btn-map-zoom-in").addEventListener("click", () => {
      if (mode === "3d" && glMap) glMap.zoomIn();
      else if (leafletMap) leafletMap.zoomIn();
    });
    document.getElementById("btn-map-zoom-out").addEventListener("click", () => {
      if (mode === "3d" && glMap) glMap.zoomOut();
      else if (leafletMap) leafletMap.zoomOut();
    });
  }

  function showHoverTooltip(place) {
    const tip = document.getElementById("explore-hover-tip");
    if (!tip || selectedId) return;
    tip.innerHTML = `<p class="fw-600" style="font-size:0.9rem">${UI.esc(place.name)}</p><p class="font-mono text-xs text-muted">${UI.esc(
      place.region
    )} · ${place.geo_precision === "approximate" ? "Approximate" : "Mapped"}</p>`;
    tip.classList.remove("hidden");
  }

  function hideHoverTooltip() {
    const tip = document.getElementById("explore-hover-tip");
    if (tip) tip.classList.add("hidden");
  }

  function selectLocation(id) {
    const place = locations.find((p) => locId(p) === id);
    if (!place) return;
    selectedId = id;
    hideHoverTooltip();
    syncSelectedStyles();
    renderInfoPanel(place);

    if (mode === "3d" && glMap) {
      glMap.flyTo({ center: [place.lng, place.lat], zoom: 11.2, pitch: 52, bearing: 12, duration: 1300 });
    } else if (leafletMap) {
      leafletMap.flyTo([place.lat, place.lng], 11, { duration: 1.0 });
    }
  }

  function syncSelectedStyles() {
    glMarkers.forEach(({ pin }, id) => {
      pin.classList.toggle("is-selected", id === selectedId);
    });
    leafletMarkers.forEach((marker, id) => {
      const el = marker.getElement && marker.getElement();
      const pin = el && el.querySelector(".tn-pin");
      if (pin) pin.classList.toggle("is-selected", id === selectedId);
    });
    document.querySelectorAll("[data-stop-id]").forEach((btn) => {
      const active = btn.dataset.stopId === selectedId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  function initSearchAndFilters() {
    const input = document.getElementById("explore-q");
    const catSel = document.getElementById("explore-cat");
    const resultsBox = document.getElementById("explore-search-results");

    const cats = Array.from(new Set(locations.flatMap((l) => l.categories))).sort();
    catSel.innerHTML =
      '<option value="all">All vibes</option>' +
      cats.map((c) => `<option value="${UI.esc(c)}">${UI.esc(CATEGORY_LABELS[c] || c)}</option>`).join("");

    function renderMatches() {
      const needle = input.value.trim().toLowerCase();
      const cat = catSel.value;
      if (!needle && cat === "all") {
        resultsBox.classList.remove("is-open");
        return;
      }
      const matches = locations
        .filter((p) => cat === "all" || p.categories.includes(cat))
        .filter(
          (p) =>
            !needle ||
            [p.name, p.region, p.summary, ...p.categories].join(" ").toLowerCase().includes(needle)
        )
        .slice(0, 7);

      if (!matches.length) {
        resultsBox.innerHTML = '<p class="text-sm text-muted" style="padding:0.75rem">No published places match that search.</p>';
      } else {
        resultsBox.innerHTML = matches
          .map(
            (p) => `
            <button type="button" class="search-suggestion" data-pick="${UI.esc(locId(p))}">
              <span style="display:flex;align-items:center;gap:0.7rem;min-width:0">
                <img src="${UI.esc(p.image)}" alt="" style="width:44px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0" />
                <span style="min-width:0">
                  <span style="display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${UI.esc(p.name)}</span>
                  <span class="search-suggestion-meta">${UI.esc(p.region)} · ${UI.esc(p.kind)}</span>
                </span>
              </span>
              <span class="text-muted">→</span>
            </button>`
          )
          .join("");
        resultsBox.querySelectorAll("[data-pick]").forEach((btn) => {
          btn.addEventListener("click", () => {
            resultsBox.classList.remove("is-open");
            selectLocation(btn.dataset.pick);
          });
        });
      }
      resultsBox.classList.add("is-open");
    }

    input.addEventListener("input", renderMatches);
    catSel.addEventListener("change", renderMatches);
    document.addEventListener("mousedown", (e) => {
      if (!document.getElementById("explore-search-wrap").contains(e.target)) {
        resultsBox.classList.remove("is-open");
      }
    });
  }

  function renderFeaturedStops() {
    const listEl = document.getElementById("explore-stops-list");
    const countEl = document.getElementById("explore-stops-count");
    const featured = FEATURED_SLUGS.map((slug) => locations.find((l) => l.slug === slug)).filter(Boolean);
    const list = featured.length ? featured : locations.slice(0, 6);
    if (countEl) countEl.textContent = `${list.length} stops`;

    listEl.innerHTML = list
      .map(
        (place, idx) => `
        <button type="button" class="explore-stop-btn" data-stop-id="${UI.esc(locId(place))}" aria-pressed="false">
          <span class="explore-stop-thumb">
            <img src="${UI.esc(place.image)}" alt="${UI.esc(place.name)}" loading="lazy" />
          </span>
          <span style="min-width:0;flex:1">
            <span class="font-mono text-xs text-muted" style="text-transform:uppercase;display:block">
              ${String(idx + 1).padStart(2, "0")} · ${UI.esc(place.region)}
            </span>
            <span style="display:block;font-weight:600;font-size:0.98rem;margin-top:0.1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${UI.esc(place.name)}
            </span>
            <span class="text-xs text-muted" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${UI.esc(place.summary)}
            </span>
          </span>
          <span class="text-muted" aria-hidden="true">→</span>
        </button>`
      )
      .join("");

    listEl.querySelectorAll("[data-stop-id]").forEach((btn) => {
      btn.addEventListener("click", () => selectLocation(btn.dataset.stopId));
    });
  }

  function renderInfoPanel(place) {
    const wrap = document.getElementById("explore-info-slot");
    if (!place) {
      wrap.innerHTML = `
        <div class="info-card info-card-cream flex items-center justify-between gap-4 mb-4" style="border-style:dashed">
          <div>
            <p class="eyebrow">Interactive preview</p>
            <p class="text-sm fw-600 mt-1">Click any marker on the globe or a stop below to inspect it.</p>
          </div>
          <span style="width:38px;height:38px;border-radius:999px;border:1px solid var(--line);background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">+</span>
        </div>`;
      return;
    }

    const parentSlug = place.kind === "destination" ? place.slug : place.destination_slug;
    const related = locations
      .filter((p) => p.kind === "attraction" && p.destination_slug === parentSlug && p.slug !== place.slug)
      .slice(0, 3);

    wrap.innerHTML = `
      <div class="explore-info-panel">
        <div style="position:relative;aspect-ratio:16/9;background:var(--sand)">
          <img src="${UI.esc(place.image)}" alt="${UI.esc(place.name)}" style="width:100%;height:100%;object-fit:cover" />
          <button type="button" id="explore-panel-close" aria-label="Close preview" style="position:absolute;top:0.75rem;right:0.75rem;height:32px;width:32px;border-radius:999px;background:rgba(0,0,0,0.6);color:#fff;font-size:0.85rem">✕</button>
          <span class="stay-badge-top" style="text-transform:capitalize">${UI.esc(place.kind)}</span>
        </div>
        <div style="padding:1.15rem">
          <p class="eyebrow">${UI.esc(place.region)} Region</p>
          <h3 class="display-sm mt-1">${UI.esc(place.name)}</h3>
          <p class="text-sm text-muted mt-2">${UI.esc(place.summary)}</p>
          <div class="flex flex-wrap gap-2 mt-4">
            <a href="${place.href}" class="btn btn-primary btn-sm">Open full guide →</a>
            <button type="button" id="explore-panel-save"></button>
          </div>
          ${
            related.length
              ? `<div class="mt-4" style="border-top:1px solid var(--line);padding-top:0.85rem">
                  <p class="eyebrow">Nearby experiences</p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    ${related
                      .map(
                        (r) =>
                          `<button type="button" class="filter-pill" style="padding:0.28rem 0.7rem;font-size:0.75rem" data-jump="${UI.esc(
                            locId(r)
                          )}">${UI.esc(r.name)}</button>`
                      )
                      .join("")}
                  </div>
                </div>`
              : ""
          }
        </div>
      </div>`;

    document.getElementById("explore-panel-close").addEventListener("click", () => {
      selectedId = null;
      syncSelectedStyles();
      renderInfoPanel(null);
    });
    UI.bindSaveButton(document.getElementById("explore-panel-save"), {
      kind: place.kind,
      id: place.id,
      label: "Save",
      tone: "light",
    });
    wrap.querySelectorAll("[data-jump]").forEach((btn) => {
      btn.addEventListener("click", () => selectLocation(btn.dataset.jump));
    });
  }
})();
