import { describe, expect, it } from "vitest";
import {
  emptyDraft,
  parseDraft,
  recommendedCtaLabel,
  recommendedIntent,
  removeNeed,
  resolvedNeedDelivery,
  toRequestNeeds,
  toggleNeed,
  upsertNeed,
} from "./solutionDraft";

describe("SolutionDraft", () => {
  it("does not assign a delivery model when a need is toggled on", () => {
    const draft = toggleNeed(emptyDraft(), "identity_access");
    expect(draft.needs).toEqual([{ familyId: "identity_access" }]);
    expect(draft.deliveryPreference).toBe("");
    expect(resolvedNeedDelivery(draft.needs[0], draft.deliveryPreference)).toBe("");
  });

  it("composes multiple families into one request payload", () => {
    const withNeeds = ["identity_access", "backup_continuity", "cybersecurity_operations", "email_collaboration", "network_connectivity"].reduce(
      (draft, familyId) => toggleNeed(draft, familyId as "identity_access"),
      emptyDraft(),
    );
    const ready = {
      ...withNeeds,
      deliveryPreference: "unsure" as const,
    };
    const payload = toRequestNeeds(ready);
    expect(payload).toHaveLength(5);
    expect(payload.map((need) => need.familyId)).toEqual([
      "identity_access",
      "backup_continuity",
      "cybersecurity_operations",
      "email_collaboration",
      "network_connectivity",
    ]);
    expect(payload.every((need) => need.deliveryModel === "unsure")).toBe(true);
    expect(payload.every((need) => need.offerId === null)).toBe(true);
    expect(recommendedIntent(ready)).toBe("assessment");
    expect(recommendedCtaLabel("assessment")).toBe("Start a Cyber Risk Assessment");
  });

  it("keeps a chosen delivery on a need without forcing the rest", () => {
    const draft = upsertNeed(emptyDraft(), { familyId: "backup_continuity", delivery: "co_managed" });
    expect(draft.needs[0]?.delivery).toBe("co_managed");
    expect(toggleNeed(draft, "identity_access").needs).toEqual([
      { familyId: "backup_continuity", delivery: "co_managed" },
      { familyId: "identity_access" },
    ]);
    expect(removeNeed(draft, "backup_continuity").needs).toEqual([]);
  });

  it("ignores unknown families and cart-shaped legacy noise", () => {
    const parsed = parseDraft({
      version: 1,
      needs: [{ familyId: "not_a_family" }, { familyId: "identity_access", delivery: "standalone" }],
      deliveryPreference: "standalone",
    });
    expect(parsed.needs).toEqual([{ familyId: "identity_access", delivery: "standalone" }]);
  });
});
