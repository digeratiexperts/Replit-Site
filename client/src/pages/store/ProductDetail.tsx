import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  storeProducts,
  categoryLabels,
  formatPrice,
  type StoreProduct,
  type ProductCategory,
} from "@/data/storeProducts";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Shield,
  Users,
  Building,
  Phone,
  Monitor,
  Wifi,
  Headphones,
  Cloud,
  FileCheck,
  GraduationCap,
  Wrench,
  Package,
  Settings,
  Server,
  ExternalLink,
  User,
  LogOut,
  Tag,
  Lock,
} from "lucide-react";
import { useStoreAuth } from "@/hooks/useStoreAuth";
import { CartButton } from "@/components/store/CartButton";

const categoryIcons: Record<ProductCategory, typeof Shield> = {
  contract_services: Building,
  comanaged_subscriptions: Users,
  comanaged_onboarding: Settings,
  networking_managed: Wifi,
  networking_projects: Server,
  ucaas_subscriptions: Phone,
  ucaas_setup: Headphones,
  hardware_provisioning: Monitor,
  hardware_physical: Package,
  hardware_handling: Wrench,
  digital_assessments: Shield,
  digital_templates: FileCheck,
  digital_training: GraduationCap,
  professional_services: Cloud,
};

const ProductDetail = () => {
  const { sku } = useParams<{ sku: string }>();
  const { addToCart, openCart, setClientPricing } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const { isLoggedIn, user, clientType, clientPricing, getProductPrice, loginRedirect, logout } = useStoreAuth();

  useEffect(() => {
    if (clientPricing.length > 0) {
      setClientPricing(clientPricing);
    }
  }, [clientPricing, setClientPricing]);

  const product = useMemo(() => {
    return storeProducts.find((p) => p.sku === sku);
  }, [sku]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    let related = storeProducts.filter((p) => p.category === product.category && p.id !== product.id);
    if (!isLoggedIn) {
      related = related.filter((p) => !p.isClientOnly);
    }
    return related.slice(0, 4);
  }, [product, isLoggedIn]);

  useSEO({
    title: product ? `${product.name} | Store` : "Product Not Found | Store",
    description: product?.description || "Product details for Digerati Experts IT services and solutions.",
    canonical: `/store/product/${sku}`,
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <MegaMenu />
        <main className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-white/60 mb-8">The product you're looking for doesn't exist.</p>
            <Link href="/store">
              <Button className="bg-violet-600 hover:bg-violet-500 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
            </Link>
          </div>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    );
  }

  const Icon = categoryIcons[product.category];
  const minQty = product.minimumQuantity;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(minQty, prev + delta));
  };

  const productPricing = product ? getProductPrice(product.id, product.basePrice) : { price: 0, hasDiscount: false, discountPercent: 0 };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, productPricing.price);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
    openCart();
  };

  const storeLink = product.isContractOnly ? "/store/managed" : "/store/co-managed";
  const storeLabel = product.isContractOnly ? "Managed Services" : "Co-Managed Products";

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Auth & Cart Header */}
          <div className="flex items-center justify-between mb-4">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <User className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-white" data-testid="text-user-greeting">
                    Welcome, <span className="font-semibold text-violet-300">{user.fullName || user.username}</span>
                  </span>
                  {clientType !== "public" && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                      {clientType === "managed" ? "Managed Client" : "Co-Managed Client"}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-white/60 hover:text-white hover:bg-violet-500/10"
                  data-testid="button-store-logout"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline"
                size="sm"
                onClick={loginRedirect}
                className="bg-violet-600 hover:bg-violet-500 text-white border-none"
                data-testid="button-store-login"
              >
                <User className="w-4 h-4 mr-2" />
                Login for Client Pricing
              </Button>
            )}
            <CartButton />
          </div>

          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/store" className="hover:text-white transition-colors" data-testid="breadcrumb-store">
                  Store
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={storeLink} className="hover:text-white transition-colors" data-testid="breadcrumb-category">
                  {storeLabel}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white" data-testid="breadcrumb-product">{product.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-500/20 flex items-center justify-center">
                <Icon className="w-32 h-32 text-violet-400/50" />
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium border border-violet-500/30">
                  {categoryLabels[product.category]}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-white/40 text-sm font-mono mb-2 block" data-testid="product-sku">
                SKU: {product.sku}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="product-name">
                {product.name}
              </h1>
              <p className="text-white/70 text-lg mb-6 leading-relaxed" data-testid="product-description">
                {product.description}
              </p>

              <div className="mb-8">
                {productPricing.hasDiscount ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-violet-400" data-testid="product-price">
                        ${productPricing.price.toFixed(2)}
                      </span>
                      <span className="text-xl text-white/40 line-through">${product.basePrice.toFixed(2)}</span>
                      {product.pricingUnit && (
                        <span className="text-white/50 text-sm">per {product.pricingUnit}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-violet-400">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm font-medium" data-testid="discount-badge">
                        {productPricing.discountPercent}% client discount applied
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold text-violet-400" data-testid="product-price">
                      {formatPrice(product)}
                    </span>
                    {product.pricingUnit && (
                      <span className="text-white/50 text-sm ml-2">per {product.pricingUnit}</span>
                    )}
                    {!isLoggedIn && (
                      <div className="mt-2">
                        <Button 
                          variant="link"
                          size="sm"
                          onClick={loginRedirect}
                          className="text-violet-400 hover:text-violet-300 p-0 h-auto"
                          data-testid="button-login-for-pricing"
                        >
                          <User className="w-3 h-3 mr-1" />
                          Log in for potential client pricing
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3" data-testid={`feature-${idx}`}>
                      <Check className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {product.isContractOnly ? (
                <div className="space-y-4">
                  <p className="text-white/60 text-sm">
                    This is a contract-based service. Schedule a consultation to discuss your needs and receive a custom quote.
                  </p>
                  <a
                    href="https://meet.digerati-experts.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="w-full bg-violet-600 hover:bg-violet-500 text-white py-6 text-lg"
                      data-testid="button-schedule-consultant"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Consultant
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-white/60 text-sm">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= minQty}
                        className="bg-violet-500/10 border-violet-500/30 text-white hover:bg-violet-500/20"
                        data-testid="button-decrease-qty"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-14 text-center text-white font-medium text-lg" data-testid="product-quantity">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        className="bg-violet-500/10 border-violet-500/30 text-white hover:bg-violet-500/20"
                        data-testid="button-increase-qty"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {minQty > 1 && (
                      <span className="text-white/40 text-xs">Min: {minQty}</span>
                    )}
                  </div>

                  {product.isClientOnly && !isLoggedIn ? (
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-violet-600 hover:bg-violet-500 text-white py-6 text-lg"
                        onClick={loginRedirect}
                        data-testid="button-login-to-purchase"
                      >
                        <Lock className="w-5 h-5 mr-2" />
                        Login to Purchase
                      </Button>
                      <p className="text-amber-400/80 text-sm text-center">
                        This is a client-only product. Please log in to your portal account to purchase.
                      </p>
                    </div>
                  ) : (
                    <>
                      <Button
                        className="w-full bg-violet-600 hover:bg-violet-500 text-white py-6 text-lg"
                        onClick={handleAddToCart}
                        data-testid="button-add-to-cart"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart - ${(productPricing.price * quantity).toFixed(2)}
                        {productPricing.hasDiscount && (
                          <span className="ml-2 text-violet-300 text-sm">(You save ${((product.basePrice - productPricing.price) * quantity).toFixed(2)})</span>
                        )}
                      </Button>
                      {product.isClientOnly && (
                        <p className="text-violet-400/80 text-sm text-center flex items-center justify-center gap-1">
                          <Check className="w-4 h-4" />
                          Client-only product - You have access
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => {
                  const RelatedIcon = categoryIcons[related.category];
                  return (
                    <Link key={related.id} href={`/store/product/${related.sku}`}>
                      <div
                        className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-violet-500/30 transition-all duration-300 group cursor-pointer h-full"
                        data-testid={`related-${related.id}`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/30 transition-colors">
                            <RelatedIcon className="w-5 h-5 text-violet-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold line-clamp-1 group-hover:text-violet-300 transition-colors">
                              {related.name}
                            </h3>
                          </div>
                        </div>
                        <p className="text-white/50 text-sm line-clamp-2 mb-3">{related.shortDescription}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-violet-400 font-semibold">{formatPrice(related)}</span>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-violet-400 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default ProductDetail;
