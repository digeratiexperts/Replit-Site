import { describe, expect, it } from "vitest";
import { curatedSolutionFamilies } from "./curatedSolutions";
import { defaultSizingAnswers, SOLUTION_SIZING_FIELDS, sizingFieldsForFamily } from "./solutionSizingFields";

const privateStackTerms = [
  "coro",
  "guardz",
  "ninjaone",
  "blackpoint",
  "mimecast",
  "jumpcloud",
  "hudu",
  "pax8",
  "sherweb",
  "ingram",
];

describe("solution sizing fields", () => {
  it("defines at least one field for every curated family, with no numeric price anywhere", () => {
    for (const family of curatedSolutionFamilies) {
      const fields = sizingFieldsForFamily(family.id);
      expect(fields.length).toBeGreaterThanOrEqual(2);
      for (const field of fields) {
        expect(field.key.length).toBeGreaterThan(0);
        expect(field.label.length).toBeGreaterThan(0);
        if (field.type === "select") {
          expect(field.options?.length ?? 0).toBeGreaterThanOrEqual(2);
        } else {
          expect(typeof field.min).toBe("number");
        }
      }
    }
    const raw = JSON.stringify(SOLUTION_SIZING_FIELDS).toLowerCase();
    expect(raw).not.toMatch(/\$|\bprice\b|\bcost\b|\bper[- ]?seat\b|\/\s*month\b/);
    for (const term of privateStackTerms) {
      expect(raw).not.toContain(term);
    }
  });

  it("keeps field keys unique within a family", () => {
    for (const family of curatedSolutionFamilies) {
      const keys = sizingFieldsForFamily(family.id).map((field) => field.key);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it("builds a default answer for every field", () => {
    for (const family of curatedSolutionFamilies) {
      const fields = sizingFieldsForFamily(family.id);
      const defaults = defaultSizingAnswers(family.id);
      for (const field of fields) {
        expect(defaults[field.key]).toBeTruthy();
      }
    }
  });
});
