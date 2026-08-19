#!/usr/bin/env node
/**
 * Renders every public route and reports brand + accessibility debt.
 *
 * Written as a repeatable harness rather than a one-off because the sweep it
 * guards touches ~80 pages: a scripted edit needs a check that actually loads
 * the page, since class-name greps cannot see computed gradients, inherited
 * backgrounds, or text that ends up invisible.
 *
 *   node scripts/brand-audit.mjs [--base http://localhost:8080] [--routes a,b]
 *
 * Exit code is 1 when any route reports a defect, so CI can gate on it.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};

const BASE = argOf("--base", "http://localhost:8080");
const VIEWPORT = { width: Number(argOf("--width", 1440)), height: 900 };

function routesFromApp() {
  const src = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
  const found = [...src.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(found)].filter((r) => !r.includes(":") && !r.includes("*")).sort();
}

const routes = argOf("--routes", "")
  ? argOf("--routes", "").split(",").map((s) => s.trim()).filter(Boolean)
  : routesFromApp();

/**
 * Intentional exceptions.
 *
 * This script is a regression detector, not the design authority. Plenty of
 * colour on this site is doing a job — status, taxonomy, vendor identity — and
 * forcing every route to zero flags would destroy it. Anything listed here is
 * a deliberate decision; everything else that trips is a regression.
 *
 * Each entry needs a reason. If you cannot write one, it is not an exception.
 */
const EXCEPTIONS = [
  {
    match: (hit) => /\bde-store-category\b/.test(hit.cls),
    why: "Store category pills colour-code 14 product categories for wayfinding. Hue is reinforcement only — the pill also prints its label. See categoryAccent in StoreProductCard.tsx.",
  },
  {
    match: (hit) => /\bde-vendor-mark\b/.test(hit.cls),
    why: "Vendor branding has to render in the vendor's own colours.",
  },
  {
    match: (hit) => hit.kind === "gradient" && /\bde-process-band\b/.test(hit.cls),
    why: "Homepage process band uses violet as lighting over a charcoal slab, which the accent-pop rule permits. It is not a fill.",
  },
  {
    match: (hit) => hit.kind === "gradient" && /\bde-hero-glow\b/.test(hit.cls),
    why: "Hero atmosphere. Violet as lighting, explicitly allowed; the field underneath stays black.",
  },
  {
    match: (hit) => /\bde-status\b/.test(hit.cls) || /\bde-chart\b/.test(hit.cls),
    why: "Semantic status and chart series colours encode meaning. Flattening them to magenta would hide the signal.",
  },
  {
    match: (hit) => /\bcity-btn\b/.test(hit.cls),
    why: "Arizona city chips use each city's official colour, not the brand palette.",
  },
];

/** Routes the sweep deliberately does not own. */
const OUT_OF_SCOPE = [/^\/portal(\/|$)/, /^\/login$/, /^\/signup$/];

/**
 * Runs in the page. Violet is legal as *lighting* (low-alpha glows) but not as
 * a fill, so the fill check ignores anything below the alpha floor.
 */
function collect(alphaFloor) {
  /**
   * Violet and indigo specifically, not "anything blue-ish".
   *
   * Purple sits where blue leads, red trails it, and green is pushed well
   * below both. Requiring `r > g` is what separates violet from a true blue
   * such as the Store's electric accent (low red, mid green), and requiring
   * `b > r` is what keeps brand magenta out of the net.
   */
  const isPurple = (r, g, b) => b > 90 && b > r && r - g >= 10 && b - g >= 60;
  const rgb = (s) => {
    const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
    return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null;
  };

  const purple = [];
  for (const el of document.querySelectorAll("*")) {
    const box = el.getBoundingClientRect();
    if (box.height < 8 || box.width < 8) continue;
    const cs = getComputedStyle(el);

    const fill = rgb(cs.backgroundColor);
    if (fill && fill.a > alphaFloor && isPurple(fill.r, fill.g, fill.b)) {
      purple.push({ kind: "fill", cls: String(el.className).slice(0, 60) });
      continue;
    }
    if (cs.backgroundImage && cs.backgroundImage !== "none") {
      for (const stop of cs.backgroundImage.matchAll(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/g)) {
        const a = stop[4] === undefined ? 1 : +stop[4];
        if (a > alphaFloor && isPurple(+stop[1], +stop[2], +stop[3])) {
          purple.push({ kind: "gradient", cls: String(el.className).slice(0, 60) });
          break;
        }
      }
    }
  }

  const lum = (r, g, b) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  // Text over an image or gradient scrim cannot be scored from a background
  // colour walk, so it is skipped rather than reported as a false failure.
  const overScrim = (el) => {
    let n = el;
    for (let i = 0; i < 4 && n; i++) {
      if (getComputedStyle(n).backgroundImage.includes("gradient")) return true;
      n = n.parentElement;
    }
    return false;
  };
  // Averages a gradient's stops so a gradient-painted field counts as a real
  // backdrop. Without this the walk falls through to a white <body> and reports
  // white-on-dark text as 1:1.
  const gradientAvg = (image) => {
    const stops = [...image.matchAll(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/g)].map((m) => ({
      r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4],
    }));
    const solid = stops.filter((s) => s.a > 0.05);
    if (!solid.length) return null;
    const n = solid.length;
    return {
      r: solid.reduce((t, s) => t + s.r, 0) / n,
      g: solid.reduce((t, s) => t + s.g, 0) / n,
      b: solid.reduce((t, s) => t + s.b, 0) / n,
      a: solid.reduce((t, s) => t + s.a, 0) / n,
    };
  };

  // Composite every translucent layer on the way up. Skipping them (rather than
  // blending) reports white-on-dark card text as 1:1, which is a false failure.
  const behind = (el) => {
    const layers = [];
    let n = el;
    while (n) {
      const cs = getComputedStyle(n);
      const c = rgb(cs.backgroundColor);
      if (c && c.a > 0.001) {
        layers.push(c);
        if (c.a > 0.99) break;
      }
      if (cs.backgroundImage && cs.backgroundImage.includes("gradient(")) {
        const g = gradientAvg(cs.backgroundImage);
        if (g) {
          layers.push(g);
          if (g.a > 0.9) break;
        }
      }
      n = n.parentElement;
    }
    let out = { r: 5, g: 3, b: 18 };
    for (let i = layers.length - 1; i >= 0; i--) {
      const l = layers[i];
      out = {
        r: l.r * l.a + out.r * (1 - l.a),
        g: l.g * l.a + out.g * (1 - l.a),
        b: l.b * l.a + out.b * (1 - l.a),
      };
    }
    return { ...out, a: 1 };
  };

  const contrast = [];
  let checked = 0;
  for (const el of document.querySelectorAll("p,h1,h2,h3,h4,h5,span,a,li,label,button,div")) {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim().length > 2);
    if (!text.length) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.1) continue;
    const box = el.getBoundingClientRect();
    if (box.width < 4 || box.height < 4) continue;
    if (overScrim(el)) continue;
    const fg = rgb(cs.color);
    if (!fg) continue;
    checked++;
    const bg = behind(el);
    const flat = {
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
    };
    const l1 = lum(flat.r, flat.g, flat.b);
    const l2 = lum(bg.r, bg.g, bg.b);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const px = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight) || 400;
    const need = px >= 24 || (px >= 18.66 && weight >= 700) ? 3 : 4.5;
    if (ratio < need) {
      contrast.push({
        text: text[0].textContent.trim().slice(0, 30),
        color: cs.color,
        ratio: +ratio.toFixed(2),
        need,
      });
    }
  }

  const seen = new Set();
  const uniqueContrast = contrast.filter((c) => {
    const key = c.text + c.color;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const doc = document.documentElement;
  return {
    checked,
    purpleHits: purple,
    contrast: uniqueContrast.length,
    contrastSample: uniqueContrast.sort((a, b) => a.ratio - b.ratio).slice(0, 3),
    overflow: doc.scrollWidth > doc.clientWidth,
  };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT });

const results = [];
for (const route of routes) {
  const errors = [];
  page.removeAllListeners("pageerror");
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 90)));

  try {
    await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1500);
    const consent = page.locator("button:has-text('Accept All')");
    if (await consent.count()) {
      await consent.first().click().catch(() => {});
      await page.waitForTimeout(200);
    }
    // Scroll so viewport-triggered reveals actually paint before measuring.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 18));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    const data = await page.evaluate(collect, 0.12);

    const excused = [];
    const flagged = [];
    for (const hit of data.purpleHits) {
      const exception = EXCEPTIONS.find((e) => e.match(hit));
      (exception ? excused : flagged).push(exception ? { ...hit, why: exception.why } : hit);
    }
    data.purple = flagged.length;
    data.purpleSample = [...new Set(flagged.map((p) => `${p.kind}:${p.cls}`))].slice(0, 3);
    data.excused = excused.length;
    delete data.purpleHits;

    results.push({
      route,
      outOfScope: OUT_OF_SCOPE.some((re) => re.test(route)),
      ...data,
      errors: errors.length,
      errorSample: errors.slice(0, 2),
    });
  } catch (err) {
    results.push({ route, failed: String(err).slice(0, 90), errors: errors.length });
  }
}
await browser.close();

const inScope = results.filter((r) => !r.outOfScope);
const bad = inScope.filter(
  (r) => r.failed || r.errors > 0 || r.purple > 0 || r.contrast > 0 || r.overflow,
);

const reportPath = argOf("--out", "/tmp/brand-audit.json");
writeFileSync(reportPath, JSON.stringify({ base: BASE, viewport: VIEWPORT, results }, null, 2));

console.log(`\nAudited ${results.length} routes at ${VIEWPORT.width}px\n`);
for (const r of bad) {
  if (r.failed) {
    console.log(`✗ ${r.route}  LOAD FAILED  ${r.failed}`);
    continue;
  }
  const bits = [];
  if (r.errors) bits.push(`js:${r.errors}`);
  if (r.purple) bits.push(`purple:${r.purple}`);
  if (r.contrast) bits.push(`contrast:${r.contrast}`);
  if (r.overflow) bits.push("overflow");
  console.log(`✗ ${r.route.padEnd(44)} ${bits.join("  ")}`);
  for (const c of r.contrastSample || []) console.log(`      ${c.ratio}:1 (needs ${c.need})  "${c.text}"  ${c.color}`);
  for (const p of r.purpleSample || []) console.log(`      ${p}`);
  for (const e of r.errorSample || []) console.log(`      ${e}`);
}
const excused = inScope.reduce((total, r) => total + (r.excused || 0), 0);
const skipped = results.length - inScope.length;

console.log(`\n${inScope.length - bad.length}/${inScope.length} in-scope routes clean`);
if (excused) console.log(`${excused} intentional exception(s) allowed — see EXCEPTIONS in this file`);
if (skipped) console.log(`${skipped} route(s) out of scope (portal / auth)`);
console.log();
process.exit(bad.length ? 1 : 0);
