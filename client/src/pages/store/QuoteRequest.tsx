import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useSEO } from "@/hooks/useSEO";
import { useCart, isRecurringPricing } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { type PricingType } from "@/data/storeProducts";
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  Loader2,
  Package,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const quoteRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
});

type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;

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

const QuoteRequest = () => {
  const [, navigate] = useLocation();
  const { items, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSEO({
    title: "Request a Quote | Digerati Experts Store",
    description: "Request a custom quote for IT services and solutions from Digerati Experts.",
    canonical: "/store/quote-request",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const getPricingLabel = (pricingType: PricingType) => {
    return pricingUnitLabels[pricingType] || "";
  };

  const recurringItems = items.filter((item) => isRecurringPricing(item.product.pricingType));
  const oneTimeItems = items.filter((item) => !isRecurringPricing(item.product.pricingType));

  const onSubmit = async (data: QuoteRequestFormData) => {
    if (items.length === 0) {
      toast({
        title: "No Items",
        description: "Please add items to your cart before requesting a quote.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const requestedItems = items.map((item) => ({
        productId: item.product.id,
        sku: item.product.sku,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.basePrice,
        pricingType: item.product.pricingType,
        total: item.product.basePrice * item.quantity,
      }));

      const response = await fetch("/api/store/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName: data.name,
          contactEmail: data.email,
          contactPhone: data.phone || null,
          companyName: data.company || null,
          message: data.message || null,
          requestedItems,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create quote request");
      }

      const result = await response.json();
      clearCart();
      navigate(`/store/quote-confirmation/${result.id}`);
    } catch (error: any) {
      console.error("Quote request error:", error);
      toast({
        title: "Request Failed",
        description: error.message || "Unable to submit your quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <MegaMenu />
        <main className="de-nav-clear pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-xl p-12"
            >
              <Package className="w-16 h-16 text-white/40 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-white mb-4" data-testid="text-empty-cart-title">
                No Items to Quote
              </h1>
              <p className="text-white/60 mb-8" data-testid="text-empty-cart-message">
                Add items to your cart before requesting a quote.
              </p>
              <Link href="/store">
                <Button className="bg-violet-600 hover:bg-violet-500 text-white" data-testid="button-browse-store">
                  Browse Store
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    );
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
              <li className="text-white" data-testid="breadcrumb-quote-request">Request Quote</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4 mb-8">
            <Link href="/store/checkout">
              <Button variant="ghost" className="text-white/60 hover:text-white" data-testid="button-back-to-checkout">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Checkout
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="text-quote-request-title">
              Request a Quote
            </h1>
            <p className="text-white/60 mb-8" data-testid="text-quote-request-subtitle">
              Get a custom quote from our team. We'll contact you within 1 business day.
            </p>

            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="section-contact-info">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-violet-400" />
                    Contact Information
                  </h2>

                  <form id="quote-request-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white/80">
                        Additional Details
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell us about your specific requirements or questions..."
                        rows={4}
                        className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-violet-500 resize-none"
                        data-testid="input-message"
                      />
                    </div>
                  </form>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-6" data-testid="section-quote-info">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      A Digerati Experts consultant will review your request
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      You'll receive a detailed quote within 1 business day
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      Custom pricing based on your specific needs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      No obligation - review the quote at your convenience
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-28" data-testid="section-items-summary">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-violet-400" />
                    Items to Quote
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
                            data-testid={`quote-item-${item.product.id}`}
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
                            data-testid={`quote-item-${item.product.id}`}
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
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/20 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Estimated Total</span>
                      <span className="text-violet-400" data-testid="text-estimated-total">
                        {formatCurrency(getCartTotal())}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">
                      Final pricing may vary based on your specific requirements
                    </p>
                  </div>

                  <Button
                    type="submit"
                    form="quote-request-form"
                    disabled={isSubmitting}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white py-6 text-lg font-semibold"
                    data-testid="button-submit-quote"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Submit Quote Request
                      </>
                    )}
                  </Button>
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

export default QuoteRequest;
