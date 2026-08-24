import { describe, expect, it } from "vitest";
import { INTERNAL_COMPANY_NAME, NO_CLIENT_TICKET_ERROR, ticketCompanyName } from "@shared/portalTicketOrg";
import { resolveTicketCreateTarget, type TicketCreateClient } from "./portalTicketCreate";

const clients: TicketCreateClient[] = [
  { id: "client-1", companyName: "Acme Corp", type: "client" },
  { id: "msp-digerati", companyName: "Digerati Experts", type: "msp" },
];

function deps(rows: TicketCreateClient[] = clients) {
  const byId = new Map(rows.map((c) => [c.id, c]));
  return {
    getClient: (id: string) => byId.get(id),
    listClients: () => rows,
    ensureInternalClient: () => {
      const created = { id: "msp-digerati", companyName: INTERNAL_COMPANY_NAME, type: "msp" };
      byId.set(created.id, created);
      return created;
    },
  };
}

describe("resolveTicketCreateTarget", () => {
  it("accessing companyName when client is undefined does not throw", () => {
    expect(() => ticketCompanyName(undefined, INTERNAL_COMPANY_NAME)).not.toThrow();
    expect(ticketCompanyName(undefined, INTERNAL_COMPANY_NAME)).toBe(INTERNAL_COMPANY_NAME);
  });

  it("lets admin create without clientId as an internal Digerati ticket", () => {
    const result = resolveTicketCreateTarget({
      actor: { role: "admin", clientId: null },
      ...deps(),
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.isInternal).toBe(true);
    expect(result.clientId).toBe("msp-digerati");
    expect(result.companyName).toBe("Digerati Experts");
  });

  it("creates the internal org when admin has no client and none exists", () => {
    const result = resolveTicketCreateTarget({
      actor: { role: "admin", clientId: null },
      ...deps([]),
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.isInternal).toBe(true);
    expect(result.companyName).toBe(INTERNAL_COMPANY_NAME);
  });

  it("lets admin file against a selected client without opening IDOR for others", () => {
    const result = resolveTicketCreateTarget({
      actor: { role: "admin", clientId: null },
      requestedClientId: "client-1",
      ...deps(),
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.isInternal).toBe(false);
    expect(result.clientId).toBe("client-1");
    expect(result.companyName).toBe("Acme Corp");
  });

  it("returns 400 for non-admin without a client account", () => {
    const result = resolveTicketCreateTarget({
      actor: { role: "user", clientId: null },
      ...deps(),
    });
    expect(result).toEqual({ ok: false, status: 400, error: NO_CLIENT_TICKET_ERROR });
  });

  it("returns 400 for non-admin whose client row is missing", () => {
    const result = resolveTicketCreateTarget({
      actor: { role: "user", clientId: "missing-client" },
      ...deps(),
    });
    expect(result).toEqual({ ok: false, status: 400, error: NO_CLIENT_TICKET_ERROR });
  });

  it("returns 403 when a non-admin tries to pick another client", () => {
    const result = resolveTicketCreateTarget({
      actor: { role: "user", clientId: "client-1" },
      requestedClientId: "msp-digerati",
      ...deps(),
    });
    expect(result).toEqual({ ok: false, status: 403, error: "Forbidden" });
  });
});
