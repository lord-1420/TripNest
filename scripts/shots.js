// Usage: node scripts/shots.js <url> <outPrefix> [width] [height] [scrollSteps]
const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const url = process.argv[2] || "http://127.0.0.1:3000/";
  const out = process.argv[3] || "/tmp/shots/page";
  const width = Number(process.argv[4] || 1280);
  const height = Number(process.argv[5] || 800);
  const steps = Number(process.argv[6] || 1);
  fs.mkdirSync("/tmp/shots", { recursive: true });
  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--single-process",
           "--no-zygote", "--renderer-process-limit=1", "--js-flags=--max-old-space-size=192"],
  });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
  const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3500);
  for (let i = 0; i < steps; i++) {
    if (i > 0) {
      await page.evaluate((y) => window.scrollTo(0, y), i * (height - 80));
      await page.waitForTimeout(900);
    }
    await page.screenshot({ path: `${out}-${i}.png` });
  }
  console.log(JSON.stringify({ status: res && res.status(), title: await page.title(), height: await page.evaluate(() => document.body.scrollHeight), errors: errors.slice(0, 6) }));
  await browser.close();
})();
