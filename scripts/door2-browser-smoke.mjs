import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.DOOR2_BASE || "http://127.0.0.1:3311";
const outDir = "tmp/door2-qa";
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  page.setDefaultTimeout(20000);

  await page.goto(`${base}/solutions/business-needs`, { waitUntil: "networkidle" });
  const familyCount = await page.locator("[data-testid^='family-card-']").count();
  const emailInputs = await page.locator("main input[type='email']").count();
  const payNow = await page.getByText("Pay Now", { exact: false }).count();
  await page.screenshot({ path: `${outDir}/index-${viewport.name}.png`, fullPage: true });

  await page.locator("[data-testid='family-card-identity_access']").click();
  await page.waitForSelector("[data-testid='heading-family']");
  const heading = await page.locator("[data-testid='heading-family']").innerText();
  await page.locator("[data-testid='delivery-co_managed']").click();
  const offer = await page.locator("[data-testid='offer-panel']").innerText();
  await page.screenshot({ path: `${outDir}/family-${viewport.name}.png`, fullPage: true });

  await page.getByRole("link", { name: "Request this solution" }).click();
  await page.waitForSelector("[data-testid='heading-solution-request']");
  await page.screenshot({ path: `${outDir}/request-${viewport.name}.png`, fullPage: true });

  await page.goto(`${base}/solutions/business-needs/not-a-real-family`, { waitUntil: "networkidle" });
  const notFound = await page.getByText("Page not found", { exact: false }).count();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);

  results.push({
    viewport: viewport.name,
    familyCount,
    emailInputs,
    payNow,
    heading,
    offerHasCoManaged: /co-managed/i.test(offer),
    notFound,
    overflow,
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
if (results.some((row) => row.familyCount !== 13 || row.emailInputs > 0 || row.payNow > 0 || row.notFound < 1)) {
  process.exit(1);
}
