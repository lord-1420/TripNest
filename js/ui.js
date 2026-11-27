/* ==========================================================================
   TripNest — Shared UI Components, Header, Footer, Video, Modals & Helpers
   Pure Vanilla JS
   ========================================================================== */
(function () {
  const TYPE_LABEL = { HOTEL: "Hotel", HOSTEL: "Hostel", APARTMENT: "Apartment" };
  const BUDGET_LABELS = {
    ACCOMMODATION: "Accommodation",
    FOOD: "Food & drink",
    TRANSPORT: "Transport",
    ACTIVITIES: "Activities",
    OTHER: "Other",
  };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cedis(amount) {
    const n = Math.round(Number(amount) || 0);
    return `GH₵ ${n.toLocaleString("en-GH")}`;
  }

  function initials(name) {
    return String(name || "TN")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0] || "")
      .join("")
      .toUpperCase() || "TN";
  }

  function pluralise(count, singular, plural) {
    return count === 1 ? singular : plural || `${singular}s`;
  }

  function formatDateShort(iso) {
    if (!iso) return "";
    const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function dateRange(start, end) {
    if (!start && !end) return "Dates flexible";
    if (start && !end) return `From ${formatDateShort(start)}`;
    if (!start && end) return `Until ${formatDateShort(end)}`;
    return `${formatDateShort(start)} – ${formatDateShort(end)}`;
  }

  function nights(start, end) {
    if (!start || !end) return 0;
    const a = new Date(start + "T00:00:00");
    const b = new Date(end + "T00:00:00");
    return Math.max(0, Math.round((b - a) / 86400000));
  }

  function param(key) {
    return new URLSearchParams(window.location.search).get(key) || "";
  }

  function logoMarkSvg(tone = "dark", size = 28) {
    const primary = tone === "light" ? "#FFFFFF" : "#111111";
    const accent = tone === "light" ? "#F6E7C8" : "#D49B38";
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 34 34" role="img" aria-label="TripNest mark" fill="none" style="flex-shrink:0">
        <circle cx="17" cy="14.5" r="4.5" fill="${accent}"></circle>
        <path d="M4.6 16.4c2.4 7.1 6.9 11 12.4 11s10-3.9 12.4-11" stroke="${primary}" stroke-width="2.4" stroke-linecap="round"></path>
        <path d="M9.6 18.3c1.7 4 4.3 6.2 7.4 6.2s5.7-2.2 7.4-6.2" stroke="${accent}" stroke-width="1.6" stroke-linecap="round" opacity="0.9"></path>
      </svg>`;
  }

  function logoHtml({ tone = "dark", size = "md", href = "index.html" } = {}) {
    const px = size === "lg" ? 36 : size === "sm" ? 24 : 28;
    const inner = `
      <span class="brand-logo tone-${tone} size-${size}">
        ${logoMarkSvg(tone, px)}
        <span class="brand-wordmark">TripNest</span>
      </span>`;
    return href ? `<a href="${href}" aria-label="TripNest home">${inner}</a>` : inner;
  }

  /* ---------------- Toast ---------------- */
  function showToast(message) {
    let stack = document.getElementById("tn-toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.id = "tn-toast-stack";
      stack.className = "toast-stack";
      stack.setAttribute("aria-live", "polite");
      document.body.appendChild(stack);
    }
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
      el.style.transition = "opacity 0.25s, transform 0.25s";
      setTimeout(() => el.remove(), 260);
    }, 2800);
  }

  /* ---------------- Site Header & Footer ---------------- */
  const NAV_ITEMS = [
    { href: "explore.html", key: "explore", label: "Explore 3D" },
    { href: "destinations.html", key: "destinations", label: "Destinations" },
    { href: "stays.html", key: "stays", label: "Stays" },
    { href: "experiences.html", key: "experiences", label: "Experiences" },
    { href: "plan.html", key: "plan", label: "Plan a Trip" },
  ];

  function mountHeader({ active = "", overlay = false } = {}) {
    const target = document.getElementById("site-header");
    if (!target) return;
    const user = window.TripNestStore ? window.TripNestStore.getSession() : null;
    const dashHref = user ? window.TripNestStore.dashboardHome(user.role) : "sign-in.html";

    const navHtml = NAV_ITEMS.map(
      (item) =>
        `<a href="${item.href}" class="nav-link ${active === item.key ? "is-active" : ""}" ${
          active === item.key ? 'aria-current="page"' : ""
        }>${esc(item.label)}</a>`
    ).join("");

    const desktopAuth = user
      ? `<a href="${dashHref}" class="header-user-pill">
           <span class="avatar-circle">${esc(initials(user.name))}</span>
           Dashboard
         </a>`
      : `<a href="sign-in.html" class="header-signin">Sign in</a>
         <a href="sign-up.html" class="header-cta">Get started</a>`;

    const mobileAuth = user
      ? `<a href="${dashHref}" class="btn btn-primary">Go to dashboard</a>
         <p class="text-xs text-muted" style="text-align:center">Signed in as ${esc(user.name)} · ${esc(user.email)}</p>`
      : `<a href="sign-up.html" class="btn btn-primary">Get started</a>
         <a href="sign-in.html" class="btn btn-outline">Sign in</a>`;

    target.innerHTML = `
      <header class="site-header ${overlay ? "is-transparent" : ""}" id="tn-header">
        <div class="shell header-inner">
          <div class="header-left">
            <span id="tn-header-logo">${logoHtml({ tone: overlay ? "light" : "dark" })}</span>
            <nav aria-label="Primary" class="primary-nav">${navHtml}</nav>
          </div>
          <div class="header-actions">${desktopAuth}</div>
          <button type="button" class="menu-toggle" id="tn-menu-toggle" aria-expanded="false" aria-controls="tn-mobile-drawer" aria-label="Open menu">
            <span class="burger"><span></span><span></span><span></span></span>
          </button>
        </div>
      </header>
      <div class="mobile-drawer" id="tn-mobile-drawer" aria-hidden="true" inert>
        <nav aria-label="Mobile" class="mobile-nav-list">
          ${NAV_ITEMS.map(
            (i) => `<a href="${i.href}"><span>${esc(i.label)}</span><span class="text-muted" aria-hidden="true">→</span></a>`
          ).join("")}
        </nav>
        <div class="mobile-drawer-actions">${mobileAuth}</div>
        <p class="mobile-drawer-foot">Discover Ghana, then plan it — one place at a time.</p>
      </div>`;

    const headerEl = document.getElementById("tn-header");
    const logoWrap = document.getElementById("tn-header-logo");
    const toggleBtn = document.getElementById("tn-menu-toggle");
    const drawer = document.getElementById("tn-mobile-drawer");
    let open = false;

    function syncAppearance() {
      const transparent = overlay && window.scrollY <= 24 && !open;
      headerEl.classList.toggle("is-transparent", transparent);
      logoWrap.innerHTML = logoHtml({ tone: transparent ? "light" : "dark" });
    }

    function setOpen(next) {
      open = next;
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      drawer.inert = !open;
      toggleBtn.setAttribute("aria-expanded", String(open));
      toggleBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
      syncAppearance();
    }

    toggleBtn.addEventListener("click", () => setOpen(!open));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    });
    if (overlay) {
      window.addEventListener("scroll", syncAppearance, { passive: true });
      syncAppearance();
    }
  }

  function mountFooter() {
    const target = document.getElementById("site-footer");
    if (!target) return;
    const year = new Date().getFullYear();
    target.innerHTML = `
      <footer class="site-footer">
        <div class="shell footer-inner">
          <div class="footer-grid">
            <div>
              ${logoHtml({ tone: "dark" })}
              <p class="footer-brand-desc">
                A minimal travel-discovery and trip-planning platform built around Ghana. Discover places,
                compare local stays in cedis, and build your itinerary.
              </p>
              <p class="footer-city">Kumasi · Accra · Ghana</p>
            </div>
            <nav class="footer-col" aria-label="Discover">
              <h2>Discover</h2>
              <ul>
                <li><a href="destinations.html">All destinations</a></li>
                <li><a href="destinations.html?category=beaches">Beaches</a></li>
                <li><a href="destinations.html?category=heritage">Heritage</a></li>
                <li><a href="experiences.html?hidden=1">Hidden gems</a></li>
                <li><a href="explore.html">3D Map explorer</a></li>
              </ul>
            </nav>
            <nav class="footer-col" aria-label="Stay and plan">
              <h2>Stay &amp; plan</h2>
              <ul>
                <li><a href="stays.html">Find a stay</a></li>
                <li><a href="stays.html?type=HOSTEL">Hostels</a></li>
                <li><a href="plan.html">Plan a trip</a></li>
                <li><a href="dashboard.html?tab=trips">My trips</a></li>
                <li><a href="dashboard.html?tab=saved">Saved places</a></li>
              </ul>
            </nav>
            <nav class="footer-col" aria-label="TripNest">
              <h2>TripNest</h2>
              <ul>
                <li><a href="about.html">About TripNest</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="credits.html">Photo credits</a></li>
                <li><a href="terms.html">Terms of use</a></li>
                <li><a href="privacy.html">Privacy</a></li>
              </ul>
            </nav>
          </div>
          <div class="footer-bottom">
            <p>© ${year} TripNest. Discovery and planning for travel in Ghana.</p>
            <p>
              Photography via Wikimedia Commons — see <a href="credits.html">credits</a>.
              TripNest does not process online bookings or payments.
            </p>
          </div>
        </div>
      </footer>`;
  }

  /* ---------------- Background Video Controller ---------------- */
  function attachBackgroundVideo({ videoEl, toggleBtn, desktopOnly = false, onEnded = null }) {
    if (!videoEl) return null;
    const mq = window.matchMedia(
      desktopOnly
        ? "(prefers-reduced-motion: no-preference) and (min-width: 1024px)"
        : "(prefers-reduced-motion: no-preference)"
    );
    let userPaused = false;
    let currentSrc = videoEl.dataset.src || videoEl.getAttribute("src") || "";

    function updateButton(playing) {
      if (!toggleBtn) return;
      toggleBtn.style.display = mq.matches ? "inline-flex" : "none";
      toggleBtn.setAttribute("aria-label", playing ? "Pause background video" : "Play background video");
      toggleBtn.innerHTML = playing
        ? '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'
        : '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l15 8-15 8z"/></svg>';
    }

    function loadSource(src, poster) {
      currentSrc = src;
      if (poster) videoEl.poster = poster;
      if (mq.matches) {
        videoEl.src = src;
        videoEl.load();
        if (!userPaused) {
          videoEl.play().catch(() => {});
        }
      } else {
        videoEl.removeAttribute("src");
        videoEl.load();
      }
      updateButton(!videoEl.paused && mq.matches);
    }

    videoEl.addEventListener("playing", () => updateButton(true));
    videoEl.addEventListener("pause", () => updateButton(false));
    videoEl.addEventListener("error", () => {
      if (toggleBtn) toggleBtn.style.display = "none";
    });
    if (onEnded) {
      videoEl.loop = false;
      videoEl.addEventListener("ended", onEnded);
    } else {
      videoEl.loop = true;
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (videoEl.paused) {
          userPaused = false;
          if (!videoEl.src && currentSrc) videoEl.src = currentSrc;
          videoEl.play().catch(() => {});
        } else {
          userPaused = true;
          videoEl.pause();
        }
      });
    }

    mq.addEventListener("change", () => loadSource(currentSrc, videoEl.poster));
    loadSource(currentSrc, videoEl.poster);

    return { setSource: loadSource };
  }

  /* ---------------- Shared Card Renderers ---------------- */
  function renderDestinationCard(d, { variant = "grid", fillHeight = false } = {}) {
    const cls = [
      "dest-card",
      variant === "feature" ? "is-feature" : variant === "wide" ? "is-wide" : "",
      fillHeight ? "is-fill" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `
      <a href="destination.html?slug=${encodeURIComponent(d.slug)}" class="${cls}" aria-label="${esc(d.name)}, ${esc(d.region)} — view destination guide">
        <img src="${esc(d.hero_image)}" alt="${esc(d.name)}, ${esc(d.region)}" loading="lazy" />
        <div class="dest-card-grad"></div>
        <span class="dest-card-arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="dest-card-copy">
          <p class="dest-card-region">${esc(d.region)}</p>
          <h3 class="dest-card-title">${esc(d.name)}</h3>
          ${variant !== "compact" && d.tagline ? `<p class="dest-card-tagline">${esc(d.tagline)}</p>` : ""}
        </div>
      </a>`;
  }

  function renderStayCard(s) {
    const loc = [s.area || s.destination_name, s.region]
      .filter((v, i, arr) => Boolean(v) && arr.indexOf(v) === i)
      .join(", ");
    const ams = (s.amenities || []).slice(0, 3).join(" · ");
    const extra = (s.amenities || []).length > 3 ? ` · +${s.amenities.length - 3}` : "";
    return `
      <article class="stay-card group">
        <a href="stay.html?slug=${encodeURIComponent(s.slug)}">
          <div class="media media-zoom stay-card-media">
            <img src="${esc(s.image)}" alt="${esc(s.name)} — ${esc(s.area || s.destination_name)}" loading="lazy" />
            <span class="stay-badge-top">${esc(TYPE_LABEL[s.type] || s.type)}</span>
            ${s.image_kind !== "PROPERTY_PHOTO" ? '<span class="stay-badge-area">Area photo</span>' : ""}
          </div>
        </a>
        <div class="stay-card-body">
          <div class="stay-card-head">
            <h3 class="stay-card-title">
              <a href="stay.html?slug=${encodeURIComponent(s.slug)}">${esc(s.name)}</a>
            </h3>
            <span class="stay-card-price">${cedis(s.price_per_night)}<span> / night</span></span>
          </div>
          <p class="stay-card-loc">${esc(loc)}</p>
          ${ams ? `<p class="stay-card-amenities">${esc(ams + extra)}</p>` : ""}
        </div>
      </article>`;
  }

  function renderExperienceCard(a) {
    return `
      <article class="exp-card group">
        <a href="experience.html?slug=${encodeURIComponent(a.slug)}">
          <div class="media media-zoom exp-card-media">
            <img src="${esc(a.image)}" alt="${esc(a.name)}" loading="lazy" />
            ${a.hidden_gem ? '<span class="stay-badge-top">Hidden gem</span>' : ""}
          </div>
        </a>
        <p class="exp-card-meta">${esc(a.region)}${a.destination_name ? ` · ${esc(a.destination_name)}` : ""}</p>
        <h3 class="exp-card-title">
          <a href="experience.html?slug=${encodeURIComponent(a.slug)}">${esc(a.name)}</a>
        </h3>
        <p class="exp-card-summary">${esc(a.summary)}</p>
      </article>`;
  }

  function renderExperienceRow(a) {
    return `
      <a href="experience.html?slug=${encodeURIComponent(a.slug)}" class="exp-row">
        <span class="exp-row-thumb">
          <img src="${esc(a.image)}" alt="${esc(a.name)}" loading="lazy" />
        </span>
        <span style="min-width:0;flex:1">
          <span style="display:block;font-weight:600;font-size:0.96rem;line-height:1.3">${esc(a.name)}</span>
          <span style="display:block;margin-top:0.15rem;font-size:0.78rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${esc(a.destination_name || a.region)} · ${esc(a.region)}
          </span>
        </span>
        <span aria-hidden="true" style="color:var(--muted)">→</span>
      </a>`;
  }

  /* ---------------- Interactive Save & Add-to-Trip ---------------- */
  function bindSaveButton(btn, { kind, id, label = "Save", tone = "light" }) {
    if (!btn) return;
    function sync() {
      const saved = window.TripNestStore.isSaved(kind, id);
      btn.setAttribute("aria-pressed", String(saved));
      const icon = saved
        ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3.8h12a1 1 0 0 1 1 1v15.4l-7-4.2-7 4.2V4.8a1 1 0 0 1 1-1Z"/></svg>'
        : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3.8h12a1 1 0 0 1 1 1v15.4l-7-4.2-7 4.2V4.8a1 1 0 0 1 1-1Z"/></svg>';
      btn.innerHTML = `${icon}<span>${saved ? "Saved" : esc(label)}</span>`;
      if (tone === "dark") {
        btn.className = saved ? "btn btn-gold btn-sm" : "btn btn-ghost-light btn-sm";
      } else {
        btn.className = saved ? "btn btn-forest btn-sm" : "btn btn-outline btn-sm";
      }
    }
    btn.addEventListener("click", () => {
      const res = window.TripNestStore.toggleSaved(kind, id);
      if (res.authRequired) {
        const next = encodeURIComponent(window.location.pathname.split("/").pop() + window.location.search);
        window.location.href = `sign-in.html?next=${next}`;
        return;
      }
      sync();
      showToast(res.saved ? "Saved to your TripNest shortlist." : "Removed from saved places.");
    });
    sync();
  }

  function openAddToTripModal(attraction) {
    const user = window.TripNestStore.getSession();
    if (!user) {
      const next = encodeURIComponent(window.location.pathname.split("/").pop() + window.location.search);
      window.location.href = `sign-in.html?next=${next}`;
      return;
    }
    const trips = window.TripNestStore.listTrips(user.id);
    const modalTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    let modal = document.getElementById("tn-add-trip-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "tn-add-trip-modal";
      modal.className = "modal-backdrop";
      modal.addEventListener("click", (e) => {
        if (e.target === modal && typeof modal._closeModal === "function") modal._closeModal();
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open") && typeof modal._closeModal === "function") {
          modal._closeModal();
        }
      });
      document.body.appendChild(modal);
    }

    function closeModal() {
      modal.classList.remove("is-open");
      if (modalTrigger && document.contains(modalTrigger)) {
        modalTrigger.focus();
      }
    }
    modal._closeModal = closeModal;

    if (trips.length === 0) {
      modal.innerHTML = `
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-label="Add to trip" tabindex="-1">
          <p class="eyebrow">Trip Planner</p>
          <h3 class="display-sm mt-2">Create a trip first</h3>
          <p class="text-sm text-muted mt-2">Start a trip to add <strong>${esc(attraction.name)}</strong> straight into your dated itinerary.</p>
          <div class="flex flex-wrap gap-2 mt-5">
            <a href="dashboard.html?tab=new-trip${attraction.destination_slug ? `&destination=${encodeURIComponent(attraction.destination_slug)}` : ""}" class="btn btn-primary btn-sm">Create a trip</a>
            <button type="button" class="btn btn-outline btn-sm" data-close-modal>Cancel</button>
          </div>
        </div>`;
    } else {
      modal.innerHTML = `
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-label="Add to trip" tabindex="-1">
          <p class="eyebrow">Add to itinerary</p>
          <h3 class="display-sm mt-1">${esc(attraction.name)}</h3>
          <form id="tn-add-trip-form" class="mt-4" style="display:grid;gap:0.85rem">
            <div>
              <label class="field-label" for="att-trip-id">Select trip</label>
              <select id="att-trip-id" class="field" required>
                ${trips.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join("")}
              </select>
            </div>
            <div class="grid-2" style="gap:0.75rem">
              <div>
                <label class="field-label" for="att-trip-date">Date</label>
                <input id="att-trip-date" type="date" class="field" value="${esc(trips[0].start_date || new Date().toISOString().slice(0, 10))}" required />
              </div>
              <div>
                <label class="field-label" for="att-trip-cost">Est. cost (GH₵)</label>
                <input id="att-trip-cost" type="number" min="0" step="10" value="100" class="field" />
              </div>
            </div>
            <div class="flex gap-2 mt-2">
              <button type="submit" class="btn btn-primary btn-sm">Add to itinerary</button>
              <button type="button" class="btn btn-outline btn-sm" data-close-modal>Cancel</button>
            </div>
          </form>
        </div>`;
    }

    modal.classList.add("is-open");
    const firstFocusable = modal.querySelector("select, input, a, button") || modal.querySelector(".modal-dialog");
    if (firstFocusable) firstFocusable.focus();

    modal.querySelectorAll("[data-close-modal]").forEach((b) =>
      b.addEventListener("click", closeModal)
    );

    const form = document.getElementById("tn-add-trip-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const tripId = Number(document.getElementById("att-trip-id").value);
        const entryDate = document.getElementById("att-trip-date").value;
        const estimatedCost = Number(document.getElementById("att-trip-cost").value) || 0;
        const res = window.TripNestStore.addItineraryEntry(tripId, {
          entryDate,
          startTime: "10:00",
          title: attraction.name,
          attractionId: attraction.id,
          notes: attraction.summary,
          estimatedCost,
        });
        if (!res || !res.ok) {
          showToast((res && res.error) || "Could not add stop to itinerary.");
          return;
        }
        closeModal();
        showToast(`Added "${attraction.name}" to your itinerary.`);
      });
    }
  }

  /* ---------------- Static Leaflet Location Map ---------------- */
  function renderLocationMap(el, { name, lat, lng, region, precision = "exact" }) {
    if (!el) return;
    if (lat == null || lng == null) {
      el.innerHTML = `<div style="display:flex;height:100%;align-items:center;justify-content:center;padding:1.5rem;text-align:center;color:var(--muted);font-size:0.86rem">Coordinates pending for ${esc(name)}.</div>`;
      return;
    }
    if (!window.L) {
      el.innerHTML = `<div style="display:flex;height:100%;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;padding:1.5rem;text-align:center;color:var(--muted);font-size:0.86rem">
        <strong style="color:var(--ink)">${esc(name)}, ${esc(region)}</strong>
        <span class="font-mono text-xs">${lat.toFixed(4)}° N, ${Math.abs(lng).toFixed(4)}° ${lng < 0 ? "W" : "E"}</span>
      </div>`;
      return;
    }
    const map = window.L.map(el, { scrollWheelZoom: false }).setView([lat, lng], 11);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    const pin = window.L.divIcon({
      className: "",
      html: '<div class="tn-pin is-selected"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    window.L.marker([lat, lng], { icon: pin })
      .addTo(map)
      .bindPopup(
        `<strong>${esc(name)}</strong><br><span style="color:#6b7280;font-size:12px">${esc(region)} · ${
          precision === "approximate" ? "Approximate area" : "Mapped point"
        }</span>`
      )
      .openPopup();
  }

  /* ---------------- Scroll Reveal ---------------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  }

  window.TripNestUI = {
    TYPE_LABEL,
    BUDGET_LABELS,
    esc,
    cedis,
    initials,
    pluralise,
    formatDateShort,
    dateRange,
    nights,
    param,
    logoMarkSvg,
    logoHtml,
    showToast,
    mountHeader,
    mountFooter,
    attachBackgroundVideo,
    renderDestinationCard,
    renderStayCard,
    renderExperienceCard,
    renderExperienceRow,
    bindSaveButton,
    openAddToTripModal,
    renderLocationMap,
    initReveal,
  };
})();
