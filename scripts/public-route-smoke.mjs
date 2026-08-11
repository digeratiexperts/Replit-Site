/**
 * Smoke-test indexable marketing routes against a running server.
 * Usage: BASE_URL=http://127.0.0.1:3300 node scripts/public-route-smoke.mjs
 */
const BASE = process.env.BASE_URL || "http://127.0.0.1:3300";

const routes = [
  "/",
  "/solutions",
  "/solutions/proactive-it-ecosystem",
  "/solutions/proactive-office-ecosystem",
  "/solutions/proactive-business-ecosystem",
  "/solutions/proactive-enterprise-ecosystem",
  "/solutions/co-managed-it",
  "/solutions/standalone-services",
  "/solutions/managed-it-support",
  "/proactive-ecosystem-pricing",
  "/pricing",
  "/book",
  "/industries/healthcare",
  "/industries/law-firms",
  "/resources/case-studies",
  "/resources/blog",
  "/about/client-bill-of-rights",
  "/trust/trust-center",
  "/contact",
  "/store",
  "/about/press",
];

const fails = [];

for (const path of routes) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: "manual" });
    if (res.status >= 400) {
      fails.push(`${path} → HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    if (/Something went wrong/i.test(html) && /ErrorBoundary|Try again/i.test(html)) {
      fails.push(`${path} → ErrorBoundary content`);
    }
    if (!/<h1[\s>]/i.test(html) && path !== "/") {
      // SPA shell may omit H1 until hydrate — warn only for empty shells without root
      if (!/<div id="root"/i.test(html)) fails.push(`${path} → missing root`);
    }
  } catch (err) {
    fails.push(`${path} → ${err.message}`);
  }
}

// Legacy junk must be Gone
{
  const res = await fetch(`${BASE}/?bbp_search=ethos`, { redirect: "manual" });
  if (res.status !== 410) fails.push(`/?bbp_search= → expected 410, got ${res.status}`);
}

if (fails.length) {
  console.error("Public route smoke FAILED:");
  for (const f of fails) console.error(" -", f);
  process.exit(1);
}
console.log(`Public route smoke OK (${routes.length} routes + bbp_search 410) against ${BASE}`);
