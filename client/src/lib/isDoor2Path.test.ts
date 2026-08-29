import { describe, expect, it } from "vitest";
import { isDoor2Path } from "./isDoor2Path";

describe("isDoor2Path", () => {
  it("matches Door 2 public routes only", () => {
    expect(isDoor2Path("/solutions/business-needs")).toBe(true);
    expect(isDoor2Path("/solutions/business-needs/identity-access")).toBe(true);
    expect(isDoor2Path("/solutions/request?family=identity-access")).toBe(true);
    expect(isDoor2Path("/solutions")).toBe(false);
    expect(isDoor2Path("/solutions/proactive-ecosystem")).toBe(false);
    expect(isDoor2Path("/store")).toBe(false);
    expect(isDoor2Path("/store/co-managed")).toBe(false);
  });
});
