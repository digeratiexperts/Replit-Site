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
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  storeProducts,
  categoryLabels,
  getCheckoutEnabledProducts,
  type ProductCategory,
  type PricingType,
  type StoreProduct,
} from "@/data/storeProducts";
import {
  productMatchesOutcome,
  searchProducts,
  sortProducts,
  type StoreOutcomeId,
  type StoreSortOption,
} from "@/data/storeMerchandising";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { CartButton } from "@/components/store/CartButton";
import { useStoreAuth } from "@/hooks/useStoreAuth";
import { StoreTrustStrip } from "@/components/store/StoreTrustStrip";
import { ShopByOutcome } from "@/components/store/ShopByOutcome";
import { MerchandisingRails } from "@/components/store/MerchandisingRails";
import { StoreProductCard } from "@/components/store/StoreProductCard";
import { StoreCatalogToolbar } from "@/components/store/StoreCatalogToolbar";
import { StoreAssessmentPanel } from "@/components/store/StoreAssessmentPanel";
import { StoreBundlesSection } from "@/components/store/StoreBundlesSection";

const CoManagedStore = () => {
  const prefersReducedMotion = useReducedMotion();
  const searchString = useSearch();
  const { toast } = useToast();
  const { addToCart, openCart, setClientPricing } = useCart();
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
  const initialQ = urlParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(
    initialCategory && categoryLabels[initialCategory] ? initialCategory : "all"
  );
  const [selectedOutcome, setSelectedOutcome] = useState<StoreOutcomeId | null>(
    initialOutcome || null
  );
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [billingType, setBillingType] = useState<PricingType | "all">("all");
  const [sort, setSort] = useState<StoreSortOption>("recommended");

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
    products = searchProducts(products, searchQuery);
    return sortProducts(products, sort);
  }, [
    visibleBase,
    selectedCategory,
    billingType,
    selectedOutcome,
    searchQuery,
    sort,
  ]);

  const handleAddToCart = (product: StoreProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.isCheckoutEnabled || product.isContractOnly) return;
    const { price } = getProductPrice(product.id, product.basePrice);
    addToCart(product, 1, price);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
    openCart();
  };

  const handleAddBundle = (products: StoreProduct[]) => {
    products.forEach((product) => {
      const { price } = getProductPrice(product.id, product.basePrice);
      addToCart(product, 1, price);
    });
    toast({
      title: "Bundle items added",
      description: `${products.length} products added to your cart.`,
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

      <main className="pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                className="border-none bg-[#5034ff] text-white hover:bg-[#6548ff]"
                data-testid="button-store-login"
              >
                <User className="mr-2 h-4 w-4" />
                Login for Client Pricing
              </Button>
            )}
            <CartButton />
          </div>

          <div className="mb-8 flex items-center gap-2 text-sm text-white/50">
            <Link href="/store" className="transition-colors hover:text-white">
              Store
            </Link>
            <span>/</span>
            <span className="text-white">Catalog</span>
          </div>

          {/* Hero */}
          <motion.div
            className="mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5034ff]/25 bg-[#5034ff]/10 px-4 py-2">
              <Users className="h-4 w-4 text-[#a78bfa]" />
              <span className="text-sm text-[#c4b5fd]">Guided IT Storefront</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Shop outcomes.{" "}
              <span className="text-[#a78bfa]">Buy real services.</span>
            </h1>
            <p className="text-lg leading-relaxed text-white/65">
              Browse curated rails, filter by outcome or billing type, then add products to your
              cart. Existing pricing and checkout stay the same.
            </p>
          </motion.div>

          <StoreTrustStrip />

          <ShopByOutcome selected={selectedOutcome} onSelect={handleOutcomeSelect} />

          {/* Inline assessment entry (relocated — not mid-grid banner) */}
          <div className="mb-10 lg:hidden">
            <StoreAssessmentPanel
              variant="inline"
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
            onLoginRequired={loginRedirect}
          />

          <StoreBundlesSection isLoggedIn={isLoggedIn} onAddBundle={handleAddBundle} />

          {/* Catalog + sticky assessment */}
          <div ref={catalogRef} className="scroll-mt-28">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white md:text-3xl">Full catalog</h2>
                <p className="mt-1 text-white/55">
                  Larger cards · outcome-first blurbs · technical bullets · Add to cart
                </p>
              </div>
              {selectedOutcome && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/15 bg-transparent text-white hover:bg-white/5"
                  onClick={() => setSelectedOutcome(null)}
                  data-testid="button-clear-outcome"
                >
                  Clear outcome filter
                </Button>
              )}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
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
                  sort={sort}
                  onSortChange={setSort}
                  resultCount={filteredProducts.length}
                  totalCount={visibleBase.length}
                />

                {selectedCategory !== "all" && (
                  <div className="mb-6 rounded-xl border border-white/10 bg-[#141414] p-4">
                    <h3 className="font-semibold text-white">
                      {categoryLabels[selectedCategory]}
                    </h3>
                  </div>
                )}

                <motion.div
                  className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${selectedCategory}-${selectedOutcome}-${searchQuery}-${billingType}-${sort}`}
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
                          onLoginRequired={loginRedirect}
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
            className="mb-16 grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="rounded-xl border border-white/10 bg-[#141414] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#5034ff]/25 bg-[#5034ff]/15">
                  <ShoppingCart className="h-5 w-5 text-[#a78bfa]" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">Checkout enabled</h3>
                  <p className="text-sm text-white/60">
                    Catalog products can be purchased directly. Add items to your cart and complete
                    checkout to get started.
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
                    <Link href="/portal/login" className="text-[#a78bfa] hover:text-[#c4b5fd]">
                      Log in to your portal
                    </Link>{" "}
                    for exclusive pricing.
                  </p>
                </div>
              </div>
            </div>
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
              Ecosystem plans for all-inclusive support.
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

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default CoManagedStore;
