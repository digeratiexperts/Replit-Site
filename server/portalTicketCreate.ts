import {
  INTERNAL_COMPANY_NAME,
  NO_CLIENT_TICKET_ERROR,
  isInternalPortalOrg,
  ticketCompanyName,
  type TicketOrgClient,
} from "@shared/portalTicketOrg";

export type TicketCreateActor = {
  role?: string | null;
  clientId?: string | null;
  impersonatingCompanyId?: string | null;
  impersonatingCompanyName?: string | null;
};

export type TicketCreateClient = {
  id: string;
  type?: string | null;
  companyName?: string | null;
};

export type TicketCreateTarget =
  | {
      ok: true;
      clientId: string;
      companyName: string;
      isInternal: boolean;
    }
  | { ok: false; status: 400 | 403; error: string };

export function resolveTicketCreateTarget(input: {
  actor: TicketCreateActor;
  requestedClientId?: string | null;
  getClient: (id: string) => TicketCreateClient | undefined;
  listClients: () => TicketCreateClient[];
  ensureInternalClient: () => TicketCreateClient;
}): TicketCreateTarget {
  const isAdmin = input.actor.role === "admin";
  const requested =
    typeof input.requestedClientId === "string" ? input.requestedClientId.trim() : "";

  if (!isAdmin) {
    if (requested && requested !== (input.actor.clientId || "")) {
      return { ok: false, status: 403, error: "Forbidden" };
    }
    if (!input.actor.clientId) {
      return { ok: false, status: 400, error: NO_CLIENT_TICKET_ERROR };
    }
    const client = input.getClient(input.actor.clientId);
    if (!client) {
      return { ok: false, status: 400, error: NO_CLIENT_TICKET_ERROR };
    }
    return {
      ok: true,
      clientId: client.id,
      companyName: ticketCompanyName(client, ""),
      isInternal: isInternalPortalOrg(client, client.id),
    };
  }

  if (requested) {
    const picked = input.getClient(requested);
    if (!picked) {
      return { ok: false, status: 400, error: "Selected company was not found." };
    }
    return successFromClient(picked);
  }

  const impersonatedId =
    typeof input.actor.impersonatingCompanyId === "string"
      ? input.actor.impersonatingCompanyId.trim()
      : "";
  if (impersonatedId) {
    const impersonated = input.getClient(impersonatedId);
    if (impersonated) return successFromClient(impersonated);
  }

  if (input.actor.clientId) {
    const own = input.getClient(input.actor.clientId);
    if (own) return successFromClient(own);
  }

  const existingInternal = input.listClients().find((client) => isInternalPortalOrg(client, client.id));
  const internal = existingInternal || input.ensureInternalClient();
  const companyName =
    ticketCompanyName(internal, "") ||
    ticketCompanyName(
      { companyName: input.actor.impersonatingCompanyName } as TicketOrgClient,
      INTERNAL_COMPANY_NAME,
    );

  return {
    ok: true,
    clientId: internal.id,
    companyName,
    isInternal: true,
  };
}

export function annotateTicketOrg(
  ticket: { clientId?: string | null },
  getClient: (id: string) => TicketCreateClient | undefined,
): { companyName: string; isInternal: boolean } {
  const client = ticket.clientId ? getClient(ticket.clientId) : undefined;
  const isInternal = isInternalPortalOrg(client, ticket.clientId);
  return {
    companyName: ticketCompanyName(client, isInternal ? INTERNAL_COMPANY_NAME : ""),
    isInternal,
  };
}

function successFromClient(client: TicketCreateClient): TicketCreateTarget {
  const isInternal = isInternalPortalOrg(client, client.id);
  return {
    ok: true,
    clientId: client.id,
    companyName: ticketCompanyName(client, isInternal ? INTERNAL_COMPANY_NAME : ""),
    isInternal,
  };
}
