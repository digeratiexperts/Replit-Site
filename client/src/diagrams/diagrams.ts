/**
 * DE diagram system — Visual System v2, Layer 4 explanatory diagrams.
 *
 * Grammar: design/DIAGRAM_SYSTEM.md. Evidence rules: design/VISUAL_EVIDENCE.md.
 * Motion rules: design/MOTION_LANGUAGE.md.
 *
 * Framework-free: every diagram renders to an SVG string from data, so a React
 * page can mount it statically and a Scrollcraft page can drive its state from
 * the engine's published progress. Nothing here invents numbers, telemetry,
 * clients, or performance: node names map to real DE domains, services, and
 * canonical package tiers; anything scenario-shaped is classified EXAMPLE.
 *
 * State model: `state` is 0..1. Each diagram declares how many stages it has;
 * elements carry `data-dg-at` (the stage they belong to). The stylesheet draws
 * stages at or below the current one and hides later ones, and draws the
 * current stage's strokes with `--dg-p` (progress within the stage).
 */
import { TIER_ORDER, type CoverageTier } from "../lib/proactiveCoverage";

export type Tone = "dark" | "paper";
export type Layout = "wide" | "narrow";
export type DiagramId = "environment" | "protection" | "assessment" | "coverage" | "lifecycle";
export type Classification = "LIVE" | "SANITIZED_REAL" | "EXAMPLE" | "ILLUSTRATIVE" | "FACTUAL";

export interface RenderOptions {
  layout?: Layout;
  tone?: Tone;
  /** 0..1 progress through the diagram's stages. Default 1 (complete, static). */
  state?: number;
  /** DOM id for the figure; auto-generated when omitted. */
  id?: string;
  /** Show the title/caption row (default true). */
  caption?: boolean;
}

export interface DiagramMeta {
  id: DiagramId;
  title: string;
  classification: Classification;
  label: string;
  nodes: number;
  stages: string[];
  source: string;
}

interface Node {
  id: string;
  code: string;
  label: string;
  sub?: string;
  at?: number;
  emphasis?: boolean;
}
interface Pt { x: number; y: number }
type Positions = Record<string, Pt>;

/* ------------------------------------------------------------------ utils */
const NODE_W = 132;
const NODE_H = 46;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}
function stageOf(state: number, stages: number): { stage: number; p: number } {
  const s = clamp01(state);
  if (s >= 1) return { stage: stages - 1, p: 1 };
  const raw = s * stages;
  const stage = Math.min(stages - 1, Math.floor(raw));
  return { stage, p: clamp01(raw - stage) };
}

function nodeSvg(n: Node, pt: Pt, w = NODE_W, h = NODE_H): string {
  const x = pt.x - w / 2;
  const y = pt.y - h / 2;
  const at = n.at ?? 0;
  const cls = `dg-node${n.emphasis ? " dg-node--emph" : ""}`;
  return (
    `<g class="${cls}" data-dg-at="${at}" data-node="${esc(n.id)}">` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>` +
    `<text class="dg-code" x="${x + 10}" y="${y + 15}">${esc(n.code)}</text>` +
    `<text class="dg-label" x="${x + 10}" y="${y + 33}">${esc(n.label)}</text>` +
    (n.sub ? `<text class="dg-sub" x="${x + w - 10}" y="${y + 15}" text-anchor="end">${esc(n.sub)}</text>` : "") +
    `</g>`
  );
}

/** Hairline edge between two node centres, stopping at the node edges. */
function edgeSvg(a: Pt, b: Pt, at: number, directed = false, w = NODE_W, h = NODE_H): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // trim to the rectangle boundary along the direction of travel
  const trim = (px: number, py: number) => {
    const tx = Math.abs(ux) > 1e-6 ? (w / 2) / Math.abs(ux) : Infinity;
    const ty = Math.abs(uy) > 1e-6 ? (h / 2) / Math.abs(uy) : Infinity;
    return Math.min(tx, ty);
  };
  const ta = trim(a.x, a.y);
  const tb = trim(b.x, b.y);
  const x1 = a.x + ux * ta;
  const y1 = a.y + uy * ta;
  const x2 = b.x - ux * tb;
  const y2 = b.y - uy * tb;
  return `<path class="dg-edge${directed ? " dg-edge--dir" : ""}" data-dg-at="${at}" pathLength="1" d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"${directed ? ' marker-end="url(#dg-arrow)"' : ""}/>`;
}

function boundarySvg(x: number, y: number, w: number, h: number, label: string, at: number, extra = ""): string {
  return (
    `<g class="dg-boundary" data-dg-at="${at}">` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" pathLength="1"/>` +
    `<text class="dg-code" x="${x + 12}" y="${y - 6}">${esc(label)}</text>${extra}</g>`
  );
}

function gateSvg(pt: Pt, label: string, at: number): string {
  return (
    `<g class="dg-gate" data-dg-at="${at}">` +
    `<circle cx="${pt.x}" cy="${pt.y}" r="5"/>` +
    `<text class="dg-code" x="${pt.x + 10}" y="${pt.y + 4}">${esc(label)}</text></g>`
  );
}

function defs(): string {
  return (
    `<defs><marker id="dg-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">` +
    `<path d="M0 0.5 L7 4 L0 7.5" fill="none" class="dg-arrowhead"/></marker></defs>`
  );
}

function wrap(meta: DiagramMeta, body: string, viewBox: string, opts: Required<Pick<RenderOptions, "layout" | "tone" | "state" | "caption">> & { id: string }): string {
  const { stage, p } = stageOf(opts.state, meta.stages.length);
  const classLabel = meta.classification === "FACTUAL" ? meta.label : `${meta.classification.replace("_", " ")} · ${meta.label}`;
  return (
    `<figure class="dg dg--${opts.tone} dg--${opts.layout}" id="${esc(opts.id)}" data-diagram="${meta.id}" data-dg-stage="${stage}" data-dg-stages="${meta.stages.length}" style="--dg-p:${p.toFixed(3)}">` +
    (opts.caption ? `<figcaption class="dg-head"><span class="dg-title">${esc(meta.title)}</span><span class="dg-telemetry">${esc(classLabel)}</span></figcaption>` : "") +
    `<svg viewBox="${viewBox}" role="img" aria-label="${esc(meta.title)}: ${esc(meta.stages[stage])}" preserveAspectRatio="xMidYMid meet">${defs()}${body}</svg>` +
    (opts.caption ? `<p class="dg-source">${esc(meta.source)}</p>` : "") +
    `</figure>`
  );
}

/* ====================================================== 1 · environment */
const ENV_NODES: Node[] = [
  { id: "people", code: "01 / PEOPLE", label: "People" },
  { id: "identity", code: "02 / IDENTITY", label: "Identity & access", emphasis: true },
  { id: "devices", code: "03 / ENDPOINTS", label: "Devices" },
  { id: "email", code: "04 / EMAIL", label: "Email" },
  { id: "systems", code: "05 / SYSTEMS", label: "Business systems" },
  { id: "network", code: "06 / NETWORK", label: "Network" },
  { id: "backup", code: "07 / BACKUP", label: "Backup & recovery" },
];
const ENV_EDGES: [string, string][] = [
  ["people", "identity"],
  ["identity", "devices"],
  ["identity", "email"],
  ["identity", "systems"],
  ["identity", "network"],
  ["devices", "backup"],
  ["systems", "backup"],
];
const ENV_WIDE: Positions = {
  people: { x: 110, y: 96 },
  identity: { x: 300, y: 96 },
  devices: { x: 490, y: 96 },
  email: { x: 110, y: 220 },
  systems: { x: 300, y: 220 },
  network: { x: 490, y: 220 },
  backup: { x: 300, y: 344 },
};
const ENV_NARROW: Positions = {
  people: { x: 100, y: 60 },
  identity: { x: 260, y: 60 },
  devices: { x: 100, y: 160 },
  email: { x: 260, y: 160 },
  systems: { x: 100, y: 260 },
  network: { x: 260, y: 260 },
  backup: { x: 180, y: 360 },
};
const ENVIRONMENT_META: DiagramMeta = {
  id: "environment",
  title: "One environment",
  classification: "ILLUSTRATIVE",
  label: "explanatory architecture",
  nodes: ENV_NODES.length,
  stages: ["fragmented: each system works alone", "designed: identity becomes the spine", "operated: security operations frame the whole"],
  source: "Domains map to DE's managed security and managed IT services. Illustrative structure, not a client environment.",
};
function renderEnvironment(o: Required<RenderOptions>): string {
  const pos = o.layout === "wide" ? ENV_WIDE : ENV_NARROW;
  const nodes = ENV_NODES.map((n) => nodeSvg({ ...n, at: 0 }, pos[n.id])).join("");
  const edges = ENV_EDGES.map(([a, b]) => edgeSvg(pos[a], pos[b], 1)).join("");
  const frame = o.layout === "wide"
    ? boundarySvg(24, 44, 552, 348, "SECURITY OPERATIONS · 24/7", 2)
    : boundarySvg(16, 18, 328, 384, "SECURITY OPERATIONS · 24/7", 2);
  const gates = o.layout === "wide"
    ? gateSvg({ x: 366, y: 76 }, "MFA", 2) + gateSvg({ x: 366, y: 324 }, "RESTORE DRILL", 2)
    : gateSvg({ x: 326, y: 40 }, "MFA", 2) + gateSvg({ x: 246, y: 340 }, "RESTORE DRILL", 2);
  const vb = o.layout === "wide" ? "0 0 600 420" : "0 0 360 420";
  return wrap(ENVIRONMENT_META, frame + edges + nodes + gates, vb, o);
}

/* ======================================================= 2 · protection */
const LAYERS: { code: string; label: string; answers: string }[] = [
  { code: "01", label: "Identity", answers: "credential theft" },
  { code: "02", label: "Endpoint", answers: "malware" },
  { code: "03", label: "Network", answers: "lateral movement" },
  { code: "04", label: "Email", answers: "phishing" },
  { code: "05", label: "Backup", answers: "ransomware encryption" },
  { code: "06", label: "Security operations", answers: "persistence" },
];
const PROTECTION_META: DiagramMeta = {
  id: "protection",
  title: "Layered protection",
  classification: "ILLUSTRATIVE",
  label: "explanatory boundaries",
  nodes: LAYERS.length + 1,
  stages: ["the business, exposed", "identity", "endpoint", "network", "email", "backup", "security operations"],
  source: "Six control layers DE operates, each named for the threat class it answers. Illustrative, not a customer's posture.",
};
function renderProtection(o: Required<RenderOptions>): string {
  if (o.layout === "wide") {
    const cx = 300;
    const cy = 218;
    const core = `<g class="dg-node dg-node--core" data-dg-at="0"><rect x="${cx - 78}" y="${cy - 34}" width="156" height="68" rx="6"/><text class="dg-code" x="${cx - 68}" y="${cy - 17}">THE BUSINESS</text><text class="dg-label" x="${cx - 68}" y="${cy + 2}">People · devices · systems</text><text class="dg-sub" x="${cx - 68}" y="${cy + 22}">what every layer protects</text></g>`;
    const rings = LAYERS.map((l, i) => {
      const k = i + 1;
      const w = 156 + k * 68;
      const h = 68 + k * 52;
      const x = cx - w / 2;
      const y = cy - h / 2;
      return (
        `<g class="dg-layer" data-dg-at="${k}">` +
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${8 + k * 2}" pathLength="1"/>` +
        `<text class="dg-code" x="${x + 10}" y="${y + 14}">${l.code} / ${esc(l.label.toUpperCase())}</text>` +
        `<text class="dg-sub" x="${x + w - 10}" y="${y + 14}" text-anchor="end">answers ${esc(l.answers)}</text>` +
        `</g>`
      );
    }).join("");
    return wrap(PROTECTION_META, rings + core, "0 0 600 436", o);
  }
  // narrow: the core at the top, layers stacked as bars beneath it, outermost last
  const core = `<g class="dg-node dg-node--core" data-dg-at="0"><rect x="30" y="16" width="300" height="60" rx="6"/><text class="dg-code" x="42" y="34">THE BUSINESS</text><text class="dg-label" x="42" y="54">People · devices · systems</text></g>`;
  const bars = LAYERS.map((l, i) => {
    const k = i + 1;
    const y = 92 + i * 56;
    return (
      `<g class="dg-layer" data-dg-at="${k}">` +
      `<rect x="30" y="${y}" width="300" height="42" rx="6" pathLength="1"/>` +
      `<text class="dg-code" x="42" y="${y + 17}">${l.code} / ${esc(l.label.toUpperCase())}</text>` +
      `<text class="dg-sub" x="42" y="${y + 33}">answers ${esc(l.answers)}</text>` +
      `</g>`
    );
  }).join("");
  return wrap(PROTECTION_META, core + bars, "0 0 360 440", o);
}

/* ======================================================= 3 · assessment */
const AREAS: Node[] = [
  { id: "identity", code: "01 / IDENTITY", label: "Identity & access", sub: "MFA coverage" },
  { id: "endpoints", code: "02 / ENDPOINTS", label: "Endpoints & devices" },
  { id: "email", code: "03 / EMAIL", label: "Email security" },
  { id: "backup", code: "04 / RECOVERY", label: "Backups & recovery" },
  { id: "controls", code: "05 / CONTROLS", label: "Foundational controls" },
];
const ROADMAP = ["VALIDATE", "REMEDIATE", "VERIFY"];
const ASSESSMENT_META: DiagramMeta = {
  id: "assessment",
  title: "The inspection",
  classification: "EXAMPLE",
  label: "not a client report",
  nodes: AREAS.length + ROADMAP.length,
  stages: ["unknown", "observed", "findings", "prioritized", "roadmap"],
  source: "The five areas a DE Cyber Risk Assessment reviews and the Validate → Remediate → Verify roadmap structure. Example format: no findings, scores, or client data.",
};
function renderAssessment(o: Required<RenderOptions>): string {
  const wide = o.layout === "wide";
  // wide: two rows (three areas, then two) so labels keep their full names
  const WIDE_POS: Pt[] = [{ x: 110, y: 72 }, { x: 300, y: 72 }, { x: 490, y: 72 }, { x: 205, y: 172 }, { x: 395, y: 172 }];
  const pos: Positions = {};
  AREAS.forEach((a, i) => {
    pos[a.id] = wide ? WIDE_POS[i] : { x: 180, y: 46 + i * 62 };
  });
  const nodes = AREAS.map((a) => nodeSvg({ ...a, at: 0 }, pos[a.id], wide ? 170 : 250, 46)).join("");
  // marks: observed (ring) at stage 1, finding (tick) at stage 2, priority (diamond) at stage 3
  const marks = AREAS.map((a, i) => {
    const p = pos[a.id];
    const mx = wide ? p.x - 62 : p.x + 138;
    const my = wide ? p.y + 40 : p.y;
    const priority = i === 0 || i === 3; // identity and recovery: the example's two priority findings
    const priorityText = wide
      ? `<text class="dg-code" x="${mx + 12}" y="${my + 4}">PRIORITY</text>`
      : `<text class="dg-code" x="${mx}" y="${my + 24}" text-anchor="middle">PRIORITY</text>`;
    return (
      `<g class="dg-mark" data-dg-at="1"><circle cx="${mx}" cy="${my}" r="6"/></g>` +
      `<g class="dg-mark dg-mark--finding" data-dg-at="2"><path d="M${mx - 3} ${my} l2.5 2.5 l4.5 -5" pathLength="1"/></g>` +
      (priority ? `<g class="dg-mark dg-mark--priority" data-dg-at="3"><path d="M${mx} ${my - 12} l7 7 l-7 7 l-7 -7 z" pathLength="1"/>${priorityText}</g>` : "")
    );
  }).join("");
  const roadY = wide ? 292 : 380;
  const road = ROADMAP.map((r, i) => {
    const x = wide ? 110 + i * 190 : 60 + i * 120;
    const w = wide ? 150 : 100;
    return (
      `<g class="dg-node dg-node--road" data-dg-at="4"><rect x="${x - w / 2}" y="${roadY - 20}" width="${w}" height="40" rx="6"/>` +
      `<text class="dg-code" x="${x - w / 2 + 10}" y="${roadY - 4}">0${i + 1}</text><text class="dg-label" x="${x - w / 2 + 10}" y="${roadY + 12}">${r}</text></g>` +
      (i < ROADMAP.length - 1 ? `<path class="dg-edge dg-edge--dir" data-dg-at="4" pathLength="1" d="M${x + w / 2 + 2} ${roadY} L${x + (wide ? 190 : 120) - w / 2 - 2} ${roadY}" marker-end="url(#dg-arrow)"/>` : "")
    );
  }).join("");
  const roadLabel = `<text class="dg-code" data-dg-at="4" x="${wide ? 35 : 10}" y="${roadY - 34}">ROADMAP · EXAMPLE STRUCTURE</text>`;
  const vb = wide ? "0 0 600 340" : "0 0 360 420";
  return wrap(ASSESSMENT_META, nodes + marks + roadLabel + road, vb, o);
}

/* ========================================================= 4 · coverage */
const TIER_DESC: Record<CoverageTier, string> = {
  it: "Operating baseline",
  office: "Adds network + endpoint backup",
  business: "Adds SOC, BCDR, compliance reporting",
  enterprise: "Adds governance, audit-grade compliance",
};
const TIER_LABEL: Record<CoverageTier, string> = { it: "IT", office: "Office", business: "Business", enterprise: "Enterprise" };
const COVERAGE_META: DiagramMeta = {
  id: "coverage",
  title: "ProActive coverage depth",
  classification: "FACTUAL",
  label: "canonical package inclusions",
  nodes: TIER_ORDER.length,
  stages: TIER_ORDER.map((t) => `${TIER_LABEL[t]}: ${TIER_DESC[t]}`),
  source: "Rings light from the core outward, mapped to what each ProActive package includes. Same grammar as the pricing coverage map.",
};
function renderCoverage(o: Required<RenderOptions>): string {
  const wide = o.layout === "wide";
  const cx = wide ? 190 : 180;
  const cy = wide ? 190 : 170;
  const radii = [44, 76, 108, 140];
  const rings = [...TIER_ORDER].map((t, i) => i).reverse().map((i) => {
    const t = TIER_ORDER[i];
    return `<g class="dg-ring" data-dg-at="${i}" data-tier="${t}"><circle cx="${cx}" cy="${cy}" r="${radii[i]}" pathLength="1"/></g>`;
  }).join("");
  const core = `<circle class="dg-core" cx="${cx}" cy="${cy}" r="6" data-dg-at="0"/>`;
  const legend = TIER_ORDER.map((t, i) => {
    const x = wide ? 380 : 40;
    const y = wide ? 96 + i * 62 : 340 + i * 44;
    return (
      `<g class="dg-legend" data-dg-at="${i}" data-tier="${t}"><circle cx="${x}" cy="${y}" r="4"/>` +
      `<text class="dg-label" x="${x + 14}" y="${y + 4}">${TIER_LABEL[t]}</text>` +
      `<text class="dg-sub" x="${x + 14}" y="${y + 20}">${esc(TIER_DESC[t])}</text></g>`
    );
  }).join("");
  const vb = wide ? "0 0 600 380" : "0 0 360 530";
  return wrap(COVERAGE_META, rings + core + legend, vb, o);
}

/* ======================================================== 5 · lifecycle */
const STAGES: Node[] = [
  { id: "assess", code: "01", label: "Discovery & assessment", sub: "risk & gap" },
  { id: "model", code: "02", label: "Fit-based operating model", sub: "IT · Office · Business · Enterprise" },
  { id: "harden", code: "03", label: "Hardening & integration", sub: "baseline & runbooks" },
  { id: "manage", code: "04", label: "Continuous management", sub: "24/7 · vCIO", emphasis: true },
];
const LOOP = ["monitor", "review", "patch", "drill"];
const LIFECYCLE_META: DiagramMeta = {
  id: "lifecycle",
  title: "The operating cadence",
  classification: "ILLUSTRATIVE",
  label: "service delivery structure",
  nodes: STAGES.length + LOOP.length,
  stages: ["discovery & assessment", "fit-based operating model", "hardening & integration", "continuous management", "the cadence keeps running"],
  source: "The four stages of DE's service delivery playbook, with the continuous loop that runs inside stage four: monitoring, reviews, patching, restore drills.",
};
function renderLifecycle(o: Required<RenderOptions>): string {
  const wide = o.layout === "wide";
  const pos: Positions = wide
    ? { assess: { x: 110, y: 90 }, model: { x: 330, y: 90 }, harden: { x: 330, y: 250 }, manage: { x: 110, y: 250 } }
    : { assess: { x: 180, y: 46 }, model: { x: 180, y: 126 }, harden: { x: 180, y: 206 }, manage: { x: 180, y: 286 } };
  const w = wide ? 176 : 250;
  const nodes = STAGES.map((n, i) => nodeSvg({ ...n, at: i }, pos[n.id], w, 46)).join("");
  const order = ["assess", "model", "harden", "manage"];
  const edges = order.map((id, i) => {
    if (i === order.length - 1) return "";
    return edgeSvg(pos[id], pos[order[i + 1]], i + 1, true, w, 46);
  }).join("");
  // the loop inside continuous management, drawn beneath stage four
  const lc = wide ? { x: 110, y: 340 } : { x: 180, y: 380 };
  const r = 44;
  const loopArcs = LOOP.map((l, i) => {
    const a0 = -Math.PI / 2 + (i * Math.PI) / 2;
    const a1 = a0 + Math.PI / 2 - 0.28;
    const x0 = lc.x + r * Math.cos(a0);
    const y0 = lc.y + r * Math.sin(a0);
    const x1 = lc.x + r * Math.cos(a1);
    const y1 = lc.y + r * Math.sin(a1);
    const lx = lc.x + (r + 18) * Math.cos(a0 + Math.PI / 4);
    const ly = lc.y + (r + 18) * Math.sin(a0 + Math.PI / 4);
    return (
      `<g class="dg-loop" data-dg-at="4"><path class="dg-edge dg-edge--dir" pathLength="1" d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" marker-end="url(#dg-arrow)"/>` +
      `<text class="dg-code" x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle">${l.toUpperCase()}</text></g>`
    );
  }).join("");
  const loopLink = `<path class="dg-edge" data-dg-at="4" pathLength="1" d="M${pos.manage.x} ${pos.manage.y + 25} L${lc.x} ${lc.y - r - 4}"/>`;
  const vb = wide ? "0 0 600 420" : "0 0 360 450";
  return wrap(LIFECYCLE_META, edges + nodes + loopLink + loopArcs, vb, o);
}

/* ================================================================ API */
const REGISTRY: Record<DiagramId, { meta: DiagramMeta; render: (o: Required<RenderOptions>) => string }> = {
  environment: { meta: ENVIRONMENT_META, render: renderEnvironment },
  protection: { meta: PROTECTION_META, render: renderProtection },
  assessment: { meta: ASSESSMENT_META, render: renderAssessment },
  coverage: { meta: COVERAGE_META, render: renderCoverage },
  lifecycle: { meta: LIFECYCLE_META, render: renderLifecycle },
};

export const DIAGRAM_IDS: DiagramId[] = ["environment", "protection", "assessment", "coverage", "lifecycle"];

export function diagramMeta(id: DiagramId): DiagramMeta {
  return REGISTRY[id].meta;
}

let counter = 0;
export function renderDiagram(id: DiagramId, opts: RenderOptions = {}): string {
  const o: Required<RenderOptions> = {
    layout: opts.layout ?? "wide",
    tone: opts.tone ?? "dark",
    state: opts.state ?? 1,
    id: opts.id ?? `dg-${id}-${++counter}`,
    caption: opts.caption ?? true,
  };
  return REGISTRY[id].render(o);
}

/**
 * Update a mounted diagram's state without re-rendering. Safe to call every
 * animation frame from a Scrollcraft page (reads the act's --sc-p, passes it
 * here). Under reduced motion the stylesheet snaps instead of drawing.
 */
export function setDiagramState(figure: Element, state: number): void {
  const stages = Number(figure.getAttribute("data-dg-stages") || "1");
  const { stage, p } = stageOf(state, stages);
  if (figure.getAttribute("data-dg-stage") !== String(stage)) figure.setAttribute("data-dg-stage", String(stage));
  (figure as HTMLElement).style.setProperty("--dg-p", p.toFixed(3));
  const id = figure.getAttribute("data-diagram") as DiagramId | null;
  const svg = figure.querySelector("svg");
  if (id && svg) svg.setAttribute("aria-label", `${REGISTRY[id].meta.title}: ${REGISTRY[id].meta.stages[stage]}`);
}
