import { describe, expect, it } from "vitest";
import {
  cartIdentityKeys,
  shouldShowOngoingEquivalent,
  suggestionAlreadyInSolution,
} from "./solutionCartUx";

describe("shouldShowOngoingEquivalent", () => {
  it("hides when it only repeats Monthly", () => {
    expect(
      shouldShowOngoingEquivalent({
        monthly: 315,
        annual: 0,
        recurringMonthlyEquivalent: 315,
      }),
    ).toBe(false);
  });

  it("shows when annual converts into a different equivalent", () => {
    expect(
      shouldShowOngoingEquivalent({
        monthly: 315,
        annual: 1200,
        recurringMonthlyEquivalent: 415,
      }),
    ).toBe(true);
  });

  it("hides when there is no recurring total", () => {
    expect(
      shouldShowOngoingEquivalent({
        monthly: 0,
        annual: 0,
        recurringMonthlyEquivalent: 0,
      }),
    ).toBe(false);
  });
});

describe("suggestionAlreadyInSolution", () => {
  const inSolution = cartIdentityKeys([
    { id: "prod-bcdr", sku: "DE-SVC-MGD-BCDR-MO" },
  ]);

  it("treats an in-cart SKU as already in the solution", () => {
    expect(
      suggestionAlreadyInSolution(
        { id: "other-id", sku: "DE-SVC-MGD-BCDR-MO" },
        inSolution,
      ),
    ).toBe(true);
  });

  it("does not mark a missing coverage product as in-cart", () => {
    expect(
      suggestionAlreadyInSolution(
        { id: "prod-net", sku: "DE-SVC-NET-MANAGED-CORE-MO" },
        inSolution,
      ),
    ).toBe(false);
  });
});
