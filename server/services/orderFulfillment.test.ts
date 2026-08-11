import { describe, expect, it } from "vitest";
import {
  isFulfillmentActiveStatus,
  isFulfillmentTerminalStatus,
  isStaleProvisioning,
} from "./orderFulfillment";

describe("paid-order fulfillment recovery helpers", () => {
  it("treats active claims separately from terminal fulfillment states", () => {
    expect(isFulfillmentActiveStatus("provisioning")).toBe(true);
    expect(isFulfillmentActiveStatus("processing")).toBe(true);
    expect(isFulfillmentActiveStatus("paid")).toBe(false);
    expect(isFulfillmentActiveStatus("completed")).toBe(false);

    expect(isFulfillmentTerminalStatus("completed")).toBe(true);
    expect(isFulfillmentTerminalStatus("cancelled")).toBe(true);
    expect(isFulfillmentTerminalStatus("refunded")).toBe(true);
    expect(isFulfillmentTerminalStatus("provisioning")).toBe(false);
    expect(isFulfillmentTerminalStatus("paid")).toBe(false);
  });

  it("only considers provisioning claims stale after the recovery timeout", () => {
    const now = new Date("2026-08-10T18:00:00-07:00").getTime();

    expect(
      isStaleProvisioning(
        "provisioning",
        new Date(now - 31 * 60 * 1000),
        now,
      ),
    ).toBe(true);

    expect(
      isStaleProvisioning(
        "provisioning",
        new Date(now - 29 * 60 * 1000),
        now,
      ),
    ).toBe(false);

    expect(
      isStaleProvisioning(
        "paid",
        new Date(now - 60 * 60 * 1000),
        now,
      ),
    ).toBe(false);
  });

  it("does not classify missing or malformed timestamps as stale", () => {
    expect(isStaleProvisioning("provisioning", null)).toBe(false);
    expect(isStaleProvisioning("provisioning", "not-a-date")).toBe(false);
  });
});
