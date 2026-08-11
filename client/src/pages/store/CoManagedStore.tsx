import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Link, useSearch } from "wouter";
import {
  ArrowRight,
  Users,
  ShoppingCart,
  Lock,
  Phone,
  User,
  LogOut,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  storeProducts,
  categoryLabels,
  categoryDescriptions,
  getCheckoutEnabledProducts,
  type ProductCategory,
  type PricingType,
  type StoreProduct,
} from "@/data/storeProducts";
import {
  productMatchesOutcome,
  productMatchesVendor,
  productMatchesCompliance,
  productMatchesSize,
  listVendorsForProducts,
  searchProducts,
  sortProducts,
  isConfigurableProduct,
  type StoreOutcomeId,
  type StoreComplianceId,
  type StoreSizeId,
  type StoreSortOption,
} from "@/data/storeMerchandising";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { CartButton } from "@/components/store/CartButton";
import { useStoreAuth } from "@/hooks/useStoreAuth";
import { PORTAL_LOGIN } from "@/lib/portalUrls";
import { openMspAdvisor } from "@/lib/openMspAdvisor";
import { StoreTrustStrip } from "@/components/store/StoreTrustStrip";
import { ShopByOutcome } from "@/components/store/ShopByOutcome";
import { MerchandisingRails } from "@/components/store/MerchandisingRails";
import { StoreProductCard } from "@/components/store/StoreProductCard";
import { StoreCatalogToolbar } from "@/components/store/StoreCatalogToolbar";
import { StoreAssessmentPanel } from "@/components/store/StoreAssessmentPanel";
import { StoreBundlesSection } from "@/components/store/StoreBundlesSection";
import { ConfigureProductDrawer } from "@/components/store/ConfigureProductDrawer";
import { GuidedBuyingWizard } from "@/components/store/GuidedBuyingWizard";
import {
  ProductCompareBar,
  ProductCompareDrawer,
  canAddToCompare,
  MAX_COMPARE,
} from "@/components/store/ProductCompare";
import { CoverageScorePanel } from "@/components/store/CoverageScorePanel";

const CoManagedStore = () => {
  const prefersReducedMotion = useReducedMotion();
  const searchString = useSearch();
  const { toast } = useToast();
  const { addToCart, openCart, setClientPricing, items } = useCart();
  const {
    isLoggedIn,
    user,
    clientType,
    clientPricing,
    getProductPrice,
    loginRedirect,
    logout,
  } = useStoreAuth();

  const catalogRef = useRef<HTMLDivElement>(null);
  const urlParams = new URLSearchParams(searchString);
  const initialCategory = urlParams.get("category") as ProductCategory | null;
  const initialOutcome = urlParams.get("outcome") as StoreOutcomeId | null;
  const initialVendor = urlParams.get("vendor") || "";
  const initialCompliance = urlParams.get("compliance") as StoreComplianceId | null;
  const initialSize = urlParams.get("size") as StoreSizeId | null;
  const initialQ = urlParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(
    initialCategory && categoryLabels[initialCategory] ? initialCategory : "all"
  );
  const [selectedOutcome, setSelectedOutcome] = useState<StoreOutcomeId | null>(
    initialOutcome || null
  );
  const [selectedVendor, setSelectedVendor] = useState<string | "all">(
    initialVendor || "all"
  );
  const [selectedCompliance, setSelectedCompliance] = useState<StoreComplianceId | "all">(
    initialCompliance || "all"
  );
  const [selectedSize, setSelectedSize] = useState<StoreSizeId | "all">(
    initialSize || "all"
  );
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [billingType, setBillingType] = useState<PricingType | "all">("all");
  const [sort, setSort] = useState<StoreSortOption>("recommended");
  const [compareList, setCompareList] = useState<StoreProduct[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [configureProduct, setConfigureProduct] = useState<StoreProduct | null>(null);
  const [guidedOpen, setGuidedOpen] = useState(false);

  useEffect(() => {
    if (clientPricing.length > 0) {
      setClientPricing(clientPricing);
    }
  }, [clientPricing, setClientPricing]);

  useSEO({
    title: "IT Store Catalog | Digerati Experts",
    description:
      "Guided IT storefront: shop by outcome, browse curated rails, and purchase co-managed products — endpoint, security, UCaaS, hardware, and professional services.",
    canonical: "/store/co-managed",
  });

  const checkoutProducts = useMemo(() => getCheckoutEnabledProducts(), []);

  const visibleBase = useMemo(() => {
    if (!isLoggedIn) {
      return checkoutProducts.filter((p) => !p.isClientOnly);
    }
    return checkoutProducts;
  }, [checkoutProducts, isLoggedIn]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(visibleBase.map((p) => p.category))) as ProductCategory[];
    return cats.sort((a, b) => {
      const orderA = storeProducts.find((p) => p.category === a)?.sortOrder || 999;
      const orderB = storeProducts.find((p) => p.category === b)?.sortOrder || 999;
      return orderA - orderB;
    });
  }, [visibleBase]);

  const billingTypes = useMemo(() => {
    return Array.from(new Set(visibleBase.map((p) => p.pricingType))) as PricingType[];
  }, [visibleBase]);

  const vendors = useMemo(() => listVendorsForProducts(visibleBase), [visibleBase]);

  const filteredProducts = useMemo(() => {
    let products = visibleBase;

    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category === selectedCategory);
    }
    if (billingType !== "all") {
      products = products.filter((p) => p.pricingType === billingType);
    }
    if (selectedOutcome) {
      products = products.filter((p) => productMatchesOutcome(p, selectedOutcome));
    }
    if (selectedVendor !== "all") {
      products = products.filter((p) => productMatchesVendor(p, selectedVendor));
    }
    if (selectedCompliance !== "all") {
      products = products.filter((p) => productMatchesCompliance(p, selectedCompliance));
    }
    if (selectedSize !== "all") {
      products = products.filter((p) => productMatchesSize(p, selectedSize));
    }
    products = searchProducts(products, searchQuery);
    return sortProducts(products, sort);
  }, [
    visibleBase,
    selectedCategory,
    billingType,
    selectedOutcome,
    selectedVendor,
    selectedCompliance,
    selectedSize,
    searchQuery,
    sort,
  ]);

  const handleAddToCart = (product: StoreProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.isCheckoutEnabled || product.isContractOnly) return;
    if (isConfigurableProduct(product)) {
      setConfigureProduct(product);
      return;
    }
    const { price } = getProductPrice(product.id, product.basePrice);
    addToCart(product, 1, price);
    toast({
      title: "Added to your solution",
      description: `${product.name} has been added.`,
    });
    openCart();
  };

  const handleConfigureConfirm = (product: StoreProduct, quantity: number, unitPrice: number) => {
    addToCart(product, quantity, unitPrice);
    setConfigureProduct(null);
    toast({
      title: "Configured service added",
      description: `${quantity} × ${product.name}`,
    });
    openCart();
  };

  const toggleCompare = (product: StoreProduct) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (!canAddToCompare(prev, product)) {
        toast({
          title: "Compare limit",
          description: `Select up to ${MAX_COMPARE} products.`,
        });
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleAddBundle = (products: StoreProduct[]) => {
    products.forEach((product) => {
      const { price } = getProductPrice(product.id, product.basePrice);
      addToCart(product, 1, price);
    });
    toast({
      title: "Bundle items added",
      description: `${products.length} products added to your solution.`,
    });
    openCart();
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOutcomeSelect = (id: StoreOutcomeId | null) => {
    setSelectedOutcome(id);
    if (id) {
      setSelectedCategory("all");
      scrollToCatalog();
    }
  };

  const containerVariants = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
      };

  const itemVariants = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />

      <main className="pb-20 de-nav-clear">
        <div className="mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
          {/* Auth & Cart */}
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
                className="h-11 border-none bg-[#5034ff] px-5 text-base text-white hover:bg-[#6548ff]"
                data-testid="button-store-login"
              >
                <User className="mr-2 h-4 w-4" />
                Login for Client Pricing
              </Button>
            )}
            <CartButton />
          </div>

          <div className="mb-8 flex items-center gap-2 text-base text-white/50">
            <Link href="/store" className="transition-colors hover:text-white">
              Store
            </Link>
            <span>/</span>
            <span className="text-white">Catalog</span>
          </div>

          {/* Hero — guided selling first */}
          <motion.div
            className="mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5034ff]/25 bg-[#5034ff]/10 px-4 py-2">
              <Users className="h-4 w-4 text-[#a78bfa]" />
              <span className="text-sm text-[#c4b5fd]">Guided IT Storefront</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Tell us what you&apos;re trying to{" "}
              <span className="text-[#a78bfa]">accomplish.</span>
            </h1>
            <p className="text-lg leading-relaxed text-white/70 md:text-xl">
              Shop by outcome, build a recommended stack with Ask Digerati, then buy from the live
              catalog when you know what you need.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                className="h-12 bg-[#5034ff] px-6 text-base text-white hover:bg-[#6548ff]"
                onClick={() => setGuidedOpen(true)}
                data-testid="button-build-solution"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Build my solution
              </Button>
              <Button
                variant="outline"
                className="h-12 border-white/20 bg-transparent px-6 text-base text-white hover:bg-white/5"
                onClick={() => openMspAdvisor({ context: "store" })}
                data-testid="button-ask-digerati"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask Digerati
              </Button>
              <Button
                variant="ghost"
                className="h-12 text-base text-white/70 hover:bg-white/5 hover:text-white"
                onClick={scrollToCatalog}
                data-testid="button-browse-everything"
              >
                Browse everything
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <StoreTrustStrip />

          <ShopByOutcome selected={selectedOutcome} onSelect={handleOutcomeSelect} />

          {/* Inline assessment entry (relocated — not mid-grid banner) */}
          <div className="mb-10 lg:hidden">
            <StoreAssessmentPanel
              variant="inline"
              onBuildSolution={() => setGuidedOpen(true)}
              onFilterAssessments={() => {
                setSelectedCategory("digital_assessments");
                setSelectedOutcome(null);
                scrollToCatalog();
              }}
            />
          </div>

          <MerchandisingRails
            isLoggedIn={isLoggedIn}
            getPrice={getProductPrice}
            onAddToCart={handleAddToCart}
            onConfigure={(p) => setConfigureProduct(p)}
            onLoginRequired={loginRedirect}
          />

          <StoreBundlesSection isLoggedIn={isLoggedIn} onAddBundle={handleAddBundle} />

          {/* Catalog + sticky assessment */}
          <div ref={catalogRef} className="scroll-mt-28">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white md:text-4xl">Full catalog</h2>
                <p className="mt-2 text-base text-white/60">
                  Larger cards · outcome-first blurbs · technical bullets · Add to cart
                </p>
              </div>
              {selectedOutcome && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 border-white/15 bg-transparent text-base text-white hover:bg-white/5"
                  onClick={() => setSelectedOutcome(null)}
                  data-testid="button-clear-outcome"
                >
                  Clear outcome filter
                </Button>
              )}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <StoreCatalogToolbar
                  search={searchQuery}
                  onSearchChange={setSearchQuery}
                  category={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  categories={categories}
                  billingType={billingType}
                  onBillingTypeChange={setBillingType}
                  billingTypes={billingTypes}
                  outcome={selectedOutcome || "all"}
                  onOutcomeChange={(v) => setSelectedOutcome(v === "all" ? null : v)}
                  vendor={selectedVendor}
                  onVendorChange={setSelectedVendor}
                  vendors={vendors}
                  compliance={selectedCompliance}
                  onComplianceChange={setSelectedCompliance}
                  size={selectedSize}
                  onSizeChange={setSelectedSize}
                  sort={sort}
                  onSortChange={setSort}
                  resultCount={filteredProducts.length}
                  totalCount={visibleBase.length}
                />

                {/* Category chips — restored for scannability (toolbar Select remains) */}
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    className={
                      selectedCategory === "all"
                        ? "bg-[#5034ff] text-white hover:bg-[#6548ff]"
                        : "border-white/15 bg-transparent text-white/80 hover:bg-white/5"
                    }
                    onClick={() => setSelectedCategory("all")}
                    data-testid="filter-all"
                  >
                    All ({visibleBase.length})
                  </Button>
                  {categories.map((category) => {
                    const count = visibleBase.filter((p) => p.category === category).length;
                    return (
                      <Button
                        key={category}
                        type="button"
                        size="sm"
                        variant={selectedCategory === category ? "default" : "outline"}
                        className={
                          selectedCategory === category
                            ? "bg-[#5034ff] text-white hover:bg-[#6548ff]"
                            : "border-white/15 bg-transparent text-white/80 hover:bg-white/5"
                        }
                        onClick={() => setSelectedCategory(category)}
                        data-testid={`filter-${category}`}
                      >
                        {categoryLabels[category]} ({count})
                      </Button>
                    );
                  })}
                </div>

                {selectedCategory !== "all" && (
                  <div className="mb-6 rounded-xl border border-[#5034ff]/20 bg-[#5034ff]/10 p-4">
                    <h3 className="mb-1 font-semibold text-white">
                      {categoryLabels[selectedCategory]}
                    </h3>
                    <p className="text-sm text-white/60">
                      {categoryDescriptions[selectedCategory]}
                    </p>
                  </div>
                )}

                <motion.div
                  className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${selectedCategory}-${selectedOutcome}-${selectedVendor}-${selectedCompliance}-${selectedSize}-${searchQuery}-${billingType}-${sort}`}
                >
                  {filteredProducts.map((product) => {
                    const pricing = getProductPrice(product.id, product.basePrice);
                    return (
                      <motion.div key={product.id} variants={itemVariants}>
                        <StoreProductCard
                          product={product}
                          price={pricing.price}
                          hasDiscount={pricing.hasDiscount}
                          discountPercent={pricing.discountPercent}
                          isLoggedIn={isLoggedIn}
                          onAddToCart={handleAddToCart}
                          onConfigure={(p) => setConfigureProduct(p)}
                          onLoginRequired={loginRedirect}
                          compareSelected={compareList.some((p) => p.id === product.id)}
                          compareDisabled={
                            compareList.length >= MAX_COMPARE &&
                            !compareList.some((p) => p.id === product.id)
                          }
                          onCompareToggle={toggleCompare}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>

                {filteredProducts.length === 0 && (
                  <div className="mb-10 rounded-xl border border-white/10 bg-[#121212] py-16 text-center">
                    <p className="text-lg text-white/50">No products match these filters.</p>
                    <Button
                      className="mt-4 bg-[#5034ff] text-white hover:bg-[#6548ff]"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setBillingType("all");
                        setSelectedOutcome(null);
                      }}
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>

              <div className="hidden lg:block">
                <StoreAssessmentPanel
                  variant="sticky"
                  onBuildSolution={() => setGuidedOpen(true)}
                  onFilterAssessments={() => {
                    setSelectedCategory("digital_assessments");
                    setSelectedOutcome(null);
                    scrollToCatalog();
                  }}
                />
              </div>
            </div>
          </div>

          {/* Info — elevated, not deleted */}
          <motion.section
            className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#141414] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#5034ff]/25 bg-[#5034ff]/15">
                    <ShoppingCart className="h-5 w-5 text-[#a78bfa]" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Checkout enabled</h3>
                    <p className="text-sm text-white/60">
                      Catalog products can be purchased directly. Configure unit counts where needed,
                      then checkout or save a quote from Your Solution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#141414] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#5034ff]/25 bg-[#5034ff]/15">
                    <Lock className="h-5 w-5 text-[#a78bfa]" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Client-only products</h3>
                    <p className="text-sm text-white/60">
                      Some products require an existing client relationship.{" "}
                      <Link href={PORTAL_LOGIN} className="text-[#a78bfa] hover:text-[#c4b5fd]">
                        Log in to your portal
                      </Link>{" "}
                      for exclusive pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CoverageScorePanel
              products={items.map((i) => i.product)}
              onAddSuggestion={(product) => {
                if (isConfigurableProduct(product)) {
                  setConfigureProduct(product);
                  return;
                }
                const { price } = getProductPrice(product.id, product.basePrice);
                addToCart(product, 1, price);
                openCart();
              }}
            />
          </motion.section>

          <motion.section
            className="rounded-2xl border border-white/10 bg-[#141414] p-8 text-center md:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Need a complete solution?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/60">
              Looking for full-service managed IT instead of à la carte products? Explore ProActive
              Ecosystem plans for all-inclusive support — or ask Digerati to recommend a stack.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/store/managed">
                <Button
                  size="lg"
                  className="h-12 bg-[#5034ff] px-6 text-white hover:bg-[#6548ff]"
                  data-testid="button-view-managed"
                >
                  View Managed IT Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                className="h-12 border-2 border-white/25 bg-transparent px-6 text-white hover:bg-white/10"
                onClick={() => openMspAdvisor({ context: "store" })}
                data-testid="button-advisor-cta"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Ask Digerati
              </Button>
              <a href="/book">
                <Button
                  size="lg"
                  className="h-12 border-2 border-white/25 bg-transparent px-6 text-white hover:bg-white/10"
                  data-testid="button-schedule-consult"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
              </a>
            </div>
          </motion.section>
        </div>
      </main>

      <ProductCompareBar
        selected={compareList}
        onClear={() => setCompareList([])}
        onOpen={() => setCompareOpen(true)}
      />
      <ProductCompareDrawer
        selected={compareList}
        open={compareOpen}
        onOpenChange={setCompareOpen}
      />
      <ConfigureProductDrawer
        product={configureProduct}
        unitPrice={
          configureProduct
            ? getProductPrice(configureProduct.id, configureProduct.basePrice).price
            : 0
        }
        open={!!configureProduct}
        onClose={() => setConfigureProduct(null)}
        onConfirm={handleConfigureConfirm}
      />

      <GuidedBuyingWizard
        open={guidedOpen}
        onClose={() => setGuidedOpen(false)}
        onAddStack={(products, seatHint) => {
          products.forEach((product) => {
            const { price } = getProductPrice(product.id, product.basePrice);
            const qty =
              product.pricingType === "per_endpoint" ||
              product.pricingType === "per_user" ||
              product.pricingType === "per_seat" ||
              product.pricingType === "per_device"
                ? seatHint
                : 1;
            addToCart(product, qty, price);
          });
          toast({
            title: "Recommended stack added",
            description: `${products.length} catalog items added to Your Solution.`,
          });
          openCart();
        }}
      />

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default CoManagedStore;
