import { describe, expect, it } from "vitest";
import { splitVisitorName } from "./zohoDesk";

describe("splitVisitorName", () => {
  it("uses the email local-part when no name is given", () => {
    expect(splitVisitorName(undefined, "jane@company.com")).toEqual({
      lastName: "jane",
    });
  });

  it("treats a single name as lastName for Zoho contact create", () => {
    expect(splitVisitorName("Jordan", "jordan@company.com")).toEqual({
      lastName: "Jordan",
    });
  });

  it("splits a full name into first and last", () => {
    expect(splitVisitorName("Jordan Lee Petro", "jordan@company.com")).toEqual({
      firstName: "Jordan Lee",
      lastName: "Petro",
    });
  });
});
