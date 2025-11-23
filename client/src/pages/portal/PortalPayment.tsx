import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortalLayout } from "./PortalLayout";
import {
  ArrowLeft,
  AlertCircle,
  CreditCard,
  QrCode,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentProps {
  invoiceId: string;
  invoiceNumber: string;
  amount: string;
}

export default function PortalPayment({
  invoiceId,
  invoiceNumber,
  amount,
}: PaymentProps) {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<
    "stripe" | "zelle" | "zoho" | null
  >(null);
  const [zohoEmbedData, setZohoEmbedData] = useState<any>(null);
  const zohoContainerRef = useRef<HTMLDivElement>(null);

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/portal/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("portalToken")}`,
        },
        body: JSON.stringify({
          invoiceId,
          amount: Math.round(parseFloat(amount) * 100),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleZohoCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/portal/payment/zoho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("portalToken")}`,
        },
        body: JSON.stringify({
          invoiceId,
          invoiceNumber,
          amount: Math.round(parseFloat(amount) * 100),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize Zoho checkout");
      }

      const data = await response.json();
      setZohoEmbedData(data);

      // Load Zoho checkout script if not already loaded
      if (!(window as any).ZohoCheckout) {
        const script = document.createElement("script");
        script.src = "https://checkout.zoho.com/checkout.js";
        script.async = true;
        script.onload = () => {
          // Script loaded, widget will be rendered
          console.log("Zoho checkout script loaded");
        };
        document.head.appendChild(script);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Zoho checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortalLayout title="Pay Invoice">
      <div className="space-y-6 max-w-2xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/portal/invoices")}
          className="gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Invoices
        </Button>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-300">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Invoice Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Invoice Payment</CardTitle>
                <CardDescription>{invoiceNumber}</CardDescription>
              </div>
              <Badge className="bg-[#5034ff] hover:bg-[#5034ff]/90 text-white text-lg px-3 py-1">
                ${parseFloat(amount).toFixed(2)}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Select Payment Method</h3>

          {/* Stripe */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedMethod === "stripe"
                ? "ring-2 ring-[#5034ff] border-[#5034ff]"
                : "hover:border-[#5034ff]/50"
            }`}
            onClick={() => setSelectedMethod("stripe")}
            data-testid="card-stripe-method"
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Credit/Debit Card</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pay securely with Stripe
                  </p>
                </div>
              </div>
              {selectedMethod === "stripe" && (
                <Button
                  className="mt-4 w-full bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                  onClick={handleStripeCheckout}
                  disabled={loading}
                  data-testid="button-stripe-pay"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay with Card"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Zelle */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedMethod === "zelle"
                ? "ring-2 ring-[#5034ff] border-[#5034ff]"
                : "hover:border-[#5034ff]/50"
            }`}
            onClick={() => setSelectedMethod("zelle")}
            data-testid="card-zelle-method"
          >
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <QrCode className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Zelle</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bank transfer via Zelle
                    </p>
                  </div>
                </div>

                {selectedMethod === "zelle" && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg space-y-3">
                    <p className="text-sm font-medium">
                      Scan the QR code below with your banking app:
                    </p>
                    <div className="flex justify-center py-2">
                      <img
                        src={require("@assets/qrCode_1763920410167.png")}
                        alt="Zelle QR Code"
                        className="h-48 w-48"
                        data-testid="image-zelle-qr"
                      />
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded text-sm">
                      <p className="text-yellow-800 dark:text-yellow-300">
                        <strong>Amount:</strong> ${parseFloat(amount).toFixed(2)}
                      </p>
                      <p className="text-yellow-800 dark:text-yellow-300 mt-1">
                        Reference: {invoiceNumber}
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate("/portal/invoices")}
                      data-testid="button-zelle-done"
                    >
                      Payment Sent
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Zoho Payments */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedMethod === "zoho"
                ? "ring-2 ring-[#5034ff] border-[#5034ff]"
                : "hover:border-[#5034ff]/50"
            }`}
            onClick={() => setSelectedMethod("zoho")}
            data-testid="card-zoho-method"
          >
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Zoho Payments</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pay with multiple payment methods
                    </p>
                  </div>
                </div>

                {selectedMethod === "zoho" && (
                  <div className="mt-4 space-y-3">
                    {!zohoEmbedData && (
                      <Button
                        className="w-full bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                        onClick={handleZohoCheckout}
                        disabled={loading}
                        data-testid="button-zoho-pay"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Initializing...
                          </>
                        ) : (
                          "Proceed to Zoho Checkout"
                        )}
                      </Button>
                    )}

                    {zohoEmbedData && (
                      <div
                        ref={zohoContainerRef}
                        data-testid="div-zoho-widget"
                        className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 min-h-96"
                      >
                        <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                          <p className="font-medium mb-2">Zoho Checkout Widget</p>
                          <p className="text-sm">
                            {zohoEmbedData.amount} USD - {zohoEmbedData.orderReference}
                          </p>
                          <p className="text-xs mt-4 text-gray-500">
                            The payment widget would render here with Zoho's hosted checkout
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded text-sm">
                      <p className="text-blue-800 dark:text-blue-300">
                        <strong>Amount:</strong> ${parseFloat(amount).toFixed(2)}
                      </p>
                      <p className="text-blue-800 dark:text-blue-300 mt-1">
                        Reference: {invoiceNumber}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Your payment is secure and processed through industry-leading payment
            processors. All data is encrypted and protected.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
