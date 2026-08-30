/** Staff Digital Warehouse — never link here from public marketing chrome. */
export const WAREHOUSE_BASE = "/internal/warehouse";

export function warehousePath(subpath = ""): string {
  if (!subpath || subpath === "/") return WAREHOUSE_BASE;
  const suffix = subpath.startsWith("/") ? subpath : `/${subpath}`;
  return `${WAREHOUSE_BASE}${suffix}`;
}

export function isWarehousePath(path: string): boolean {
  const pathname = path.split("?")[0] ?? path;
  return pathname === WAREHOUSE_BASE || pathname.startsWith(`${WAREHOUSE_BASE}/`);
}
