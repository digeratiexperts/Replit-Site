import { existsSync, readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";

const DIST = path.resolve("dist/public");
const INDEX = path.join(DIST, "index.html");

const budgets = {
  entryRawBytes: 1_120_000,
  entryGzipBytes: 330_000,
  cssRawBytes: 275_000,
};

function fail(message) {
  console.error(`BUNDLE BUDGET FAILED: ${message}`);
  process.exitCode = 1;
}

function kb(bytes) {
  return `${(bytes / 1000).toFixed(2)} kB`;
}

if (!existsSync(INDEX)) {
  throw new Error("dist/public/index.html is missing. Run npm run build before the bundle budget check.");
}

const html = readFileSync(INDEX, "utf8");
const moduleScripts = [...html.matchAll(/<script\b[^>]*type=["']module["'][^>]*src=["']([^"']+\.js)["'][^>]*>/gi)];
const fallbackScripts = [...html.matchAll(/<script\b[^>]*src=["']([^"']+\.js)["'][^>]*>/gi)];
const scriptRef = (moduleScripts[0] || fallbackScripts[0])?.[1];

if (!scriptRef) {
  throw new Error("Could not identify the built browser entry script from dist/public/index.html");
}

const entryPath = path.join(DIST, scriptRef.replace(/^\//, ""));
if (!existsSync(entryPath)) {
  throw new Error(`Browser entry referenced by index.html does not exist: ${entryPath}`);
}

const entryRaw = statSync(entryPath).size;
const entryGzip = gzipSync(readFileSync(entryPath), { level: 9 }).byteLength;

console.log(`Browser entry: ${path.relative(DIST, entryPath)}`);
console.log(`  raw:  ${kb(entryRaw)} / ${kb(budgets.entryRawBytes)}`);
console.log(`  gzip: ${kb(entryGzip)} / ${kb(budgets.entryGzipBytes)}`);

if (entryRaw > budgets.entryRawBytes) {
  fail(`browser entry raw size ${entryRaw} exceeds ${budgets.entryRawBytes} bytes`);
}
if (entryGzip > budgets.entryGzipBytes) {
  fail(`browser entry gzip size ${entryGzip} exceeds ${budgets.entryGzipBytes} bytes`);
}

const stylesheetRefs = [...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>/gi)].map((match) => match[1]);
let largestCss = null;
for (const ref of stylesheetRefs) {
  const filePath = path.join(DIST, ref.replace(/^\//, ""));
  if (!existsSync(filePath)) continue;
  const bytes = statSync(filePath).size;
  if (!largestCss || bytes > largestCss.bytes) largestCss = { filePath, bytes };
}

if (largestCss) {
  console.log(`Largest entry stylesheet: ${path.relative(DIST, largestCss.filePath)}`);
  console.log(`  raw:  ${kb(largestCss.bytes)} / ${kb(budgets.cssRawBytes)}`);
  if (largestCss.bytes > budgets.cssRawBytes) {
    fail(`entry stylesheet raw size ${largestCss.bytes} exceeds ${budgets.cssRawBytes} bytes`);
  }
}

if (!process.exitCode) {
  console.log("Bundle budget passed.");
}
