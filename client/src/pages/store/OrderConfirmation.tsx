import { useEffect, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/contexts/CartContext";
const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
import {
  CheckCircle,
  Package,
  Mail,
  ArrowRight,
  ShoppingBag,
  FileText,
  Clock,
  Phone,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { PRIMARY_PHONE } from "@/data/companyContact";

interface OrderLineItem {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  pricingType: string;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  lineItems: OrderLineItem[];
  subtotal: string;
  tax: string;
  total: string;
  billingEmail: string;
  billingName: string;
  billingCompany: string | null;
  createdAt: string;
  paidAt: string | null;
}

const OrderConfirmation = () => {
  const [location] = useLocation();
  const { clearCart } = useCart();

  const params = useMemo(() => {
    const searchParams = new URLSearchParams(location.split("?")[1] || "");
    return {
      orderId: searchParams.get("orderId") || searchParams.get("session_id"),
      method: searchParams.get("method"),
    };
  }, [location]);

  useSEO({
    title: "Order Confirmation | Digerati Experts Store",
    description: "Your order has been received. Thank you for your purchase.",
    canonical: "/store/order-confirmation",
    noIndex: true,
  });

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ["/api/store/orders", params.orderId],
    enabled: !!params.orderId,
    queryFn: async () => {
      const token = localStorage.getItem("portalToken");
      const response = await fetch(`/api/store/orders/${params.orderId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include",
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`${response.status}: ${text || "Failed to load order"}`);
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (order) {
      clearCart();
    }
  }, [order, clearCart]);

  const isQuoteRequest = params.method === "quote" || order?.paymentMethod === "quote_request";

  const statusConfig = {
    pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-400/10" },
    quote_requested: { label: "Quote Requested", color: "text-blue-400", bg: "bg-blue-400/10" },
    paid: { label: "Paid", color: "text-emerald-400", bg: "bg-emerald-400/10" },
    processing: { label: "Processing", color: "text-de-accent-ink", bg: "bg-de-raised" },
    completed: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  };

  const status = statusConfig[order?.status as keyof typeof statusConfig] || statusConfig.pending;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <MegaMenu />
        <main className="de-nav-clear pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-12 h-12 text-de-accent-ink animate-spin mb-4" />
            <p className="text-white/60">Loading order details...</p>
          </div>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    );
  }

  if (error || (!order && !isLoading)) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <MegaMenu />
        <main className="de-nav-clear pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Order Not Found</h1>
            <p className="text-white/60 mb-8">
              We couldn't find your order. Please check your email for confirmation or contact support.
            </p>
            <Link href="/store">
              <Button className="bg-de-accent hover:bg-de-accent text-white" data-testid="button-back-to-store">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    );
  }

  const lineItems: OrderLineItem[] = Array.isArray(order?.lineItems) 
    ? order.lineItems 
    : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />

      <main className="de-nav-clear pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-de-raised mb-6">
              <CheckCircle className="w-10 h-10 text-de-accent-ink" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-confirmation-title">
              {isQuoteRequest ? "Quote Request Received!" : "Order Confirmed!"}
            </h1>
            <p className="text-lg text-white/60 max-w-lg mx-auto" data-testid="text-confirmation-subtitle">
              {isQuoteRequest
                ? "We've received your quote request. Our team will reach out within 1 business day."
                : "Thank you for your purchase. You'll receive a confirmation email shortly."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            data-testid="section-order-details"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <p className="text-white/60 text-sm mb-1">Order Number</p>
                <p className="text-2xl font-bold text-white font-mono" data-testid="text-order-number">
                  {order?.orderNumber || "Processing..."}
                </p>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.bg}`}>
                <div className={`w-2 h-2 rounded-full ${status.color} bg-current`} />
                <span className={`font-medium ${status.color}`} data-testid="text-order-status">
                  {status.label}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-white/60 text-sm mb-2">Billing Details</p>
                <p className="text-white font-medium" data-testid="text-billing-name">
                  {order?.billingName}
                </p>
                {order?.billingCompany && (
                  <p className="text-white/80" data-testid="text-billing-company">
                    {order.billingCompany}
                  </p>
                )}
                <p className="text-white/60" data-testid="text-billing-email">
                  {order?.billingEmail}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-2">Order Date</p>
                <p className="text-white" data-testid="text-order-date">
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Just now"}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-white/60 text-sm mb-4">Items Ordered</p>
              <div className="space-y-3">
                {lineItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
                    data-testid={`order-item-${item.productId}`}
                  >
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-white/50 text-sm">
                        Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <p className="text-white font-medium">{formatCurrency(item.total)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/20 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white">{formatCurrency(parseFloat(order?.subtotal || "0"))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Tax</span>
                <span className="text-white">{formatCurrency(parseFloat(order?.tax || "0"))}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-white/10">
                <span className="text-white">Total</span>
                <span className="text-de-accent-ink" data-testid="text-order-total">
                  {formatCurrency(parseFloat(order?.total || "0"))}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 4-Stage Real-Time Provisioning Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#151217] border border-white/10 rounded-2xl p-6 md:p-8 mb-8 shadow-lg"
            data-testid="section-next-steps"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-de-magenta-ink" />
                Live Provisioning & Onboarding Pipeline
              </h2>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Provisioning
              </span>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-emerald-400">STAGE 01</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-white mb-1">Payment & Licensing Authorized</p>
                <p className="text-xs text-white/60 flex-1">Invoice generated and enterprise order token assigned.</p>
              </div>

              <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-sky-400">STAGE 02</span>
                  <Clock className="w-4 h-4 text-sky-400 animate-spin" />
                </div>
                <p className="text-sm font-bold text-white mb-1">Tenant & Seat Allocation</p>
                <p className="text-xs text-white/60 flex-1">Syncing domain with vendor CSP API and security operations.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-white/40">STAGE 03</span>
                  <Package className="w-4 h-4 text-white/40" />
                </div>
                <p className="text-sm font-bold text-white mb-1">Agent & Deployment Package</p>
                <p className="text-xs text-white/60 flex-1">MSI/PKG deployment scripts prepared in Client Portal.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-white/40">STAGE 04</span>
                  <Phone className="w-4 h-4 text-white/40" />
                </div>
                <p className="text-sm font-bold text-white mb-1">Engineer Onboarding Kickoff</p>
                <p className="text-xs text-white/60 flex-1">Direct scheduling with your designated Arizona technical lead.</p>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Need engineer assistance immediately?</p>
                <p className="text-xs text-white/60">Our Arizona Security Operations Center is standing by 24/7.</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D3126A] to-[#E61E76] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#D3126A]/25 hover:brightness-110"
                >
                  Schedule Kickoff Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/store">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                data-testid="button-continue-shopping"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>

            <Link href="/portal/dashboard">
              <Button
                className="bg-de-accent hover:bg-de-accent text-white"
                data-testid="button-go-to-portal"
              >
                Go to Client Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-white/60 mb-4">Need help with your order?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={PRIMARY_PHONE.telHref}
                className="inline-flex items-center gap-2 text-de-accent-ink hover:text-de-accent-ink transition-colors"
                data-testid="link-phone-support"
              >
                <Phone className="w-4 h-4" />
                {PRIMARY_PHONE.display}
              </a>
              <Link href="/support/submit-ticket">
                <span className="inline-flex items-center gap-2 text-de-accent-ink hover:text-de-accent-ink transition-colors cursor-pointer" data-testid="link-submit-ticket">
                  <MessageSquare className="w-4 h-4" />
                  Submit a Ticket
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default OrderConfirmation;
