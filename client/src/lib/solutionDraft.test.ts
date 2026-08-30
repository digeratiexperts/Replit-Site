import { describe, expect, it } from "vitest";
import {
  emptyDraft,
  isProfileComplete,
  parseDraft,
  patchEnvironment,
  patchFulfillment,
  profileSummary,
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

  it("composes multiple families into one package request and routes required assessment work", () => {
    const withNeeds = ["identity_access", "backup_continuity", "cybersecurity_operations", "email_collaboration", "network_connectivity"].reduce(
      (draft, familyId) => toggleNeed(draft, familyId as "identity_access"),
      emptyDraft(),
    );
    const ready = { ...withNeeds, deliveryPreference: "standalone" as const };
    const payload = toRequestNeeds(ready);
    expect(payload).toHaveLength(5);
    expect(payload.map((need) => need.familyId)).toEqual([
      "identity_access",
      "backup_continuity",
      "cybersecurity_operations",
      "email_collaboration",
      "network_connectivity",
    ]);
    expect(payload.every((need) => need.deliveryModel === "standalone")).toBe(true);
    expect(payload.every((need) => typeof need.offerId === "string")).toBe(true);
    expect(recommendedIntent(ready)).toBe("assessment");
    expect(recommendedCtaLabel("assessment")).toBe("Start required assessment");
  });

  it("uses quote-first continuation when no selected package has a required assessment", () => {
    const draft = {
      ...toggleNeed(emptyDraft(), "email_collaboration"),
      deliveryPreference: "standalone" as const,
    };
    expect(recommendedIntent(draft)).toBe("quote");
    expect(recommendedCtaLabel("quote")).toBe("Continue to contact details");
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

  it("migrates a version-one draft into the profile-first v2 schema", () => {
    const parsed = parseDraft({
      version: 1,
      needs: [{ familyId: "not_a_family" }, { familyId: "identity_access", delivery: "standalone" }],
      deliveryPreference: "standalone",
      environment: { userCount: "12", siteCount: "2", deviceOwnership: "hybrid", internalIt: "no" },
    });
    expect(parsed.version).toBe(2);
    expect(parsed.needs).toEqual([{ familyId: "identity_access", delivery: "standalone" }]);
    expect(parsed.environment.userCount).toBe("12");
    expect(parsed.environment.workstationCount).toBe("");
    expect(parsed.fulfillment).toEqual({ installation: "", remoteSupport: "" });
  });

  it("treats sizing profile and fulfillment as first-class saved state", () => {
    let draft = emptyDraft();
    draft = patchEnvironment(draft, {
      userCount: "25",
      workstationCount: "32",
      mobileDeviceCount: "18",
      siteCount: "2",
      deviceOwnership: "hybrid",
      internalIt: "no",
    });
    draft = patchFulfillment(draft, { installation: "remote_assist", remoteSupport: "as_needed" });
    expect(isProfileComplete(draft.environment)).toBe(true);
    expect(profileSummary(draft.environment)).toBe("25 users · 32 computers · 18 mobile · 2 sites");
    expect(draft.fulfillment).toEqual({ installation: "remote_assist", remoteSupport: "as_needed" });
  });
});
