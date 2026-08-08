import { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSEO } from "@/hooks/useSEO";
import { useCart, isRecurringPricing } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { type PricingType } from "@/data/storeProducts";

const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

import {
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  FileText,
  MessageSquare,
  Loader2,
  Check,
  RefreshCw,
  Package,
} from "lucide-react";

const billingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
});

type BillingFormData = z.infer<typeof billingSchema>;

type PaymentMethod = "zoho" | "quote_request";

const pricingUnitLabels: Record<string, string> = {
  monthly: "/mo",
  yearly: "/yr",
  per_user: "/user/mo",
  per_endpoint: "/endpoint/mo",
  per_device: "/device/mo",
  per_location: "/location/mo",
  per_seat: "/seat/mo",
  one_time: "",
  per_hour: "/hr",
};

const Checkout = () => {
  const [, navigate] = useLocation();
  const { items, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("zoho");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSEO({
    title: "Checkout | Digerati Experts Store",
    description: "Complete your purchase of IT services and solutions from Digerati Experts.",
    canonical: "/store/checkout",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormData>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/store");
    }
  }, [items.length, navigate]);

  const { recurringItems, oneTimeItems, recurringTotal, oneTimeTotal } = useMemo(() => {
    const recurring = items.filter((item) =>
      isRecurringPricing(item.product.pricingType)
    );
    const oneTime = items.filter(
      (item) => !isRecurringPricing(item.product.pricingType)
    );
    const recTotal = recurring.reduce(
      (sum, item) => sum + item.product.basePrice * item.quantity,
      0
    );
    const otTotal = oneTime.reduce(
      (sum, item) => sum + item.product.basePrice * item.quantity,
      0
    );
    return {
      recurringItems: recurring,
      oneTimeItems: oneTime,
      recurringTotal: recTotal,
      oneTimeTotal: otTotal,
    };
  }, [items]);

  const getPricingLabel = (pricingType: PricingType) => {
    return pricingUnitLabels[pricingType] || "";
  };

  const onSubmit = async (data: BillingFormData) => {
    setIsSubmitting(true);
    try {
      const lineItems = items.map((item) => ({
        productId: item.product.id,
        sku: item.product.sku,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.basePrice,
        pricingType: item.product.pricingType,
        total: item.product.basePrice * item.quantity,
      }));

      if (paymentMethod === "zoho") {
        const response = await fetch("/api/store/checkout/zoho", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            lineItems,
            billing: data,
            subtotal: getCartTotal(),
            total: getCartTotal(),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create checkout session");
        }

        const result = await response.json();
        if (result.url) {
          window.location.href = result.url;
        } else if (result.orderId) {
          clearCart();
          navigate(`/store/order-confirmation?orderId=${result.orderId}`);
        }
      } else if (paymentMethod === "quote_request") {
        navigate("/store/quote-request");
        return;
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "Unable to process your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />

      <main className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/store" className="hover:text-white transition-colors" data-testid="breadcrumb-store">
                  Store
                </Link>
              </li>
              <li>/</li>
              <li className="text-white" data-testid="breadcrumb-checkout">Checkout</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4 mb-8">
            <Link href="/store">
              <Button variant="ghost" className="text-white/60 hover:text-white" data-testid="button-back-to-store">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="text-checkout-title">
              Checkout
            </h1>
            <p className="text-white/60 mb-8" data-testid="text-checkout-subtitle">
              Complete your order for IT services and solutions
            </p>

            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="section-billing-info">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-violet-400" />
                    Billing Information
                  </h2>

                  <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white/80">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="John Smith"
                          className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-violet-500"
                          data-testid="input-name"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1" data-testid="error-name">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white/80">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="john@company.com"
                          className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-violet-500"
                          data-testid="input-email"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1" data-testid="error-email">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company" className="text-white/80">
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          {...register("company")}
                          placeholder="Acme Corp"
                          className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-violet-500"
                          data-testid="input-company"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white/80">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          placeholder="(555) 123-4567"
                          className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-violet-500"
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="section-payment-method">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-violet-400" />
                    Payment Method
                  </h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="payment-zoho"
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === "zoho"
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <RadioGroupItem value="zoho" id="payment-zoho" data-testid="radio-zoho" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-violet-400" />
                          <span className="font-medium text-white">Credit / Debit Card</span>
                        </div>
                        <p className="text-sm text-white/60 mt-1">
                          Secure payment processing. All major cards accepted.
                        </p>
                      </div>
                      {paymentMethod === "zoho" && (
                        <Check className="w-5 h-5 text-violet-400" />
                      )}
                    </label>

                    <label
                      htmlFor="payment-quote"
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === "quote_request"
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <RadioGroupItem value="quote_request" id="payment-quote" data-testid="radio-quote" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-emerald-400" />
                          <span className="font-medium text-white">Request Quote</span>
                        </div>
                        <p className="text-sm text-white/60 mt-1">
                          Get a custom quote from our team. We'll contact you within 1 business day.
                        </p>
                      </div>
                      {paymentMethod === "quote_request" && (
                        <Check className="w-5 h-5 text-violet-400" />
                      )}
                    </label>
                  </RadioGroup>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-28" data-testid="section-order-summary">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-violet-400" />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {recurringItems.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                          <RefreshCw className="w-4 h-4" />
                          Recurring Services
                        </div>
                        {recurringItems.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between items-start py-3 border-b border-white/10"
                            data-testid={`order-item-${item.product.id}`}
                          >
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm">{item.product.name}</p>
                              <p className="text-white/50 text-xs">
                                {item.quantity}x {formatCurrency(item.product.basePrice)}
                                {getPricingLabel(item.product.pricingType)}
                              </p>
                            </div>
                            <p className="text-white font-medium text-sm">
                              {formatCurrency(item.product.basePrice * item.quantity)}
                              {getPricingLabel(item.product.pricingType)}
                            </p>
                          </div>
                        ))}
                        <div className="flex justify-between py-2 text-sm">
                          <span className="text-white/60">Recurring Subtotal</span>
                          <span className="text-white font-medium">{formatCurrency(recurringTotal)}/mo</span>
                        </div>
                      </div>
                    )}

                    {oneTimeItems.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                          <Package className="w-4 h-4" />
                          One-Time Purchases
                        </div>
                        {oneTimeItems.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between items-start py-3 border-b border-white/10"
                            data-testid={`order-item-${item.product.id}`}
                          >
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm">{item.product.name}</p>
                              <p className="text-white/50 text-xs">
                                {item.quantity}x {formatCurrency(item.product.basePrice)}
                              </p>
                            </div>
                            <p className="text-white font-medium text-sm">
                              {formatCurrency(item.product.basePrice * item.quantity)}
                            </p>
                          </div>
                        ))}
                        <div className="flex justify-between py-2 text-sm">
                          <span className="text-white/60">One-Time Subtotal</span>
                          <span className="text-white font-medium">{formatCurrency(oneTimeTotal)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/20 pt-4 space-y-2">
                    {recurringTotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Monthly Recurring</span>
                        <span className="text-white">{formatCurrency(recurringTotal)}/mo</span>
                      </div>
                    )}
                    {oneTimeTotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">One-Time Total</span>
                        <span className="text-white">{formatCurrency(oneTimeTotal)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t border-white/10">
                      <span className="text-white">Due Today</span>
                      <span className="text-violet-400" data-testid="text-total-due">
                        {formatCurrency(getCartTotal())}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-violet-600 hover:bg-violet-500 text-white py-6 text-lg font-semibold"
                    data-testid="button-submit-order"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : paymentMethod === "quote_request" ? (
                      <>
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Request Quote
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pay Now
                      </>
                    )}
                  </Button>

                  <p className="text-center text-white/40 text-xs mt-4">
                    By completing this order, you agree to our{" "}
                    <Link href="/legal/terms-of-use" className="text-violet-400 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy-policy" className="text-violet-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default Checkout;
