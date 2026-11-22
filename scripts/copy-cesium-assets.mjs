import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = path.join(root, "node_modules", "cesium");
const sourceRoot = path.join(packageRoot, "Build", "Cesium");
const outputRoot = path.join(root, "public", "cesium");
const requiredDirectories = ["Workers", "ThirdParty", "Assets", "Widgets"];

if (!fs.existsSync(sourceRoot)) {
  console.error("CesiumJS assets are missing. Install project dependencies before starting TripNest.");
  process.exit(1);
}

const packageInfo = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
const versionFile = path.join(outputRoot, ".tripnest-cesium-version");
const existingVersion = fs.existsSync(versionFile) ? fs.readFileSync(versionFile, "utf8").trim() : "";
const outputIsComplete = requiredDirectories.every((name) => fs.existsSync(path.join(outputRoot, name)));

if (existingVersion === packageInfo.version && outputIsComplete) process.exit(0);

fs.mkdirSync(outputRoot, { recursive: true });
for (const directory of requiredDirectories) {
  const source = path.join(sourceRoot, directory);
  if (!fs.existsSync(source)) {
    console.error(`CesiumJS is missing its ${directory} directory.`);
    process.exit(1);
  }
  fs.cpSync(source, path.join(outputRoot, directory), { recursive: true, force: true });
}
fs.writeFileSync(versionFile, `${packageInfo.version}\n`);
console.log(`Prepared CesiumJS ${packageInfo.version} static assets in public/cesium.`);
