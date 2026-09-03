/**
 * Render the poster stills from the world itself (asset bible S01–S05).
 *
 * Serves the build, opens ?t=<value> for each beat, waits for the world to
 * render that single frame, screenshots the canvas, and encodes WebP with the
 * repo's ffmpeg. Reproducible: the same t values always give the same frames.
 *
 *   node scrollcraft/builds/experience-v1/tools/render-stills.mjs
 *
 * Needs the served build at BASE (default http://127.0.0.1:4501/), Chromium at
 * CHROME_BIN, and ffmpeg-static from the scrollcraft cache.
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE || "http://127.0.0.1:4501/";
const OUT = path.resolve("scrollcraft/builds/experience-v1/assets/stills");
const FFMPEG = process.env.FFMPEG || "/root/.cache/scrollcraft/node_modules/ffmpeg-static/ffmpeg";
const BEATS = [
  ["s01", 0.55], // the door: disconnected
  ["s02", 1.62], // what's underneath
  ["s03", 2.28], // drifting, 348°
  ["s04", 2.78], // corrected, DE entering
  ["s05", 3.45], // DE sees the whole environment
];
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
for (const [name, t] of BEATS) {
  await page.goto(`${BASE}?t=${t}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForSelector("html[data-still-ready]", { state: "attached", timeout: 30000 });
  await page.waitForTimeout(250);
  const png = path.join(OUT, `${name}.png`);
  await page.locator("#stage").screenshot({ path: png });
  const webp = path.join(OUT, `${name}.webp`);
  execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-i", png, "-c:v", "libwebp", "-q:v", "78", "-compression_level", "6", webp]);
  unlinkSync(png);
  console.log(`${name}  t=${t}  ${(statSync(webp).size / 1024).toFixed(1)} KB`);
}
await browser.close();
