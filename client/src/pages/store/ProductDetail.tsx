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
  getIncludedInHint,
  getProductRelationships,
  getProductBySku,
  getRelatedProducts,
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
  Phone,
  Layers,
  Sparkles,
} from "lucide-react";
import { useStoreAuth } from "@/hooks/useStoreAuth";
import { CartButton } from "@/components/store/CartButton";
import { ProductMedia } from "@/components/store/ProductMedia";
import {
  ConfigureProductDrawer,
  type ConfigureConfirmPayload,
} from "@/components/store/ConfigureProductDrawer";
import { StoreTrustStrip } from "@/components/store/StoreTrustStrip";

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
    return getRelatedProducts(product, {
      limit: 4,
      excludeClientOnly: !isLoggedIn,
    });
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
              <Button className="bg-de-accent text-white hover:bg-[#6548ff]">
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
  const includedHint = getIncludedInHint(product.sku);
  const relationships = getProductRelationships(product.sku);
  const worksWithProducts = (relationships?.worksWith || [])
    .map((s) => getProductBySku(s))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .slice(0, 4);
  const upgradeProducts = (relationships?.upgradeTo || [])
    .map((s) => getProductBySku(s))
    .filter((p): p is NonNullable<typeof p> => !!p);
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

  const handleConfigureConfirm = (payload: ConfigureConfirmPayload) => {
    const { product: configured, quantity: qty, unitPrice, addons } = payload;
    addToCart(configured, qty, unitPrice);
    addons.forEach((addon) => {
      const { price } = getProductPrice(addon.id, addon.basePrice);
      addToCart(addon, isConfigurableProduct(addon) ? qty : 1, price);
    });
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

      <main className="de-nav-clear pb-28 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-de-accent/20 bg-de-accent/10 px-3 py-2">
                  <User className="h-4 w-4 text-de-accent-ink" />
                  <span className="text-sm text-white" data-testid="text-user-greeting">
                    Welcome,{" "}
                    <span className="font-semibold text-de-accent-ink">
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
                  className="text-white/60 hover:bg-de-accent/10 hover:text-white"
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
                className="border-none bg-de-accent text-white hover:bg-[#6548ff]"
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

          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
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
                <p className="mt-3 text-sm text-white/55">
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
                className="mb-2 block font-mono text-sm text-white/55"
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
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-sm text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {(includedHint || relationships?.includedIn) && (
                <div
                  className="mb-6 flex items-start gap-3 rounded-xl border border-de-accent/25 bg-de-accent/10 px-4 py-3"
                  data-testid="product-included-in"
                >
                  <Layers className="mt-0.5 h-5 w-5 flex-shrink-0 text-de-accent-ink" />
                  <div>
                    <p className="text-sm font-medium text-white">How it fits</p>
                    <p className="mt-0.5 text-sm text-white/65">
                      {includedHint ||
                        (relationships?.includedIn
                          ? `Included in ${relationships.includedIn}`
                          : null)}
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-8">
                {productPricing.hasDiscount ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="text-3xl font-bold text-de-accent-ink"
                        data-testid="product-price"
                      >
                        ${productPricing.price.toFixed(2)}
                      </span>
                      <span className="text-xl text-white/55 line-through">
                        ${product.basePrice.toFixed(2)}
                      </span>
                      {product.pricingUnit && (
                        <span className="text-sm text-white/50">per {product.pricingUnit}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-de-accent-ink">
                      <Tag className="h-4 w-4" />
                      <span className="text-sm font-medium" data-testid="discount-badge">
                        {productPricing.discountPercent}% client discount applied
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span
                      className="text-3xl font-bold text-de-accent-ink"
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
                          className="h-auto p-0 text-de-accent-ink hover:text-de-accent-ink"
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
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-de-accent-ink" />
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
                  <Button asChild
                      className="w-full bg-de-accent py-6 text-lg text-white hover:bg-[#6548ff]"
                      data-testid="button-schedule-consultant"
                    >
                  <a href="/book" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5" />
                      Schedule Consultant
                      <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                  <a
                    href="tel:+13254809870"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/15 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                    data-testid="button-call-product"
                  >
                    <Phone className="h-5 w-5" />
                    Call 325-480-9870
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
                          className="border-de-accent/30 bg-de-accent/10 text-white hover:bg-de-accent/20"
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
                          className="border-de-accent/30 bg-de-accent/10 text-white hover:bg-de-accent/20"
                          data-testid="button-increase-qty"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {minQty > 1 && (
                        <span className="text-xs text-white/55">Min: {minQty}</span>
                      )}
                    </div>
                  )}

                  {product.isClientOnly && !isLoggedIn ? (
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-de-accent py-6 text-lg text-white hover:bg-[#6548ff]"
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
                        className="w-full bg-de-accent py-6 text-lg text-white hover:bg-[#6548ff]"
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
                        className="w-full bg-de-accent py-6 text-lg text-white hover:bg-[#6548ff]"
                        onClick={handleAddToCart}
                        data-testid="button-add-to-cart"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart - ${(productPricing.price * quantity).toFixed(2)}
                        {productPricing.hasDiscount && (
                          <span className="ml-2 text-sm text-de-accent-ink">
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
                        <p className="flex items-center justify-center gap-1 text-center text-sm text-de-accent-ink/80">
                          <Check className="h-4 w-4" />
                          Client-only product - You have access
                        </p>
                      )}
                    </>
                  )}

                  <div className="grid gap-2 sm:grid-cols-2">
                    <a
                      href="tel:+13254809870"
                      className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                      data-testid="button-call-product"
                    >
                      <Phone className="h-4 w-4" />
                      325-480-9870
                    </a>
                    <a
                      href="/book"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                      data-testid="button-book-architect"
                    >
                      <Calendar className="h-4 w-4" />
                      Talk to an architect
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <StoreTrustStrip />

          {(worksWithProducts.length > 0 || upgradeProducts.length > 0) && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              data-testid="product-relationships"
            >
              <div className="mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-de-accent-ink" />
                <h2 className="text-2xl font-bold text-white">Solution relationships</h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {worksWithProducts.length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
                    <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-white/50">
                      Works great with
                    </h3>
                    <ul className="space-y-3">
                      {worksWithProducts.map((related) => (
                        <li key={related.id}>
                          <Link href={`/store/product/${related.sku}`}>
                            <span className="group flex items-center justify-between gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-white/10 hover:bg-white/[0.03]">
                              <span>
                                <span className="block font-medium text-white group-hover:text-de-accent-ink">
                                  {related.name}
                                </span>
                                <span className="block text-sm text-white/55 line-clamp-1">
                                  {getOutcomeLead(related)}
                                </span>
                              </span>
                              <ArrowRight className="h-4 w-4 flex-shrink-0 text-white/55 group-hover:text-de-accent-ink" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {upgradeProducts.length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
                    <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-white/50">
                      Upgrade to
                    </h3>
                    <ul className="space-y-3">
                      {upgradeProducts.map((related) => (
                        <li key={related.id}>
                          <Link href={`/store/product/${related.sku}`}>
                            <span className="group flex items-center justify-between gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-white/10 hover:bg-white/[0.03]">
                              <span>
                                <span className="block font-medium text-white group-hover:text-de-accent-ink">
                                  {related.name}
                                </span>
                                <span className="block text-sm text-white/55">
                                  {formatPrice(related)}
                                </span>
                              </span>
                              <ArrowRight className="h-4 w-4 flex-shrink-0 text-white/55 group-hover:text-de-accent-ink" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 text-2xl font-bold text-white">Related products</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((related) => (
                  <Link key={related.id} href={`/store/product/${related.sku}`}>
                    <div
                      className="group h-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-de-accent/30"
                      data-testid={`related-${related.id}`}
                    >
                      <ProductMedia
                        product={related}
                        variant="card"
                        className="rounded-none border-0 border-b border-white/10"
                      />
                      <div className="p-5">
                        <h3
                          className="mb-2 line-clamp-1 font-semibold text-white transition-colors group-hover:text-de-accent-ink"
                          title={related.name}
                        >
                          {related.name}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-white/50">
                          {getOutcomeLead(related)}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-de-accent-ink">
                            {formatPrice(related)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-white/55 transition-colors group-hover:text-de-accent-ink" />
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

      {!product.isContractOnly && !(product.isClientOnly && !isLoggedIn) && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur-md lg:hidden"
          data-testid="product-mobile-cta-bar"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{product.name}</p>
              <p className="text-sm text-de-accent-ink">{formatPrice(product)}</p>
            </div>
            {configurable ? (
              <Button
                className="bg-de-accent text-white hover:bg-[#6548ff]"
                onClick={() => setConfigureOpen(true)}
              >
                Configure
              </Button>
            ) : (
              <Button
                className="bg-de-accent text-white hover:bg-[#6548ff]"
                onClick={handleAddToCart}
              >
                Add
              </Button>
            )}
          </div>
        </div>
      )}

      <ConfigureProductDrawer
        product={configureOpen ? product : null}
        open={configureOpen}
        onClose={() => setConfigureOpen(false)}
        unitPrice={productPricing.price}
        getAddonPrice={(p) => getProductPrice(p.id, p.basePrice).price}
        onConfirm={handleConfigureConfirm}
        onRequestQuote={(payload) => {
          handleConfigureConfirm(payload);
        }}
      />

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default ProductDetail;
