import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3300";
const OUT = "tmp/homepage-visual-qa";
const widths = [390, 768, 1440];
const results = [];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ headless: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  for (const width of widths) {
    const height = width === 390 ? 844 : width === 768 ? 1024 : 900;
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(400);

    const h1 = page.locator("h1").first();
    await h1.waitFor({ state: "visible", timeout: 10_000 });
    const headline = (await h1.textContent())?.replace(/\s+/g, " ").trim() || "";
    assert(
      headline.includes("Cybersecurity-First IT That Powers") && headline.includes("Your Business"),
      `Unexpected homepage H1 at ${width}px: ${headline}`,
    );

    await page.getByTestId("button-hero-schedule").waitFor({ state: "visible" });
    await page.getByTestId("button-hero-solutions").waitFor({ state: "visible" });
    await page.getByText("Trusted technology partner for Arizona businesses", { exact: true }).waitFor({ state: "visible" });

    const initialOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(initialOverflow <= 2, `Homepage horizontal overflow at ${width}px: ${initialOverflow}px`);

    await page.screenshot({ path: `${OUT}/homepage-${width}.png`, fullPage: true });

    const askButton = page.getByTestId("button-open-asap-widget");
    await askButton.waitFor({ state: "visible", timeout: 10_000 });
    await askButton.click();

    const chooser = page.getByTestId("ask-de-quick-menu");
    await chooser.waitFor({ state: "visible", timeout: 5_000 });
    for (const id of [
      "ask-de-choice-support",
      "ask-de-choice-help",
      "ask-de-choice-tools",
      "ask-de-choice-feedback",
    ]) {
      await page.getByTestId(id).waitFor({ state: "visible", timeout: 5_000 });
    }

    const chooserBox = await chooser.boundingBox();
    assert(chooserBox, `Ask DE chooser missing box at ${width}px`);
    assert(chooserBox.x >= -1, `Ask DE chooser clips left at ${width}px`);
    assert(chooserBox.x + chooserBox.width <= width + 1, `Ask DE chooser clips right at ${width}px`);

    const chooserOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(chooserOverflow <= 2, `Ask DE chooser caused horizontal overflow at ${width}px: ${chooserOverflow}px`);
    await page.screenshot({ path: `${OUT}/ask-de-chooser-${width}.png`, fullPage: false });

    await page.getByTestId("ask-de-choice-support").click();
    const desk = page.locator(".de-desk-shell").first();
    await desk.waitFor({ state: "visible", timeout: 7_500 });
    await page.screenshot({ path: `${OUT}/support-desk-${width}.png`, fullPage: false });

    const deskOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(deskOverflow <= 2, `Support Desk caused horizontal overflow at ${width}px: ${deskOverflow}px`);
    assert(pageErrors.length === 0, `Browser page errors at ${width}px: ${pageErrors.join(" | ")}`);

    results.push({
      width,
      height,
      headline,
      initialOverflow,
      chooserOverflow,
      deskOverflow,
      pageErrors,
      status: "pass",
    });

    await context.close();
  }
} finally {
  await browser.close();
}

await writeFile(`${OUT}/report.json`, JSON.stringify({ base: BASE, results }, null, 2));
console.log(`Homepage reference visual QA passed at ${widths.join(" / ")}px`);
