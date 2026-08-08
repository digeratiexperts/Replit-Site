import crypto from "crypto";

const ZOHO_PAYMENTS_BASE_URL = "https://payments.zoho.com/api/v1";

interface ZohoPaymentSession {
  payment_session_id: string;
  url: string;
  status: string;
}

interface ZohoLineItem {
  name: string;
  description?: string;
  amount: number;
  quantity: number;
}

export class ZohoPaymentsService {
  private apiKey: string;
  private signingKey: string;

  constructor() {
    this.apiKey = process.env.ZOHO_PAYMENTS_API_KEY || "";
    this.signingKey = process.env.ZOHO_PAYMENTS_SIGNING_KEY || "";
  }

  private looksConfigured(value: string): boolean {
    const v = (value || "").trim();
    if (!v) return false;
    const lower = v.toLowerCase();
    if (v.includes("<") || v.includes(">")) return false;
    if (lower.includes("your ") || lower.includes("placeholder") || lower.includes("changeme")) return false;
    return true;
  }

  isConfigured(): boolean {
    return this.looksConfigured(this.apiKey) && this.looksConfigured(this.signingKey);
  }

  async createPaymentSession(params: {
    orderNumber: string;
    customerEmail: string;
    customerName: string;
    lineItems: ZohoLineItem[];
    totalAmount: number;
    currency?: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }): Promise<ZohoPaymentSession> {
    if (!this.isConfigured()) {
      throw new Error("Zoho Payments is not configured. Set ZOHO_PAYMENTS_API_KEY and ZOHO_PAYMENTS_SIGNING_KEY.");
    }

    const payload = {
      amount: Math.round(params.totalAmount * 100),
      currency: params.currency || "USD",
      customer: {
        email: params.customerEmail,
        name: params.customerName,
      },
      line_items: params.lineItems.map(item => ({
        name: item.name,
        description: item.description || "",
        amount: Math.round(item.amount * 100),
        quantity: item.quantity,
      })),
      reference_id: params.orderNumber,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata || {},
    };

    const response = await fetch(`${ZOHO_PAYMENTS_BASE_URL}/paymentsessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Zoho-enczapikey ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("[ZOHO PAYMENTS] Create session error:", response.status, errorData);
      throw new Error(`Zoho Payments API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return {
      payment_session_id: data.payment_session?.payment_session_id || data.payment_session_id || data.id,
      url: data.payment_session?.url || data.url || data.payment_url,
      status: data.payment_session?.status || data.status || "created",
    };
  }

  async getPaymentSession(sessionId: string): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Zoho Payments is not configured.");
    }

    const response = await fetch(`${ZOHO_PAYMENTS_BASE_URL}/paymentsessions/${sessionId}`, {
      headers: {
        "Authorization": `Zoho-enczapikey ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Zoho Payments API error: ${response.status} - ${errorData}`);
    }

    return response.json();
  }

  verifyWebhookSignature(payload: string | Buffer, signature: string): boolean {
    if (!this.signingKey) {
      console.error("[ZOHO PAYMENTS] Webhook signing key not configured");
      return false;
    }

    if (!signature || typeof signature !== "string") {
      return false;
    }

    const payloadStr = typeof payload === "string" ? payload : payload.toString("utf-8");
    const expectedSignature = crypto
      .createHmac("sha256", this.signingKey)
      .update(payloadStr)
      .digest("hex");

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  }
}

export const zohoPayments = new ZohoPaymentsService();
