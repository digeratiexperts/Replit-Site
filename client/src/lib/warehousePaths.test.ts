import { describe, expect, it } from "vitest";
import { WAREHOUSE_BASE, isWarehousePath, warehousePath } from "./warehousePaths";

describe("warehouse paths", () => {
  it("builds staff-only routes under /internal/warehouse", () => {
    expect(WAREHOUSE_BASE).toBe("/internal/warehouse");
    expect(warehousePath()).toBe("/internal/warehouse");
    expect(warehousePath("/product/DE-SVC-MGD-IT-MO")).toBe(
      "/internal/warehouse/product/DE-SVC-MGD-IT-MO",
    );
  });

  it("does not treat public store or Door 2 as warehouse", () => {
    expect(isWarehousePath("/internal/warehouse/managed")).toBe(true);
    expect(isWarehousePath("/store")).toBe(false);
    expect(isWarehousePath("/solutions/business-needs")).toBe(false);
  });
});
