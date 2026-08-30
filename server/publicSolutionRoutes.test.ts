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

  it("returns 13 public families with package policy and without private fields", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/families`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.families).toHaveLength(13);
    for (const family of body.families) {
      expect(family.offers.map((offer: { deliveryModel: string }) => offer.deliveryModel).sort()).toEqual([
        "co_managed",
        "standalone",
      ]);
      expect(family.offers.every((offer: { package?: unknown }) => !!offer.package)).toBe(true);
    }
    const raw = JSON.stringify(body).toLowerCase();
    for (const term of prohibited) expect(raw).not.toContain(term);
  });

  it("returns a generic 404 for an unknown family", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/families/not-a-family`);
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body).toEqual({ error: "Not found" });
    expect(JSON.stringify(body).toLowerCase()).not.toContain("sku");
  });

  it("saves a profile, package selection, and fulfillment without contact or lead submission", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedNeeds: [{ familyId: "identity_access", offerId: "de-identity-standalone", deliveryModel: "standalone" }],
        deliveryPreference: "standalone",
        environment: {
          userCount: "25",
          workstationCount: "32",
          mobileDeviceCount: "18",
          siteCount: "2",
          deviceOwnership: "hybrid",
          internalIt: "no",
        },
        fulfillment: { installation: "remote_assist", remoteSupport: "as_needed" },
        intent: "quote",
      }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.request.status).toBe("draft");
    expect(body.request.contactEmail).toBe("");
    expect(body.request.environment.workstationCount).toBe("32");
    expect(body.request.environment.mobileDeviceCount).toBe("18");
    expect(body.request.fulfillment).toEqual({ installation: "remote_assist", remoteSupport: "as_needed" });
  });

  it("lets a guest submit several families as one composed solution", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedNeeds: [
          { familyId: "identity_access", offerId: "de-identity-co-managed", deliveryModel: "co_managed" },
          { familyId: "backup_continuity", offerId: "de-continuity-co-managed", deliveryModel: "co_managed" },
          { familyId: "email_collaboration", offerId: "de-collaboration-co-managed", deliveryModel: "co_managed" },
        ],
        deliveryPreference: "co_managed",
        intent: "quote",
        contactName: "Jordan Buyer",
        contactEmail: "jordan@example.com",
        contactPhone: "480-555-0100",
        organizationName: "Example Medical",
        environment: {
          userCount: "42",
          workstationCount: "48",
          mobileDeviceCount: "20",
          siteCount: "2",
          deviceOwnership: "hybrid",
          internalIt: "yes",
        },
        fulfillment: { installation: "remote_assist", remoteSupport: "ongoing" },
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
    expect(body.request.environment.workstationCount).toBe("48");
    expect(body.request.fulfillment.remoteSupport).toBe("ongoing");
    expect(body.message).toContain("saved");
    expect(JSON.stringify(body).toLowerCase()).not.toContain("sku");
  });

  it("lets a guest submit without portal login when all four contact fields are present", async () => {
    const response = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        familyId: "identity_access",
        offerId: "de-identity-standalone",
        deliveryModel: "standalone",
        deliveryPreference: "standalone",
        intent: "quote",
        contactName: "Jordan Buyer",
        contactEmail: "jordan@example.com",
        contactPhone: "480-555-0100",
        organizationName: "Example Medical",
      }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.request.status).toBe("submitted");
    expect(body.correlationId).toMatch(/-/);
    expect(body.crm).toBe("pending");
    expect(body.message).toContain("saved");
  });

  it("rejects missing four-field contact and replays idempotent submits", async () => {
    const missing = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ familyId: "identity_access", contactName: "Jordan Buyer", contactEmail: "jordan@example.com" }),
    });
    expect(missing.status).toBe(400);

    const payload = {
      familyId: "identity_access",
      offerId: "de-identity-standalone",
      deliveryModel: "standalone",
      deliveryPreference: "standalone",
      contactName: "Jordan Buyer",
      contactEmail: "jordan@example.com",
      contactPhone: "480-555-0100",
      organizationName: "Example Medical",
      idempotencyKey: "door2-test-key",
    };
    const first = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect(first.status).toBe(200);
    const firstBody = await first.json();
    const second = await fetch(`${baseUrl}/api/public/solutions/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const secondBody = await second.json();
    expect(secondBody.replayed).toBe(true);
    expect(secondBody.request.id).toBe(firstBody.request.id);
  });
});
