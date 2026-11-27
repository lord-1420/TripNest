/* ==========================================================================
   TripNest — Static & Editorial Pages (Plan, About, Contact, Credits, Legal)
   Pure Vanilla JS
   ========================================================================== */
(function () {
  const Store = window.TripNestStore;
  const UI = window.TripNestUI;

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page || "";
    UI.mountHeader({ active: page === "plan" ? "plan" : "", overlay: false });
    UI.mountFooter();

    if (page === "plan") initPlanPage();
    if (page === "about") initAboutPage();
    if (page === "credits") initCreditsPage();
  });

  function initPlanPage() {
    const user = Store.getSession();
    const target = user ? "dashboard.html?tab=new-trip" : "sign-up.html";
    document.querySelectorAll("[data-plan-cta]").forEach((link) => {
      link.setAttribute("href", target);
    });
  }

  function initAboutPage() {
    const stats = Store.publicStats();
    const map = {
      "stat-destinations": stats.destinations,
      "stat-experiences": stats.experiences,
      "stat-gems": stats.hiddenGems,
      "stat-stays": stats.stays,
      "stat-regions": stats.regions,
    };
    Object.entries(map).forEach(([id, val]) => {
      document.querySelectorAll(`[data-${id}]`).forEach((el) => {
        el.textContent = String(val);
      });
    });
  }

  function initCreditsPage() {
    const listEl = document.getElementById("credits-list");
    const countEl = document.getElementById("credits-count");
    if (!listEl) return;
    const credits = Store.imageCredits();
    if (countEl) countEl.textContent = `${credits.length} images`;

    listEl.innerHTML = credits
      .map(
        (c) => `
        <li class="data-list-row" style="align-items:flex-start">
          <img src="${UI.esc(c.file)}" alt="" style="width:80px;height:56px;border-radius:10px;object-fit:cover;flex-shrink:0" loading="lazy" />
          <div style="flex:1;min-width:180px">
            <p class="fw-600 text-sm text-forest">${UI.esc(c.title || c.slug)}</p>
            <p class="text-xs text-muted">${UI.esc(c.artist || "Author unknown")}${c.license ? ` · ${UI.esc(c.license)}` : ""}</p>
            ${c.description ? `<p class="text-xs text-muted mt-1" style="opacity:0.8">${UI.esc(c.description)}</p>` : ""}
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.25rem;font-size:0.74rem">
            ${
              c.sourcePage
                ? `<a href="${UI.esc(c.sourcePage)}" target="_blank" rel="noopener noreferrer" class="link-underline">Source</a>`
                : ""
            }
            ${
              c.licenseUrl
                ? `<a href="${UI.esc(c.licenseUrl)}" target="_blank" rel="noopener noreferrer" class="text-muted" style="text-decoration:underline">Licence</a>`
                : ""
            }
          </div>
        </li>`
      )
      .join("");
  }
})();
