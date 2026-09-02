// Read-only kie.ai probe: hosts, credit endpoint, and per-model availability.
// The availability check sends createTask with an EMPTY input. Every text-to-image
// model requires a prompt, so the API rejects the request before any task exists:
// a validation error means the key may use that model; "not authorized" means it
// may not; anything else is recorded verbatim. No task is created, nothing is spent.
import fs from "node:fs";
const KEY = process.env.KIE_AI_API_KEY || process.env.KIE_API_KEY || "";
const lines = [];
const log = (o) => { const l = JSON.stringify({ t: new Date().toISOString(), ...o }); console.log(l); lines.push(l); };
const j = async (p) => { try { const r = await p; const t = await r.text(); try { return { http: r.status, ...JSON.parse(t) }; } catch { return { http: r.status, raw: t.slice(0, 200) }; } } catch (e) { return { error: String(e?.cause?.code || e?.message || e) }; } };
log({ step: "key", KIE_AI_API_KEY: process.env.KIE_AI_API_KEY ? `present(${process.env.KIE_AI_API_KEY.length})` : "missing", KIE_API_KEY: process.env.KIE_API_KEY ? `present(${process.env.KIE_API_KEY.length})` : "missing" });
for (const u of ["https://api.kie.ai/", "https://kieai.redpandaai.co/", "https://tempfile.redpandaai.co/", "https://docs.kie.ai/"]) {
  const r = await j(fetch(u)); log({ step: "host", url: u, http: r.http, error: r.error });
}
const outPath = process.argv[2] || "docs/kie/probe-availability.log";
if (!KEY) { log({ step: "abort", reason: "no key in environment" }); fs.writeFileSync(outPath, lines.join("\n") + "\n"); process.exit(0); }
const API = "https://api.kie.ai";
const H = { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` };
const before = await j(fetch(`${API}/api/v1/chat/credit`, { headers: H }));
log({ step: "credit-before", http: before.http, code: before.code, msg: before.msg, credit: before.data, error: before.error });
if (before.code !== 200) { log({ step: "abort", reason: "credit endpoint not OK; no model probes sent" }); fs.writeFileSync(outPath, lines.join("\n") + "\n"); process.exit(0); }
const MODELS = ["gpt-image-2-text-to-image", "nano-banana-2", "google/imagen4-ultra", "google/imagen4-fast", "google/imagen4", "flux-2/pro-text-to-image", "seedream/5-pro-text-to-image"];
for (const model of MODELS) {
  const r = await j(fetch(`${API}/api/v1/jobs/createTask`, { method: "POST", headers: H, body: JSON.stringify({ model, input: {} }) }));
  log({ step: "model", model, http: r.http, code: r.code, msg: r.msg, taskId: r?.data?.taskId ?? null, data: r?.data && !r?.data?.taskId ? r.data : undefined, raw: r.raw, error: r.error });
  if (r?.data?.taskId) log({ step: "WARNING", model, taskId: r.data.taskId, note: "a taskId came back from an empty input; do not poll it, do not repeat, report it" });
}
const after = await j(fetch(`${API}/api/v1/chat/credit`, { headers: H }));
log({ step: "credit-after", http: after.http, code: after.code, credit: after.data, error: after.error });
fs.writeFileSync(outPath, lines.join("\n") + "\n");
