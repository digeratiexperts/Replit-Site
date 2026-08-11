#!/usr/bin/env node
/**
 * Generate DE store category/outcome/site icon heroes via Meshy Text-to-Image.
 * Reads MESHY_API_KEY from env or /home/digeratiexperts.com/shared/.env
 * Does NOT log the API key. Writes PNGs under client/public/images/store/
 * and mirrors under client/public/images/meshy/ for provenance.
 *
 * Usage: node scripts/generate-meshy-store-icons.mjs [--dry-run] [--limit N]
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const API = "https://api.meshy.ai/openapi/v1/text-to-image";
const MODEL = "nano-banana";
const ASPECT = "1:1";
const BRAND =
  "Professional MSP / IT services brand aesthetic: ink and stone charcoal palette, " +
  "magenta accent #D3126A used sparingly, clean corporate technology photography style, " +
  "subtle depth, no purple neon glow, no generic AI chrome, no text, no logos, no watermarks, " +
  "square icon-ready composition, soft studio lighting, high-end B2B SaaS product imagery.";

function loadKey() {
  if (process.env.MESHY_API_KEY) return process.env.MESHY_API_KEY.trim();
  const envPath = "/home/digeratiexperts.com/shared/.env";
  if (!fs.existsSync(envPath)) {
    throw new Error("MESHY_API_KEY not set and shared .env missing");
  }
  const raw = fs.readFileSync(envPath, "utf8");
  const line = raw.split("\n").find((l) => l.startsWith("MESHY_API_KEY="));
  if (!line) throw new Error("MESHY_API_KEY not found in shared .env");
  return line.slice("MESHY_API_KEY=".length).trim();
}

const SLOTS = [
  // categories
  {
    dir: "categories",
    id: "contract_services",
    prompt: `${BRAND} Abstract managed IT operations: organized server racks fading into soft charcoal stone, magenta cable accent line, calm enterprise control room mood.`,
  },
  {
    dir: "categories",
    id: "comanaged_subscriptions",
    prompt: `${BRAND} Two overlapping shield layers suggesting co-managed IT partnership, ink stone surfaces, thin magenta edge highlight, minimal geometric.`,
  },
  {
    dir: "categories",
    id: "comanaged_onboarding",
    prompt: `${BRAND} Clean onboarding pathway: clipboard checklist morphing into structured network nodes, charcoal ink tones, subtle magenta progress accent.`,
  },
  {
    dir: "categories",
    id: "networking_managed",
    prompt: `${BRAND} Enterprise network monitoring: abstract topology map on dark stone panel, soft cyan-gray nodes, single magenta status pulse.`,
  },
  {
    dir: "categories",
    id: "networking_projects",
    prompt: `${BRAND} Network engineering project: structured fiber and switch hardware still-life, charcoal backdrop, precise professional lighting, magenta accent reflector.`,
  },
  {
    dir: "categories",
    id: "ucaas_subscriptions",
    prompt: `${BRAND} Modern business communications: abstract headset and waveform merged with cloud silhouette, ink stone palette, restrained magenta highlight.`,
  },
  {
    dir: "categories",
    id: "ucaas_setup",
    prompt: `${BRAND} Phone system deployment: sleek desk phone and configuration diagram overlay, professional MSP install aesthetic, charcoal and magenta accents.`,
  },
  {
    dir: "categories",
    id: "hardware_provisioning",
    prompt: `${BRAND} Device provisioning: laptop being enrolled with security padlock overlay, clean bench photography, ink stone background, magenta seal accent.`,
  },
  {
    dir: "categories",
    id: "hardware_physical",
    prompt: `${BRAND} Business hardware kit: laptop, docking station, and peripherals arranged product-studio style on dark stone, magenta trim edge.`,
  },
  {
    dir: "categories",
    id: "hardware_handling",
    prompt: `${BRAND} Careful hardware logistics: sealed equipment crate with soft handling gloves motif, professional fulfillment mood, charcoal and magenta.`,
  },
  {
    dir: "categories",
    id: "digital_assessments",
    prompt: `${BRAND} Security assessment: magnifying glass over network risk heatmap, audit report aesthetic, ink stone surfaces, magenta risk marker.`,
  },
  {
    dir: "categories",
    id: "digital_templates",
    prompt: `${BRAND} Policy and compliance templates: stacked documents with structured grid overlays, professional legal-tech feel, charcoal ink, magenta tab accent.`,
  },
  {
    dir: "categories",
    id: "digital_training",
    prompt: `${BRAND} Security awareness training: abstract classroom screen with phishing shield lesson, calm professional education mood, ink stone and magenta.`,
  },
  {
    dir: "categories",
    id: "professional_services",
    prompt: `${BRAND} Expert consulting: architect desk with strategy boards and secure laptop, executive MSP advisory atmosphere, charcoal stone, magenta accent.`,
  },
  // outcomes
  {
    dir: "outcomes",
    id: "protect",
    prompt: `${BRAND} Outcome icon Protect: strong layered cyber shield on stone pedestal, defensive MSP security, magenta rim light only.`,
  },
  {
    dir: "outcomes",
    id: "modernize",
    prompt: `${BRAND} Outcome icon Modernize: legacy tower dissolving into sleek cloud workstation, transformation mood, ink stone, magenta spark line.`,
  },
  {
    dir: "outcomes",
    id: "compliance",
    prompt: `${BRAND} Outcome icon Compliance: checklist seal and audit stamp on dark slate, regulated business feel, magenta verified accent.`,
  },
  {
    dir: "outcomes",
    id: "recover",
    prompt: `${BRAND} Outcome icon Recover: backup vault and restoring data arcs, business continuity mood, charcoal stone, magenta recovery pulse.`,
  },
  {
    dir: "outcomes",
    id: "support_it",
    prompt: `${BRAND} Outcome icon Support IT: helpdesk headset with ticket queue nodes, reliable MSP support, ink stone palette, magenta call accent.`,
  },
  {
    dir: "outcomes",
    id: "outsource",
    prompt: `${BRAND} Outcome icon Outsource: trusted handoff of IT operations between two abstract teams, partnership silhouette, charcoal and magenta.`,
  },
  {
    dir: "outcomes",
    id: "secure_remote",
    prompt: `${BRAND} Outcome icon Secure Remote: laptop connected through encrypted tunnel to office fortress, zero-trust remote work, ink stone, magenta lock.`,
  },
  // site accents
  {
    dir: "site",
    id: "trust-security",
    prompt: `${BRAND} Site accent Trust Security: fortress-like data center silhouette with layered shields, professional MSP trust, magenta accent.`,
  },
  {
    dir: "site",
    id: "trust-microsoft",
    prompt: `${BRAND} Site accent Microsoft-aligned: abstract window-pane geometry suggesting productivity suite integration, charcoal stone, magenta corner accent — no logos or trademarks.`,
  },
  {
    dir: "site",
    id: "trust-audit",
    prompt: `${BRAND} Site accent Audit Ready: clipboard, seal, and graph bars on slate, readiness for insurer/auditor review, magenta check accent.`,
  },
  {
    dir: "site",
    id: "pricing-ecosystem",
    prompt: `${BRAND} Site accent Pricing Ecosystem: interlocking modular service tiles forming an ecosystem map, professional MSP packages, ink stone, magenta connector.`,
  },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function createTask(key, prompt) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ai_model: MODEL,
      prompt,
      aspect_ratio: ASPECT,
    }),
  });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text.slice(0, 400) };
  }
  if (!res.ok) {
    const msg = body?.message || body?.error || body?.raw || text.slice(0, 200);
    const err = new Error(`create ${res.status}: ${msg}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body.result;
}

async function pollTask(key, id) {
  for (let i = 0; i < 90; i++) {
    const res = await fetch(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const body = await res.json();
    if (!res.ok) {
      const err = new Error(`poll ${res.status}: ${body?.message || JSON.stringify(body).slice(0, 200)}`);
      err.status = res.status;
      throw err;
    }
    if (body.status === "SUCCEEDED") return body;
    if (body.status === "FAILED" || body.status === "CANCELED") {
      const msg = body?.task_error?.message || body.status;
      const err = new Error(`task ${body.status}: ${msg}`);
      err.status = 422;
      throw err;
    }
    await sleep(2000);
  }
  throw new Error(`timeout waiting for task ${id}`);
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
}

function makeCard(heroPath, cardPath) {
  execFileSync(
    "convert",
    [heroPath, "-resize", "480x480>", "-strip", cardPath],
    { stdio: "pipe" }
  );
}

function normalizeHero(src, dest) {
  // Match existing store heroes: 960x960 PNG
  execFileSync(
    "convert",
    [src, "-resize", "960x960^", "-gravity", "center", "-extent", "960x960", "-strip", dest],
    { stdio: "pipe" }
  );
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry-run");
  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;

  let key;
  try {
    key = loadKey();
  } catch (e) {
    console.error(String(e.message || e));
    process.exit(1);
  }
  if (!key.startsWith("msy_")) {
    console.error("MESHY_API_KEY does not look like a Meshy key (prefix check failed)");
    process.exit(1);
  }
  console.log(`Loaded MESHY_API_KEY (prefix ${key.slice(0, 6)}…, len=${key.length})`);
  console.log(`Model=${MODEL} slots=${SLOTS.length} dry=${dry}`);

  const results = [];
  const slots = SLOTS.slice(0, Number.isFinite(limit) ? limit : SLOTS.length);

  for (const slot of slots) {
    const label = `${slot.dir}/${slot.id}`;
    process.stdout.write(`→ ${label} … `);
    if (dry) {
      console.log("dry-run skip");
      results.push({ ...slot, ok: true, dry: true });
      continue;
    }
    try {
      const taskId = await createTask(key, slot.prompt);
      const task = await pollTask(key, taskId);
      const url = task.image_urls?.[0];
      if (!url) throw new Error("no image_urls");

      const rawPath = path.join("/tmp/meshy-gen/raw", `${slot.dir}-${slot.id}.png`);
      await download(url, rawPath);

      const storeHero = path.join(ROOT, "client/public/images/store", slot.dir, `${slot.id}.png`);
      const storeCard = path.join(ROOT, "client/public/images/store", slot.dir, `${slot.id}-card.png`);
      const meshyHero = path.join(ROOT, "client/public/images/meshy", slot.dir, `${slot.id}.png`);
      const meshyCard = path.join(ROOT, "client/public/images/meshy", slot.dir, `${slot.id}-card.png`);

      // Keep previous branded PNG as .branded-fallback.png once
      const fallback = storeHero.replace(/\.png$/, ".branded-fallback.png");
      if (fs.existsSync(storeHero) && !fs.existsSync(fallback)) {
        fs.copyFileSync(storeHero, fallback);
      }

      normalizeHero(rawPath, storeHero);
      makeCard(storeHero, storeCard);
      fs.mkdirSync(path.dirname(meshyHero), { recursive: true });
      fs.copyFileSync(storeHero, meshyHero);
      fs.copyFileSync(storeCard, meshyCard);

      console.log(`OK credits=${task.consumed_credits ?? "?"} id=${taskId.slice(0, 8)}`);
      results.push({
        dir: slot.dir,
        id: slot.id,
        ok: true,
        taskId,
        credits: task.consumed_credits,
      });
    } catch (e) {
      const status = e.status ? ` HTTP ${e.status}` : "";
      console.log(`FAIL${status}: ${e.message}`);
      results.push({
        dir: slot.dir,
        id: slot.id,
        ok: false,
        error: e.message,
        status: e.status || null,
      });
      // Stop hard on auth/quota
      if (e.status === 401 || e.status === 402 || e.status === 429) {
        console.error("Stopping further generation due to auth/quota/rate limit.");
        break;
      }
    }
    // gentle pacing
    await sleep(500);
  }

  const manifestPath = path.join(ROOT, "client/public/images/meshy/manifest.json");
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  const previous = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
    : { generated: [] };
  const ok = results.filter((r) => r.ok && !r.dry);
  const failed = results.filter((r) => !r.ok);
  const manifest = {
    generatedAt: new Date().toISOString(),
    model: MODEL,
    okCount: ok.length,
    failCount: failed.length,
    generated: [
      ...previous.generated.filter(
        (g) => !ok.some((n) => n.dir === g.dir && n.id === g.id)
      ),
      ...ok.map(({ dir, id, taskId, credits }) => ({ dir, id, taskId, credits })),
    ],
    lastRunFailures: failed.map(({ dir, id, error, status }) => ({
      dir,
      id,
      error,
      status,
    })),
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nDone. ok=${ok.length} fail=${failed.length} manifest=${manifestPath}`);
  if (failed.length) process.exitCode = 2;
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
