import { useState, useEffect } from "react";
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
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { SolutionOrderSummary } from "@/components/store/SolutionOrderSummary";
import { snapshotSubmitLines } from "@/lib/solutionSnapshotView";

import {
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  FileText,
  MessageSquare,
  Loader2,
  Check,
  Building,
  Globe,
  Truck,
  ShieldCheck,
} from "lucide-react";

const billingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email address"),
  company: z.string().min(2, "Company name is required for enterprise licensing"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  primaryDomain: z.string().optional(),
  identityProvider: z.string().optional(),
  technicalContact: z.string().optional(),
  shippingAddress: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingState: z.string().optional(),
  shippingZip: z.string().optional(),
  deliveryNotes: z.string().optional(),
  termsAgreed: z.boolean().refine((val) => val === true, "You must agree to the Terms of Service and Licensing Agreement"),
});

type BillingFormData = z.infer<typeof billingSchema>;

type PaymentMethod = "zoho" | "quote_request";

const Checkout = () => {
  const [, navigate] = useLocation();
  const { items, snapshot, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("zoho");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSEO({
    title: "Checkout | Digerati Experts Store",
    description: "Complete your purchase of IT services and solutions from Digerati Experts.",
    canonical: "/store/checkout",
    noIndex: true,
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
      primaryDomain: "",
      identityProvider: "Microsoft 365",
      technicalContact: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "AZ",
      shippingZip: "",
      deliveryNotes: "",
      termsAgreed: true,
    },
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/store");
    }
  }, [items.length, navigate]);

  const hasRecurring = snapshot.totals.monthly > 0 || snapshot.totals.annual > 0;
  const hasOneTime = snapshot.totals.dueToday > 0;

  const onSubmit = async (data: BillingFormData) => {
    setIsSubmitting(true);
    try {
      const lineItems = snapshotSubmitLines(snapshot);

      if (paymentMethod === "zoho") {
        const portalToken = localStorage.getItem("portalToken");
        if (!portalToken) {
          toast({
            title: "Sign in required",
            description: "Please sign in to your Client Portal to authorize enterprise licensing and billing.",
            variant: "destructive",
          });
          navigate("/portal/login?redirect=/store/checkout");
          return;
        }
        const response = await fetch("/api/store/checkout/zoho", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${portalToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            lineItems,
            billing: data,
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

      <main className="de-nav-clear pb-20">
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
              Checkout & Licensing Provisioning
            </h1>
            <p className="text-white/60 mb-8" data-testid="text-checkout-subtitle">
              Verify your organizational details and tenant provisioning options.
            </p>

            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-8">
                {/* Billing Information Card */}
                <div className="bg-[#151217] border border-white/10 rounded-2xl p-6 shadow-md" data-testid="section-billing-info">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Building className="w-5 h-5 text-de-magenta-ink" />
                    Organization & Contact Details
                  </h2>

                  <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                          Company Name *
                        </Label>
                        <Input
                          id="company"
                          {...register("company")}
                          required
                          placeholder="Acme Corporation"
                          className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                          data-testid="input-company"
                        />
                        {errors.company && (
                          <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          required
                          placeholder="(480) 555-0199"
                          className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                          data-testid="input-phone"
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                          Authorized Contact Name *
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          required
                          placeholder="Jane Doe"
                          className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                          data-testid="input-name"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                          Work Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          required
                          placeholder="jane@acmecorp.com"
                          className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                          data-testid="input-email"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* SaaS / Tenant Provisioning Section */}
                    {hasRecurring && (
                      <div className="mt-8 border-t border-white/10 pt-6">
                        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-sky-400" />
                          Cloud & Tenant Provisioning Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="primaryDomain" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                              Primary Work Domain
                            </Label>
                            <Input
                              id="primaryDomain"
                              {...register("primaryDomain")}
                              placeholder="acmecorp.com"
                              className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                            />
                            <p className="text-[11px] text-white/50 mt-1">Used to bind cloud licenses and M365 tenant instances.</p>
                          </div>
                          <div>
                            <Label htmlFor="identityProvider" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                              Primary Identity Platform
                            </Label>
                            <Input
                              id="identityProvider"
                              {...register("identityProvider")}
                              placeholder="Microsoft 365 / Entra ID"
                              className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hardware Delivery & Shipping */}
                    {hasOneTime && (
                      <div className="mt-8 border-t border-white/10 pt-6">
                        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-emerald-400" />
                          Hardware Delivery & Receiving Address
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="shippingAddress" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                              Delivery Street Address
                            </Label>
                            <Input
                              id="shippingAddress"
                              {...register("shippingAddress")}
                              placeholder="1234 E Innovation Way, Suite 200"
                              className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                              <Label htmlFor="shippingCity" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                                City
                              </Label>
                              <Input
                                id="shippingCity"
                                {...register("shippingCity")}
                                placeholder="Phoenix"
                                className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                              />
                            </div>
                            <div className="col-span-1">
                              <Label htmlFor="shippingState" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                                State
                              </Label>
                              <Input
                                id="shippingState"
                                {...register("shippingState")}
                                placeholder="AZ"
                                className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                              />
                            </div>
                            <div className="col-span-1">
                              <Label htmlFor="shippingZip" className="text-xs uppercase font-bold text-white/80 tracking-wider">
                                ZIP Code
                              </Label>
                              <Input
                                id="shippingZip"
                                {...register("shippingZip")}
                                placeholder="85001"
                                className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D3126A]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Legal Consent Checkbox */}
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("termsAgreed")}
                          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-[#D3126A] focus:ring-[#D3126A]"
                        />
                        <span className="text-xs leading-relaxed text-white/70">
                          I agree to the{" "}
                          <Link href="/legal/terms-of-use" className="text-[#D3126A] hover:underline font-semibold">
                            Master Services Agreement (MSA)
                          </Link>{" "}
                          and authorize Digerati Experts to administer and provision requested software licenses on behalf of our organization.
                        </span>
                      </label>
                      {errors.termsAgreed && (
                        <p className="text-red-400 text-xs mt-1.5">{errors.termsAgreed.message}</p>
                      )}
                    </div>
                  </form>
                </div>

                {/* Payment Method Card */}
                <div className="bg-[#151217] border border-white/10 rounded-2xl p-6 shadow-md" data-testid="section-payment-method">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-de-magenta-ink" />
                    Payment & Invoicing Method
                  </h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="payment-zoho"
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "zoho"
                          ? "border-[#D3126A] bg-[#1e1526]"
                          : "border-white/15 hover:border-white/30 bg-white/[0.02]"
                      }`}
                    >
                      <RadioGroupItem value="zoho" id="payment-zoho" data-testid="radio-zoho" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-de-magenta-ink" />
                          <span className="font-medium text-white">Credit Card / Direct Debit</span>
                        </div>
                        <p className="text-xs text-white/60 mt-1">
                          Enterprise gateway processing with automatic recurring invoice setup.
                        </p>
                      </div>
                      {paymentMethod === "zoho" && (
                        <Check className="w-5 h-5 text-de-magenta-ink" />
                      )}
                    </label>

                    <label
                      htmlFor="payment-quote"
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "quote_request"
                          ? "border-[#D3126A] bg-[#1e1526]"
                          : "border-white/15 hover:border-white/30 bg-white/[0.02]"
                      }`}
                    >
                      <RadioGroupItem value="quote_request" id="payment-quote" data-testid="radio-quote" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-emerald-400" />
                          <span className="font-medium text-white">Generate Formal Quote / Purchase Order</span>
                        </div>
                        <p className="text-xs text-white/60 mt-1">
                          Receive a formal corporate quote PDF for procurement and PO approval.
                        </p>
                      </div>
                      {paymentMethod === "quote_request" && (
                        <Check className="w-5 h-5 text-de-magenta-ink" />
                      )}
                    </label>
                  </RadioGroup>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-2">
                <SolutionOrderSummary
                  snapshot={snapshot}
                  title="Order Summary"
                  titleIcon={<ShoppingCart className="h-5 w-5 text-de-magenta-ink" />}
                  footer={
                    <>
                      <Button
                        type="submit"
                        form="checkout-form"
                        disabled={isSubmitting}
                        className="mt-6 w-full bg-gradient-to-r from-[#D3126A] to-[#E61E76] py-6 text-lg font-bold text-white shadow-lg shadow-[#D3126A]/30 hover:brightness-110"
                        data-testid="button-submit-order"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Authorizing...
                          </>
                        ) : paymentMethod === "quote_request" ? (
                          <>
                            <FileText className="mr-2 h-5 w-5" />
                            Generate Formal Quote
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="mr-2 h-5 w-5" />
                            Pay & Authorize Provisioning
                          </>
                        )}
                      </Button>
                      <p className="mt-4 text-center text-[11px] text-white/50 leading-relaxed">
                        Protected by 256-bit TLS encryption. Licensed under Digerati Experts Master Services Agreement.
                      </p>
                    </>
                  }
                />
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
