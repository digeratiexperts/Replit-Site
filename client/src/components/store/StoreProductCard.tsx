import type { MouseEvent } from "react";
import { Link } from "wouter";
import {
  ShoppingCart,
  LogIn,
  Tag,
  Eye,
  Building,
  Users,
  Settings,
  Wifi,
  Server,
  Phone,
  Headphones,
  Monitor,
  Package,
  Wrench,
  Shield,
  FileCheck,
  GraduationCap,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  categoryLabels,
  formatPrice,
  type ProductCategory,
  type StoreProduct,
} from "@/data/storeProducts";
import { getIncludedInHint } from "@/data/storeMerchandising";

const categoryIcons: Record<ProductCategory, LucideIcon> = {
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

/** Soft accent colors — pills/icons only, not whole-card rainbow. */
const categoryAccent: Record<ProductCategory, string> = {
  contract_services: "text-amber-300",
  comanaged_subscriptions: "text-violet-300",
  comanaged_onboarding: "text-purple-300",
  networking_managed: "text-cyan-300",
  networking_projects: "text-sky-300",
  ucaas_subscriptions: "text-green-300",
  ucaas_setup: "text-emerald-300",
  hardware_provisioning: "text-orange-300",
  hardware_physical: "text-rose-300",
  hardware_handling: "text-red-300",
  digital_assessments: "text-blue-300",
  digital_templates: "text-indigo-300",
  digital_training: "text-fuchsia-300",
  professional_services: "text-teal-300",
};

export interface StoreProductCardProps {
  product: StoreProduct;
  price: number;
  hasDiscount?: boolean;
  discountPercent?: number;
  isLoggedIn?: boolean;
  compact?: boolean;
  onAddToCart: (product: StoreProduct, e: MouseEvent) => void;
  onLoginRequired?: () => void;
}

export function StoreProductCard({
  product,
  price,
  hasDiscount = false,
  discountPercent = 0,
  isLoggedIn = false,
  compact = false,
  onAddToCart,
  onLoginRequired,
}: StoreProductCardProps) {
  const Icon = categoryIcons[product.category];
  const accent = categoryAccent[product.category];
  const includedHint = getIncludedInHint(product.sku);
  const isContract = product.isContractOnly || !product.isCheckoutEnabled;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border border-white/10 bg-[#141414] transition-all duration-200 hover:border-[#5034ff]/35 hover:bg-[#171717] ${
        compact ? "p-5" : "p-7"
      }`}
      data-testid={`product-${product.id}`}
    >
      <div className="mb-4 flex items-start gap-3.5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
          <Icon className={`h-6 w-6 ${accent}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${accent}`}>
              {categoryLabels[product.category]}
            </span>
            {product.isClientOnly && (
              <span className="rounded-full border border-[#5034ff]/30 bg-[#5034ff]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#c4b5fd]">
                Client pricing
              </span>
            )}
            {isContract && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-200">
                Consult
              </span>
            )}
          </div>
          <h3 className={`font-semibold leading-snug text-white ${compact ? "text-lg" : "text-xl"}`}>
            <Link href={`/store/product/${product.sku}`}>
              <span className="hover:text-[#c4b5fd] transition-colors" title={product.name}>
                {product.name}
              </span>
            </Link>
          </h3>
        </div>
      </div>

      <p className={`mb-4 text-white/70 ${compact ? "text-sm line-clamp-2" : "text-base line-clamp-3"}`}>
        {product.shortDescription || product.description}
      </p>

      {!compact && (
        <ul className="mb-5 space-y-2">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-white/50">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#5034ff]/80" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
          {product.features.length > 3 && (
            <li className="pl-3.5 text-sm text-white/40">+{product.features.length - 3} more</li>
          )}
        </ul>
      )}

      {includedHint && (
        <p className="mb-4 text-sm text-[#a78bfa]/90" data-testid={`included-hint-${product.id}`}>
          {includedHint}
        </p>
      )}

      <div className="mt-auto border-t border-white/10 pt-5">
        <div className="mb-4 flex items-end justify-between gap-2">
          {hasDiscount ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white" data-testid={`price-${product.id}`}>
                  ${price.toFixed(2)}
                </span>
                <span className="text-sm text-white/40 line-through">
                  ${product.basePrice.toFixed(2)}
                </span>
              </div>
              <span className="mt-0.5 inline-flex items-center gap-1 text-sm text-[#a78bfa]">
                <Tag className="h-3.5 w-3.5" />
                {discountPercent}% off
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-white" data-testid={`price-${product.id}`}>
              {product.basePrice === 0 && isContract ? "Custom quote" : formatPrice(product)}
            </span>
          )}
        </div>

        <div className="flex gap-2.5">
          <Link href={`/store/product/${product.sku}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="h-11 w-full border-white/15 bg-transparent text-base text-white hover:bg-white/5"
              data-testid={`button-details-${product.id}`}
            >
              <Eye className="mr-1.5 h-4 w-4" />
              View details
            </Button>
          </Link>

          {isContract ? (
            <a href="/book" className="flex-1">
              <Button
                size="sm"
                className="h-11 w-full bg-[#5034ff] text-base text-white hover:bg-[#6548ff]"
                data-testid={`button-consult-${product.id}`}
              >
                Schedule
              </Button>
            </a>
          ) : product.isClientOnly && !isLoggedIn ? (
            <Button
              size="sm"
              className="h-11 flex-1 bg-[#5034ff] text-base text-white hover:bg-[#6548ff]"
              onClick={(e) => {
                e.preventDefault();
                onLoginRequired?.();
              }}
              data-testid={`button-login-${product.id}`}
            >
              <LogIn className="mr-1.5 h-4 w-4" />
              Login
            </Button>
          ) : (
            <Button
              size="sm"
              className="h-11 flex-1 bg-[#5034ff] text-base text-white hover:bg-[#6548ff]"
              onClick={(e) => onAddToCart(product, e)}
              data-testid={`button-add-${product.id}`}
            >
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
