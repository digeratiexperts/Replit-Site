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
const hasHorizontalOverflow = (page) =>
  page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  page.setDefaultTimeout(20000);

  // Step 0 must be first and no contact gate is allowed on the Store index.
  await page.goto(`${base}/store`, { waitUntil: "networkidle" });
  const familyCount = await page.locator("[data-testid^='family-card-']").count();
  const emailInputs = await page.locator("main input[type='email']").count();
  const payNow = await page.getByText("Pay Now", { exact: false }).count();
  const profileFirst = await page.getByText("Step 0 · Profile", { exact: false }).count();
  const painStep = await page.getByText("Step 1 · Pain or need", { exact: false }).count();

  await page.locator("#profile-users").fill("25");
  await page.locator("#profile-computers").fill("32");
  await page.locator("#profile-mobile").fill("18");
  await page.locator("#profile-sites").fill("2");
  await page.getByRole("button", { name: "Hybrid", exact: true }).click();
  await page.getByRole("button", { name: "No", exact: true }).click();
  const profileSaved = await page.getByText("Profile saved", { exact: true }).count();

  await page.locator("[data-testid='family-card-identity_access']").getByRole("button", { name: "Add need" }).click();
  await page.locator("[data-testid='public-solution-cart']").click();
  const dockHiddenWhileDrawerOpen = await page.evaluate(() => document.documentElement.dataset.dockHidden === "true");
  const drawerHasProfile = await page.getByText(/25 users.*32 computers.*18 mobile.*2 sites/).count();
  await page.keyboard.press("Escape");
  const indexOverflow = await hasHorizontalOverflow(page);
  await page.screenshot({ path: `${outDir}/index-${viewport.name}.png`, fullPage: true });

  // Solution page must expose commercial relationship + customer-readable package.
  await page.locator("[data-testid='family-card-identity_access']").getByRole("link", { name: /Explore/i }).click();
  await page.waitForSelector("[data-testid='heading-family']");
  const heading = await page.locator("[data-testid='heading-family']").innerText();
  await page.locator("[data-testid='delivery-co_managed']").click();
  const offer = await page.locator("[data-testid='offer-panel']").innerText();
  const hasPreferredPricing = /preferred pricing/i.test(offer);
  const hasPreconfiguredPackage = /pre-configured package/i.test(offer);
  const hasWrongStandaloneCopy = await page.getByText("DE manages this", { exact: false }).count();
  const familyOverflow = await hasHorizontalOverflow(page);
  await page.screenshot({ path: `${outDir}/family-${viewport.name}.png`, fullPage: true });

  await page.locator("[data-testid='continue-building']").click();
  await page.waitForURL(/\/store\/solution/);
  // URL updates before the lazy-rendered workspace is necessarily committed.
  // Gate assertions on the actual page heading so 390/768/1440 validate the same rendered state.
  await page.getByRole("heading", { name: "Build one complete solution", exact: true }).waitFor();
  const workspaceSequence = await page.getByText(/Profile → pain or need → offer → package → delivery → contact/).count();
  const saveButton = await page.getByRole("button", { name: "Save progress", exact: true }).count();

  // Fulfillment is a first-class choice before final contact.
  await page.getByRole("button", { name: "Remote DE setup", exact: true }).click();
  await page.getByRole("button", { name: "Remote help as needed", exact: true }).click();
  await page.getByRole("button", { name: "Save progress", exact: true }).click();
  await page.getByText(/Saved at/).waitFor();
  const workspaceOverflow = await hasHorizontalOverflow(page);
  await page.screenshot({ path: `${outDir}/workspace-${viewport.name}.png`, fullPage: true });

  await page.getByRole("link", { name: "Continue to contact details", exact: true }).click();
  await page.waitForSelector("[data-testid='heading-solution-request']");
  const contactStep = await page.getByText("Step 4 · Contact", { exact: false }).count();
  const contactInputs = {
    company: await page.getByLabel("Company name").count(),
    name: await page.getByLabel("Name", { exact: true }).count(),
    email: await page.getByLabel("Email", { exact: true }).count(),
    phone: await page.getByLabel("Phone", { exact: true }).count(),
  };
  const notesField = await page.locator("textarea").count();
  const requestOverflow = await hasHorizontalOverflow(page);
  await page.screenshot({ path: `${outDir}/request-${viewport.name}.png`, fullPage: true });

  await page.goto(`${base}/store/solutions/not-a-real-family`, { waitUntil: "networkidle" });
  const notFound = await page.getByText("Page not found", { exact: false }).count();
  const notFoundOverflow = await hasHorizontalOverflow(page);

  results.push({
    viewport: viewport.name,
    familyCount,
    emailInputs,
    payNow,
    profileFirst,
    painStep,
    profileSaved,
    dockHiddenWhileDrawerOpen,
    drawerHasProfile,
    heading,
    offerHasCoManaged: /co-managed/i.test(offer),
    hasPreferredPricing,
    hasPreconfiguredPackage,
    hasWrongStandaloneCopy,
    workspaceSequence,
    saveButton,
    contactStep,
    contactInputs,
    notesField,
    notFound,
    overflow: {
      index: indexOverflow,
      family: familyOverflow,
      workspace: workspaceOverflow,
      request: requestOverflow,
      notFound: notFoundOverflow,
    },
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));

const failed = results.some((row) =>
  row.familyCount !== 13 ||
  row.emailInputs > 0 ||
  row.payNow > 0 ||
  row.profileFirst < 1 ||
  row.painStep < 1 ||
  row.profileSaved < 1 ||
  !row.dockHiddenWhileDrawerOpen ||
  row.drawerHasProfile < 1 ||
  !row.offerHasCoManaged ||
  !row.hasPreferredPricing ||
  !row.hasPreconfiguredPackage ||
  row.hasWrongStandaloneCopy > 0 ||
  row.workspaceSequence < 1 ||
  row.saveButton !== 1 ||
  row.contactStep < 1 ||
  Object.values(row.contactInputs).some((count) => count !== 1) ||
  row.notesField > 0 ||
  row.notFound < 1 ||
  Object.values(row.overflow).some(Boolean),
);

if (failed) process.exit(1);
