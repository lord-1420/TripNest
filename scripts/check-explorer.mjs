import fs from "node:fs";
import { chromium } from "playwright";

const browserPaths = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const executablePath = browserPaths.find((candidate) => fs.existsSync(candidate));
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 980 } });
  let pageErrors = 0;
  let consoleErrors = 0;
  page.on("pageerror", () => pageErrors++);
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors++;
  });

  const response = await page.goto("http://localhost:3001/explore", {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForFunction(
    () => !document.querySelector(".tn-globe-loader") || document.body.innerText.includes("Showing the 2D map fallback"),
    { timeout: 60_000 },
  );

  const result = {
    status: response?.status() ?? null,
    globeCanvasCount: await page.locator(".cesium-viewer canvas").count(),
    fallbackVisible: await page.getByText("Showing the 2D map fallback", { exact: true }).count() > 0,
    featuredPlaces: await page.locator("[data-explorer-stop]").count(),
    pageErrors,
    consoleErrors,
  };

  await page.screenshot({ path: "C:/Users/User/AppData/Local/Temp/tripnest-explorer.png", fullPage: false });

  if (result.status !== 200 || (!result.fallbackVisible && result.globeCanvasCount < 1)) {
    throw new Error(`Explorer did not render as expected: ${JSON.stringify(result)}`);
  }

  if (!result.fallbackVisible) {
    await page.locator("[data-explorer-stop]").first().click();
    await page.locator("aside[aria-label$='destination details']").waitFor({ timeout: 10_000 });
    result.panelOpensOnPlaceSelect = true;
  }

  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
