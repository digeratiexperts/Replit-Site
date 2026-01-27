import { useState, useMemo, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Link, useSearch } from "wouter";
import { 
  ArrowRight, Shield, Users, ShoppingCart, Lock, Phone, 
  Monitor, Wifi, Headphones, Cloud, FileCheck, GraduationCap, 
  Wrench, Package, Settings, Server, Filter, Building, LogIn, User, LogOut, Tag
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { 
  storeProducts,
  categoryLabels,
  categoryDescriptions,
  formatPrice,
  getCheckoutEnabledProducts,
  type ProductCategory,
  type StoreProduct
} from "@/data/storeProducts";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { CartButton } from "@/components/store/CartButton";
import { useStoreAuth } from "@/hooks/useStoreAuth";

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

const CoManagedStore = () => {
  const prefersReducedMotion = useReducedMotion();
  const searchString = useSearch();
  const { toast } = useToast();
  const { addToCart, openCart, setClientPricing } = useCart();
  const { isLoggedIn, user, clientType, clientPricing, getProductPrice, loginRedirect, logout } = useStoreAuth();
  
  const urlParams = new URLSearchParams(searchString);
  const initialCategory = urlParams.get("category") as ProductCategory | null;
  
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(
    initialCategory && categoryLabels[initialCategory] ? initialCategory : "all"
  );

  useEffect(() => {
    if (clientPricing.length > 0) {
      setClientPricing(clientPricing);
    }
  }, [clientPricing, setClientPricing]);

  useSEO({
    title: 'Co-Managed IT Products | Digerati Experts Store',
    description: 'Browse and purchase IT products for co-managed environments. Endpoint management, security add-ons, UCaaS, hardware provisioning, and professional services.',
    canonical: '/store/co-managed',
  });

  const checkoutProducts = getCheckoutEnabledProducts();
  
  const filteredProducts = useMemo(() => {
    let products = checkoutProducts;
    
    if (!isLoggedIn) {
      products = products.filter(p => !p.isClientOnly);
    }
    
    if (selectedCategory === "all") {
      return products.sort((a, b) => a.sortOrder - b.sortOrder);
    }
    return products
      .filter(p => p.category === selectedCategory)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [checkoutProducts, selectedCategory, isLoggedIn]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(checkoutProducts.map(p => p.category))) as ProductCategory[];
    return cats.sort((a, b) => {
      const orderA = storeProducts.find(p => p.category === a)?.sortOrder || 999;
      const orderB = storeProducts.find(p => p.category === b)?.sortOrder || 999;
      return orderA - orderB;
    });
  }, [checkoutProducts]);

  const handleAddToCart = (product: StoreProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { price } = getProductPrice(product.id, product.basePrice);
    addToCart(product, 1, price);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
    openCart();
  };

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const ProductCard = ({ product }: { product: StoreProduct }) => {
    const Icon = categoryIcons[product.category];
    const { price, hasDiscount, discountPercent } = getProductPrice(product.id, product.basePrice);
    
    const renderPrice = () => {
      if (hasDiscount) {
        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-violet-400 font-bold" data-testid={`price-${product.id}`}>${price.toFixed(2)}</span>
              <span className="text-white/40 text-xs line-through">${product.basePrice.toFixed(2)}</span>
            </div>
            <span className="text-violet-400/80 text-xs flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {discountPercent}% client discount
            </span>
          </div>
        );
      }
      return <span className="text-violet-400 font-bold" data-testid={`price-${product.id}`}>{formatPrice(product)}</span>;
    };
    
    return (
      <Link href={`/store/product/${product.sku}`}>
        <motion.div
          variants={itemVariants}
          className={`p-5 rounded-xl bg-white/[0.03] border transition-all duration-300 group flex flex-col h-full cursor-pointer ${
            product.isClientOnly 
              ? "border-violet-500/30 hover:border-violet-500/50" 
              : "border-white/10 hover:border-violet-500/30"
          }`}
          data-testid={`product-${product.id}`}
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/30 transition-colors">
              <Icon className="w-5 h-5 text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-white font-semibold line-clamp-1 group-hover:text-violet-300 transition-colors">{product.name}</h3>
                {product.isClientOnly && (
                  <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[10px] font-medium whitespace-nowrap">
                    Client Only
                  </span>
                )}
              </div>
              <p className="text-white/40 text-xs">{categoryLabels[product.category]}</p>
            </div>
          </div>
          
          <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-grow">{product.shortDescription}</p>
          
          <div className="mt-auto">
            <ul className="space-y-1 mb-4">
              {product.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="text-white/50 text-xs flex items-start gap-1.5">
                  <span className="text-violet-400 mt-0.5">•</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
              {product.features.length > 3 && (
                <li className="text-white/40 text-xs">+{product.features.length - 3} more</li>
              )}
            </ul>
            
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              {renderPrice()}
              
              {product.isClientOnly && !isLoggedIn ? (
                <Button 
                  size="sm" 
                  className="bg-violet-600 hover:bg-violet-500 text-white border-none shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    loginRedirect();
                  }}
                  data-testid={`button-login-${product.id}`}
                >
                  <LogIn className="w-3 h-3 mr-1" />
                  Login Required
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  className="bg-violet-600 hover:bg-violet-500 text-white text-xs"
                  onClick={(e) => handleAddToCart(product, e)}
                  data-testid={`button-add-${product.id}`}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

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
                className="bg-violet-600 hover:bg-violet-500 text-white border-none shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                data-testid="button-store-login"
              >
                <User className="w-4 h-4 mr-2" />
                Login for Client Pricing
              </Button>
            )}
            <CartButton />
          </div>

          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/50">
            <Link href="/store" className="hover:text-white transition-colors">Store</Link>
            <span>/</span>
            <span className="text-white">Co-Managed Products</span>
          </div>

          {/* Hero Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Users className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300">Co-Managed IT Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              IT Products{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300">
                On Demand
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Flexible IT products for teams that need extra support. Add endpoint management, security tools, 
              UCaaS, hardware, and professional services as you need them.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-white/50" />
              <span className="text-white/50 text-sm">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedCategory === "all" ? "default" : "outline"}
                className={selectedCategory === "all" 
                  ? "bg-violet-600 text-white border-none" 
                  : "bg-violet-500/5 border-violet-500/20 text-violet-300 hover:text-white hover:bg-violet-500/20"
                }
                onClick={() => setSelectedCategory("all")}
                data-testid="filter-all"
              >
                All Products ({checkoutProducts.length})
              </Button>
              {categories.map((category) => {
                const count = checkoutProducts.filter(p => p.category === category).length;
                return (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={selectedCategory === category 
                      ? "bg-violet-600 text-white border-none" 
                      : "bg-violet-500/5 border-violet-500/20 text-violet-300 hover:text-white hover:bg-violet-500/20"
                    }
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`filter-${category}`}
                  >
                    {categoryLabels[category]} ({count})
                  </Button>
                );
              })}
            </div>
          </motion.div>

          {/* Category Description */}
          {selectedCategory !== "all" && (
            <motion.div 
              className="mb-8 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white font-semibold mb-1">{categoryLabels[selectedCategory]}</h3>
              <p className="text-white/60 text-sm">{categoryDescriptions[selectedCategory]}</p>
            </motion.div>
          )}

          {/* Products Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/50 text-lg">No products found in this category.</p>
            </div>
          )}

          {/* Info Sections */}
          <motion.section 
            className="mb-16 grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Checkout Enabled</h3>
                  <p className="text-white/60 text-sm">
                    All products on this page can be purchased directly. Add items to your cart 
                    and complete checkout to get started immediately.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Client-Only Products</h3>
                  <p className="text-white/60 text-sm">
                    Some products require an existing client relationship. 
                    <Link href="/portal/login" className="text-violet-400 hover:text-violet-300 ml-1">
                      Log in to your portal
                    </Link>
                    {" "}to access exclusive pricing and products.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            className="rounded-2xl p-8 md:p-12 bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-500/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need a Complete Solution?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Looking for full-service managed IT instead of individual products? 
              Check out our ProActive Ecosystem plans for all-inclusive support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/store/managed">
                <Button 
                  size="lg"
                  className="h-12 px-6 bg-violet-600 hover:bg-violet-500 text-white"
                  data-testid="button-view-managed"
                >
                  View Managed IT Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  className="h-12 px-6 bg-transparent border-2 border-white/30 text-white hover:bg-white/10"
                  data-testid="button-schedule-consult"
                >
                  <Phone className="w-4 h-4 mr-2" />
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
