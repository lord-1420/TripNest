// Sign in once, then screenshot a list of dashboard routes.
// Usage: node scripts/session-shots.js <email> <password> <prefix> <path1> [path2 ...]
const { chromium } = require("playwright");
const fs = require("fs");

const BASE = "http://127.0.0.1:3100";

(async () => {
  const email = process.argv[2];
  const password = process.argv[3];
  const prefix = process.argv[4] || "/tmp/shots/dash";
  const paths = process.argv.slice(5);
  fs.mkdirSync("/tmp/shots", { recursive: true });

  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--single-process",
           "--no-zygote", "--renderer-process-limit=1", "--js-flags=--max-old-space-size=192"],
  });
  const vw = Number(process.env.VW || 1280), vh = Number(process.env.VH || 900);
  const page = await browser.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });

  await page.goto(`${BASE}/sign-in`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await Promise.all([
    page.waitForURL(/dashboard|next/, { timeout: 30000 }).catch(() => {}),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
  console.log(JSON.stringify({ signedInAs: page.url() }));

  const report = [];
  let i = 0;
  for (const p of paths) {
    errors.length = 0;
    const res = await page.goto(BASE + p, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const file = `${prefix}-${i++}.png`;
    await page.screenshot({ path: file });
    report.push({
      path: p,
      status: res && res.status(),
      title: (await page.title()).slice(0, 70),
      height: await page.evaluate(() => document.body.scrollHeight),
      file,
      errors: [...new Set(errors)].slice(0, 5),
    });
  }
  console.log(JSON.stringify(report, null, 1));
  await browser.close();
})();
