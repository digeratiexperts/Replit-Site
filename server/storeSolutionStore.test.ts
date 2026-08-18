import { describe, expect, it } from "vitest";
import { claimSolution, createSolution, upsertSolution } from "./storeSolutionStore";

describe("store solution store", () => {
  it("persists a guest solution and recalculates catalog totals", () => {
    const created = createSolution("session-a");
    const saved = upsertSolution({
      id: created.id,
      sessionId: "session-a",
      items: [{ productId: "prod-010", sku: "DE-SVC-CM-ENDPOINT-CORE-MO", quantity: 5 }],
    });
    expect(saved.id).toBe(created.id);
    expect(saved.snapshot.totals.monthly).toBe(195);
    expect(saved.snapshot.lines[0].name).toContain("Endpoint");
  });

  it("merges guest and authenticated solutions without dropping either side", () => {
    const guest = upsertSolution({
      sessionId: "guest-merge",
      items: [{ productId: "prod-010", sku: "DE-SVC-CM-ENDPOINT-CORE-MO", quantity: 4 }],
    });
    upsertSolution({
      sessionId: "user-session",
      userId: "user-1",
      items: [{ productId: "prod-011", sku: "DE-SVC-CM-ENDPOINT-EDR-MO", quantity: 2 }],
    });
    const claimed = claimSolution(guest.sessionId, "user-1");
    const ids = claimed.items.map((item) => item.productId).sort();
    expect(ids).toEqual(["prod-010", "prod-011"]);
    expect(claimed.items.find((item) => item.productId === "prod-010")?.quantity).toBe(4);
  });
});
