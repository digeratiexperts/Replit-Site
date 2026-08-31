import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE_TITLE = "File:LL-Q1860 (eng)-Flame, not lame-digerati.wav";
const OUTPUT = path.resolve("client/public/audio/digerati-pronunciation.mp3");
const API = new URL("https://commons.wikimedia.org/w/api.php");
API.searchParams.set("action", "query");
API.searchParams.set("format", "json");
API.searchParams.set("formatversion", "2");
API.searchParams.set("prop", "videoinfo");
API.searchParams.set("viprop", "url|mime|size|sha1|extmetadata|derivatives");
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

function looksLikeMp3(buffer) {
  if (buffer.length < 4) return false;
  if (buffer.toString("ascii", 0, 3) === "ID3") return true;
  return buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0;
}

const metadataResponse = await fetch(API, { headers });
if (!metadataResponse.ok) fail(`Commons metadata request returned HTTP ${metadataResponse.status}`);
const metadata = await metadataResponse.json();
const page = metadata?.query?.pages?.[0];
const info = page?.videoinfo?.[0];
if (!page || page.missing || !info?.url) fail(`Commons file not found: ${FILE_TITLE}`);

const license = decodeEntities(info.extmetadata?.LicenseShortName?.value);
const usageTerms = decodeEntities(info.extmetadata?.UsageTerms?.value);
if (!/CC0|public domain/i.test(`${license} ${usageTerms}`)) {
  fail(`refusing non-CC0/non-public-domain source (license=${license || "unknown"})`);
}
if (!/^audio\//i.test(info.mime || "")) fail(`Commons metadata is not audio (${info.mime || "unknown"})`);
if (info.size < 12_000 || info.size > 2_000_000) fail(`Commons source size ${info.size} is outside the acceptance window`);

const sourceResponse = await fetch(info.url, { headers });
if (!sourceResponse.ok) fail(`Commons WAV request returned HTTP ${sourceResponse.status}`);
const sourceAudio = Buffer.from(await sourceResponse.arrayBuffer());
if (sourceAudio.length !== info.size) fail(`downloaded ${sourceAudio.length} WAV bytes; Commons metadata says ${info.size}`);
const metrics = inspectPcmWav(sourceAudio);

const derivatives = Array.isArray(info.derivatives) ? info.derivatives : [];
const mp3Derivative = derivatives.find((candidate) => {
  const haystack = `${candidate.type || ""} ${candidate.shorttitle || ""} ${candidate.transcodekey || ""} ${candidate.src || ""}`;
  return /audio\/mpeg|mp3/i.test(haystack);
});
const mp3Url = mp3Derivative?.src || mp3Derivative?.url;
if (!mp3Url) {
  const available = derivatives.map((candidate) => ({
    type: candidate.type,
    shorttitle: candidate.shorttitle,
    transcodekey: candidate.transcodekey,
  }));
  fail(`Commons did not expose an MP3 derivative; available=${JSON.stringify(available)}`);
}

const mp3Response = await fetch(mp3Url, { headers });
if (!mp3Response.ok) fail(`Commons MP3 request returned HTTP ${mp3Response.status}`);
const mp3 = Buffer.from(await mp3Response.arrayBuffer());
if (mp3.length < 12_000 || mp3.length > 2_000_000) fail(`MP3 size ${mp3.length} is outside the acceptance window`);
if (!looksLikeMp3(mp3)) fail("Commons derivative does not look like an MP3 stream");

await mkdir(path.dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, mp3);

console.log(`[pronunciation-audio] vendored ${FILE_TITLE}`);
console.log(`[pronunciation-audio] license=${license || usageTerms || "CC0/public domain"} source-sha1=${info.sha1 || "unknown"} wav-bytes=${sourceAudio.length} mp3-bytes=${mp3.length}`);
console.log(
  `[pronunciation-audio] ${metrics.duration.toFixed(3)}s ${metrics.sampleRate}Hz ${metrics.channels}ch ` +
    `peak=${metrics.peak.toFixed(3)} rms=${metrics.rmsDb.toFixed(1)}dBFS dc=${metrics.dc.toFixed(4)} ` +
    `clipped=${(metrics.clippedFraction * 100).toFixed(4)}%`,
);