import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE_TITLE = "File:LL-Q1860 (eng)-Flame, not lame-digerati.wav";
const OUTPUT = path.resolve("client/public/audio/digerati-pronunciation.wav");
const API = new URL("https://commons.wikimedia.org/w/api.php");
API.searchParams.set("action", "query");
API.searchParams.set("format", "json");
API.searchParams.set("formatversion", "2");
API.searchParams.set("prop", "imageinfo");
API.searchParams.set("iiprop", "url|mime|size|sha1|extmetadata");
API.searchParams.set("titles", FILE_TITLE);
API.searchParams.set("origin", "*");

const headers = {
  "User-Agent": "DigeratiExperts-site-build/1.0 (https://digeratiexperts.com/)",
};

function fail(message) {
  throw new Error(`[pronunciation-audio] ${message}`);
}

function decodeEntities(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]*>/g, "")
    .trim();
}

function inspectPcmWav(buffer) {
  if (buffer.length < 44 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") {
    fail("download is not a RIFF/WAVE file");
  }

  let offset = 12;
  let fmt = null;
  let data = null;

  while (offset + 8 <= buffer.length) {
    const id = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    const end = Math.min(start + size, buffer.length);

    if (id === "fmt " && size >= 16) {
      fmt = {
        audioFormat: buffer.readUInt16LE(start),
        channels: buffer.readUInt16LE(start + 2),
        sampleRate: buffer.readUInt32LE(start + 4),
        bitsPerSample: buffer.readUInt16LE(start + 14),
      };
    } else if (id === "data") {
      data = buffer.subarray(start, end);
    }

    offset = start + size + (size % 2);
  }

  if (!fmt || !data) fail("WAV is missing fmt or data chunk");
  if (fmt.audioFormat !== 1 || fmt.bitsPerSample !== 16) {
    fail(`expected 16-bit PCM WAV, got format=${fmt.audioFormat}, bits=${fmt.bitsPerSample}`);
  }
  if (fmt.channels < 1 || fmt.channels > 2) fail(`unexpected channel count ${fmt.channels}`);
  if (fmt.sampleRate < 16_000 || fmt.sampleRate > 96_000) fail(`unexpected sample rate ${fmt.sampleRate}`);

  const sampleCount = Math.floor(data.length / 2);
  if (!sampleCount) fail("WAV has no PCM samples");

  let peak = 0;
  let sumSq = 0;
  let sum = 0;
  let clipped = 0;
  for (let i = 0; i < sampleCount; i += 1) {
    const sample = data.readInt16LE(i * 2) / 32768;
    const abs = Math.abs(sample);
    peak = Math.max(peak, abs);
    sumSq += sample * sample;
    sum += sample;
    if (abs >= 0.999) clipped += 1;
  }

  const rms = Math.sqrt(sumSq / sampleCount);
  const rmsDb = 20 * Math.log10(Math.max(rms, 1e-9));
  const dc = sum / sampleCount;
  const duration = data.length / (fmt.sampleRate * fmt.channels * 2);
  const clippedFraction = clipped / sampleCount;

  if (duration < 0.55 || duration > 3.5) fail(`unexpected duration ${duration.toFixed(3)}s`);
  if (peak < 0.08) fail(`recording is suspiciously quiet (peak ${peak.toFixed(3)})`);
  if (rmsDb < -38 || rmsDb > -5) fail(`recording RMS ${rmsDb.toFixed(1)} dBFS is outside the acceptance window`);
  if (Math.abs(dc) > 0.04) fail(`recording has excessive DC offset ${dc.toFixed(4)}`);
  if (clippedFraction > 0.001) fail(`recording has ${(clippedFraction * 100).toFixed(3)}% clipped samples`);

  return {
    ...fmt,
    duration,
    peak,
    rmsDb,
    dc,
    clippedFraction,
  };
}

const metadataResponse = await fetch(API, { headers });
if (!metadataResponse.ok) fail(`Commons metadata request returned HTTP ${metadataResponse.status}`);
const metadata = await metadataResponse.json();
const page = metadata?.query?.pages?.[0];
const info = page?.imageinfo?.[0];
if (!page || page.missing || !info?.url) fail(`Commons file not found: ${FILE_TITLE}`);

const license = decodeEntities(info.extmetadata?.LicenseShortName?.value);
const usageTerms = decodeEntities(info.extmetadata?.UsageTerms?.value);
if (!/CC0|public domain/i.test(`${license} ${usageTerms}`)) {
  fail(`refusing non-CC0/non-public-domain source (license=${license || "unknown"})`);
}
if (!/^audio\//i.test(info.mime || "")) fail(`Commons metadata is not audio (${info.mime || "unknown"})`);
if (info.size < 12_000 || info.size > 2_000_000) fail(`Commons source size ${info.size} is outside the acceptance window`);

const audioResponse = await fetch(info.url, { headers });
if (!audioResponse.ok) fail(`Commons audio request returned HTTP ${audioResponse.status}`);
const audio = Buffer.from(await audioResponse.arrayBuffer());
if (audio.length !== info.size) fail(`downloaded ${audio.length} bytes; Commons metadata says ${info.size}`);
const metrics = inspectPcmWav(audio);

await mkdir(path.dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, audio);

console.log(`[pronunciation-audio] vendored ${FILE_TITLE}`);
console.log(`[pronunciation-audio] license=${license || usageTerms || "CC0/public domain"} sha1=${info.sha1 || "unknown"} bytes=${audio.length}`);
console.log(
  `[pronunciation-audio] ${metrics.duration.toFixed(3)}s ${metrics.sampleRate}Hz ${metrics.channels}ch ` +
    `peak=${metrics.peak.toFixed(3)} rms=${metrics.rmsDb.toFixed(1)}dBFS dc=${metrics.dc.toFixed(4)} ` +
    `clipped=${(metrics.clippedFraction * 100).toFixed(4)}%`,
);