import { chromium } from "playwright";
import fs from "node:fs";

const [, , url = "http://127.0.0.1:3000/", out = "/tmp/shots/home", w = "1440", h = "900", mode = "scroll"] = process.argv;
fs.mkdirSync("/tmp/shots", { recursive: true });
const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
await page.waitForTimeout(3500);
await page.screenshot({ path: `${out}-0.png` });
if (mode === "scroll") {
  const total = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.min(6, Math.ceil(total / +h));
  for (let i = 1; i < steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * (+h - 100));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${out}-${i}.png` });
  }
  console.log("pageheight", total);
}
console.log("errors:", errors.slice(0, 8));
await browser.close();
