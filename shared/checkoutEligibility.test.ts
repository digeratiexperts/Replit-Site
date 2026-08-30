import { describe, expect, it } from "vitest";
import {
  DOOR_1_ELIGIBILITY,
  DOOR_2_ELIGIBILITY,
  MARKETPLACE_ELIGIBILITY,
  WAREHOUSE_STAFF_ELIGIBILITY,
  isPayNowAllowed,
} from "./checkoutEligibility";

describe("checkout eligibility", () => {
  it("keeps Pay Now off public doors and the fail-safe marketplace", () => {
    expect(isPayNowAllowed(DOOR_1_ELIGIBILITY)).toBe(false);
    expect(isPayNowAllowed(DOOR_2_ELIGIBILITY)).toBe(false);
    expect(isPayNowAllowed(MARKETPLACE_ELIGIBILITY)).toBe(false);
    expect(DOOR_1_ELIGIBILITY).toBe("assessment_first");
    expect(DOOR_2_ELIGIBILITY).toBe("request_quote");
    expect(MARKETPLACE_ELIGIBILITY).toBe("request_approval");
  });

  it("reserves pay_now for staff warehouse only", () => {
    expect(isPayNowAllowed(WAREHOUSE_STAFF_ELIGIBILITY)).toBe(true);
  });
});
