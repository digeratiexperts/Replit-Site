import express from "express";
import cookieParser from "cookie-parser";
import { createServer, type Server } from "http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-warehouse-routes";

vi.mock("./portalAuthStore", async () => {
  const actual = await vi.importActual<typeof import("./portalAuthStore")>("./portalAuthStore");
  return { ...actual, getUser: vi.fn() };
});

vi.mock("./portalOrg", async () => {
  const actual = await vi.importActual<typeof import("./portalOrg")>("./portalOrg");
  return { ...actual, findUserById: vi.fn() };
});

function sign(claims: Record<string, unknown>) {
  return jwt.sign(claims, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

describe("warehouse HTTP gates", () => {
  let server: Server;
  let baseUrl = "";
  let getUser: ReturnType<typeof vi.fn>;

  beforeAll(async () => {
    const { registerWarehouseGates } = await import("./warehouseRoutes");
    const { getUser: mockedGetUser } = await import("./portalAuthStore");
    getUser = mockedGetUser as ReturnType<typeof vi.fn>;

    const app = express();
    app.use(cookieParser());
    registerWarehouseGates(app);
    app.get("/api/store/solutions/current", (_req, res) => res.json({ leaked: true }));
    app.get("/internal/warehouse", (_req, res) => res.status(200).send("WAREHOUSE_OK"));
    app.get("/internal/warehouse/product/:sku", (_req, res) => res.status(200).send("WAREHOUSE_PDP"));

    server = createServer(app);
    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", resolve);
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("No test port");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  beforeEach(() => {
    getUser.mockReset();
  });

  it("301s public /store to Door 2 without a warehouse Location", async () => {
    const response = await fetch(`${baseUrl}/store`, { redirect: "manual" });
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("/solutions/business-needs");
    expect(response.headers.get("location") || "").not.toContain("/internal");
  });

  it("returns the same generic 404 for unknown and staff-only SKUs", async () => {
    const unknown = await fetch(`${baseUrl}/store/product/not-a-real-sku`, { redirect: "manual" });
    const staffSku = await fetch(`${baseUrl}/store/product/DE-SVC-CM-ENDPOINT-EDR-MO`, {
      redirect: "manual",
    });
    expect(unknown.status).toBe(404);
    expect(staffSku.status).toBe(404);
    expect(unknown.headers.get("location")).toBeNull();
    expect(staffSku.headers.get("location")).toBeNull();
    const unknownBody = await unknown.text();
    const staffBody = await staffSku.text();
    expect(unknownBody).toBe(staffBody);
    expect(unknownBody.toLowerCase()).not.toContain("sku");
    expect(unknownBody.toLowerCase()).not.toContain("warehouse");
    expect(unknownBody.toLowerCase()).not.toContain("ninjaone");
  });

  it("denies warehouse HTML and catalog APIs without revealing existence", async () => {
    const html = await fetch(`${baseUrl}/internal/warehouse`, { redirect: "manual" });
    expect(html.status).toBe(404);
    expect(html.headers.get("location")).toBeNull();
    expect(await html.text()).not.toContain("WAREHOUSE_OK");

    const api = await fetch(`${baseUrl}/api/store/solutions/current?sessionId=abc`);
    expect(api.status).toBe(404);
    expect(await api.json()).toEqual({ error: "Not found" });
  });

  it("lets a live admin open the warehouse and catalog APIs", async () => {
    getUser.mockReturnValue({
      id: "a1",
      email: "admin@digeratiexperts.com",
      role: "admin",
      isActive: true,
    });
    const token = sign({ userId: "a1", email: "admin@digeratiexperts.com" });
    const headers = { cookie: `portalAuth=${token}` };

    const html = await fetch(`${baseUrl}/internal/warehouse`, { headers, redirect: "manual" });
    expect(html.status).toBe(200);
    expect(await html.text()).toBe("WAREHOUSE_OK");

    const destage = await fetch(`${baseUrl}/store/co-managed`, { headers, redirect: "manual" });
    expect(destage.status).toBe(302);
    expect(destage.headers.get("location")).toBe("/internal/warehouse/co-managed");

    const api = await fetch(`${baseUrl}/api/store/solutions/current?sessionId=abc`, { headers });
    expect(api.status).toBe(200);
    expect(await api.json()).toEqual({ leaked: true });
  });
});
