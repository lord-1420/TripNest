/* ==========================================================================
   TripNest — Detail Pages (Destination, Stay, Experience)
   Pure Vanilla JS
   ========================================================================== */
(function () {
  const Store = window.TripNestStore;
  const UI = window.TripNestUI;

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    const isDarkHero = page === "destination" || page === "experience";
    UI.mountHeader({
      active: page === "destination" ? "destinations" : page === "stay" ? "stays" : "experiences",
      overlay: isDarkHero,
    });
    UI.mountFooter();

    if (page === "destination") renderDestination();
    if (page === "stay") renderStay();
    if (page === "experience") renderExperience();
  });

  function renderNotFound(root, backHref, backLabel) {
    root.innerHTML = `
      <section class="shell" style="padding-top:calc(var(--header-h) + 5rem);padding-bottom:6rem;text-align:center">
        <p class="eyebrow">Not found</p>
        <h1 class="display-lg mt-2">We couldn't find that page</h1>
        <p class="lede mt-3">This listing may have been unpublished or the link may be outdated.</p>
        <div class="mt-6">
          <a href="${backHref}" class="btn btn-primary">${UI.esc(backLabel)}</a>
        </div>
      </section>`;
  }

  /* ---------------- Destination Detail ---------------- */
  function renderDestination() {
    const root = document.getElementById("detail-root");
    const slug = UI.param("slug") || "accra";
    const dest = Store.getDestination(slug);
    if (!dest || !dest.published) {
      renderNotFound(root, "destinations.html", "Browse all destinations");
      return;
    }

    document.title = `${dest.name}, ${dest.region} · TripNest`;
    const categories = Store.listCategories("DESTINATION");
    const attractions = Store.listAttractions({ destinationId: dest.id }).slice(0, 6);
    const stays = Store.listAccommodations({ destinationId: dest.id }).slice(0, 3);
    const related = Store.relatedDestinations(dest, 3);

    const gallery = [
      {
        url: dest.hero_image,
        alt: `${dest.name}, ${dest.region}`,
        caption: dest.tagline,
        credit: dest.hero_credit,
      },
      ...(dest.gallery || []),
    ].filter((img, i, arr) => arr.findIndex((x) => x.url === img.url) === i);

    const sections = [
      { id: "overview", label: "Overview" },
      { id: "highlights", label: "Things to do" },
      { id: "best-time", label: "Best time" },
      { id: "area", label: "Explore the area" },
      ...(stays.length ? [{ id: "stay", label: "Where to stay" }] : []),
      { id: "getting-there", label: "Getting there" },
      ...(dest.tips && dest.tips.length ? [{ id: "tips", label: "Travel tips" }] : []),
      ...(dest.checklist && dest.checklist.length ? [{ id: "checklist", label: "Checklist" }] : []),
      { id: "related", label: "Nearby & related" },
    ];

    const coordsText =
      dest.lat != null && dest.lng != null
        ? `${dest.lat.toFixed(3)}° N, ${Math.abs(dest.lng).toFixed(3)}° ${dest.lng < 0 ? "W" : "E"}`
        : "Coordinates pending";

    root.innerHTML = `
      <header class="detail-hero">
        <div class="detail-hero-bg">
          <img src="${UI.esc(dest.hero_image)}" alt="${UI.esc(dest.name)}, ${UI.esc(dest.region)}" />
          <div class="detail-hero-grad"></div>
        </div>
        <div class="shell detail-hero-inner">
          <nav aria-label="Breadcrumb" class="breadcrumb">
            <a href="index.html">Home</a><span>/</span>
            <a href="destinations.html">Destinations</a><span>/</span>
            <a href="destinations.html?region=${encodeURIComponent(dest.region)}">${UI.esc(dest.region)}</a>
          </nav>
          <div style="max-width:46rem">
            <p class="eyebrow eyebrow-light">${UI.esc(dest.region)} Region · Ghana</p>
            <h1 class="display-xl">${UI.esc(dest.name)}</h1>
            ${dest.tagline ? `<p style="margin-top:0.9rem;max-width:40rem;font-size:1.02rem;color:rgba(255,255,255,0.82)">${UI.esc(dest.tagline)}</p>` : ""}
            <div class="flex flex-wrap items-center gap-3 mt-6">
              <button type="button" id="dest-save-hero"></button>
              <a href="dashboard.html?tab=new-trip&destination=${encodeURIComponent(dest.slug)}" class="btn btn-gold btn-sm">Plan a trip here</a>
              <a href="#highlights" class="btn btn-ghost-light btn-sm">See what to do</a>
            </div>
            ${
              dest.hero_credit
                ? `<p style="margin-top:1.5rem;display:inline-flex;align-items:center;gap:0.45rem;border-radius:999px;background:rgba(9,22,18,0.78);padding:0.35rem 0.85rem;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.88)">
                    <span style="width:5px;height:5px;border-radius:999px;background:var(--gold)"></span>
                    Photo: ${UI.esc(dest.hero_credit)}
                  </p>`
                : ""
            }
          </div>
        </div>
      </header>

      <nav class="sticky-section-nav" aria-label="Page sections">
        <div class="shell sticky-section-nav-inner">
          ${sections.map((s) => `<a href="#${s.id}">${UI.esc(s.label)}</a>`).join("")}
        </div>
      </nav>

      <section id="overview" class="section-sm">
        <div class="shell">
          <div class="detail-two-col">
            <div>
              <p class="eyebrow eyebrow-forest">The destination</p>
              <h2 class="display-md mt-2">${UI.esc(dest.summary)}</h2>
              <div class="prose-editorial body-copy mt-6" style="max-width:42rem">
                ${dest.description
                  .split("\n\n")
                  .map((p) => `<p>${UI.esc(p)}</p>`)
                  .join("")}
              </div>
              <div class="flex flex-wrap gap-2 mt-6">
                ${(dest.categories || [])
                  .map((slugKey) => {
                    const cat = categories.find((c) => c.slug === slugKey);
                    return `<a href="destinations.html?category=${encodeURIComponent(slugKey)}" class="chip">${UI.esc(
                      cat ? cat.name : slugKey
                    )}</a>`;
                  })
                  .join("")}
              </div>
            </div>
            <aside class="sticky-aside">
              <div class="info-card">
                <h2 class="font-serif" style="font-size:1.35rem;color:var(--forest)">At a glance</h2>
                <dl class="info-dl mt-3">
                  <div><dt>Region</dt><dd>${UI.esc(dest.region)}</dd></div>
                  <div><dt>Experiences</dt><dd>${dest.attraction_count || 0} published</dd></div>
                  <div><dt>Places to stay</dt><dd>${dest.stay_count || 0} listed</dd></div>
                  <div><dt>Location</dt><dd class="font-mono text-xs">${coordsText}</dd></div>
                  <div><dt>Content status</dt><dd>${
                    dest.content_status === "VERIFIED" ? "Editorially verified" : "Seed content — pending review"
                  }</dd></div>
                </dl>
                ${
                  dest.best_time
                    ? `<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--line);font-size:0.85rem">
                        <strong style="color:var(--forest);display:block">Best time to visit</strong>
                        <p class="text-muted mt-1">${UI.esc(dest.best_time)}</p>
                      </div>`
                    : ""
                }
              </div>
            </aside>
          </div>

          <div class="mt-10">
            <div class="gallery-grid" id="dest-gallery">
              ${gallery
                .slice(0, 5)
                .map(
                  (img, idx) => `
                  <button type="button" class="gallery-tile" data-lightbox="${idx}" aria-label="View photo: ${UI.esc(
                    img.alt || dest.name
                  )}">
                    <img src="${UI.esc(img.url)}" alt="${UI.esc(img.alt || dest.name)}" loading="lazy" />
                  </button>`
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>

      <section id="highlights" class="section-sm section-sand">
        <div class="shell">
          <div class="section-header">
            <div class="section-header-copy">
              <p class="eyebrow eyebrow-forest">Highlights</p>
              <h2 class="display-md">Things to do in ${UI.esc(dest.name)}</h2>
              <p class="lede">Published experiences connected to this destination. Save the ones you like, or add them straight to a trip.</p>
            </div>
            <a href="experiences.html?q=${encodeURIComponent(dest.name)}" class="link-underline">All experiences →</a>
          </div>
          ${
            attractions.length
              ? `<div class="grid-3 mt-8">${attractions.map((a) => UI.renderExperienceCard(a)).join("")}</div>`
              : `<p class="info-card mt-6 text-sm text-muted">No experiences are linked to this destination yet. Explore the <a href="experiences.html" class="link-underline">experiences index</a>.</p>`
          }
        </div>
      </section>

      <section id="best-time" class="section-sm">
        <div class="shell">
          <div class="grid-2" style="gap:2.5rem">
            <div>
              <p class="eyebrow eyebrow-forest">When to go</p>
              <h2 class="display-md mt-2">Best time to visit</h2>
              <div style="margin-top:1.25rem;border-left:2px solid var(--gold);padding-left:1.15rem;color:#2b302d">
                ${UI.esc(dest.best_time || "Dry season runs roughly November to March in southern Ghana.")}
              </div>
              <p class="text-xs text-muted mt-3">General seasonal guidance for the region — not a forecast. Confirm current conditions locally before setting out.</p>
            </div>
            <div>
              <p class="eyebrow eyebrow-forest">Practicalities</p>
              <h2 class="display-md mt-2">Getting around</h2>
              <p class="body-copy mt-4">${UI.esc(dest.getting_around || "")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="area" class="section-sm" style="padding-top:0">
        <div class="shell">
          <div class="detail-two-col" style="align-items:center">
            <div>
              <p class="eyebrow eyebrow-forest">Location</p>
              <h2 class="display-md mt-2">Explore the area</h2>
              <p class="lede mt-3">${UI.esc(dest.name)} sits in the ${UI.esc(
      dest.region
    )} Region. Use the map to orient yourself, then open the full explorer to see nearby stops.</p>
              <a href="explore.html" class="link-underline mt-4">Open the full map explorer →</a>
            </div>
            <div id="detail-map" class="map-frame"></div>
          </div>
        </div>
      </section>

      ${
        stays.length
          ? `<section id="stay" class="section-sm section-cream">
              <div class="shell">
                <div class="section-header">
                  <div class="section-header-copy">
                    <p class="eyebrow eyebrow-forest">Accommodation</p>
                    <h2 class="display-md">Where to stay in ${UI.esc(dest.name)}</h2>
                  </div>
                  <a href="stays.html?q=${encodeURIComponent(dest.name)}" class="link-underline">All stays in the area →</a>
                </div>
                <div class="grid-3 mt-8">${stays.map((s) => UI.renderStayCard(s)).join("")}</div>
                <p class="text-xs text-muted mt-4">TripNest does not handle bookings. Pricing is indicative and confirmed with the provider.</p>
              </div>
            </section>`
          : ""
      }

      <section id="getting-there" class="section-sm">
        <div class="shell">
          <p class="eyebrow eyebrow-forest">Before you go</p>
          <h2 class="display-md mt-2">Getting there</h2>
          <div class="grid-2 mt-6">
            <div class="info-card">
              <h3 class="font-serif" style="font-size:1.3rem;color:var(--forest)">Getting there</h3>
              <p class="text-sm text-muted mt-2">${UI.esc(dest.getting_there || "")}</p>
            </div>
            <div class="info-card">
              <h3 class="font-serif" style="font-size:1.3rem;color:var(--forest)">Getting around</h3>
              <p class="text-sm text-muted mt-2">${UI.esc(dest.getting_around || "")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tips" class="section-sm section-sand">
        <div class="shell">
          <div class="detail-two-col">
            <div>
              <p class="eyebrow eyebrow-forest">Travel tips</p>
              <h2 class="display-md mt-2">Notes for ${UI.esc(dest.name)}</h2>
              <ul class="mt-6">
                ${(dest.tips || [])
                  .map(
                    (tip) => `
                  <li style="padding:1rem 0;border-bottom:1px solid var(--line)">
                    <h3 class="font-serif" style="font-size:1.22rem;color:var(--forest)">${UI.esc(tip.title)}</h3>
                    <p class="text-sm text-muted mt-1">${UI.esc(tip.body)}</p>
                  </li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div id="checklist">
              <div class="info-card">
                <p class="eyebrow eyebrow-forest">Preparation</p>
                <h2 class="font-serif mt-2" style="font-size:1.5rem;color:var(--forest)">Packing checklist</h2>
                <p class="text-xs text-muted mt-1">Tick these off as you pack — saved on this device.</p>
                <div id="dest-checklist" class="mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="related" class="section-sm">
        <div class="shell">
          <div class="section-header">
            <div class="section-header-copy">
              <p class="eyebrow eyebrow-forest">Keep going</p>
              <h2 class="display-md">Nearby &amp; related destinations</h2>
            </div>
            <a href="destinations.html?region=${encodeURIComponent(dest.region)}" class="link-underline">More in ${UI.esc(dest.region)} →</a>
          </div>
          <div class="grid-3 mt-8">
            ${related.map((r) => UI.renderDestinationCard(r, { variant: "grid" })).join("")}
          </div>
          <div class="info-card mt-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 class="display-sm">Turn ${UI.esc(dest.name)} into a plan.</h2>
              <p class="text-sm text-muted mt-1">Add this destination to a trip, build a day-by-day itinerary and estimate the cost in cedis.</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <a href="dashboard.html?tab=new-trip&destination=${encodeURIComponent(dest.slug)}" class="btn btn-primary btn-sm">Start a trip here</a>
              <button type="button" id="dest-save-bottom"></button>
            </div>
          </div>
        </div>
      </section>

      <div class="lightbox" id="tn-lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
        <div class="lightbox-card">
          <button type="button" class="lightbox-close" id="tn-lightbox-close">Close ✕</button>
          <img id="tn-lightbox-img" src="" alt="" />
          <p id="tn-lightbox-cap" class="text-sm mt-3" style="color:rgba(255,255,255,0.85)"></p>
        </div>
      </div>`;

    UI.bindSaveButton(document.getElementById("dest-save-hero"), {
      kind: "destination",
      id: dest.id,
      label: "Save destination",
      tone: "dark",
    });
    UI.bindSaveButton(document.getElementById("dest-save-bottom"), {
      kind: "destination",
      id: dest.id,
      label: "Save for later",
      tone: "light",
    });

    // Packing checklist stored in localStorage
    const checkKey = `tripnest_checklist_${dest.slug}`;
    let checkedMap = {};
    try {
      checkedMap = JSON.parse(localStorage.getItem(checkKey) || "{}");
    } catch {
      checkedMap = {};
    }
    const checkWrap = document.getElementById("dest-checklist");
    if (checkWrap) {
      checkWrap.innerHTML = (dest.checklist || [])
        .map((item) => {
          const done = Boolean(checkedMap[item.id]);
          return `
            <label class="checklist-item ${done ? "is-checked" : ""}">
              <input type="checkbox" data-check-id="${item.id}" ${done ? "checked" : ""} />
              <span>${UI.esc(item.label)}</span>
            </label>`;
        })
        .join("");
      checkWrap.querySelectorAll("[data-check-id]").forEach((cb) => {
        cb.addEventListener("change", () => {
          checkedMap[cb.dataset.checkId] = cb.checked;
          cb.closest("label").classList.toggle("is-checked", cb.checked);
          try {
            localStorage.setItem(checkKey, JSON.stringify(checkedMap));
          } catch {}
        });
      });
    }

    // Lightbox
    const lb = document.getElementById("tn-lightbox");
    const lbImg = document.getElementById("tn-lightbox-img");
    const lbCap = document.getElementById("tn-lightbox-cap");
    const lbClose = document.getElementById("tn-lightbox-close");
    let lbTrigger = null;

    function closeLightbox() {
      lb.classList.remove("is-open");
      if (lbTrigger) {
        lbTrigger.focus();
        lbTrigger = null;
      }
    }

    document.querySelectorAll("[data-lightbox]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = gallery[Number(btn.dataset.lightbox)];
        if (!item) return;
        lbTrigger = btn;
        lbImg.src = item.url;
        lbImg.alt = item.alt || dest.name;
        lbCap.textContent = [item.caption, item.credit ? `Photo: ${item.credit}` : ""].filter(Boolean).join(" · ");
        lb.classList.add("is-open");
        lbClose.focus();
      });
    });
    lbClose.addEventListener("click", closeLightbox);
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb.classList.contains("is-open")) closeLightbox();
    });

    UI.renderLocationMap(document.getElementById("detail-map"), {
      name: dest.name,
      lat: dest.lat,
      lng: dest.lng,
      region: dest.region,
      precision: dest.geo_precision,
    });
  }

  /* ---------------- Stay Detail ---------------- */
  function renderStay() {
    const root = document.getElementById("detail-root");
    const slug = UI.param("slug");
    const stay = slug ? Store.getAccommodation(slug) : Store.listAccommodations()[0];
    if (!stay || !stay.published || stay.status !== "APPROVED") {
      renderNotFound(root, "stays.html", "Browse all stays");
      return;
    }

    document.title = `${stay.name} — ${stay.area || stay.destination_name} · TripNest`;
    const similar = Store.listAccommodations({ destinationId: stay.destination_id })
      .filter((s) => s.id !== stay.id)
      .slice(0, 3);
    const location = [stay.area || stay.destination_name, stay.region]
      .filter((v, i, arr) => Boolean(v) && arr.indexOf(v) === i)
      .join(", ");

    root.innerHTML = `
      <div class="shell" style="padding-top:calc(var(--header-h) + 1.5rem)">
        <nav aria-label="Breadcrumb" class="breadcrumb" style="padding:0.75rem 0">
          <a href="index.html">Home</a><span>/</span>
          <a href="stays.html">Stays</a><span>/</span>
          <a href="destination.html?slug=${encodeURIComponent(stay.destination_slug)}">${UI.esc(stay.destination_name)}</a><span>/</span>
          <span class="text-forest fw-600">${UI.esc(stay.name)}</span>
        </nav>

        <div class="stay-hero-grid">
          <div class="media" style="aspect-ratio:16/10;border-radius:18px">
            <img src="${UI.esc(stay.image)}" alt="${UI.esc(stay.name)}" />
            ${
              stay.image_kind !== "PROPERTY_PHOTO"
                ? `<span style="position:absolute;bottom:0.85rem;left:0.85rem;border-radius:999px;background:rgba(9,22,18,0.8);padding:0.35rem 0.8rem;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:#fff">Area illustration, not the property</span>`
                : ""
            }
          </div>
          <div class="stay-hero-side">
            <div class="info-card" style="background:var(--cream-200);border-left:3px solid var(--gold)">
              <p class="eyebrow eyebrow-forest">Photography</p>
              <p class="text-xs text-muted mt-2" style="line-height:1.6">
                This is an illustration of ${UI.esc(stay.area || stay.destination_name)} and its surroundings — not a photograph of the property. Verified property photos are added once the provider uploads them.
              </p>
              <a href="destination.html?slug=${encodeURIComponent(stay.destination_slug)}" class="link-underline mt-3" style="font-size:0.78rem">
                See the ${UI.esc(stay.destination_name)} guide →
              </a>
            </div>
            <div class="info-card flex" style="flex-direction:column;justify-content:space-between">
              <div>
                <p class="eyebrow eyebrow-forest">Nightly rate</p>
                <p class="font-serif mt-1" style="font-size:2rem;line-height:1.05;color:var(--forest)">
                  ${UI.cedis(stay.price_per_night)}
                  <span style="font-family:var(--font-sans);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted)"> / night</span>
                </p>
                <p class="text-xs text-muted mt-2">Indicative price in cedis, confirmed by the provider. TripNest does not process bookings.</p>
              </div>
              <a href="#contact" class="btn btn-primary btn-sm mt-3">Contact provider</a>
            </div>
          </div>
        </div>
      </div>

      <section class="section-sm">
        <div class="shell detail-two-col">
          <article>
            <div class="flex flex-wrap gap-2">
              <span class="chip chip-solid">${UI.esc(UI.TYPE_LABEL[stay.type] || stay.type)}</span>
              <span class="chip chip-muted">${UI.esc(stay.region)}</span>
              ${stay.content_status === "SEED" ? '<span class="chip chip-gold">Sample listing</span>' : ""}
            </div>
            <h1 class="display-lg mt-4">${UI.esc(stay.name)}</h1>
            <p class="text-sm text-muted mt-2">
              ${UI.esc(location)} · <a href="destination.html?slug=${encodeURIComponent(stay.destination_slug)}" class="link-underline">${UI.esc(stay.destination_name)} guide</a>
            </p>
            <div class="prose-editorial body-copy mt-6">
              <p>${UI.esc(stay.description)}</p>
              ${stay.address ? `<p><strong class="text-forest">Address:</strong> ${UI.esc(stay.address)}</p>` : ""}
            </div>

            <div class="mt-8" style="border-top:1px solid var(--line);padding-top:1.5rem">
              <h2 class="font-serif" style="font-size:1.5rem;color:var(--forest)">Amenities</h2>
              ${
                stay.amenities && stay.amenities.length
                  ? `<ul class="grid-3 mt-4" style="gap:0.65rem">${stay.amenities
                      .map(
                        (a) =>
                          `<li class="flex items-center gap-2 text-sm"><span style="width:6px;height:6px;border-radius:999px;background:var(--gold)"></span>${UI.esc(
                            a
                          )}</li>`
                      )
                      .join("")}</ul>`
                  : '<p class="text-sm text-muted mt-2">No amenities listed yet.</p>'
              }
            </div>

            <div class="mt-8" style="border-top:1px solid var(--line);padding-top:1.5rem">
              <h2 class="font-serif" style="font-size:1.5rem;color:var(--forest)">Location</h2>
              <div id="stay-map" class="map-frame mt-4"></div>
            </div>
          </article>

          <aside id="contact" class="sticky-aside">
            <div class="info-card">
              <h2 class="font-serif" style="font-size:1.35rem;color:var(--forest)">Contact the provider</h2>
              <p class="text-sm text-muted mt-2">Check availability, ask about the room and agree the rate directly. Nothing is charged through TripNest.</p>
              <div class="mt-4" style="display:grid;gap:0.55rem">
                ${
                  stay.phone
                    ? `<a href="tel:${UI.esc(stay.phone.replace(/\s/g, ""))}" class="btn btn-primary btn-sm btn-block">Call ${UI.esc(stay.phone)}</a>`
                    : `<div class="text-xs text-muted" style="border:1px dashed var(--line);border-radius:10px;padding:0.65rem">Phone contact not published · Awaiting verification</div>`
                }
                ${
                  stay.whatsapp
                    ? `<a href="https://wa.me/${UI.esc(stay.whatsapp.replace(/[^0-9]/g, ""))}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm btn-block">Message on WhatsApp</a>`
                    : ""
                }
                ${
                  stay.email
                    ? `<a href="mailto:${UI.esc(stay.email)}" class="btn btn-outline btn-sm btn-block">Email the provider</a>`
                    : ""
                }
              </div>
              <div class="mt-4 text-xs text-muted" style="border-top:1px solid var(--line);padding-top:0.85rem">
                <strong class="text-forest">No booking or payment</strong>
                <p class="mt-1">TripNest is a discovery platform. Enquiries are between you and the provider.</p>
              </div>
            </div>

            <div class="info-card info-card-cream mt-4">
              <p class="eyebrow eyebrow-forest">Planning</p>
              <p class="text-sm text-muted mt-2">Add ${UI.esc(stay.destination_name)} to a trip to keep this stay alongside your itinerary and budget.</p>
              <a href="dashboard.html?tab=new-trip&destination=${encodeURIComponent(stay.destination_slug)}" class="btn btn-outline btn-sm btn-block mt-3">Plan a trip here</a>
            </div>
          </aside>
        </div>
      </section>

      ${
        similar.length
          ? `<section class="section-sm section-sand">
              <div class="shell">
                <div class="section-header">
                  <h2 class="display-md">Other stays in ${UI.esc(stay.destination_name)}</h2>
                  <a href="stays.html?q=${encodeURIComponent(stay.destination_name)}" class="link-underline">See all →</a>
                </div>
                <div class="grid-3 mt-8">${similar.map((s) => UI.renderStayCard(s)).join("")}</div>
              </div>
            </section>`
          : ""
      }`;

    UI.renderLocationMap(document.getElementById("stay-map"), {
      name: stay.name,
      lat: stay.lat,
      lng: stay.lng,
      region: stay.region || "",
      precision: "approximate",
    });
  }

  /* ---------------- Experience Detail ---------------- */
  function renderExperience() {
    const root = document.getElementById("detail-root");
    const slug = UI.param("slug");
    const att = slug ? Store.getAttraction(slug) : Store.listAttractions()[0];
    if (!att || !att.published) {
      renderNotFound(root, "experiences.html", "Browse all experiences");
      return;
    }

    document.title = `${att.name} · TripNest`;
    const categories = Store.listCategories("ATTRACTION");
    const nearby = Store.nearbyAttractions(att, 3);

    root.innerHTML = `
      <header class="detail-hero" style="min-height:52vh">
        <div class="detail-hero-bg">
          <img src="${UI.esc(att.image)}" alt="${UI.esc(att.name)}" />
          <div class="detail-hero-grad"></div>
        </div>
        <div class="shell detail-hero-inner">
          <nav aria-label="Breadcrumb" class="breadcrumb">
            <a href="index.html">Home</a><span>/</span>
            <a href="experiences.html">Experiences</a><span>/</span>
            <span>${UI.esc(att.region)}</span>
          </nav>
          <div style="max-width:46rem">
            <div class="flex flex-wrap gap-2">
              ${att.hidden_gem ? '<span class="chip chip-gold">Hidden gem</span>' : ""}
              ${(att.categories || [])
                .slice(0, 3)
                .map((c) => {
                  const found = categories.find((x) => x.slug === c);
                  return `<a href="experiences.html?category=${encodeURIComponent(c)}" class="chip chip-outline-light">${UI.esc(
                    found ? found.name : c
                  )}</a>`;
                })
                .join("")}
            </div>
            <h1 class="display-xl">${UI.esc(att.name)}</h1>
            <p style="margin-top:0.9rem;max-width:40rem;font-size:1rem;color:rgba(255,255,255,0.82)">${UI.esc(att.summary)}</p>
            <div class="flex flex-wrap items-center gap-3 mt-6">
              <button type="button" id="exp-save-btn"></button>
              <button type="button" id="exp-add-trip-hero" class="btn btn-gold btn-sm">+ Add to trip</button>
            </div>
            <p style="margin-top:1.25rem;font-family:var(--font-mono);font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.75)">
              ${UI.esc(att.region)} Region${att.destination_name ? ` · ${UI.esc(att.destination_name)}` : att.nearest_town ? ` · near ${UI.esc(att.nearest_town)}` : ""}
            </p>
          </div>
        </div>
      </header>

      <section class="section-sm">
        <div class="shell detail-two-col">
          <article>
            <div class="prose-editorial body-copy">
              ${att.description
                .split("\n\n")
                .map((p) => `<p>${UI.esc(p)}</p>`)
                .join("")}
            </div>
            <div class="mt-8" style="border-top:1px solid var(--line);padding-top:1.5rem">
              <h2 class="font-serif" style="font-size:1.5rem;color:var(--forest)">Practical notes</h2>
              <ul class="mt-4 text-sm text-muted" style="display:grid;gap:0.65rem">
                <li><strong class="text-forest">Nearest town:</strong> ${UI.esc(att.nearest_town || att.region)}</li>
                ${
                  att.destination_name
                    ? `<li><strong class="text-forest">In destination:</strong> <a href="destination.html?slug=${encodeURIComponent(att.destination_slug)}" class="link-underline">${UI.esc(att.destination_name)}</a></li>`
                    : ""
                }
                <li><strong class="text-forest">Entry &amp; guides:</strong> Visitor fees and guide arrangements are set locally and are not published here — confirm on arrival.</li>
                <li><strong class="text-forest">Content status:</strong> ${
                  att.content_status === "VERIFIED" ? "Editorially verified." : "Seed content awaiting editorial verification."
                }</li>
              </ul>
            </div>
            <div class="mt-8">
              <h2 class="font-serif" style="font-size:1.5rem;color:var(--forest)">Location</h2>
              <div id="exp-map" class="map-frame mt-4"></div>
            </div>
          </article>

          <aside class="sticky-aside">
            <div class="info-card">
              <h2 class="font-serif" style="font-size:1.35rem;color:var(--forest)">Plan around this</h2>
              <p class="text-sm text-muted mt-2">Add this experience to a trip and it appears in your itinerary with a cost you can estimate.</p>
              <div class="mt-4" style="display:grid;gap:0.55rem">
                <button type="button" id="exp-add-trip-aside" class="btn btn-primary btn-sm btn-block">+ Add to trip</button>
                <a href="dashboard.html?tab=new-trip" class="btn btn-outline btn-sm btn-block">Start a new trip</a>
                <a href="dashboard.html?tab=saved" class="btn btn-outline btn-sm btn-block">View saved places</a>
              </div>
            </div>
            ${
              att.destination_name
                ? `<div class="info-card mt-4">
                    <p class="eyebrow eyebrow-forest">While you are there</p>
                    <h2 class="font-serif mt-2" style="font-size:1.35rem;color:var(--forest)">${UI.esc(att.destination_name)}</h2>
                    <p class="text-sm text-muted mt-2">Read the full destination guide for travel notes, places to stay and other things to do.</p>
                    <a href="destination.html?slug=${encodeURIComponent(att.destination_slug)}" class="link-underline mt-3">Open the guide →</a>
                  </div>`
                : ""
            }
          </aside>
        </div>
      </section>

      <section class="section-sm section-sand">
        <div class="shell">
          <div class="section-header">
            <h2 class="display-md">More experiences nearby</h2>
            <a href="experiences.html" class="link-underline">All experiences →</a>
          </div>
          <div class="grid-3 mt-8">${nearby.map((a) => UI.renderExperienceCard(a)).join("")}</div>
        </div>
      </section>`;

    UI.bindSaveButton(document.getElementById("exp-save-btn"), {
      kind: "attraction",
      id: att.id,
      label: "Save experience",
      tone: "dark",
    });
    document.getElementById("exp-add-trip-hero").addEventListener("click", () => UI.openAddToTripModal(att));
    document.getElementById("exp-add-trip-aside").addEventListener("click", () => UI.openAddToTripModal(att));

    UI.renderLocationMap(document.getElementById("exp-map"), {
      name: att.name,
      lat: att.lat,
      lng: att.lng,
      region: att.region,
      precision: att.geo_precision,
    });
  }
})();
