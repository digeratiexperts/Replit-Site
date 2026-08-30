import express from "express";
import { createServer, type Server } from "http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { registerPortalMarketplaceRoutes } from "./portalMarketplaceRoutes";
import { MARKETPLACE_ELIGIBILITY } from "@shared/checkoutEligibility";

describe("portal marketplace fail-safe", () => {
  let server: Server;
  let baseUrl = "";

  beforeAll(async () => {
    const app = express();
    const auth = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
      (req as express.Request & { user?: { clientId: string } }).user = {
        clientId: "client-1",
      };
      next();
    };
    registerPortalMarketplaceRoutes(app, auth);
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

  it("returns an empty Request Approval catalog without warehouse fields", async () => {
    const response = await fetch(`${baseUrl}/api/portal/marketplace`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.eligibility).toBe(MARKETPLACE_ELIGIBILITY);
    expect(body.items).toEqual([]);
    expect(body.status).toBe("unavailable");
    const raw = JSON.stringify(body).toLowerCase();
    expect(raw).not.toContain("sku");
    expect(raw).not.toContain("margin");
    expect(raw).not.toContain("ninjaone");
    expect(raw).not.toContain("pay_now");
  });
});
