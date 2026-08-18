import { describe, expect, it } from "vitest";
import { canonicalizeQuoteItems } from "./storeQuoteCommerce";
import { getQuoteRequest, insertQuoteRequest } from "./storeQuoteStore";

describe("store quote store", () => {
  it("keeps a quote available without Postgres", async () => {
    const requestedItems = canonicalizeQuoteItems([
      {
        productId: "prod-010",
        sku: "DE-SVC-CM-ENDPOINT-CORE-MO",
        quantity: 1,
      },
    ]);
    const created = await insertQuoteRequest({
      contactName: "Jordan Buyer",
      contactEmail: "jordan@example.com",
      requestedItems,
    });
    const byId = await getQuoteRequest(created.id);
    const byNumber = await getQuoteRequest(created.quoteNumber);
    expect(byId?.quoteNumber).toBe(created.quoteNumber);
    expect(byNumber?.id).toBe(created.id);
    expect(byId?.requestedItems[0].unitPrice).toBe(39);
  });
});
