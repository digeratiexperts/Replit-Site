import express from "express";
import cookieParser from "cookie-parser";
import { createServer, type Server } from "http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { registerPublicSolutionRoutes } from "./publicSolutionRoutes";
import { resetPublicSolutionRequestsForTests } from "./publicSolutionRequestStore";

vi.mock("./publicSolutionRequestCrm", () => ({
  syncPublicSolutionRequestToCrm: vi.fn(async () => "pending"),
}));

const prohibited = [
  "coro",
  "ninjaone",
  "blackpoint",
  "hudu",
  "pax8",
  "sku",
  "margin",
  "distributor",
];

describe("public solution Door 2 API", () => {
  let server: Server;
  let baseUrl = "";

  beforeAll(async () => {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    registerPublicSolutionRoutes(app);
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
    resetPublicSolutionRequestsForTests();
  });

  it("returns 13 public families without warehouse fields", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/families`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.families).toHaveLength(13);
    for (const family of body.families) {
      expect(family.offers.map((offer: { deliveryModel: string }) => offer.deliveryModel).sort()).toEqual([
        "co_managed",
        "standalone",
      ]);
    }
    const raw = JSON.stringify(body).toLowerCase();
    for (const term of prohibited) {
      expect(raw).not.toContain(term);
    }
  });

  it("returns a generic 404 for an unknown family", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/families/not-a-family`);
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body).toEqual({ error: "Not found" });
    expect(JSON.stringify(body).toLowerCase()).not.toContain("sku");
  });

  it("lets a guest submit several families as one Solution Request", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedNeeds: [
          { familyId: "identity_access", deliveryModel: "unsure" },
          { familyId: "backup_continuity", deliveryModel: "unsure" },
          { familyId: "email_collaboration", deliveryModel: "co_managed" },
        ],
        deliveryPreference: "unsure",
        intent: "assessment",
        contactName: "Jordan Buyer",
        contactEmail: "jordan@example.com",
        organizationName: "Example Medical",
        environment: { userCount: "42", deviceOwnership: "hybrid", internalIt: "yes" },
      }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.request.status).toBe("submitted");
    expect(body.request.selectedNeeds).toHaveLength(3);
    expect(body.request.selectedNeeds.map((need: { familyId: string }) => need.familyId)).toEqual([
      "identity_access",
      "backup_continuity",
      "email_collaboration",
    ]);
    expect(body.request.environment.userCount).toBe("42");
    expect(body.request.environment.deviceOwnership).toBe("hybrid");
    expect(body.message).toContain("saved");
    expect(JSON.stringify(body).toLowerCase()).not.toContain("sku");
  });

  it("lets a guest submit a Solution Request without portal login", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        familyId: "identity_access",
        offerId: "de-identity-standalone",
        deliveryModel: "standalone",
        intent: "request",
        contactName: "Jordan Buyer",
        contactEmail: "jordan@example.com",
        organizationName: "Example Medical",
      }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.request.status).toBe("submitted");
    expect(body.correlationId).toMatch(/-/);
    expect(body.crm).toBe("pending");
    expect(body.message).toContain("saved");
    expect(JSON.stringify(body).toLowerCase()).not.toContain("sku");
  });

  it("rejects submit without contact and replays idempotent submits", async () => {
    const missing = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ familyId: "identity_access" }),
    });
    expect(missing.status).toBe(400);

    const first = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        familyId: "identity_access",
        offerId: "de-identity-standalone",
        deliveryModel: "standalone",
        contactName: "Jordan Buyer",
        contactEmail: "jordan@example.com",
        idempotencyKey: "door2-test-key",
      }),
    });
    const firstBody = await first.json();
    const second = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        familyId: "identity_access",
        offerId: "de-identity-standalone",
        deliveryModel: "standalone",
        contactName: "Jordan Buyer",
        contactEmail: "jordan@example.com",
        idempotencyKey: "door2-test-key",
      }),
    });
    const secondBody = await second.json();
    expect(secondBody.replayed).toBe(true);
    expect(secondBody.request.id).toBe(firstBody.request.id);
  });

  it("keeps only known sizing fields for the selected family and drops unrelated or invented keys", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        familyId: "network_connectivity",
        offerId: "de-network-standalone",
        deliveryModel: "standalone",
        contactName: "Jordan Buyer",
        contactEmail: "jordan-sizing@example.com",
        sizingAnswers: {
          sites: "12",
          devices: "40",
          // not a real field on this family — must be dropped, not stored
          monthlyPrice: "999",
          // not a field on any family — must be dropped
          madeUpKey: "hello",
        },
      }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.request.sizingAnswers).toEqual({ sites: "12", devices: "40" });
    const raw = JSON.stringify(body).toLowerCase();
    expect(raw).not.toContain("monthlyprice");
    expect(raw).not.toContain("madeupkey");
  });
});
