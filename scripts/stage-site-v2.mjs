/**
 * Stages the Version B homepage (scrollcraft/builds/de-v2) into dist/public/de-v2
 * so the production server can serve it at "/". Runs after `vite build`.
 *
 * Only the runtime subset ships: the page, its engine, styles, script, assets,
 * and the quiet-tier pages. Build-process records (BRIEF.md, lab/) stay out of
 * the deployable artifact.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "scrollcraft", "builds", "de-v2");
const dest = path.join(root, "dist", "public", "de-v2");

const RUNTIME = [
  "index.html",
  "de.css",
  "de.js",
  "scrollcraft.css",
  "scrollcraft.js",
  "assets",
  "pages",
];

if (!fs.existsSync(src)) {
  console.error(`[stage-site-v2] source missing: ${src}`);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

let files = 0;
for (const entry of RUNTIME) {
  const from = path.join(src, entry);
  if (!fs.existsSync(from)) {
    console.error(`[stage-site-v2] required entry missing: ${from}`);
    process.exit(1);
  }
  fs.cpSync(from, path.join(dest, entry), { recursive: true });
  files += 1;
}

const staged = fs.readdirSync(dest);
console.log(
  `[stage-site-v2] staged ${files} entries into dist/public/de-v2: ${staged.join(", ")}`,
);
