/* ==========================================================================
   TripNest — Homepage Controller (Pure Vanilla JS)
   ========================================================================== */
(function () {
  const Store = window.TripNestStore;
  const UI = window.TripNestUI;

  const SCENES = [
    { asset: "cape-coast", label: "Cape Coast Castle", region: "Central Region" },
    { asset: "accra-shore", label: "Accra Coastline", region: "Greater Accra" },
    { asset: "peduase", label: "Peduase Hills", region: "Eastern Region" },
  ];

  const POPULAR = ["Accra", "Cape Coast", "Kumasi", "Aburi", "Mole"];

  document.addEventListener("DOMContentLoaded", () => {
    UI.mountHeader({ active: "home", overlay: true });
    UI.mountFooter();

    initHeroVideo();
    initHeroSearch();
    renderCategories();
    renderTrending();
    renderStays();
    renderHiddenGems();
    renderExperiences();
    UI.initReveal();
  });

  function initHeroVideo() {
    const videoEl = document.getElementById("hero-video");
    const toggleBtn = document.getElementById("hero-video-toggle");
    const indexEl = document.getElementById("hero-scene-index");
    const labelEl = document.getElementById("hero-scene-label");
    const regionEl = document.getElementById("hero-scene-region");
    const dotsEl = document.getElementById("hero-scene-dots");
    if (!videoEl || !dotsEl) return;

    let idx = 0;

    const controller = UI.attachBackgroundVideo({
      videoEl,
      toggleBtn,
      onEnded: () => setScene((idx + 1) % SCENES.length),
    });

    function renderDots() {
      dotsEl.innerHTML = SCENES.map(
        (s, i) =>
          `<button type="button" class="scene-dot ${i === idx ? "is-active" : ""}" aria-pressed="${
            i === idx
          }" aria-label="Show ${UI.esc(s.label)}" data-scene="${i}"></button>`
      ).join("");
      dotsEl.querySelectorAll("[data-scene]").forEach((btn) => {
        btn.addEventListener("click", () => setScene(Number(btn.dataset.scene)));
      });
    }

    function setScene(nextIdx) {
      idx = nextIdx;
      const s = SCENES[idx];
      if (indexEl) indexEl.textContent = `0${idx + 1}/0${SCENES.length}`;
      if (labelEl) labelEl.textContent = s.label;
      if (regionEl) regionEl.textContent = `· ${s.region}`;
      if (controller) {
        controller.setSource(`assets/videos/${s.asset}.mp4`, `assets/videos/${s.asset}.webp`);
      }
      renderDots();
    }

    setScene(0);
  }

  function initHeroSearch() {
    const categories = Store.listCategories("DESTINATION");
    const select = document.getElementById("hero-interest");
    const input = document.getElementById("hero-search");
    const form = document.getElementById("hero-search-form");
    const dropdown = document.getElementById("hero-search-dropdown");
    const popWrap = document.getElementById("hero-popular");

    if (select) {
      select.innerHTML =
        '<option value="">Any experience</option>' +
        categories.map((c) => `<option value="${UI.esc(c.slug)}">${UI.esc(c.name)}</option>`).join("");
    }

    if (popWrap) {
      popWrap.innerHTML =
        '<span class="popular-label">Popular</span>' +
        POPULAR.map(
          (p) =>
            `<a href="destinations.html?q=${encodeURIComponent(p)}" class="popular-chip">${UI.esc(p)}</a>`
        ).join("");
    }

    if (!input || !dropdown || !form) return;

    let suggestions = [];
    let activeIdx = -1;

    function renderDropdown() {
      if (!suggestions.length) {
        dropdown.classList.remove("is-open");
        dropdown.innerHTML = "";
        input.setAttribute("aria-expanded", "false");
        return;
      }
      dropdown.innerHTML = suggestions
        .map(
          (r, i) => `
          <a href="${r.href}" role="option" aria-selected="${i === activeIdx}" class="search-suggestion ${
            i === activeIdx ? "is-active" : ""
          }" data-idx="${i}">
            <span class="fw-600">${UI.esc(r.name)}</span>
            <span class="search-suggestion-meta">${UI.esc(
              r.kind === "destination" ? r.region : "Experience"
            )}</span>
          </a>`
        )
        .join("");
      dropdown.classList.add("is-open");
      input.setAttribute("aria-expanded", "true");
    }

    input.addEventListener("input", () => {
      activeIdx = -1;
      suggestions = Store.searchSuggestions(input.value);
      renderDropdown();
    });

    input.addEventListener("focus", () => {
      if (suggestions.length) dropdown.classList.add("is-open");
    });

    input.addEventListener("keydown", (e) => {
      if (!suggestions.length || !dropdown.classList.contains("is-open")) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIdx = (activeIdx + 1) % suggestions.length;
        renderDropdown();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIdx = activeIdx <= 0 ? suggestions.length - 1 : activeIdx - 1;
        renderDropdown();
      } else if (e.key === "Enter" && activeIdx >= 0) {
        e.preventDefault();
        window.location.href = suggestions[activeIdx].href;
      } else if (e.key === "Escape") {
        dropdown.classList.remove("is-open");
        input.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("mousedown", (e) => {
      if (!form.parentElement.contains(e.target)) {
        dropdown.classList.remove("is-open");
        input.setAttribute("aria-expanded", "false");
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (input.value.trim()) params.set("q", input.value.trim());
      if (select && select.value) params.set("category", select.value);
      window.location.href = `destinations.html${params.toString() ? "?" + params.toString() : ""}`;
    });
  }

  function renderCategories() {
    const rail = document.getElementById("home-categories-rail");
    const more = document.getElementById("home-categories-more");
    if (!rail) return;
    const cats = Store.listCategories("DESTINATION");

    rail.innerHTML = cats
      .slice(0, 5)
      .map(
        (c) => `
        <a href="destinations.html?category=${encodeURIComponent(c.slug)}" class="vibe-card">
          ${c.image ? `<img src="${UI.esc(c.image)}" alt="${UI.esc(c.name)}" loading="lazy" />` : ""}
          <div class="vibe-card-grad"></div>
          <div class="vibe-card-copy">
            <h3>${UI.esc(c.name)}</h3>
            <p>${UI.esc(c.description || "")}</p>
          </div>
        </a>`
      )
      .join("");

    if (more && cats.length > 5) {
      more.innerHTML =
        '<span class="eyebrow" style="margin-right:0.35rem">More vibes</span>' +
        cats
          .slice(5)
          .map(
            (c) =>
              `<a href="destinations.html?category=${encodeURIComponent(c.slug)}">${UI.esc(c.name)}</a>`
          )
          .join("");
    }
  }

  function renderTrending() {
    const grid = document.getElementById("home-trending-grid");
    if (!grid) return;
    const featured = Store.listDestinations({ featured: true });
    const all = Store.listDestinations();
    const list =
      featured.length >= 6
        ? featured.slice(0, 6)
        : [...featured, ...all.filter((d) => !featured.some((f) => f.id === d.id))].slice(0, 6);

    const [first, second, third, ...rest] = list;
    if (!first) return;

    grid.innerHTML = `
      <div class="bento-lead reveal">
        ${UI.renderDestinationCard(first, { variant: "feature", fillHeight: true })}
      </div>
      <div class="bento-stack">
        ${second ? `<div class="reveal">${UI.renderDestinationCard(second, { variant: "wide", fillHeight: true })}</div>` : ""}
        ${third ? `<div class="reveal">${UI.renderDestinationCard(third, { variant: "wide", fillHeight: true })}</div>` : ""}
      </div>
      ${rest
        .slice(0, 3)
        .map((d) => `<div class="bento-third reveal">${UI.renderDestinationCard(d, { variant: "compact" })}</div>`)
        .join("")}`;
  }

  function renderStays() {
    const grid = document.getElementById("home-stays-grid");
    if (!grid) return;
    const stays = Store.listAccommodations({ sort: "price_asc" }).slice(0, 6);
    grid.innerHTML = stays.map((s) => UI.renderStayCard(s)).join("");
  }

  function renderHiddenGems() {
    const wrap = document.getElementById("home-gems-grid");
    if (!wrap) return;
    const gems = Store.listAttractions({ hidden: true }).slice(0, 5);
    const [lead, ...others] = gems;
    if (!lead) return;

    wrap.innerHTML = `
      <article class="gem-lead group">
        <a href="experience.html?slug=${encodeURIComponent(lead.slug)}" style="display:block">
          <div class="media media-zoom gem-lead-media">
            <img src="${UI.esc(lead.image)}" alt="${UI.esc(lead.name)}, ${UI.esc(lead.region)}" loading="lazy" />
          </div>
          <div class="gem-lead-meta">
            <span class="gold">${UI.esc(lead.region)}</span>
            <span aria-hidden="true">·</span>
            <span>${UI.esc(lead.destination_name || lead.nearest_town || "Ghana")}</span>
          </div>
          <h3 class="gem-lead-title">${UI.esc(lead.name)}</h3>
          <p class="gem-lead-summary">${UI.esc(lead.summary)}</p>
          <span style="display:inline-flex;align-items:center;gap:0.4rem;margin-top:1rem;font-size:0.84rem;font-weight:600;color:#fff">
            Explore place <span aria-hidden="true">→</span>
          </span>
        </a>
      </article>
      <div>
        <ul class="gem-list">
          ${others
            .slice(0, 4)
            .map(
              (g) => `
            <li class="gem-list-item">
              <a href="experience.html?slug=${encodeURIComponent(g.slug)}" class="gem-row">
                <span class="gem-row-thumb">
                  <img src="${UI.esc(g.image)}" alt="${UI.esc(g.name)}" loading="lazy" />
                </span>
                <span style="min-width:0">
                  <span class="gem-row-region">${UI.esc(g.region)}</span>
                  <h4>${UI.esc(g.name)}</h4>
                  <p class="gem-row-sub">${UI.esc(g.destination_name || g.nearest_town || "")}</p>
                </span>
                <span class="gem-row-arrow" aria-hidden="true">→</span>
              </a>
            </li>`
            )
            .join("")}
        </ul>
      </div>`;
  }

  function renderExperiences() {
    const wrap = document.getElementById("home-experiences-grid");
    if (!wrap) return;
    const list = Store.listAttractions({ featured: true }).slice(0, 5);
    const [lead, ...rest] = list;
    if (!lead) return;
    const catLabel = lead.categories && lead.categories[0] ? lead.categories[0] : "Experience";

    wrap.innerHTML = `
      <article class="group">
        <a href="experience.html?slug=${encodeURIComponent(lead.slug)}" style="display:block">
          <div class="media media-zoom exp-card-media">
            <img src="${UI.esc(lead.image)}" alt="${UI.esc(lead.name)}" loading="lazy" />
            <span class="stay-badge-top" style="text-transform:capitalize">${UI.esc(catLabel)}</span>
          </div>
          <h3 class="display-sm mt-4">${UI.esc(lead.name)}</h3>
          <p class="text-sm text-muted mt-2" style="max-width:34rem">${UI.esc(lead.summary)}</p>
          <p class="exp-card-meta mt-2">${UI.esc(lead.region)}${lead.destination_name ? ` · ${UI.esc(lead.destination_name)}` : ""}</p>
        </a>
      </article>
      <div>
        <div class="exp-row-grid">
          ${rest.slice(0, 4).map((a) => UI.renderExperienceRow(a)).join("")}
        </div>
        <div class="save-callout">
          <p class="eyebrow">Save as you browse</p>
          <p class="text-sm text-muted mt-2">
            Signed-in travellers can bookmark attractions and destinations, then drop them straight into
            a dated itinerary with a running budget.
          </p>
          <div class="flex flex-wrap gap-2 mt-4">
            <a href="sign-up.html" class="btn btn-primary btn-sm">Create free account</a>
            <a href="dashboard.html?tab=saved" class="btn btn-outline btn-sm">View saved places</a>
          </div>
        </div>
      </div>`;
  }
})();
