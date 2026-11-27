/* ==========================================================================
   TripNest — Role-Based Dashboard Workspace (Traveller, Provider, Admin)
   Pure Vanilla JS + localStorage
   ========================================================================== */
(function () {
  const Store = window.TripNestStore;
  const UI = window.TripNestUI;

  const NAV_BY_ROLE = {
    TRAVELLER: [
      { tab: "overview", label: "Overview" },
      { tab: "saved", label: "Saved places" },
      { tab: "trips", label: "My trips" },
      { tab: "new-trip", label: "+ New trip" },
    ],
    PROVIDER: [
      { tab: "provider", label: "Your listings" },
      { tab: "new-listing", label: "+ Add a property" },
      { tab: "saved", label: "Saved places" },
      { tab: "trips", label: "My trips" },
    ],
    ADMIN: [
      { tab: "admin", label: "Platform overview" },
      { tab: "admin-stays", label: "Approval queue" },
      { tab: "admin-destinations", label: "Destinations" },
      { tab: "admin-attractions", label: "Attractions" },
      { tab: "admin-users", label: "Users" },
      { tab: "provider", label: "Provider listings" },
      { tab: "trips", label: "My trips" },
    ],
  };

  let currentUser = null;
  let activeTab = "overview";

  document.addEventListener("DOMContentLoaded", () => {
    currentUser = Store.getSession();
    if (!currentUser) {
      const next = encodeURIComponent("dashboard.html" + window.location.search);
      window.location.href = `sign-in.html?next=${next}`;
      return;
    }

    const requestedTab = UI.param("tab");
    activeTab = resolveInitialTab(requestedTab, currentUser.role);
    mountShell();
    renderTab();
  });

  function resolveInitialTab(req, role) {
    if (req) {
      if (req.startsWith("admin") && role !== "ADMIN") return defaultTab(role);
      if ((req === "provider" || req === "new-listing") && role === "TRAVELLER") return "overview";
      return req;
    }
    return defaultTab(role);
  }

  function defaultTab(role) {
    if (role === "ADMIN") return "admin";
    if (role === "PROVIDER") return "provider";
    return "overview";
  }

  const desktopMq = window.matchMedia("(min-width: 768px)");

  function setSidebarOpen(isOpen) {
    const sidebar = document.getElementById("dash-sidebar");
    const menuBtn = document.getElementById("dash-menu-btn");
    if (!sidebar) return;
    const open = desktopMq.matches ? false : Boolean(isOpen);
    sidebar.classList.toggle("is-open", open);
    sidebar.inert = !desktopMq.matches && !open;
    if (menuBtn) menuBtn.setAttribute("aria-expanded", String(open));
  }

  function navigateTab(tab, extraParams = {}) {
    activeTab = tab;
    const params = new URLSearchParams({ tab, ...extraParams });
    window.history.replaceState(null, "", `dashboard.html?${params.toString()}`);
    setSidebarOpen(false);
    renderSidebarNav();
    renderTab();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function mountShell() {
    document.getElementById("dash-logo-desktop").innerHTML = UI.logoHtml({ tone: "dark" });
    document.getElementById("dash-logo-mobile").innerHTML = UI.logoHtml({ tone: "dark", size: "sm" });
    document.getElementById("dash-mobile-avatar").textContent = UI.initials(currentUser.name);

    document.getElementById("dash-user-card").innerHTML = `
      <span class="avatar-circle" style="width:36px;height:36px;font-size:0.74rem">${UI.esc(UI.initials(currentUser.name))}</span>
      <div style="min-width:0">
        <p class="fw-600 text-sm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${UI.esc(currentUser.name)}</p>
        <p class="font-mono text-xs text-muted" style="text-transform:uppercase;letter-spacing:0.08em">${UI.esc(currentUser.role)}</p>
      </div>`;

    renderSidebarNav();

    const menuBtn = document.getElementById("dash-menu-btn");
    const sidebar = document.getElementById("dash-sidebar");
    if (menuBtn && sidebar) {
      menuBtn.addEventListener("click", () => {
        setSidebarOpen(!sidebar.classList.contains("is-open"));
      });
      desktopMq.addEventListener("change", () => setSidebarOpen(false));
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sidebar.classList.contains("is-open")) {
          setSidebarOpen(false);
          menuBtn.focus();
        }
      });
      setSidebarOpen(false);
    }

    document.getElementById("dash-signout").addEventListener("click", () => {
      Store.signOut();
      window.location.href = "index.html";
    });
    document.getElementById("dash-reset").addEventListener("click", () => {
      if (window.confirm("Reset all demo data (trips, listings, saved places) back to default?")) {
        Store.resetDemoData();
        window.location.href = "sign-in.html";
      }
    });
  }

  function renderSidebarNav() {
    const items = NAV_BY_ROLE[currentUser.role] || NAV_BY_ROLE.TRAVELLER;
    const navEl = document.getElementById("dash-nav");
    navEl.innerHTML = items
      .map(
        (item) =>
          `<button type="button" class="dash-nav-item ${
            activeTab === item.tab || (activeTab === "trip" && item.tab === "trips") ? "is-active" : ""
          }" data-tab="${item.tab}">${UI.esc(item.label)}</button>`
      )
      .join("");
    navEl.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTab(btn.dataset.tab));
    });
  }

  function renderTab() {
    const main = document.getElementById("dash-main");
    if (activeTab === "overview") return renderTravellerOverview(main);
    if (activeTab === "saved") return renderSaved(main);
    if (activeTab === "trips") return renderTripsList(main);
    if (activeTab === "new-trip") return renderNewTrip(main);
    if (activeTab === "trip") return renderTripDetail(main, Number(UI.param("id")));
    if (activeTab === "provider") return renderProvider(main);
    if (activeTab === "new-listing") return renderNewListing(main, Number(UI.param("edit")) || null);
    if (activeTab === "admin") return renderAdminOverview(main);
    if (activeTab === "admin-stays") return renderAdminStays(main);
    if (activeTab === "admin-destinations") return renderAdminDestinations(main);
    if (activeTab === "admin-attractions") return renderAdminAttractions(main);
    if (activeTab === "admin-users") return renderAdminUsers(main);
    return renderTravellerOverview(main);
  }

  /* ---------------- Traveller: Overview ---------------- */
  function renderTravellerOverview(main) {
    const trips = Store.listTrips(currentUser.id);
    const saved = Store.getSavedForUser(currentUser.id);
    const totalBudget = trips.reduce((s, t) => s + (t.budget_total || 0), 0);

    main.innerHTML = `
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="eyebrow eyebrow-forest">Traveller workspace</p>
          <h1 class="display-lg mt-2">Welcome back, ${UI.esc(currentUser.name.split(" ")[0])}</h1>
          <p class="text-sm text-muted mt-2">Your saved Ghanaian destinations, dated itineraries, and cedi budgets in one place.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn btn-primary btn-sm" id="ov-new-trip">+ Plan a trip</button>
          <a href="destinations.html" class="btn btn-outline btn-sm">Explore Ghana</a>
        </div>
      </header>

      <div class="grid-4 mt-8">
        <div class="stat-card"><p class="stat-card-label">Trips</p><p class="stat-card-val">${trips.length}</p><p class="stat-card-hint">Active itineraries</p></div>
        <div class="stat-card"><p class="stat-card-label">Saved destinations</p><p class="stat-card-val">${saved.destinations.length}</p><p class="stat-card-hint">Bookmarked guides</p></div>
        <div class="stat-card"><p class="stat-card-label">Saved experiences</p><p class="stat-card-val">${saved.attractions.length}</p><p class="stat-card-hint">Things to do</p></div>
        <div class="stat-card"><p class="stat-card-label">Planned spend</p><p class="stat-card-val" style="font-size:1.5rem">${UI.cedis(totalBudget)}</p><p class="stat-card-hint">Combined trip estimates</p></div>
      </div>

      <section class="mt-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="display-sm">Your trips</h2>
          <button type="button" class="link-underline" id="ov-all-trips">View all →</button>
        </div>
        ${
          trips.length
            ? `<div class="grid-2">${trips
                .slice(0, 4)
                .map((t) => tripCardHtml(t))
                .join("")}</div>`
            : `<div class="info-card" style="text-align:center;padding:2.5rem">
                <h3 class="display-sm">No trips yet</h3>
                <p class="text-sm text-muted mt-2">Start your first itinerary and estimate your travel budget in cedis.</p>
                <button type="button" class="btn btn-primary btn-sm mt-4" id="ov-empty-new">Create your first trip</button>
              </div>`
        }
      </section>`;

    document.getElementById("ov-new-trip").addEventListener("click", () => navigateTab("new-trip"));
    document.getElementById("ov-all-trips").addEventListener("click", () => navigateTab("trips"));
    document.getElementById("ov-empty-new")?.addEventListener("click", () => navigateTab("new-trip"));
    bindTripCardClicks(main);
  }

  function tripCardHtml(t) {
    return `
      <article class="info-card" style="padding:0;overflow:hidden;display:flex;flex-direction:column">
        <div style="height:140px;position:relative;background:var(--sand)">
          <img src="${UI.esc(t.destination_image)}" alt="" style="width:100%;height:100%;object-fit:cover" />
          <span class="stay-badge-top">${UI.esc(t.destination_name || "Multi-destination")}</span>
        </div>
        <div style="padding:1.15rem;flex:1;display:flex;flex-direction:column">
          <h3 class="display-sm" style="font-size:1.15rem">${UI.esc(t.name)}</h3>
          <p class="text-xs text-muted mt-1">${UI.esc(UI.dateRange(t.start_date, t.end_date))} · ${t.travellers} ${UI.pluralise(
      t.travellers,
      "traveller"
    )}</p>
          <div class="flex items-center justify-between mt-4" style="padding-top:0.75rem;border-top:1px solid var(--line);margin-top:auto">
            <span class="font-mono text-xs fw-600">${UI.cedis(t.budget_total)} · ${t.entry_count} ${UI.pluralise(
      t.entry_count,
      "stop"
    )}</span>
            <button type="button" class="btn btn-outline btn-xs" data-open-trip="${t.id}">Open itinerary →</button>
          </div>
        </div>
      </article>`;
  }

  function bindTripCardClicks(container) {
    container.querySelectorAll("[data-open-trip]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTab("trip", { id: btn.dataset.openTrip }));
    });
  }

  /* ---------------- Saved Places ---------------- */
  function renderSaved(main) {
    const saved = Store.getSavedForUser(currentUser.id);
    main.innerHTML = `
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="eyebrow eyebrow-forest">Shortlist</p>
          <h1 class="display-lg mt-2">Saved places</h1>
          <p class="text-sm text-muted mt-2">Bookmarks you've collected while exploring Ghana.</p>
        </div>
        <a href="destinations.html" class="btn btn-outline btn-sm">Browse more places</a>
      </header>

      <section class="mt-8">
        <h2 class="display-sm mb-3">Destinations (${saved.destinations.length})</h2>
        ${
          saved.destinations.length
            ? `<div class="data-list">${saved.destinations
                .map(
                  (d) => `
                  <div class="data-list-row">
                    <img src="${UI.esc(d.hero_image)}" alt="" style="width:72px;height:54px;border-radius:10px;object-fit:cover" />
                    <div style="flex:1;min-width:180px">
                      <a href="destination.html?slug=${encodeURIComponent(d.slug)}" class="fw-600">${UI.esc(d.name)}</a>
                      <p class="text-xs text-muted">${UI.esc(d.region)} · ${UI.esc(d.summary)}</p>
                    </div>
                    <div class="flex gap-2">
                      <a href="destination.html?slug=${encodeURIComponent(d.slug)}" class="btn btn-outline btn-xs">Guide</a>
                      <button type="button" class="btn btn-danger btn-xs" data-unsave="destination" data-id="${d.id}">Remove</button>
                    </div>
                  </div>`
                )
                .join("")}</div>`
            : `<p class="info-card text-sm text-muted">No saved destinations yet. Click <strong>Save destination</strong> on any guide to add it here.</p>`
        }
      </section>

      <section class="mt-8">
        <h2 class="display-sm mb-3">Experiences (${saved.attractions.length})</h2>
        ${
          saved.attractions.length
            ? `<div class="data-list">${saved.attractions
                .map(
                  (a) => `
                  <div class="data-list-row">
                    <img src="${UI.esc(a.image)}" alt="" style="width:72px;height:54px;border-radius:10px;object-fit:cover" />
                    <div style="flex:1;min-width:180px">
                      <a href="experience.html?slug=${encodeURIComponent(a.slug)}" class="fw-600">${UI.esc(a.name)}</a>
                      <p class="text-xs text-muted">${UI.esc(a.region)}${a.destination_name ? ` · ${UI.esc(a.destination_name)}` : ""}</p>
                    </div>
                    <div class="flex gap-2">
                      <a href="experience.html?slug=${encodeURIComponent(a.slug)}" class="btn btn-outline btn-xs">Open</a>
                      <button type="button" class="btn btn-danger btn-xs" data-unsave="attraction" data-id="${a.id}">Remove</button>
                    </div>
                  </div>`
                )
                .join("")}</div>`
            : `<p class="info-card text-sm text-muted">No saved experiences yet.</p>`
        }
      </section>`;

    main.querySelectorAll("[data-unsave]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Store.toggleSaved(btn.dataset.unsave, Number(btn.dataset.id));
        UI.showToast("Removed from saved places.");
        renderSaved(main);
      });
    });
  }

  /* ---------------- My Trips List ---------------- */
  function renderTripsList(main) {
    const trips = Store.listTrips(currentUser.id);
    main.innerHTML = `
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="eyebrow eyebrow-forest">Trip Planner</p>
          <h1 class="display-lg mt-2">My trips</h1>
          <p class="text-sm text-muted mt-2">Dated day-by-day itineraries with live Ghana cedi budgets.</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="trips-new-btn">+ New trip</button>
      </header>
      <div class="mt-8">
        ${
          trips.length
            ? `<div class="grid-2">${trips.map((t) => tripCardHtml(t)).join("")}</div>`
            : `<div class="info-card" style="text-align:center;padding:3rem">
                <h2 class="display-sm">You haven't planned a trip yet</h2>
                <p class="text-sm text-muted mt-2">Pick a destination, set dates, and start adding stops.</p>
                <button type="button" class="btn btn-primary btn-sm mt-4" id="trips-empty-new">Create a trip</button>
              </div>`
        }
      </div>`;

    document.getElementById("trips-new-btn").addEventListener("click", () => navigateTab("new-trip"));
    document.getElementById("trips-empty-new")?.addEventListener("click", () => navigateTab("new-trip"));
    bindTripCardClicks(main);
  }

  /* ---------------- New Trip Form ---------------- */
  function renderNewTrip(main) {
    const dests = Store.listDestinations({ sort: "az" });
    const preSlug = UI.param("destination");
    const preDest = dests.find((d) => d.slug === preSlug);

    main.innerHTML = `
      <header>
        <p class="eyebrow eyebrow-forest">Trip Planner</p>
        <h1 class="display-lg mt-2">Plan a new trip</h1>
        <p class="text-sm text-muted mt-2">Give your trip a name and dates — you can add stops and budget estimates immediately after.</p>
      </header>

      <form id="new-trip-form" class="info-card mt-6" style="max-width:40rem;display:grid;gap:1rem">
        <div id="new-trip-err" class="alert alert-error hidden"></div>
        <div>
          <label class="field-label" for="nt-name">Trip name</label>
          <input id="nt-name" class="field" required placeholder="e.g. Coast & Castles Weekend" value="${
            preDest ? UI.esc(`${preDest.name} Getaway`) : ""
          }" />
        </div>
        <div>
          <label class="field-label" for="nt-dest">Main destination</label>
          <select id="nt-dest" class="field">
            <option value="">Multiple destinations</option>
            ${dests
              .map(
                (d) =>
                  `<option value="${d.id}" ${preDest && preDest.id === d.id ? "selected" : ""}>${UI.esc(
                    d.name
                  )} — ${UI.esc(d.region)}</option>`
              )
              .join("")}
          </select>
        </div>
        <div class="grid-2" style="gap:0.85rem">
          <div>
            <label class="field-label" for="nt-start">Start date</label>
            <input id="nt-start" type="date" class="field" />
          </div>
          <div>
            <label class="field-label" for="nt-end">End date</label>
            <input id="nt-end" type="date" class="field" />
          </div>
        </div>
        <div>
          <label class="field-label" for="nt-travellers">Travellers</label>
          <input id="nt-travellers" type="number" min="1" max="20" value="2" class="field" />
        </div>
        <div>
          <label class="field-label" for="nt-notes">Notes (optional)</label>
          <textarea id="nt-notes" class="field" placeholder="Transport notes, accommodation ideas, or reminders"></textarea>
        </div>
        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary btn-sm">Create trip</button>
          <button type="button" class="btn btn-outline btn-sm" id="nt-cancel">Cancel</button>
        </div>
      </form>`;

    document.getElementById("nt-cancel").addEventListener("click", () => navigateTab("trips"));
    document.getElementById("new-trip-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const res = Store.createTrip({
        name: document.getElementById("nt-name").value,
        destinationId: document.getElementById("nt-dest").value,
        startDate: document.getElementById("nt-start").value,
        endDate: document.getElementById("nt-end").value,
        travellers: document.getElementById("nt-travellers").value,
        notes: document.getElementById("nt-notes").value,
      });
      if (!res.ok) {
        const err = document.getElementById("new-trip-err");
        err.textContent = res.error;
        err.classList.remove("hidden");
        return;
      }
      UI.showToast("Trip created!");
      navigateTab("trip", { id: res.trip.id });
    });
  }

  /* ---------------- Trip Detail (Itinerary + Budget Builder) ---------------- */
  function renderTripDetail(main, tripId) {
    const trip = Store.getTrip(tripId, currentUser.id);
    if (!trip) {
      navigateTab("trips");
      return;
    }

    const attractions = Store.listAttractions();
    const itineraryTotal = trip.entries.reduce((s, e) => s + (Number(e.estimated_cost) || 0), 0);
    const budgetManualTotal = trip.budgets.reduce((s, b) => s + (Number(b.amount) || 0), 0);
    const grandTotal = itineraryTotal + budgetManualTotal;
    const perPerson = trip.travellers > 0 ? grandTotal / trip.travellers : grandTotal;

    // Group budget by category
    const byCat = { ACCOMMODATION: 0, FOOD: 0, TRANSPORT: 0, ACTIVITIES: itineraryTotal, OTHER: 0 };
    trip.budgets.forEach((b) => {
      byCat[b.category] = (byCat[b.category] || 0) + (Number(b.amount) || 0);
    });
    const colors = {
      ACCOMMODATION: "#111111",
      FOOD: "#1c4f40",
      ACTIVITIES: "#d49b38",
      TRANSPORT: "#6b7280",
      OTHER: "#d1d5db",
    };

    main.innerHTML = `
      <nav class="breadcrumb mb-3">
        <button type="button" class="text-muted" id="td-back" style="text-decoration:underline">My trips</button>
        <span>/</span>
        <span class="text-forest fw-600">${UI.esc(trip.name)}</span>
      </nav>

      <header class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="eyebrow eyebrow-forest">${UI.esc(trip.destination_name || "Multi-destination")} · ${trip.travellers} ${UI.pluralise(
      trip.travellers,
      "traveller"
    )}</p>
          <h1 class="display-lg mt-2">${UI.esc(trip.name)}</h1>
          <p class="text-sm text-muted mt-1">
            ${UI.esc(UI.dateRange(trip.start_date, trip.end_date))}
            ${trip.start_date && trip.end_date ? ` · ${UI.nights(trip.start_date, trip.end_date)} nights` : ""}
            ${
              trip.destination_slug
                ? ` · <a href="destination.html?slug=${encodeURIComponent(trip.destination_slug)}" class="link-underline">Destination guide</a>`
                : ""
            }
          </p>
        </div>
        <button type="button" class="btn btn-danger btn-xs" id="td-delete-trip">Delete trip</button>
      </header>

      ${trip.notes ? `<p class="text-sm mt-4" style="border-left:2px solid var(--gold);padding-left:0.9rem;color:#3b413e;max-width:44rem">${UI.esc(trip.notes)}</p>` : ""}

      <div class="detail-two-col mt-8">
        <!-- Itinerary Column -->
        <div>
          <div class="info-card">
            <div class="flex items-center justify-between mb-4">
              <h2 class="display-sm">Itinerary (${trip.entries.length})</h2>
              <span class="font-mono text-xs text-muted">Stops total: ${UI.cedis(itineraryTotal)}</span>
            </div>

            ${
              trip.entries.length
                ? `<div class="data-list mb-6">${trip.entries
                    .map(
                      (e) => `
                    <div class="data-list-row">
                      <span class="itinerary-dot"></span>
                      <div style="flex:1;min-width:160px">
                        <p class="font-mono text-xs text-muted">${UI.esc(UI.formatDateShort(e.entry_date))}${
                        e.start_time ? ` · ${UI.esc(e.start_time)}` : ""
                      }</p>
                        <p class="fw-600 text-sm mt-1">${UI.esc(e.title)}</p>
                        ${e.notes ? `<p class="text-xs text-muted mt-1">${UI.esc(e.notes)}</p>` : ""}
                      </div>
                      <span class="font-mono text-xs fw-600">${UI.cedis(e.estimated_cost)}</span>
                      <button type="button" class="btn btn-danger btn-xs" data-del-entry="${e.id}" aria-label="Remove stop">✕</button>
                    </div>`
                    )
                    .join("")}</div>`
                : `<p class="text-sm text-muted mb-6">No stops added yet. Add your first stop below.</p>`
            }

            <form id="add-stop-form" style="border-top:1px solid var(--line);padding-top:1.25rem;display:grid;gap:0.75rem">
              <p class="eyebrow">Add an itinerary stop</p>
              <div class="grid-2" style="gap:0.75rem">
                <div>
                  <label class="field-label" for="stop-date">Date</label>
                  <input id="stop-date" type="date" class="field" value="${UI.esc(trip.start_date || new Date().toISOString().slice(0, 10))}" required />
                </div>
                <div>
                  <label class="field-label" for="stop-time">Time (optional)</label>
                  <input id="stop-time" type="time" class="field" value="09:00" />
                </div>
              </div>
              <div>
                <label class="field-label" for="stop-title">Stop title</label>
                <input id="stop-title" class="field" required placeholder="e.g. Morning tour of Cape Coast Castle" />
              </div>
              <div class="grid-2" style="gap:0.75rem">
                <div>
                  <label class="field-label" for="stop-att">Quick-pick experience (optional)</label>
                  <select id="stop-att" class="field">
                    <option value="">Custom stop</option>
                    ${attractions.map((a) => `<option value="${a.id}" data-title="${UI.esc(a.name)}">${UI.esc(a.name)} (${UI.esc(a.region)})</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="field-label" for="stop-cost">Estimated cost (GH₵)</label>
                  <input id="stop-cost" type="number" min="0" step="10" value="0" class="field" />
                </div>
              </div>
              <div>
                <label class="field-label" for="stop-notes">Notes</label>
                <input id="stop-notes" class="field" placeholder="Meeting point, tips, etc." />
              </div>
              <button type="submit" class="btn btn-primary btn-sm" style="justify-self:start">+ Add stop</button>
            </form>
          </div>
        </div>

        <!-- Budget Column -->
        <aside>
          <div class="info-card">
            <p class="eyebrow eyebrow-forest">Budget overview</p>
            <p class="font-serif mt-2" style="font-size:2.1rem;color:var(--forest);line-height:1.05">${UI.cedis(grandTotal)}</p>
            <p class="text-xs text-muted mt-1">Approx. <strong>${UI.cedis(perPerson)}</strong> per traveller</p>

            <div class="budget-bar">
              ${Object.entries(byCat)
                .map(([cat, amt]) => {
                  const pct = grandTotal > 0 ? (amt / grandTotal) * 100 : 0;
                  return pct > 0 ? `<span style="width:${pct.toFixed(1)}%;background:${colors[cat]}"></span>` : "";
                })
                .join("")}
            </div>
            <div class="budget-legend">
              ${Object.entries(byCat)
                .map(([cat, amt]) => `<span>${UI.esc(UI.BUDGET_LABELS[cat])}: ${UI.cedis(amt)}</span>`)
                .join("")}
            </div>

            <div class="mt-5" style="border-top:1px solid var(--line);padding-top:1rem">
              <p class="eyebrow mb-3">Budget line items</p>
              ${
                trip.budgets.length
                  ? `<ul style="display:grid;gap:0.5rem;margin-bottom:1rem">${trip.budgets
                      .map(
                        (b) => `
                      <li class="flex items-center justify-between gap-2 text-sm" style="padding:0.45rem 0;border-bottom:1px solid var(--line)">
                        <div>
                          <span class="fw-600">${UI.esc(b.label)}</span>
                          <span class="font-mono text-xs text-muted" style="display:block">${UI.esc(UI.BUDGET_LABELS[b.category] || b.category)}</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-xs fw-600">${UI.cedis(b.amount)}</span>
                          <button type="button" class="btn btn-danger btn-xs" data-del-budget="${b.id}">✕</button>
                        </div>
                      </li>`
                      )
                      .join("")}</ul>`
                  : `<p class="text-xs text-muted mb-4">Add accommodation, food, or transport estimates below.</p>`
              }

              <form id="add-budget-form" style="display:grid;gap:0.65rem">
                <select id="bg-cat" class="field">
                  <option value="ACCOMMODATION">Accommodation</option>
                  <option value="FOOD">Food &amp; drink</option>
                  <option value="TRANSPORT">Transport</option>
                  <option value="ACTIVITIES">Activities</option>
                  <option value="OTHER">Other</option>
                </select>
                <input id="bg-label" class="field" required placeholder="e.g. 2 nights guesthouse" />
                <input id="bg-amount" type="number" min="0" step="10" required placeholder="Amount in GH₵" class="field" />
                <button type="submit" class="btn btn-outline btn-sm btn-block">+ Add budget item</button>
              </form>
            </div>
          </div>
        </aside>
      </div>`;

    document.getElementById("td-back").addEventListener("click", () => navigateTab("trips"));
    document.getElementById("td-delete-trip").addEventListener("click", () => {
      if (window.confirm(`Delete "${trip.name}" and its itinerary?`)) {
        Store.deleteTrip(trip.id);
        UI.showToast("Trip deleted.");
        navigateTab("trips");
      }
    });

    const attSel = document.getElementById("stop-att");
    const stopTitle = document.getElementById("stop-title");
    attSel.addEventListener("change", () => {
      const opt = attSel.options[attSel.selectedIndex];
      if (opt && opt.dataset.title && !stopTitle.value.trim()) {
        stopTitle.value = opt.dataset.title;
      }
    });

    document.getElementById("add-stop-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const res = Store.addItineraryEntry(trip.id, {
        entryDate: document.getElementById("stop-date").value,
        startTime: document.getElementById("stop-time").value,
        title: stopTitle.value,
        attractionId: attSel.value,
        estimatedCost: document.getElementById("stop-cost").value,
        notes: document.getElementById("stop-notes").value,
      });
      if (!res || !res.ok) {
        UI.showToast((res && res.error) || "Please enter a valid stop title.");
        return;
      }
      UI.showToast("Stop added to itinerary.");
      renderTripDetail(main, trip.id);
    });

    document.getElementById("add-budget-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const res = Store.addBudgetEntry(trip.id, {
        category: document.getElementById("bg-cat").value,
        label: document.getElementById("bg-label").value,
        amount: document.getElementById("bg-amount").value,
      });
      if (!res || !res.ok) {
        UI.showToast((res && res.error) || "Please enter a valid budget label.");
        return;
      }
      UI.showToast("Budget item added.");
      renderTripDetail(main, trip.id);
    });

    main.querySelectorAll("[data-del-entry]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Store.deleteItineraryEntry(btn.dataset.delEntry);
        renderTripDetail(main, trip.id);
      });
    });
    main.querySelectorAll("[data-del-budget]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Store.deleteBudgetEntry(btn.dataset.delBudget);
        renderTripDetail(main, trip.id);
      });
    });
  }

  /* ---------------- Provider Dashboard ---------------- */
  function renderProvider(main) {
    const listings = Store.listAccommodations({
      includeAll: true,
      providerId: currentUser.role === "ADMIN" ? undefined : currentUser.id,
    });
    const pending = listings.filter((l) => l.status === "PENDING").length;
    const approved = listings.filter((l) => l.status === "APPROVED").length;
    const rejected = listings.filter((l) => l.status === "REJECTED").length;

    main.innerHTML = `
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="eyebrow eyebrow-forest">Provider workspace</p>
          <h1 class="display-lg mt-2">Your listings</h1>
          <p class="text-sm text-muted mt-2">Submit a property and an administrator reviews it before it appears on the public site.</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="prov-add-btn">+ Add a property</button>
      </header>

      <div class="grid-4 mt-8">
        <div class="stat-card"><p class="stat-card-label">Listings</p><p class="stat-card-val">${listings.length}</p><p class="stat-card-hint">All properties</p></div>
        <div class="stat-card"><p class="stat-card-label">In review</p><p class="stat-card-val">${pending}</p><p class="stat-card-hint">Awaiting admin review</p></div>
        <div class="stat-card"><p class="stat-card-label">Live</p><p class="stat-card-val">${approved}</p><p class="stat-card-hint">Visible on TripNest</p></div>
        <div class="stat-card"><p class="stat-card-label">Needs changes</p><p class="stat-card-val">${rejected}</p><p class="stat-card-hint">Update to resubmit</p></div>
      </div>

      <section class="mt-8">
        <h2 class="display-sm mb-3">Property management</h2>
        ${
          listings.length
            ? `<div class="data-list">${listings
                .map(
                  (l) => `
                <div class="data-list-row">
                  <img src="${UI.esc(l.image)}" alt="" style="width:92px;height:68px;border-radius:10px;object-fit:cover" />
                  <div style="flex:1;min-width:200px">
                    <div class="flex flex-wrap gap-2">
                      <span class="chip ${l.status === "APPROVED" ? "chip-success" : l.status === "REJECTED" ? "chip-danger" : "chip-gold"}">${UI.esc(l.status)}</span>
                      <span class="chip chip-muted">${UI.esc(l.type)}</span>
                    </div>
                    <h3 class="fw-600 mt-1">${UI.esc(l.name)}</h3>
                    <p class="text-xs text-muted">${UI.esc(l.area || "")} · ${UI.esc(l.destination_name)} · ${UI.cedis(l.price_per_night)} / night</p>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    ${l.status === "APPROVED" ? `<a href="stay.html?slug=${encodeURIComponent(l.slug)}" class="btn btn-outline btn-xs">Public page →</a>` : ""}
                    <button type="button" class="btn btn-outline btn-xs" data-edit-listing="${l.id}">Edit</button>
                  </div>
                </div>`
                )
                .join("")}</div>`
            : `<div class="info-card" style="text-align:center;padding:2.5rem"><p class="text-sm text-muted">No listings yet. Click <strong>Add a property</strong> to submit your first stay.</p></div>`
        }
      </section>`;

    document.getElementById("prov-add-btn").addEventListener("click", () => navigateTab("new-listing"));
    main.querySelectorAll("[data-edit-listing]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTab("new-listing", { edit: btn.dataset.editListing }));
    });
  }

  function renderNewListing(main, editId) {
    const dests = Store.listDestinations({ sort: "az" });
    const amenities = Store.listAmenities();
    const existing = editId
      ? Store.listAccommodations({ includeAll: true }).find(
          (s) => s.id === editId && (currentUser.role === "ADMIN" || s.provider_id === currentUser.id)
        )
      : null;

    main.innerHTML = `
      <header>
        <p class="eyebrow eyebrow-forest">Provider workspace</p>
        <h1 class="display-lg mt-2">${existing ? "Edit property listing" : "Add a property"}</h1>
        <p class="text-sm text-muted mt-2">Submitted properties enter the admin approval queue before going live.</p>
      </header>

      <form id="listing-form" class="info-card mt-6" style="max-width:44rem;display:grid;gap:1rem">
        <div id="listing-err" class="alert alert-error hidden"></div>
        <div class="grid-2" style="gap:0.85rem">
          <div>
            <label class="field-label" for="ls-name">Property name</label>
            <input id="ls-name" class="field" required value="${UI.esc(existing ? existing.name : "")}" placeholder="e.g. Osu Palm Guesthouse" />
          </div>
          <div>
            <label class="field-label" for="ls-type">Property type</label>
            <select id="ls-type" class="field">
              ${["HOTEL", "HOSTEL", "APARTMENT"]
                .map((t) => `<option value="${t}" ${existing && existing.type === t ? "selected" : ""}>${UI.TYPE_LABEL[t]}</option>`)
                .join("")}
            </select>
          </div>
        </div>
        <div class="grid-2" style="gap:0.85rem">
          <div>
            <label class="field-label" for="ls-dest">Destination</label>
            <select id="ls-dest" class="field" required>
              ${dests
                .map(
                  (d) =>
                    `<option value="${d.id}" ${existing && existing.destination_id === d.id ? "selected" : ""}>${UI.esc(
                      d.name
                    )} (${UI.esc(d.region)})</option>`
                )
                .join("")}
            </select>
          </div>
          <div>
            <label class="field-label" for="ls-price">Indicative rate / night (GH₵)</label>
            <input id="ls-price" type="number" min="20" step="10" required class="field" value="${existing ? existing.price_per_night : 350}" />
          </div>
        </div>
        <div class="grid-2" style="gap:0.85rem">
          <div>
            <label class="field-label" for="ls-area">Neighbourhood / area</label>
            <input id="ls-area" class="field" value="${UI.esc(existing ? existing.area || "" : "")}" placeholder="e.g. Osu, Labone" />
          </div>
          <div>
            <label class="field-label" for="ls-phone">Phone / WhatsApp</label>
            <input id="ls-phone" class="field" value="${UI.esc(existing ? existing.phone || "" : "")}" placeholder="+233 24 000 0000" />
          </div>
        </div>
        <div>
          <label class="field-label" for="ls-email">Enquiry email</label>
          <input id="ls-email" type="email" class="field" value="${UI.esc(existing ? existing.email || "" : currentUser.email)}" />
        </div>
        <div>
          <label class="field-label" for="ls-desc">Description</label>
          <textarea id="ls-desc" class="field" required placeholder="Describe rooms, vibe, and proximity to landmarks.">${UI.esc(
            existing ? existing.description : ""
          )}</textarea>
        </div>
        <div>
          <span class="field-label">Amenities</span>
          <div class="flex flex-wrap gap-2 mt-2">
            ${amenities
              .map((a) => {
                const checked = existing && (existing.amenities || []).includes(a.name);
                return `<label class="filter-pill" style="cursor:pointer;font-size:0.78rem">
                  <input type="checkbox" name="ls-amen" value="${UI.esc(a.name)}" ${checked ? "checked" : ""} />
                  <span>${UI.esc(a.name)}</span>
                </label>`;
              })
              .join("")}
          </div>
        </div>
        <div class="flex gap-2 mt-2">
          <button type="submit" class="btn btn-primary btn-sm">${existing ? "Save & resubmit" : "Submit for review"}</button>
          <button type="button" class="btn btn-outline btn-sm" id="ls-cancel">Cancel</button>
        </div>
      </form>`;

    document.getElementById("ls-cancel").addEventListener("click", () => navigateTab("provider"));
    document.getElementById("listing-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const selectedAmens = Array.from(document.querySelectorAll('input[name="ls-amen"]:checked')).map((el) => el.value);
      const res = Store.saveProviderListing({
        editId: existing ? existing.id : null,
        name: document.getElementById("ls-name").value,
        type: document.getElementById("ls-type").value,
        destinationId: document.getElementById("ls-dest").value,
        pricePerNight: document.getElementById("ls-price").value,
        area: document.getElementById("ls-area").value,
        phone: document.getElementById("ls-phone").value,
        whatsapp: document.getElementById("ls-phone").value,
        email: document.getElementById("ls-email").value,
        description: document.getElementById("ls-desc").value,
        amenities: selectedAmens,
      });
      if (!res.ok) {
        const err = document.getElementById("listing-err");
        err.textContent = res.error;
        err.classList.remove("hidden");
        return;
      }
      UI.showToast(existing ? "Listing updated." : "Listing submitted to the approval queue!");
      navigateTab("provider");
    });
  }

  /* ---------------- Admin Views ---------------- */
  function renderAdminOverview(main) {
    const stats = Store.adminStats();
    const queue = Store.listAccommodations({ includeAll: true }).filter((s) => s.status === "PENDING");
    const users = Store.allUsers();

    main.innerHTML = `
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="eyebrow eyebrow-forest">Administration</p>
          <h1 class="display-lg mt-2">Platform overview</h1>
          <p class="text-sm text-muted mt-2">Content verification, listing approvals, and account management.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn btn-primary btn-sm" id="ad-go-queue">Review queue (${stats.pendingStays})</button>
          <button type="button" class="btn btn-outline btn-sm" id="ad-go-dests">Manage destinations</button>
        </div>
      </header>

      <div class="grid-4 mt-8">
        <div class="stat-card"><p class="stat-card-label">Destinations</p><p class="stat-card-val">${stats.destinations}</p><p class="stat-card-hint">${stats.publishedDestinations} published</p></div>
        <div class="stat-card"><p class="stat-card-label">Attractions</p><p class="stat-card-val">${stats.attractions}</p><p class="stat-card-hint">${stats.hiddenGems} hidden gems</p></div>
        <div class="stat-card"><p class="stat-card-label">Accommodation</p><p class="stat-card-val">${stats.accommodations}</p><p class="stat-card-hint">${stats.approvedStays} live · ${stats.pendingStays} pending</p></div>
        <div class="stat-card"><p class="stat-card-label">Accounts</p><p class="stat-card-val">${users.length}</p><p class="stat-card-hint">${stats.travellers} travellers · ${stats.providers} providers</p></div>
      </div>

      <div class="grid-2 mt-8" style="align-items:start">
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="display-sm">Pending approval queue</h2>
            <button type="button" class="link-underline" id="ad-all-queue">Open queue →</button>
          </div>
          <div class="data-list">
            ${
              queue.length
                ? queue
                    .slice(0, 5)
                    .map(
                      (s) => `
                    <div class="data-list-row">
                      <span class="chip chip-gold">${UI.esc(s.status)}</span>
                      <div style="flex:1;min-width:140px">
                        <p class="fw-600 text-sm">${UI.esc(s.name)}</p>
                        <p class="text-xs text-muted">${UI.esc(s.destination_name)} · ${UI.cedis(s.price_per_night)} / night</p>
                      </div>
                      <button type="button" class="btn btn-outline btn-xs" data-quick-approve="${s.id}">Approve</button>
                    </div>`
                    )
                    .join("")
                : `<p class="text-sm text-muted" style="padding:1.25rem">Nothing waiting in the queue.</p>`
            }
          </div>
        </section>

        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="display-sm">Accounts</h2>
            <button type="button" class="link-underline" id="ad-all-users">All users →</button>
          </div>
          <div class="data-list">
            ${users
              .slice(0, 6)
              .map(
                (u) => `
              <div class="data-list-row" style="justify-content:space-between">
                <div>
                  <p class="fw-600 text-sm">${UI.esc(u.name)}</p>
                  <p class="text-xs text-muted">${UI.esc(u.email)}</p>
                </div>
                <span class="chip ${u.role === "ADMIN" ? "chip-solid" : u.role === "PROVIDER" ? "chip-gold" : "chip-muted"}">${UI.esc(u.role)}</span>
              </div>`
              )
              .join("")}
          </div>
        </section>
      </div>`;

    document.getElementById("ad-go-queue").addEventListener("click", () => navigateTab("admin-stays"));
    document.getElementById("ad-all-queue").addEventListener("click", () => navigateTab("admin-stays"));
    document.getElementById("ad-go-dests").addEventListener("click", () => navigateTab("admin-destinations"));
    document.getElementById("ad-all-users").addEventListener("click", () => navigateTab("admin-users"));
    main.querySelectorAll("[data-quick-approve]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Store.adminSetStayStatus(btn.dataset.quickApprove, "APPROVED");
        UI.showToast("Listing approved & published.");
        renderAdminOverview(main);
      });
    });
  }

  function renderAdminStays(main) {
    const stays = Store.listAccommodations({ includeAll: true }).sort((a, b) =>
      a.status === "PENDING" ? -1 : b.status === "PENDING" ? 1 : a.name.localeCompare(b.name)
    );
    main.innerHTML = `
      <header>
        <p class="eyebrow eyebrow-forest">Administration</p>
        <h1 class="display-lg mt-2">Accommodation approval queue</h1>
        <p class="text-sm text-muted mt-2">Approve, reject, or unpublish accommodation listings across Ghana.</p>
      </header>
      <div class="data-list mt-6">
        ${stays
          .map(
            (s) => `
          <div class="data-list-row">
            <img src="${UI.esc(s.image)}" alt="" style="width:78px;height:56px;border-radius:10px;object-fit:cover" />
            <div style="flex:1;min-width:180px">
              <div class="flex flex-wrap gap-2">
                <span class="chip ${s.status === "APPROVED" ? "chip-success" : s.status === "REJECTED" ? "chip-danger" : "chip-gold"}">${UI.esc(s.status)}</span>
                <span class="chip chip-muted">${s.published ? "Published" : "Hidden"}</span>
              </div>
              <p class="fw-600 mt-1">${UI.esc(s.name)}</p>
              <p class="text-xs text-muted">${UI.esc(s.destination_name)} · ${UI.esc(s.area || "")} · ${UI.cedis(s.price_per_night)} / night</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="btn btn-forest btn-xs" data-stay-act="APPROVED" data-id="${s.id}">Approve</button>
              <button type="button" class="btn btn-danger btn-xs" data-stay-act="REJECTED" data-id="${s.id}">Reject</button>
              <button type="button" class="btn btn-outline btn-xs" data-stay-act="TOGGLE_PUBLISH" data-id="${s.id}">${s.published ? "Hide" : "Publish"}</button>
            </div>
          </div>`
          )
          .join("")}
      </div>`;

    main.querySelectorAll("[data-stay-act]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Store.adminSetStayStatus(btn.dataset.id, btn.dataset.stayAct);
        UI.showToast("Accommodation status updated.");
        renderAdminStays(main);
      });
    });
  }

  function renderAdminDestinations(main) {
    const dests = Store.listDestinations({ includeUnpublished: true, sort: "az" });
    main.innerHTML = `
      <header>
        <p class="eyebrow eyebrow-forest">Editorial controls</p>
        <h1 class="display-lg mt-2">Destinations (${dests.length})</h1>
        <p class="text-sm text-muted mt-2">Toggle homepage featured picks, publication, and editorial verification.</p>
      </header>
      <div class="data-list mt-6">
        ${dests
          .map(
            (d) => `
          <div class="data-list-row">
            <img src="${UI.esc(d.hero_image)}" alt="" style="width:72px;height:52px;border-radius:10px;object-fit:cover" />
            <div style="flex:1;min-width:180px">
              <p class="fw-600">${UI.esc(d.name)} <span class="text-xs text-muted">· ${UI.esc(d.region)}</span></p>
              <div class="flex flex-wrap gap-2 mt-1">
                <span class="chip ${d.content_status === "VERIFIED" ? "chip-success" : "chip-gold"}">${UI.esc(d.content_status)}</span>
                ${d.featured ? '<span class="chip chip-solid">Featured</span>' : ""}
                ${!d.published ? '<span class="chip chip-danger">Unpublished</span>' : ""}
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="btn btn-outline btn-xs" data-dest-toggle="featured" data-id="${d.id}">${d.featured ? "Unfeature" : "Feature"}</button>
              <button type="button" class="btn btn-outline btn-xs" data-dest-toggle="verified" data-id="${d.id}">${d.content_status === "VERIFIED" ? "Mark seed" : "Verify"}</button>
              <button type="button" class="btn btn-outline btn-xs" data-dest-toggle="published" data-id="${d.id}">${d.published ? "Unpublish" : "Publish"}</button>
            </div>
          </div>`
          )
          .join("")}
      </div>`;

    main.querySelectorAll("[data-dest-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Store.adminToggleDestination(btn.dataset.id, btn.dataset.destToggle);
        UI.showToast("Destination updated.");
        renderAdminDestinations(main);
      });
    });
  }

  function renderAdminAttractions(main) {
    const atts = Store.listAttractions({ includeUnpublished: true });
    main.innerHTML = `
      <header>
        <p class="eyebrow eyebrow-forest">Editorial controls</p>
        <h1 class="display-lg mt-2">Attractions &amp; Experiences (${atts.length})</h1>
        <p class="text-sm text-muted mt-2">Curate hidden gems, featured experiences, and editorial verification.</p>
      </header>
      <div class="data-list mt-6">
        ${atts
          .map(
            (a) => `
          <div class="data-list-row">
            <img src="${UI.esc(a.image)}" alt="" style="width:72px;height:52px;border-radius:10px;object-fit:cover" />
            <div style="flex:1;min-width:180px">
              <p class="fw-600">${UI.esc(a.name)} <span class="text-xs text-muted">· ${UI.esc(a.region)}</span></p>
              <div class="flex flex-wrap gap-2 mt-1">
                <span class="chip ${a.content_status === "VERIFIED" ? "chip-success" : "chip-gold"}">${UI.esc(a.content_status)}</span>
                ${a.hidden_gem ? '<span class="chip chip-gold">Hidden gem</span>' : ""}
                ${a.featured ? '<span class="chip chip-solid">Featured</span>' : ""}
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="btn btn-outline btn-xs" data-att-toggle="hidden_gem" data-id="${a.id}">${a.hidden_gem ? "Unflag gem" : "Hidden gem"}</button>
              <button type="button" class="btn btn-outline btn-xs" data-att-toggle="featured" data-id="${a.id}">${a.featured ? "Unfeature" : "Feature"}</button>
              <button type="button" class="btn btn-outline btn-xs" data-att-toggle="verified" data-id="${a.id}">${a.content_status === "VERIFIED" ? "Mark seed" : "Verify"}</button>
            </div>
          </div>`
          )
          .join("")}
      </div>`;

    main.querySelectorAll("[data-att-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Store.adminToggleAttraction(btn.dataset.id, btn.dataset.attToggle);
        UI.showToast("Experience updated.");
        renderAdminAttractions(main);
      });
    });
  }

  function renderAdminUsers(main) {
    const users = Store.allUsers();
    main.innerHTML = `
      <header>
        <p class="eyebrow eyebrow-forest">Accounts</p>
        <h1 class="display-lg mt-2">Registered users (${users.length})</h1>
      </header>
      <div class="data-list mt-6">
        ${users
          .map(
            (u) => `
          <div class="data-list-row" style="justify-content:space-between">
            <div>
              <p class="fw-600">${UI.esc(u.name)}</p>
              <p class="text-xs text-muted">${UI.esc(u.email)}</p>
            </div>
            <span class="chip ${u.role === "ADMIN" ? "chip-solid" : u.role === "PROVIDER" ? "chip-gold" : "chip-muted"}">${UI.esc(u.role)}</span>
          </div>`
          )
          .join("")}
      </div>`;
  }
})();
