import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  storeProducts,
  categoryLabels,
  formatPrice,
} from "@/data/storeProducts";
import {
  getOutcomeLead,
  getProductTags,
  isConfigurableProduct,
  configUnitLabel,
} from "@/data/storeMerchandising";
import { getProductVisual } from "@/data/productImages";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  ExternalLink,
  User,
  LogOut,
  Tag,
  Lock,
  Settings2,
} from "lucide-react";
import { useStoreAuth } from "@/hooks/useStoreAuth";
import { CartButton } from "@/components/store/CartButton";
import { ProductMedia } from "@/components/store/ProductMedia";
import { ConfigureProductDrawer } from "@/components/store/ConfigureProductDrawer";

const ProductDetail = () => {
  const { sku } = useParams<{ sku: string }>();
  const { addToCart, openCart, setClientPricing } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [configureOpen, setConfigureOpen] = useState(false);
  const { isLoggedIn, user, clientType, clientPricing, getProductPrice, loginRedirect, logout } =
    useStoreAuth();

  useEffect(() => {
    if (clientPricing.length > 0) {
      setClientPricing(clientPricing);
    }
  }, [clientPricing, setClientPricing]);

  const product = useMemo(() => storeProducts.find((p) => p.sku === sku), [sku]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    let related = storeProducts.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    if (!isLoggedIn) related = related.filter((p) => !p.isClientOnly);
    return related.slice(0, 4);
  }, [product, isLoggedIn]);

  useSEO({
    title: product ? `${product.name} | Store` : "Product Not Found | Store",
    description:
      product?.description ||
      "Product details for Digerati Experts IT services and solutions.",
    canonical: `/store/product/${sku}`,
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <MegaMenu />
        <main className="de-nav-clear pb-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold text-white">Product Not Found</h1>
            <p className="mb-8 text-white/60">The product you're looking for doesn't exist.</p>
            <Link href="/store">
              <Button className="bg-[#5034ff] text-white hover:bg-[#6548ff]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Store
              </Button>
            </Link>
          </div>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    );
  }

  const visual = getProductVisual(product);
  const minQty = product.minimumQuantity;
  const tags = getProductTags(product);
  const configurable = isConfigurableProduct(product);
  const productPricing = getProductPrice(product.id, product.basePrice);
  const storeLink = product.isContractOnly ? "/store/managed" : "/store/co-managed";
  const storeLabel = product.isContractOnly ? "Managed Services" : "Co-Managed Products";
  const seoImage = visual.heroUrl.startsWith("http")
    ? visual.heroUrl
    : `https://digeratiexperts.com${visual.heroUrl}`;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(minQty, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, productPricing.price);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
    openCart();
  };

  const handleConfigureConfirm = (
    configured: typeof product,
    qty: number,
    unitPrice: number
  ) => {
    addToCart(configured, qty, unitPrice);
    toast({
      title: "Added to Cart",
      description: `${qty}x ${configured.name} has been added to your cart.`,
    });
    openCart();
    setConfigureOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ProductJsonLd
        name={product.name}
        description={product.description}
        price={productPricing.price.toFixed(2)}
        image={seoImage}
        url={`/store/product/${product.sku}`}
        sku={product.sku}
        category={product.category}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Store", url: "/store" },
          { name: storeLabel, url: storeLink },
          { name: product.name, url: `/store/product/${product.sku}` },
        ]}
      />
      <MegaMenu />

      <main className="de-nav-clear pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-[#5034ff]/20 bg-[#5034ff]/10 px-3 py-2">
                  <User className="h-4 w-4 text-[#a78bfa]" />
                  <span className="text-sm text-white" data-testid="text-user-greeting">
                    Welcome,{" "}
                    <span className="font-semibold text-[#c4b5fd]">
                      {user.fullName || user.username}
                    </span>
                  </span>
                  {clientType !== "public" && (
                    <span className="ml-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                      {clientType === "managed" ? "Managed Client" : "Co-Managed Client"}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-white/60 hover:bg-[#5034ff]/10 hover:text-white"
                  data-testid="button-store-logout"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={loginRedirect}
                className="border-none bg-[#5034ff] text-white hover:bg-[#6548ff]"
                data-testid="button-store-login"
              >
                <User className="mr-2 h-4 w-4" />
                Login for Client Pricing
              </Button>
            )}
            <CartButton />
          </div>

          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link
                  href="/store"
                  className="transition-colors hover:text-white"
                  data-testid="breadcrumb-store"
                >
                  Store
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={storeLink}
                  className="transition-colors hover:text-white"
                  data-testid="breadcrumb-category"
                >
                  {storeLabel}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white" data-testid="breadcrumb-product">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="mb-20 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductMedia
                product={product}
                variant="detail"
                categoryBadge={categoryLabels[product.category]}
              />
              {visual.vendor && (
                <p className="mt-3 text-sm text-white/45">
                  Powered with <span className="text-white/70">{visual.vendor.name}</span> in the DE
                  stack
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                className="mb-2 block font-mono text-sm text-white/40"
                data-testid="product-sku"
              >
                SKU: {product.sku}
              </span>
              <h1
                className="mb-3 text-3xl font-bold text-white md:text-4xl"
                data-testid="product-name"
              >
                {product.name}
              </h1>
              <p className="mb-3 text-lg font-medium leading-relaxed text-white/85">
                {getOutcomeLead(product)}
              </p>
              <p
                className="mb-6 text-base leading-relaxed text-white/60"
                data-testid="product-description"
              >
                {product.description}
              </p>

              {tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mb-8">
                {productPricing.hasDiscount ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="text-3xl font-bold text-[#a78bfa]"
                        data-testid="product-price"
                      >
                        ${productPricing.price.toFixed(2)}
                      </span>
                      <span className="text-xl text-white/40 line-through">
                        ${product.basePrice.toFixed(2)}
                      </span>
                      {product.pricingUnit && (
                        <span className="text-sm text-white/50">per {product.pricingUnit}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[#a78bfa]">
                      <Tag className="h-4 w-4" />
                      <span className="text-sm font-medium" data-testid="discount-badge">
                        {productPricing.discountPercent}% client discount applied
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span
                      className="text-3xl font-bold text-[#a78bfa]"
                      data-testid="product-price"
                    >
                      {formatPrice(product)}
                    </span>
                    {product.pricingUnit && (
                      <span className="ml-2 text-sm text-white/50">per {product.pricingUnit}</span>
                    )}
                    {!isLoggedIn && (
                      <div className="mt-2">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={loginRedirect}
                          className="h-auto p-0 text-[#a78bfa] hover:text-[#c4b5fd]"
                          data-testid="button-login-for-pricing"
                        >
                          <User className="mr-1 h-3 w-3" />
                          Log in for potential client pricing
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="mb-4 font-semibold text-white">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3" data-testid={`feature-${idx}`}>
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#a78bfa]" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {product.isContractOnly ? (
                <div className="space-y-4">
                  <p className="text-sm text-white/60">
                    This is a contract-based service. Schedule a consultation to discuss your needs
                    and receive a custom quote.
                  </p>
                  <a href="/book" target="_blank" rel="noopener noreferrer">
                    <Button
                      className="w-full bg-[#5034ff] py-6 text-lg text-white hover:bg-[#6548ff]"
                      data-testid="button-schedule-consultant"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Consultant
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {!configurable && (
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm text-white/60">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= minQty}
                          className="border-[#5034ff]/30 bg-[#5034ff]/10 text-white hover:bg-[#5034ff]/20"
                          data-testid="button-decrease-qty"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span
                          className="w-14 text-center text-lg font-medium text-white"
                          data-testid="product-quantity"
                        >
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(1)}
                          className="border-[#5034ff]/30 bg-[#5034ff]/10 text-white hover:bg-[#5034ff]/20"
                          data-testid="button-increase-qty"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {minQty > 1 && (
                        <span className="text-xs text-white/40">Min: {minQty}</span>
                      )}
                    </div>
                  )}

                  {product.isClientOnly && !isLoggedIn ? (
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-[#5034ff] py-6 text-lg text-white hover:bg-[#6548ff]"
                        onClick={loginRedirect}
                        data-testid="button-login-to-purchase"
                      >
                        <Lock className="mr-2 h-5 w-5" />
                        Login to Purchase
                      </Button>
                      <p className="text-center text-sm text-amber-400/80">
                        This is a client-only product. Please log in to your portal account to
                        purchase.
                      </p>
                    </div>
                  ) : configurable ? (
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-[#5034ff] py-6 text-lg text-white hover:bg-[#6548ff]"
                        onClick={() => setConfigureOpen(true)}
                        data-testid="button-configure"
                      >
                        <Settings2 className="mr-2 h-5 w-5" />
                        Configure {configUnitLabel(product)} &amp; Add
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-white/15 bg-transparent py-5 text-white hover:bg-white/5"
                        onClick={handleAddToCart}
                        data-testid="button-add-to-cart"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Quick add · ${(productPricing.price * quantity).toFixed(2)}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        className="w-full bg-[#5034ff] py-6 text-lg text-white hover:bg-[#6548ff]"
                        onClick={handleAddToCart}
                        data-testid="button-add-to-cart"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart - ${(productPricing.price * quantity).toFixed(2)}
                        {productPricing.hasDiscount && (
                          <span className="ml-2 text-sm text-[#c4b5fd]">
                            (You save $
                            {(
                              (product.basePrice - productPricing.price) *
                              quantity
                            ).toFixed(2)}
                            )
                          </span>
                        )}
                      </Button>
                      {product.isClientOnly && (
                        <p className="flex items-center justify-center gap-1 text-center text-sm text-[#a78bfa]/80">
                          <Check className="h-4 w-4" />
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
              <h2 className="mb-6 text-2xl font-bold text-white">Related Products</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((related) => (
                  <Link key={related.id} href={`/store/product/${related.sku}`}>
                    <div
                      className="group h-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#5034ff]/30"
                      data-testid={`related-${related.id}`}
                    >
                      <ProductMedia
                        product={related}
                        variant="card"
                        className="rounded-none border-0 border-b border-white/10"
                      />
                      <div className="p-5">
                        <h3
                          className="mb-2 line-clamp-1 font-semibold text-white transition-colors group-hover:text-[#c4b5fd]"
                          title={related.name}
                        >
                          {related.name}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-white/50">
                          {related.shortDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#a78bfa]">
                            {formatPrice(related)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-[#a78bfa]" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      <ConfigureProductDrawer
        product={configureOpen ? product : null}
        open={configureOpen}
        onClose={() => setConfigureOpen(false)}
        unitPrice={productPricing.price}
        onConfirm={handleConfigureConfirm}
      />

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default ProductDetail;
