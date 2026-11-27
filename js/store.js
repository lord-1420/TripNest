/* ==========================================================================
   TripNest — Client-Side State & Query Engine (Pure Vanilla JS + localStorage)
   ========================================================================== */
(function () {
  const STATE_KEY = "tripnest_state_v1";
  const SESSION_KEY = "tripnest_session_v1";

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function loadState() {
    const seed = window.TRIPNEST_DATA;
    if (!seed) {
      throw new Error("TRIPNEST_DATA not loaded. Ensure js/data.js is included before js/store.js.");
    }
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.destinations) && Array.isArray(parsed.users)) {
          return parsed;
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    const fresh = deepClone(seed);
    saveState(fresh);
    return fresh;
  }

  function saveState(state) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch {
      /* storage quota or private mode */
    }
  }

  function nextId(arr) {
    return arr.reduce((m, item) => Math.max(m, Number(item.id) || 0), 0) + 1;
  }

  function slugify(str) {
    return String(str || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "listing";
  }

  /* ---------------- Auth / Session ---------------- */
  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const state = loadState();
      const user = state.users.find((u) => u.id === parsed.id);
      if (!user) return null;
      return { id: user.id, name: user.name, email: user.email, role: user.role };
    } catch {
      return null;
    }
  }

  function setSession(user) {
    try {
      if (!user) {
        localStorage.removeItem(SESSION_KEY);
      } else {
        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role })
        );
      }
    } catch {
      /* ignore */
    }
  }

  function signIn(email, password) {
    const state = loadState();
    const norm = String(email || "").trim().toLowerCase();
    const user = state.users.find((u) => u.email.toLowerCase() === norm);
    if (!user || user.password !== String(password || "")) {
      return { ok: false, error: "Incorrect email or password." };
    }
    setSession(user);
    return { ok: true, user: getSession() };
  }

  function signUp({ name, email, password, role }) {
    const state = loadState();
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPass = String(password || "");
    const cleanRole = role === "PROVIDER" ? "PROVIDER" : "TRAVELLER";

    if (cleanName.length < 2) return { ok: false, error: "Please enter your full name." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (cleanPass.length < 6) {
      return { ok: false, error: "Password must be at least 6 characters." };
    }
    if (state.users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const user = {
      id: nextId(state.users),
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      role: cleanRole,
      created_at: new Date().toISOString(),
    };
    state.users.push(user);
    saveState(state);
    setSession(user);
    return { ok: true, user: getSession() };
  }

  function signOut() {
    setSession(null);
  }

  function dashboardHome(role) {
    if (role === "ADMIN") return "dashboard.html?tab=admin";
    if (role === "PROVIDER") return "dashboard.html?tab=provider";
    return "dashboard.html?tab=overview";
  }

  /* ---------------- Enriched Public Queries ---------------- */
  function enrichDestination(d, state) {
    const attraction_count = state.attractions.filter((a) => a.published && a.destination_id === d.id).length;
    const stay_count = state.accommodations.filter(
      (s) => s.published && s.status === "APPROVED" && s.destination_id === d.id
    ).length;
    return { ...d, attraction_count, stay_count };
  }

  function enrichAttraction(a, state) {
    const dest = state.destinations.find((d) => d.id === a.destination_id);
    return {
      ...a,
      destination_name: dest ? dest.name : null,
      destination_slug: dest ? dest.slug : null,
    };
  }

  function enrichStay(s, state) {
    const dest = state.destinations.find((d) => d.id === s.destination_id);
    return {
      ...s,
      destination_name: dest ? dest.name : "",
      destination_slug: dest ? dest.slug : "",
      region: dest ? dest.region : "",
    };
  }

  function listCategories(kind) {
    const state = loadState();
    return state.categories
      .filter((c) => !kind || c.kind === kind || c.kind === "BOTH")
      .sort((a, b) => (a.sort || 0) - (b.sort || 0));
  }

  function listAmenities() {
    return loadState().amenities;
  }

  function listRegions(source = "destinations") {
    const state = loadState();
    const set = new Set();
    const rows = source === "attractions" ? state.attractions : state.destinations;
    rows.forEach((item) => item.published && item.region && set.add(item.region));
    return Array.from(set).sort();
  }

  function listDestinations(opts = {}) {
    const state = loadState();
    const q = String(opts.q || "").trim().toLowerCase();
    let items = state.destinations
      .filter((d) => opts.includeUnpublished || d.published)
      .map((d) => enrichDestination(d, state));

    if (opts.featured) items = items.filter((d) => d.featured);
    if (opts.region) items = items.filter((d) => d.region.toLowerCase() === opts.region.toLowerCase());
    if (opts.category) items = items.filter((d) => (d.categories || []).includes(opts.category));
    if (q) {
      items = items.filter((d) =>
        [d.name, d.region, d.tagline, d.summary, ...(d.categories || [])]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (opts.sort === "az") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (opts.sort === "region") {
      items.sort((a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name));
    } else {
      items.sort((a, b) => (b.featured - a.featured) || (a.sort - b.sort) || a.name.localeCompare(b.name));
    }
    return items;
  }

  function getDestination(slug) {
    const state = loadState();
    const d = state.destinations.find((x) => x.slug === slug);
    return d ? enrichDestination(d, state) : null;
  }

  function relatedDestinations(dest, limit = 3) {
    const all = listDestinations().filter((d) => d.id !== dest.id);
    const sameRegion = all.filter((d) => d.region === dest.region);
    const others = all.filter((d) => d.region !== dest.region);
    return [...sameRegion, ...others].slice(0, limit);
  }

  function listAttractions(opts = {}) {
    const state = loadState();
    const q = String(opts.q || "").trim().toLowerCase();
    let items = state.attractions
      .filter((a) => opts.includeUnpublished || a.published)
      .map((a) => enrichAttraction(a, state));

    if (opts.destinationId) items = items.filter((a) => a.destination_id === opts.destinationId);
    if (opts.hidden) items = items.filter((a) => a.hidden_gem);
    if (opts.featured) items = items.filter((a) => a.featured);
    if (opts.region) items = items.filter((a) => a.region.toLowerCase() === opts.region.toLowerCase());
    if (opts.category) items = items.filter((a) => (a.categories || []).includes(opts.category));
    if (q) {
      items = items.filter((a) =>
        [a.name, a.region, a.nearest_town, a.destination_name, a.summary, ...(a.categories || [])]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    items.sort((a, b) => (b.featured - a.featured) || (b.hidden_gem - a.hidden_gem) || a.name.localeCompare(b.name));
    return items;
  }

  function getAttraction(slug) {
    const state = loadState();
    const a = state.attractions.find((x) => x.slug === slug);
    return a ? enrichAttraction(a, state) : null;
  }

  function nearbyAttractions(att, limit = 3) {
    const all = listAttractions().filter((a) => a.id !== att.id);
    const sameDest = all.filter((a) => att.destination_id && a.destination_id === att.destination_id);
    const sameRegion = all.filter(
      (a) => a.region === att.region && (!att.destination_id || a.destination_id !== att.destination_id)
    );
    const rest = all.filter((a) => a.region !== att.region);
    return [...sameDest, ...sameRegion, ...rest].slice(0, limit);
  }

  function listAccommodations(opts = {}) {
    const state = loadState();
    const q = String(opts.q || "").trim().toLowerCase();
    let items = state.accommodations
      .filter((s) => opts.includeAll || (s.published && s.status === "APPROVED"))
      .map((s) => enrichStay(s, state));

    if (opts.destinationId) items = items.filter((s) => s.destination_id === Number(opts.destinationId));
    if (opts.type) items = items.filter((s) => s.type === opts.type);
    if (opts.maxPrice) items = items.filter((s) => s.price_per_night <= Number(opts.maxPrice));
    if (opts.providerId) items = items.filter((s) => s.provider_id === Number(opts.providerId));
    if (q) {
      items = items.filter((s) =>
        [s.name, s.area, s.destination_name, s.region, s.description, ...(s.amenities || [])]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (opts.sort === "price_asc") {
      items.sort((a, b) => a.price_per_night - b.price_per_night);
    } else if (opts.sort === "price_desc") {
      items.sort((a, b) => b.price_per_night - a.price_per_night);
    } else {
      items.sort((a, b) => a.price_per_night - b.price_per_night);
    }
    return items;
  }

  function getAccommodation(slug) {
    const state = loadState();
    const s = state.accommodations.find((x) => x.slug === slug);
    return s ? enrichStay(s, state) : null;
  }

  function searchSuggestions(q) {
    const needle = String(q || "").trim().toLowerCase();
    if (!needle) return [];
    const dests = listDestinations({ q: needle })
      .slice(0, 5)
      .map((d) => ({
        slug: d.slug,
        name: d.name,
        region: d.region,
        kind: "destination",
        href: `destination.html?slug=${encodeURIComponent(d.slug)}`,
      }));
    const atts = listAttractions({ q: needle })
      .slice(0, 4)
      .map((a) => ({
        slug: a.slug,
        name: a.name,
        region: a.region,
        kind: "attraction",
        href: `experience.html?slug=${encodeURIComponent(a.slug)}`,
      }));
    return [...dests, ...atts].slice(0, 7);
  }

  function publicStats() {
    const state = loadState();
    const destinations = state.destinations.filter((d) => d.published).length;
    const experiences = state.attractions.filter((a) => a.published).length;
    const hiddenGems = state.attractions.filter((a) => a.published && a.hidden_gem).length;
    const stays = state.accommodations.filter((s) => s.published && s.status === "APPROVED").length;
    const regions = new Set(state.destinations.filter((d) => d.published).map((d) => d.region)).size;
    return { destinations, experiences, hiddenGems, stays, regions };
  }

  /* ---------------- Saved Places ---------------- */
  function isSaved(kind, itemId) {
    const user = getSession();
    if (!user) return false;
    const state = loadState();
    return state.saved_places.some(
      (sp) =>
        sp.user_id === user.id &&
        (kind === "destination" ? sp.destination_id === itemId : sp.attraction_id === itemId)
    );
  }

  function toggleSaved(kind, itemId) {
    const user = getSession();
    if (!user) return { ok: false, authRequired: true };
    const state = loadState();
    const idx = state.saved_places.findIndex(
      (sp) =>
        sp.user_id === user.id &&
        (kind === "destination" ? sp.destination_id === itemId : sp.attraction_id === itemId)
    );
    if (idx >= 0) {
      state.saved_places.splice(idx, 1);
      saveState(state);
      return { ok: true, saved: false };
    }
    state.saved_places.push({
      id: nextId(state.saved_places),
      user_id: user.id,
      destination_id: kind === "destination" ? itemId : null,
      attraction_id: kind === "attraction" ? itemId : null,
      created_at: new Date().toISOString(),
    });
    saveState(state);
    return { ok: true, saved: true };
  }

  function getSavedForUser(userId) {
    const state = loadState();
    const rows = state.saved_places.filter((sp) => sp.user_id === userId);
    const destinations = rows
      .filter((r) => r.destination_id)
      .map((r) => {
        const d = state.destinations.find((x) => x.id === r.destination_id);
        return d ? { ...enrichDestination(d, state), saved_id: r.id, saved_at: r.created_at } : null;
      })
      .filter(Boolean);
    const attractions = rows
      .filter((r) => r.attraction_id)
      .map((r) => {
        const a = state.attractions.find((x) => x.id === r.attraction_id);
        return a ? { ...enrichAttraction(a, state), saved_id: r.id, saved_at: r.created_at } : null;
      })
      .filter(Boolean);
    return { destinations, attractions };
  }

  /* ---------------- Trips, Itinerary & Budgets ---------------- */
  function listTrips(userId) {
    const state = loadState();
    return state.trips
      .filter((t) => t.user_id === userId)
      .map((t) => {
        const dest = state.destinations.find((d) => d.id === t.destination_id);
        const entries = state.itinerary_entries.filter((e) => e.trip_id === t.id);
        const budgets = state.budget_entries.filter((b) => b.trip_id === t.id);
        const itinerary_total = entries.reduce((sum, e) => sum + (Number(e.estimated_cost) || 0), 0);
        const budget_total = budgets.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
        return {
          ...t,
          destination_name: dest ? dest.name : null,
          destination_slug: dest ? dest.slug : null,
          destination_image: dest ? dest.hero_image : "assets/images/editorial-coast.jpg",
          entry_count: entries.length,
          itinerary_total,
          budget_total: budget_total + itinerary_total,
        };
      })
      .sort((a, b) => (b.id || 0) - (a.id || 0));
  }

  function getTrip(tripId, userId) {
    const state = loadState();
    const t = state.trips.find((x) => x.id === Number(tripId) && x.user_id === userId);
    if (!t) return null;
    const dest = state.destinations.find((d) => d.id === t.destination_id);
    const entries = state.itinerary_entries
      .filter((e) => e.trip_id === t.id)
      .sort((a, b) => (a.entry_date || "").localeCompare(b.entry_date || "") || (a.start_time || "").localeCompare(b.start_time || ""));
    const budgets = state.budget_entries.filter((b) => b.trip_id === t.id);
    return {
      ...t,
      destination_name: dest ? dest.name : null,
      destination_slug: dest ? dest.slug : null,
      destination_image: dest ? dest.hero_image : "assets/images/editorial-coast.jpg",
      entries,
      budgets,
    };
  }

  function createTrip({ name, destinationId, startDate, endDate, travellers, notes }) {
    const user = getSession();
    if (!user) return { ok: false, error: "Sign in required." };
    const cleanName = String(name || "").trim();
    if (cleanName.length < 2) return { ok: false, error: "Give your trip a name." };
    const state = loadState();
    const trip = {
      id: nextId(state.trips),
      user_id: user.id,
      name: cleanName,
      destination_id: destinationId ? Number(destinationId) : null,
      start_date: startDate || null,
      end_date: endDate || null,
      travellers: Math.max(1, Math.min(20, Number(travellers) || 1)),
      notes: String(notes || "").trim() || null,
      created_at: new Date().toISOString(),
    };
    state.trips.push(trip);
    saveState(state);
    return { ok: true, trip };
  }

  function updateTrip(tripId, patch) {
    const user = getSession();
    if (!user) return { ok: false };
    const state = loadState();
    const t = state.trips.find((x) => x.id === Number(tripId) && x.user_id === user.id);
    if (!t) return { ok: false };
    t.name = String(patch.name || t.name).trim();
    t.destination_id = patch.destinationId ? Number(patch.destinationId) : null;
    t.start_date = patch.startDate || null;
    t.end_date = patch.endDate || null;
    t.travellers = Math.max(1, Math.min(20, Number(patch.travellers) || 1));
    t.notes = String(patch.notes || "").trim() || null;
    saveState(state);
    return { ok: true };
  }

  function deleteTrip(tripId) {
    const user = getSession();
    if (!user) return { ok: false };
    const state = loadState();
    const id = Number(tripId);
    state.trips = state.trips.filter((t) => !(t.id === id && t.user_id === user.id));
    state.itinerary_entries = state.itinerary_entries.filter((e) => e.trip_id !== id);
    state.budget_entries = state.budget_entries.filter((b) => b.trip_id !== id);
    saveState(state);
    return { ok: true };
  }

  function addItineraryEntry(tripId, { entryDate, startTime, title, attractionId, notes, estimatedCost }) {
    const user = getSession();
    if (!user) return { ok: false };
    const state = loadState();
    const trip = state.trips.find((t) => t.id === Number(tripId) && t.user_id === user.id);
    if (!trip) return { ok: false };
    const cleanTitle = String(title || "").trim();
    if (!cleanTitle) return { ok: false, error: "Enter a stop title." };
    const entry = {
      id: nextId(state.itinerary_entries),
      trip_id: trip.id,
      entry_date: entryDate || trip.start_date || new Date().toISOString().slice(0, 10),
      start_time: startTime || null,
      title: cleanTitle,
      attraction_id: attractionId ? Number(attractionId) : null,
      notes: String(notes || "").trim() || null,
      estimated_cost: Math.max(0, Number(estimatedCost) || 0),
      sort: state.itinerary_entries.filter((e) => e.trip_id === trip.id).length + 1,
    };
    state.itinerary_entries.push(entry);
    saveState(state);
    return { ok: true, entry };
  }

  function deleteItineraryEntry(entryId) {
    const state = loadState();
    state.itinerary_entries = state.itinerary_entries.filter((e) => e.id !== Number(entryId));
    saveState(state);
    return { ok: true };
  }

  function addBudgetEntry(tripId, { category, label, amount, notes }) {
    const user = getSession();
    if (!user) return { ok: false };
    const state = loadState();
    const trip = state.trips.find((t) => t.id === Number(tripId) && t.user_id === user.id);
    if (!trip) return { ok: false };
    const cleanLabel = String(label || "").trim();
    if (!cleanLabel) return { ok: false, error: "Enter a budget item label." };
    const entry = {
      id: nextId(state.budget_entries),
      trip_id: trip.id,
      category: category || "OTHER",
      label: cleanLabel,
      amount: Math.max(0, Number(amount) || 0),
      notes: String(notes || "").trim() || null,
    };
    state.budget_entries.push(entry);
    saveState(state);
    return { ok: true, entry };
  }

  function deleteBudgetEntry(entryId) {
    const state = loadState();
    state.budget_entries = state.budget_entries.filter((b) => b.id !== Number(entryId));
    saveState(state);
    return { ok: true };
  }

  /* ---------------- Provider Listings ---------------- */
  function saveProviderListing(payload) {
    const user = getSession();
    if (!user || (user.role !== "PROVIDER" && user.role !== "ADMIN")) {
      return { ok: false, error: "Provider account required." };
    }
    const state = loadState();
    const name = String(payload.name || "").trim();
    const destId = Number(payload.destinationId);
    const dest = state.destinations.find((d) => d.id === destId);
    if (name.length < 3) return { ok: false, error: "Property name must be at least 3 characters." };
    if (!dest) return { ok: false, error: "Please select a destination." };
    const price = Math.max(20, Number(payload.pricePerNight) || 0);
    const description = String(payload.description || "").trim();
    if (description.length < 12) return { ok: false, error: "Please provide a brief property description." };

    if (payload.editId) {
      const existing = state.accommodations.find(
        (s) => s.id === Number(payload.editId) && (s.provider_id === user.id || user.role === "ADMIN")
      );
      if (!existing) return { ok: false, error: "Listing not found." };
      existing.name = name;
      existing.destination_id = dest.id;
      existing.type = payload.type || "HOTEL";
      existing.price_per_night = price;
      existing.area = String(payload.area || "").trim() || dest.name;
      existing.address = String(payload.address || "").trim() || null;
      existing.phone = String(payload.phone || "").trim() || null;
      existing.whatsapp = String(payload.whatsapp || "").trim() || null;
      existing.email = String(payload.email || "").trim() || null;
      existing.description = description;
      existing.amenities = Array.isArray(payload.amenities) ? payload.amenities : [];
      existing.image = dest.hero_image;
      existing.lat = dest.lat;
      existing.lng = dest.lng;
      existing.status = user.role === "ADMIN" ? existing.status : "PENDING";
      saveState(state);
      return { ok: true, listing: existing };
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let n = 2;
    while (state.accommodations.some((s) => s.slug === slug)) {
      slug = `${baseSlug}-${n++}`;
    }

    const listing = {
      id: nextId(state.accommodations),
      slug,
      name,
      destination_id: dest.id,
      provider_id: user.id,
      type: payload.type || "HOTEL",
      price_per_night: price,
      description,
      address: String(payload.address || "").trim() || null,
      area: String(payload.area || "").trim() || dest.name,
      lat: dest.lat,
      lng: dest.lng,
      phone: String(payload.phone || "").trim() || null,
      whatsapp: String(payload.whatsapp || "").trim() || null,
      email: String(payload.email || "").trim() || null,
      image: dest.hero_image,
      image_kind: "AREA_ILLUSTRATION",
      status: "PENDING",
      published: 1,
      content_status: "SEED",
      amenities: Array.isArray(payload.amenities) ? payload.amenities : [],
    };
    state.accommodations.push(listing);
    saveState(state);
    return { ok: true, listing };
  }

  /* ---------------- Admin Moderation ---------------- */
  function adminStats() {
    const state = loadState();
    return {
      destinations: state.destinations.length,
      publishedDestinations: state.destinations.filter((d) => d.published).length,
      attractions: state.attractions.length,
      hiddenGems: state.attractions.filter((a) => a.hidden_gem).length,
      accommodations: state.accommodations.length,
      approvedStays: state.accommodations.filter((s) => s.status === "APPROVED" && s.published).length,
      pendingStays: state.accommodations.filter((s) => s.status === "PENDING").length,
      travellers: state.users.filter((u) => u.role === "TRAVELLER").length,
      providers: state.users.filter((u) => u.role === "PROVIDER").length,
      admins: state.users.filter((u) => u.role === "ADMIN").length,
      trips: state.trips.length,
      savedPlaces: state.saved_places.length,
    };
  }

  function adminToggleDestination(id, field) {
    const user = getSession();
    if (!user || user.role !== "ADMIN") return false;
    const state = loadState();
    const d = state.destinations.find((x) => x.id === Number(id));
    if (!d) return false;
    if (field === "published") d.published = d.published ? 0 : 1;
    if (field === "featured") d.featured = d.featured ? 0 : 1;
    if (field === "verified") d.content_status = d.content_status === "VERIFIED" ? "SEED" : "VERIFIED";
    saveState(state);
    return true;
  }

  function adminToggleAttraction(id, field) {
    const user = getSession();
    if (!user || user.role !== "ADMIN") return false;
    const state = loadState();
    const a = state.attractions.find((x) => x.id === Number(id));
    if (!a) return false;
    if (field === "published") a.published = a.published ? 0 : 1;
    if (field === "featured") a.featured = a.featured ? 0 : 1;
    if (field === "hidden_gem") a.hidden_gem = a.hidden_gem ? 0 : 1;
    if (field === "verified") a.content_status = a.content_status === "VERIFIED" ? "SEED" : "VERIFIED";
    saveState(state);
    return true;
  }

  function adminSetStayStatus(id, status) {
    const user = getSession();
    if (!user || user.role !== "ADMIN") return false;
    const state = loadState();
    const s = state.accommodations.find((x) => x.id === Number(id));
    if (!s) return false;
    if (status === "APPROVED" || status === "REJECTED" || status === "PENDING") {
      s.status = status;
      if (status === "APPROVED") s.published = 1;
    } else if (status === "TOGGLE_PUBLISH") {
      s.published = s.published ? 0 : 1;
    }
    saveState(state);
    return true;
  }

  function allUsers() {
    return loadState().users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      created_at: u.created_at,
    }));
  }

  function imageCredits() {
    return loadState().image_credits || [];
  }

  function resetDemoData() {
    localStorage.removeItem(STATE_KEY);
    localStorage.removeItem(SESSION_KEY);
    loadState();
  }

  window.TripNestStore = {
    getSession,
    signIn,
    signUp,
    signOut,
    dashboardHome,
    listCategories,
    listAmenities,
    listRegions,
    listDestinations,
    getDestination,
    relatedDestinations,
    listAttractions,
    getAttraction,
    nearbyAttractions,
    listAccommodations,
    getAccommodation,
    searchSuggestions,
    publicStats,
    isSaved,
    toggleSaved,
    getSavedForUser,
    listTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    addItineraryEntry,
    deleteItineraryEntry,
    addBudgetEntry,
    deleteBudgetEntry,
    saveProviderListing,
    adminStats,
    adminToggleDestination,
    adminToggleAttraction,
    adminSetStayStatus,
    allUsers,
    imageCredits,
    resetDemoData,
  };
})();
