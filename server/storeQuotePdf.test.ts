import { describe, expect, it } from "vitest";
import { canonicalizeQuoteItems } from "./storeQuoteCommerce";
import { buildQuotePdf } from "./storeQuotePdf";

describe("store quote PDF", () => {
  it("writes a PDF that restates the quote number and catalog totals", () => {
    const items = canonicalizeQuoteItems([
      {
        productId: "prod-010",
        sku: "DE-SVC-CM-ENDPOINT-CORE-MO",
        quantity: 2,
      },
    ]);
    const pdf = buildQuotePdf({
      quoteNumber: "QR-20260818-TEST",
      contactName: "Jordan Buyer",
      contactEmail: "jordan@example.com",
      companyName: "Example Medical",
      createdAt: new Date("2026-08-18T12:00:00.000Z"),
      requestedItems: items,
      message: "Need endpoint coverage for two clinics.",
    });

    const text = pdf.toString("latin1");
    expect(text.startsWith("%PDF-1.4")).toBe(true);
    expect(text).toContain("QR-20260818-TEST");
    expect(text).toContain("Jordan Buyer");
    expect(text).toContain("78.00");
    expect(text).toContain("%%EOF");
  });
});
