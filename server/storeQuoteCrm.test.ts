import { describe, expect, it } from "vitest";
import { buildCrmQuoteDescription } from "./storeQuoteCrm";
import { canonicalizeQuoteItems } from "./storeQuoteCommerce";

describe("store quote CRM payload", () => {
  it("includes the quote number and line SKUs without inventing contract value", () => {
    const requestedItems = canonicalizeQuoteItems([
      {
        productId: "prod-010",
        sku: "DE-SVC-CM-ENDPOINT-CORE-MO",
        quantity: 2,
      },
    ]);
    const description = buildCrmQuoteDescription({
      quoteNumber: "QR-20260818-TEST",
      contactName: "Jordan Buyer",
      contactEmail: "jordan@example.com",
      companyName: "Example Medical",
      requestedItems,
      message: "Need coverage for two clinics.",
    });
    expect(description).toContain("QR-20260818-TEST");
    expect(description).toContain("DE-SVC-CM-ENDPOINT-CORE-MO");
    expect(description).toContain("Example Medical");
    expect(description).not.toMatch(/password|token|secret/i);
  });
});
