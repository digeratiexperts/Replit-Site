import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const KEY = process.env.KIE_AI_API_KEY;
if (!KEY) { console.log(JSON.stringify({ step: "key", present: false })); process.exit(2); }
console.log(JSON.stringify({ step: "key", present: true, length: KEY.length }));
const API = "https://api.kie.ai";
const H = { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` };
const log = (o) => console.log(JSON.stringify({ t: new Date().toISOString(), ...o }));
const j = async (p) => { try { const r = await p; const t = await r.text(); try { return { http: r.status, ...JSON.parse(t) }; } catch { return { http: r.status, raw: t.slice(0, 300) }; } } catch (e) { return { error: String(e?.cause?.code || e?.message || e) }; } };
const prompt = fs.readFileSync(process.argv[2], "utf8").trim();
const out = process.argv[3];
const ar = process.argv[4] || "16:9";
const before = await j(fetch(`${API}/api/v1/chat/credit`, { headers: H }));
log({ step: "credit-before", http: before.http, code: before.code, credit: before.data, error: before.error });
if (before.code !== 200) { log({ step: "abort", reason: "credit endpoint not OK; no task created" }); process.exit(3); }
const create = await j(fetch(`${API}/api/v1/jobs/createTask`, { method: "POST", headers: H, body: JSON.stringify({ model: "seedream/5-pro-text-to-image", input: { prompt, aspect_ratio: ar, quality: "high", output_format: "png", nsfw_checker: false } }) }));
log({ step: "createTask", http: create.http, code: create.code, msg: create.msg, taskId: create?.data?.taskId, error: create.error, raw: create.raw });
const taskId = create?.data?.taskId;
if (!taskId) { log({ step: "abort", reason: "no taskId" }); process.exit(4); }
let urls = [], delay = 4000; const t0 = Date.now(); let record = null;
for (;;) {
  const r = await j(fetch(`${API}/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`, { headers: H }));
  const d = r?.data || {}; const state = d.state || d.status;
  if (state === "success") {
    let o = d.resultJson; if (typeof o === "string") { try { o = JSON.parse(o); } catch {} }
    urls = o?.resultUrls || o?.result_urls || o?.urls || [];
    record = { model: d.model, state, costTime: d.costTime, createTime: d.createTime, completeTime: d.completeTime };
    log({ step: "success", taskId, urls, seconds: Math.round((Date.now() - t0) / 1000), record });
    break;
  }
  if (state === "fail" || state === "failed") { log({ step: "fail", taskId, failCode: d.failCode, failMsg: d.failMsg }); process.exit(5); }
  log({ step: "poll", state: state || "queued", http: r.http, seconds: Math.round((Date.now() - t0) / 1000), error: r.error });
  if (Date.now() - t0 > 15 * 60 * 1000) { log({ step: "timeout", taskId }); process.exit(6); }
  await new Promise((res) => setTimeout(res, delay)); delay = Math.min(delay * 1.25, 15000);
}
const after = await j(fetch(`${API}/api/v1/chat/credit`, { headers: H }));
log({ step: "credit-after", code: after.code, credit: after.data, error: after.error });
async function tryDownload(url, label) {
  try {
    const r = await fetch(url);
    if (!r.ok) { log({ step: "download", label, url, http: r.status }); return false; }
    const buf = Buffer.from(await r.arrayBuffer());
    fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
    fs.writeFileSync(path.resolve(out), buf);
    log({ step: "download", label, url, ok: true, bytes: buf.length, sha256: crypto.createHash("sha256").update(buf).digest("hex"), contentType: r.headers.get("content-type") });
    return true;
  } catch (e) { log({ step: "download", label, url, error: String(e?.cause?.code || e?.message || e) }); return false; }
}
let got = false;
for (const u of urls) { if (await tryDownload(u, "direct")) { got = true; break; } }
if (!got && urls[0]) {
  const du = await j(fetch(`${API}/api/v1/common/download-url`, { method: "POST", headers: H, body: JSON.stringify({ url: urls[0] }) }));
  log({ step: "download-url", http: du.http, code: du.code, msg: du.msg, data: du.data, raw: du.raw, error: du.error });
  const alt = typeof du.data === "string" ? du.data : du?.data?.url || du?.data?.downloadUrl;
  if (alt) got = await tryDownload(alt, "via-download-url");
}
log({ step: "done", taskId, downloaded: got, out: got ? out : null });
