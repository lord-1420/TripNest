/* ==========================================================================
   TripNest — Catalog Pages (Destinations, Stays, Experiences)
   Pure Vanilla JS
   ========================================================================== */
(function () {
  const Store = window.TripNestStore;
  const UI = window.TripNestUI;

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    UI.mountHeader({ active: page, overlay: false });
    UI.mountFooter();

    if (page === "destinations") initDestinations();
    if (page === "stays") initStays();
    if (page === "experiences") initExperiences();
  });

  function syncQuery(obj) {
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    const url = window.location.pathname + (qs ? "?" + qs : "");
    window.history.replaceState(null, "", url);
  }

  /* ---------------- Destinations Index ---------------- */
  function initDestinations() {
    const qInput = document.getElementById("dest-q");
    const regionSel = document.getElementById("dest-region");
    const catSel = document.getElementById("dest-category");
    const sortSel = document.getElementById("dest-sort");
    const pillsWrap = document.getElementById("dest-cat-pills");
    const grid = document.getElementById("dest-grid");
    const meta = document.getElementById("dest-results-meta");
    const clearBtn = document.getElementById("dest-clear");

    const regions = Store.listRegions();
    const cats = Store.listCategories("DESTINATION");

    regionSel.innerHTML =
      '<option value="">All regions</option>' +
      regions.map((r) => `<option value="${UI.esc(r)}">${UI.esc(r)}</option>`).join("");
    catSel.innerHTML =
      '<option value="">All vibes</option>' +
      cats.map((c) => `<option value="${UI.esc(c.slug)}">${UI.esc(c.name)}</option>`).join("");

    qInput.value = UI.param("q");
    regionSel.value = UI.param("region");
    catSel.value = UI.param("category");
    sortSel.value = UI.param("sort") || "featured";

    function renderPills() {
      const current = catSel.value;
      pillsWrap.innerHTML =
        `<button type="button" class="filter-pill ${!current ? "is-active" : ""}" data-cat="">All</button>` +
        cats
          .map(
            (c) =>
              `<button type="button" class="filter-pill ${current === c.slug ? "is-active" : ""}" data-cat="${UI.esc(
                c.slug
              )}">${UI.esc(c.name)}</button>`
          )
          .join("");
      pillsWrap.querySelectorAll("[data-cat]").forEach((btn) => {
        btn.addEventListener("click", () => {
          catSel.value = btn.dataset.cat;
          render();
        });
      });
    }

    function render() {
      const filters = {
        q: qInput.value.trim(),
        region: regionSel.value,
        category: catSel.value,
        sort: sortSel.value,
      };
      syncQuery({
        q: filters.q,
        region: filters.region,
        category: filters.category,
        sort: filters.sort !== "featured" ? filters.sort : "",
      });
      renderPills();

      const items = Store.listDestinations(filters);
      meta.innerHTML = `<span>Showing <strong>${items.length}</strong> ${UI.pluralise(
        items.length,
        "destination"
      )}</span>`;

      if (!items.length) {
        grid.innerHTML = `
          <div class="info-card" style="grid-column:1/-1;text-align:center;padding:3rem 1.5rem">
            <h3 class="display-sm">No destinations match those filters</h3>
            <p class="text-sm text-muted mt-2">Try clearing your search or choosing another region or vibe.</p>
          </div>`;
        return;
      }

      grid.innerHTML = items.map((d) => UI.renderDestinationCard(d, { variant: "grid" })).join("");
    }

    [qInput, regionSel, catSel, sortSel].forEach((el) => el.addEventListener("input", render));
    clearBtn.addEventListener("click", () => {
      qInput.value = "";
      regionSel.value = "";
      catSel.value = "";
      sortSel.value = "featured";
      render();
    });
    render();
  }

  /* ---------------- Stays Index ---------------- */
  function initStays() {
    const qInput = document.getElementById("stay-q");
    const destSel = document.getElementById("stay-dest");
    const maxSel = document.getElementById("stay-max");
    const sortSel = document.getElementById("stay-sort");
    const typePills = document.getElementById("stay-type-pills");
    const grid = document.getElementById("stay-grid");
    const meta = document.getElementById("stay-results-meta");
    const clearBtn = document.getElementById("stay-clear");

    const dests = Store.listDestinations({ sort: "az" });
    destSel.innerHTML =
      '<option value="">All destinations</option>' +
      dests.map((d) => `<option value="${d.id}">${UI.esc(d.name)} (${UI.esc(d.region)})</option>`).join("");

    let currentType = UI.param("type").toUpperCase();
    if (!["HOTEL", "HOSTEL", "APARTMENT"].includes(currentType)) currentType = "";

    qInput.value = UI.param("q");
    destSel.value = UI.param("destinationId");
    maxSel.value = UI.param("maxPrice");
    sortSel.value = UI.param("sort") || "price_asc";

    const TYPES = [
      { key: "", label: "All stays" },
      { key: "HOTEL", label: "Hotels" },
      { key: "HOSTEL", label: "Hostels" },
      { key: "APARTMENT", label: "Apartments" },
    ];

    function renderPills() {
      typePills.innerHTML = TYPES.map(
        (t) =>
          `<button type="button" class="filter-pill ${currentType === t.key ? "is-active" : ""}" data-type="${t.key}">${
            t.label
          }</button>`
      ).join("");
      typePills.querySelectorAll("[data-type]").forEach((btn) => {
        btn.addEventListener("click", () => {
          currentType = btn.dataset.type;
          render();
        });
      });
    }

    function render() {
      const filters = {
        q: qInput.value.trim(),
        destinationId: destSel.value,
        type: currentType,
        maxPrice: maxSel.value,
        sort: sortSel.value,
      };
      syncQuery({
        q: filters.q,
        type: filters.type,
        destinationId: filters.destinationId,
        maxPrice: filters.maxPrice,
        sort: filters.sort !== "price_asc" ? filters.sort : "",
      });
      renderPills();

      const items = Store.listAccommodations(filters);
      meta.innerHTML = `<span>Showing <strong>${items.length}</strong> published ${UI.pluralise(
        items.length,
        "stay"
      )}</span>`;

      if (!items.length) {
        grid.innerHTML = `
          <div class="info-card" style="grid-column:1/-1;text-align:center;padding:3rem 1.5rem">
            <h3 class="display-sm">No stays match your search</h3>
            <p class="text-sm text-muted mt-2">Adjust your price ceiling or clear filters to see all published listings.</p>
          </div>`;
        return;
      }
      grid.innerHTML = items.map((s) => UI.renderStayCard(s)).join("");
    }

    [qInput, destSel, maxSel, sortSel].forEach((el) => el.addEventListener("input", render));
    clearBtn.addEventListener("click", () => {
      qInput.value = "";
      destSel.value = "";
      maxSel.value = "";
      sortSel.value = "price_asc";
      currentType = "";
      render();
    });
    render();
  }

  /* ---------------- Experiences Index ---------------- */
  function initExperiences() {
    const qInput = document.getElementById("exp-q");
    const regionSel = document.getElementById("exp-region");
    const catSel = document.getElementById("exp-category");
    const hiddenBtn = document.getElementById("exp-hidden-toggle");
    const grid = document.getElementById("exp-grid");
    const meta = document.getElementById("exp-results-meta");
    const clearBtn = document.getElementById("exp-clear");

    const regions = Store.listRegions("attractions");
    const cats = Store.listCategories("ATTRACTION");

    regionSel.innerHTML =
      '<option value="">All regions</option>' +
      regions.map((r) => `<option value="${UI.esc(r)}">${UI.esc(r)}</option>`).join("");
    catSel.innerHTML =
      '<option value="">All categories</option>' +
      cats.map((c) => `<option value="${UI.esc(c.slug)}">${UI.esc(c.name)}</option>`).join("");

    let hiddenOnly = UI.param("hidden") === "1";
    qInput.value = UI.param("q");
    regionSel.value = UI.param("region");
    catSel.value = UI.param("category");

    function render() {
      hiddenBtn.classList.toggle("is-active", hiddenOnly);
      hiddenBtn.setAttribute("aria-pressed", String(hiddenOnly));

      const filters = {
        q: qInput.value.trim(),
        region: regionSel.value,
        category: catSel.value,
        hidden: hiddenOnly,
      };
      syncQuery({
        q: filters.q,
        region: filters.region,
        category: filters.category,
        hidden: hiddenOnly ? "1" : "",
      });

      const items = Store.listAttractions(filters);
      meta.innerHTML = `<span>Showing <strong>${items.length}</strong> ${
        hiddenOnly ? "hidden-gem " : ""
      }${UI.pluralise(items.length, "experience")}</span>`;

      if (!items.length) {
        grid.innerHTML = `
          <div class="info-card" style="grid-column:1/-1;text-align:center;padding:3rem 1.5rem">
            <h3 class="display-sm">No experiences match those filters</h3>
            <p class="text-sm text-muted mt-2">Try toggling off Hidden Gems or broadening the region.</p>
          </div>`;
        return;
      }
      grid.innerHTML = items.map((a) => UI.renderExperienceCard(a)).join("");
    }

    [qInput, regionSel, catSel].forEach((el) => el.addEventListener("input", render));
    hiddenBtn.addEventListener("click", () => {
      hiddenOnly = !hiddenOnly;
      render();
    });
    clearBtn.addEventListener("click", () => {
      qInput.value = "";
      regionSel.value = "";
      catSel.value = "";
      hiddenOnly = false;
      render();
    });
    render();
  }
})();
