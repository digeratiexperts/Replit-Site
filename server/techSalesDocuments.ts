/**
 * Client Portal → TechSales Hub document bridge client.
 * Uses TECHSALES_SYNC_TOKEN (same secret as website-lead webhook).
 */
import { logger } from "./logger";

function hubApiBase(): string | null {
  const explicit = (process.env.TECHSALES_HUB_URL || process.env.TECHSALES_BASE_URL || "").trim();
  if (explicit) {
    return explicit.replace(/\/$/, "") + (explicit.includes("/api") ? "" : "/api");
  }
  const syncUrl = (process.env.TECHSALES_SYNC_URL || "").trim();
  if (!syncUrl) return null;
  try {
    const u = new URL(syncUrl);
    // https://techsales.../api/webhooks/website-lead → https://techsales.../api
    const idx = u.pathname.indexOf("/api");
    if (idx >= 0) {
      return `${u.origin}${u.pathname.slice(0, idx + 4)}`;
    }
    return `${u.origin}/api`;
  } catch {
    return null;
  }
}

function syncToken(): string {
  return (process.env.TECHSALES_SYNC_TOKEN || process.env.WEBSITE_LEAD_WEBHOOK_SECRET || "").trim();
}

export type HubCompanyDocumentsResponse = {
  success?: boolean;
  companyName?: string;
  matchedDeals?: Array<{ id: number; accountName: string; accountId: number | null; stage: string }>;
  contracts?: any[];
  library?: any[];
  error?: string;
};

export async function fetchHubCompanyDocuments(
  companyName: string,
): Promise<HubCompanyDocumentsResponse | null> {
  const base = hubApiBase();
  const token = syncToken();
  if (!base || !token) {
    logger.warn("TechSales document bridge skipped — TECHSALES_HUB_URL/SYNC_URL or TOKEN not set");
    return null;
  }

  const url = `${base}/webhooks/portal/company-documents?companyName=${encodeURIComponent(companyName)}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-de-sync-token": token,
        Accept: "application/json",
      },
    });
    const data = (await res.json().catch(() => ({}))) as HubCompanyDocumentsResponse;
    if (!res.ok) {
      logger.error("TechSales company-documents failed", {
        status: res.status,
        error: data.error,
        companyName,
      });
      return null;
    }
    return data;
  } catch (err: any) {
    logger.error("TechSales company-documents error", { message: err?.message, companyName });
    return null;
  }
}

export type HubCompanyOrder = {
  id: string;
  source: "hub_deal" | "hub_quote" | "hub_package" | string;
  orderNumber: string;
  title?: string;
  status: string;
  hubStatus?: string;
  amount?: number | null;
  totalMonthly?: number | null;
  totalOneTime?: number | null;
  companyName?: string;
  dealId?: number | null;
  quoteId?: number | null;
  packageId?: number | null;
  tier?: string | null;
  stage?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  detailPath?: string;
};

export type HubCompanyOrdersResponse = {
  success?: boolean;
  companyName?: string;
  matchedDeals?: Array<{ id: number; accountName: string; accountId: number | null; stage: string }>;
  orders?: HubCompanyOrder[];
  counts?: { deals?: number; quotes?: number; packages?: number; total?: number };
  error?: string;
};

export async function fetchHubCompanyOrders(
  companyName: string,
): Promise<HubCompanyOrdersResponse | null> {
  const base = hubApiBase();
  const token = syncToken();
  if (!base || !token) {
    logger.warn("TechSales orders bridge skipped — TECHSALES_HUB_URL/SYNC_URL or TOKEN not set");
    return null;
  }

  const url = `${base}/webhooks/portal/company-orders?companyName=${encodeURIComponent(companyName)}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-de-sync-token": token,
        Accept: "application/json",
      },
    });
    const data = (await res.json().catch(() => ({}))) as HubCompanyOrdersResponse;
    if (!res.ok) {
      logger.error("TechSales company-orders failed", {
        status: res.status,
        error: data.error,
        companyName,
      });
      return null;
    }
    return data;
  } catch (err: any) {
    logger.error("TechSales company-orders error", { message: err?.message, companyName });
    return null;
  }
}

export async function fetchHubContractDownload(
  signatureId: number,
  companyName: string,
  kind: string = "signed_pdf",
): Promise<{ buffer: Buffer; contentType: string; fileName: string } | null> {
  const base = hubApiBase();
  const token = syncToken();
  if (!base || !token) return null;

  const url =
    `${base}/webhooks/portal/company-documents/${signatureId}/download` +
    `?companyName=${encodeURIComponent(companyName)}&kind=${encodeURIComponent(kind)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-de-sync-token": token,
      },
    });
    if (!res.ok) {
      logger.error("TechSales document download failed", { status: res.status, signatureId });
      return null;
    }
    const ab = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "application/pdf";
    const disposition = res.headers.get("content-disposition") || "";
    const match = disposition.match(/filename="?([^"]+)"?/i);
    return {
      buffer: Buffer.from(ab),
      contentType,
      fileName: match?.[1] || `contract-${signatureId}.pdf`,
    };
  } catch (err: any) {
    logger.error("TechSales document download error", { message: err?.message, signatureId });
    return null;
  }
}

export function resolvePortalCompanyName(opts: {
  clientId?: string | null;
  impersonatingCompanyId?: string | null;
  getClient: (id: string) => { companyName?: string } | undefined;
}): string | null {
  const id = opts.impersonatingCompanyId || opts.clientId;
  if (!id) return null;
  const client = opts.getClient(id);
  return client?.companyName?.trim() || null;
}
