// Toggle-test: verify an admin form action mutates state and revalidates public pages.
const { chromium } = require("playwright");
const BASE = "http://127.0.0.1:3100";

(async () => {
  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--single-process",
           "--no-zygote", "--renderer-process-limit=1", "--js-flags=--max-old-space-size=192"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));

  await page.goto(`${BASE}/sign-in`, { waitUntil: "domcontentloaded" });
  await page.fill('input[name="email"]', "admin@tripnest.gh");
  await page.fill('input[name="password"]', "tripnest123");
  await Promise.all([page.waitForURL(/dashboard/, { timeout: 30000 }).catch(() => {}), page.click('button[type="submit"]')]);
  await page.waitForTimeout(800);

  await page.goto(`${BASE}/dashboard/admin/destinations`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Row for Aburi; read featured cell text, click the toggle, read again.
  const row = page.locator("tr", { hasText: "Aburi" }).first();
  const before = (await row.innerText()).replace(/\s+/g, " ");
  await row.getByRole("button", { name: /feature/i }).first().click();
  await page.waitForTimeout(1800);
  const after = (await page.locator("tr", { hasText: "Aburi" }).first().innerText()).replace(/\s+/g, " ");

  // Does the homepage pick it up?
  const home = await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);
  const homeMentionsAburi = (await page.content()).includes("Aburi");

  // Flip back
  await page.goto(`${BASE}/dashboard/admin/destinations`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);
  await page.locator("tr", { hasText: "Aburi" }).first().getByRole("button", { name: /feature/i }).first().click();
  await page.waitForTimeout(1500);
  const restored = (await page.locator("tr", { hasText: "Aburi" }).first().innerText()).replace(/\s+/g, " ");

  console.log(JSON.stringify({ before, after, restored, homeStatus: home && home.status(), homeMentionsAburi, errors }, null, 1));
  await browser.close();
})();
