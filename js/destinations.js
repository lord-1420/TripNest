// Shows destination cards and handles search and filters.

const grid = document.getElementById("grid");
const info = document.getElementById("results-info");
const searchBox = document.getElementById("search");
const regionSelect = document.getElementById("region");
const categorySelect = document.getElementById("category");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COST_LABELS = { "$": "Budget", "$$": "Mid-range", "$$$": "Premium" };

// Fill a dropdown with the unique values found in the data.
function fillOptions(select, key, firstLabel) {
  const values = [...new Set(DESTINATIONS.map(d => d[key]))].sort();
  select.innerHTML =
    `<option value="">${firstLabel}</option>` +
    values.map(v => `<option value="${v}">${v}</option>`).join("");
}

// Build the 12-month strip. Best months are gold.
function monthStrip(bestMonths) {
  return `
    <div class="months" aria-hidden="true">
      ${MONTHS.map(m => `<i class="${bestMonths.includes(m) ? "best" : ""}"></i>`).join("")}
    </div>
    <div class="month-labels" aria-hidden="true"><span>Jan</span><span>Jun</span><span>Dec</span></div>
  `;
}

// Build the cards for a list of destinations.
function showDestinations(list) {
  info.textContent = list.length + " destination" + (list.length === 1 ? "" : "s") + " found";

  if (list.length === 0) {
    grid.innerHTML = "<p>No destinations match your search. Try another name or clear a filter.</p>";
    return;
  }

  grid.innerHTML = list.map(d => `
    <a href="destination.html?id=${d.id}" class="card">
      <div class="thumb" data-cat="${d.category}">${d.category}</div>
      <div class="card-body">
        <h3>${d.name}</h3>
        <p class="country">${d.country}</p>
        <p class="summary">${d.summary}</p>
        ${monthStrip(d.bestMonths)}
        <p class="meta">${COST_LABELS[d.cost]} · ${d.activities.length} things to do</p>
      </div>
    </a>
  `).join("");
}

// Apply search text and both filters together.
function applyFilters() {
  const text = searchBox.value.trim().toLowerCase();

  const result = DESTINATIONS.filter(d => {
    const matchesText = (d.name + " " + d.country).toLowerCase().includes(text);
    const matchesRegion = regionSelect.value === "" || d.region === regionSelect.value;
    const matchesCategory = categorySelect.value === "" || d.category === categorySelect.value;
    return matchesText && matchesRegion && matchesCategory;
  });

  showDestinations(result);
}

fillOptions(regionSelect, "region", "All regions");
fillOptions(categorySelect, "category", "All types");

searchBox.addEventListener("input", applyFilters);
regionSelect.addEventListener("change", applyFilters);
categorySelect.addEventListener("change", applyFilters);

showDestinations(DESTINATIONS);