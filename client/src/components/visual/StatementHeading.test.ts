import { describe, expect, it } from "vitest";
import { shouldAppendStatementColon } from "./StatementHeading";

describe("statement colon", () => {
  it("appends after a statement without terminal punctuation", () => {
    expect(shouldAppendStatementColon("Industries We Serve")).toBe(true);
    expect(shouldAppendStatementColon("Resources")).toBe(true);
  });

  it("does not double punctuation", () => {
    expect(shouldAppendStatementColon("Ready to Secure Your Business?")).toBe(false);
    expect(shouldAppendStatementColon("Get Your Cyber Risk Assessment.")).toBe(false);
    expect(shouldAppendStatementColon("Coverage Explorer:")).toBe(false);
  });
});
