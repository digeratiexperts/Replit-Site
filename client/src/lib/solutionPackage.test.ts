import { describe, expect, it } from "vitest";
import { curatedSolutionFamilies } from "@/data/curatedSolutions";
import { buildSolutionPackage } from "./solutionPackage";

function family(id: (typeof curatedSolutionFamilies)[number]["id"]) {
  const match = curatedSolutionFamilies.find((entry) => entry.id === id);
  if (!match) throw new Error(`missing family ${id}`);
  return match;
}

describe("solution package policy", () => {
  const profile = {
    userCount: "25",
    workstationCount: "32",
    mobileDeviceCount: "18",
    siteCount: "2",
  };

  it("keeps standalone transactional and co-managed preferred", () => {
    const standalone = buildSolutionPackage(family("identity_access"), "standalone", profile);
    const coManaged = buildSolutionPackage(family("identity_access"), "co_managed", profile);

    expect(standalone.relationshipLabel).toBe("Standalone solution");
    expect(standalone.pricingPosition).toBe("standard");
    expect(standalone.relationshipSummary).toContain("without joining DE's managed-services operating model");

    expect(coManaged.relationshipLabel).toBe("Co-managed solution");
    expect(coManaged.pricingPosition).toBe("preferred");
    expect(coManaged.relationshipSummary).toContain("share defined responsibilities");
  });

  it("sizes line items from the one business profile", () => {
    const endpoint = buildSolutionPackage(family("endpoint_devices"), "standalone", profile);
    expect(endpoint.lineItems.some((line) => line.quantity.includes("32 computers"))).toBe(true);

    const identity = buildSolutionPackage(family("identity_access"), "standalone", profile);
    expect(identity.lineItems.some((line) => line.quantity === "25 users")).toBe(true);
  });

  it("does not force an assessment onto every solution", () => {
    expect(buildSolutionPackage(family("cybersecurity_operations"), "standalone", profile).assessmentPolicy).toBe("required");
    expect(buildSolutionPackage(family("identity_access"), "standalone", profile).assessmentPolicy).toBe("recommended");
    expect(buildSolutionPackage(family("email_collaboration"), "standalone", profile).assessmentPolicy).toBe("not_required");
  });

  it("models physical, conditional, and digital fulfillment separately", () => {
    expect(buildSolutionPackage(family("hardware_lifecycle"), "standalone", profile).shipmentMode).toBe("physical");
    expect(buildSolutionPackage(family("network_connectivity"), "standalone", profile).shipmentMode).toBe("conditional");
    expect(buildSolutionPackage(family("security_awareness"), "standalone", profile).shipmentMode).toBe("none");
  });
});
