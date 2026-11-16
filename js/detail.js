// Detail page: reads ?id= from the address and shows that destination.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const COST_INFO = {
  "$":   { label: "Budget",    note: "Usually affordable for most travellers." },
  "$$":  { label: "Mid-range", note: "Expect to spend a moderate amount per day." },
  "$$$": { label: "Premium",   note: "One of the pricier places to visit." }
};

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const d = DESTINATIONS.find(item => item.id === id);
const root = document.getElementById("detail");

// Small cards for "More places like this".
function similarCard(s) {
  return `
    <a href="destination.html?id=${s.id}" class="card">
      <div class="thumb" data-cat="${s.category}">${s.category}</div>
      <div class="card-body">
        <h3>${s.name}</h3>
        <p class="country">${s.country}</p>
      </div>
    </a>
  `;
}

if (!d) {
  root.innerHTML = `
    <div class="not-found">
      <h1>Destination not found</h1>
      <p><a href="destinations.html">Go back to all destinations</a></p>
    </div>
  `;
} else {
  document.title = d.name + " | TripNest";

  const cost = COST_INFO[d.cost];
  const similar = DESTINATIONS
    .filter(s => s.category === d.category && s.id !== d.id)
    .slice(0, 3);

  root.innerHTML = `
    <div class="detail-hero" data-cat="${d.category}">
      <a class="back" href="destinations.html">Back to destinations</a>
      <h1>${d.name}</h1>
      <p>${d.country} · ${d.category}</p>
    </div>

    <div class="detail-layout">
      <div class="detail-main">
        <section>
          <h2>About</h2>
          <p class="about-text">${d.summary}</p>
        </section>

        <section>
          <h2>Things to do</h2>
          <ul class="activity-list">
            ${d.activities.map(a => `<li>${a}</li>`).join("")}
          </ul>
        </section>

        <section>
          <h2>Best months to visit</h2>
          <div class="calendar">
            ${MONTHS.map(m => `<span class="${d.bestMonths.includes(m) ? "best" : ""}">${m}</span>`).join("")}
          </div>
          <p class="calendar-note">Gold months are the best time to go.</p>
        </section>

        <section>
          <h2>Gallery</h2>
          <div class="gallery">
            <div>[PHOTO 1]</div>
            <div>[PHOTO 2]</div>
            <div>[PHOTO 3]</div>
          </div>
        </section>
      </div>

      <aside class="detail-side">
        <div class="panel">
          <h3>Best time to visit</h3>
          <p class="big">${d.bestMonths[0]} to ${d.bestMonths[d.bestMonths.length - 1]}</p>
          <p class="small">${d.bestMonths.length} good months in the year</p>

          <h3>Cost level</h3>
          <p class="big">${cost.label}</p>
          <p class="small">${cost.note} Rough guide only.</p>

          <a href="#" class="btn btn-main">Find places to stay</a>
          <a href="#" class="btn btn-outline">Add to trip plan</a>
        </div>
      </aside>
    </div>

    ${similar.length ? `
      <section class="similar">
        <h2>More ${d.category.toLowerCase()} places</h2>
        <div class="similar-grid">${similar.map(similarCard).join("")}</div>
      </section>
    ` : ""}
  `;
}