import crypto from "crypto";

const ZOHO_CHECKOUT_KEY = process.env.ZOHO_CHECKOUT_KEY;
const ZOHO_VERIFICATION_KEY = process.env.ZOHO_VERIFICATION_KEY;

export const zohoService = {
  /**
   * Generates Zoho Checkout Widget embed code
   * The widget handles payment collection directly in the browser
   */
  async generateCheckoutEmbedCode(
    invoiceId: string,
    amount: number, // in cents
    customerEmail: string,
    customerName: string,
    invoiceNumber: string
  ): Promise<string> {
    if (!ZOHO_CHECKOUT_KEY) {
      throw new Error("ZOHO_CHECKOUT_KEY not configured");
    }

    // Convert cents to dollars for Zoho
    const amountInDollars = (amount / 100).toFixed(2);

    // Generate unique reference ID
    const reference = `${invoiceNumber}-${Date.now()}`;

    // Create the embed code with widget data
    // The widget will be rendered client-side using Zoho's JS library
    const embedCode = {
      checkoutKey: ZOHO_CHECKOUT_KEY,
      amount: amountInDollars,
      currency: "USD",
      customerId: customerEmail,
      customerName,
      orderId: invoiceNumber,
      orderReference: reference,
      description: `Invoice payment for ${invoiceNumber}`,
      callbackUrl: `${process.env.APP_URL || "http://localhost:5000"}/api/zoho/webhook`,
    };

    return JSON.stringify(embedCode);
  },

  /**
   * Verifies Zoho webhook signature
   * Ensures the webhook is legitimate from Zoho
   */
  verifyWebhookSignature(
    body: any,
    signatureHeader: string
  ): boolean {
    if (!ZOHO_VERIFICATION_KEY) {
      throw new Error("ZOHO_VERIFICATION_KEY not configured");
    }

    try {
      // Stringify the body in consistent format for verification
      const payload = typeof body === "string" ? body : JSON.stringify(body);

      // Create HMAC signature using verification key
      const expectedSignature = crypto
        .createHmac("sha256", ZOHO_VERIFICATION_KEY)
        .update(payload)
        .digest("hex");

      // Compare with provided signature
      return crypto.timingSafeEqual(
        Buffer.from(signatureHeader),
        Buffer.from(expectedSignature)
      );
    } catch (error) {
      console.error("Signature verification failed:", error);
      return false;
    }
  },

  /**
   * Process Zoho payment webhook
   * Called when payment is completed or fails
   */
  async processWebhookPayment(
    body: any
  ): Promise<{
    status: "success" | "failed" | "pending";
    invoiceId: string;
    amount: number;
    transactionId: string;
  }> {
    const {
      status,
      order_id,
      amount,
      transaction_id,
      reference_id,
    } = body;

    // Map Zoho status to our status
    const paymentStatus =
      status === "completed" || status === "success"
        ? "success"
        : status === "failed"
          ? "failed"
          : "pending";

    return {
      status: paymentStatus,
      invoiceId: reference_id || order_id,
      amount: Math.round(parseFloat(amount) * 100), // Convert to cents
      transactionId: transaction_id,
    };
  },
};
