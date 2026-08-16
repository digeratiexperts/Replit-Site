import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryLabels, type ProductCategory, type PricingType } from "@/data/storeProducts";
import {
  billingTypeLabels,
  storeOutcomes,
  storeComplianceFilters,
  storeSizeFilters,
  storePriceBandFilters,
  storePurchasePathFilters,
  coverageDimensions,
  type StoreOutcomeId,
  type StoreComplianceId,
  type StoreSizeId,
  type StorePriceBandId,
  type StorePurchasePathId,
  type StoreSortOption,
  type CoverageDimension,
} from "@/data/storeMerchandising";

export interface StoreActiveFilterChip {
  key: string;
  label: string;
  onClear: () => void;
}

interface StoreCatalogToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: ProductCategory | "all";
  onCategoryChange: (value: ProductCategory | "all") => void;
  categories: ProductCategory[];
  billingType: PricingType | "all";
  onBillingTypeChange: (value: PricingType | "all") => void;
  billingTypes: PricingType[];
  outcome?: StoreOutcomeId | "all" | null;
  onOutcomeChange?: (value: StoreOutcomeId | "all") => void;
  vendor?: string | "all";
  onVendorChange?: (value: string | "all") => void;
  vendors?: { slug: string; name: string }[];
  compliance?: StoreComplianceId | "all";
  onComplianceChange?: (value: StoreComplianceId | "all") => void;
  size?: StoreSizeId | "all";
  onSizeChange?: (value: StoreSizeId | "all") => void;
  priceBand?: StorePriceBandId | "all";
  onPriceBandChange?: (value: StorePriceBandId | "all") => void;
  purchasePath?: StorePurchasePathId | "all";
  onPurchasePathChange?: (value: StorePurchasePathId | "all") => void;
  coverage?: CoverageDimension | "all";
  onCoverageChange?: (value: CoverageDimension | "all") => void;
  sort: StoreSortOption;
  onSortChange: (value: StoreSortOption) => void;
  resultCount: number;
  totalCount: number;
  activeChips?: StoreActiveFilterChip[];
  onClearAll?: () => void;
}

function selectClass() {
  return "h-11 border-white/15 bg-[#0a0a0a] text-base text-white";
}

export function StoreCatalogToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  billingType,
  onBillingTypeChange,
  billingTypes,
  outcome = "all",
  onOutcomeChange,
  vendor = "all",
  onVendorChange,
  vendors = [],
  compliance = "all",
  onComplianceChange,
  size = "all",
  onSizeChange,
  priceBand = "all",
  onPriceBandChange,
  purchasePath = "all",
  onPurchasePathChange,
  coverage = "all",
  onCoverageChange,
  sort,
  onSortChange,
  resultCount,
  totalCount,
  activeChips = [],
  onClearAll,
}: StoreCatalogToolbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const outcomeValue = outcome && outcome !== null ? outcome : "all";
  const vendorValue = vendor || "all";
  const complianceValue = compliance || "all";
  const sizeValue = size || "all";
  const priceBandValue = priceBand || "all";
  const purchasePathValue = purchasePath || "all";
  const coverageValue = coverage || "all";

  const hasActiveFilters =
    activeChips.length > 0 ||
    !!search ||
    category !== "all" ||
    billingType !== "all" ||
    (onOutcomeChange && outcomeValue !== "all") ||
    (onVendorChange && vendorValue !== "all") ||
    (onComplianceChange && complianceValue !== "all") ||
    (onSizeChange && sizeValue !== "all") ||
    (onPriceBandChange && priceBandValue !== "all") ||
    (onPurchasePathChange && purchasePathValue !== "all") ||
    (onCoverageChange && coverageValue !== "all");

  const clearAll = () => {
    if (onClearAll) {
      onClearAll();
      return;
    }
    onSearchChange("");
    onCategoryChange("all");
    onBillingTypeChange("all");
    onOutcomeChange?.("all");
    onVendorChange?.("all");
    onComplianceChange?.("all");
    onSizeChange?.("all");
    onPriceBandChange?.("all");
    onPurchasePathChange?.("all");
    onCoverageChange?.("all");
  };

  const filterControls = (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-sm text-white/50">
          <Filter className="h-4 w-4" aria-hidden />
          Filters
        </div>
        <Select
          value={category}
          onValueChange={(v) => onCategoryChange(v as ProductCategory | "all")}
        >
          <SelectTrigger className={`${selectClass()} w-[190px]`} data-testid="select-category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-[#141414] text-white">
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryLabels[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {onOutcomeChange && (
          <Select
            value={outcomeValue}
            onValueChange={(v) => onOutcomeChange(v as StoreOutcomeId | "all")}
          >
            <SelectTrigger className={`${selectClass()} w-[180px]`} data-testid="select-outcome">
              <SelectValue placeholder="Outcome" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#141414] text-white">
              <SelectItem value="all">All outcomes</SelectItem>
              {storeOutcomes.map((o) => (
                <SelectItem key={o.id} value={o.id}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select
          value={billingType}
          onValueChange={(v) => onBillingTypeChange(v as PricingType | "all")}
        >
          <SelectTrigger className={`${selectClass()} w-[170px]`} data-testid="select-billing">
            <SelectValue placeholder="Billing" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-[#141414] text-white">
            <SelectItem value="all">All billing</SelectItem>
            {billingTypes.map((bt) => (
              <SelectItem key={bt} value={bt}>
                {billingTypeLabels[bt] ?? bt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-4 w-4 text-white/55" aria-hidden />
          <Select value={sort} onValueChange={(v) => onSortChange(v as StoreSortOption)}>
            <SelectTrigger className={`${selectClass()} w-[180px]`} data-testid="select-sort">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#141414] text-white">
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="price_asc">Price: Low to high</SelectItem>
              <SelectItem value="price_desc">Price: High to low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-4">
        <span className="text-sm text-white/55">Refine</span>
        {onVendorChange && (
          <Select
            value={vendorValue}
            onValueChange={(v) => onVendorChange(v as string | "all")}
          >
            <SelectTrigger className={`${selectClass()} w-[170px]`} data-testid="select-vendor">
              <SelectValue placeholder="Vendor" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#141414] text-white">
              <SelectItem value="all">All vendors</SelectItem>
              {vendors.map((v) => (
                <SelectItem key={v.slug} value={v.slug}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {onComplianceChange && (
          <Select
            value={complianceValue}
            onValueChange={(v) => onComplianceChange(v as StoreComplianceId | "all")}
          >
            <SelectTrigger className={`${selectClass()} w-[190px]`} data-testid="select-compliance">
              <SelectValue placeholder="Compliance" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#141414] text-white">
              <SelectItem value="all">All compliance focus</SelectItem>
              {storeComplianceFilters.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {onSizeChange && (
          <Select
            value={sizeValue}
            onValueChange={(v) => onSizeChange(v as StoreSizeId | "all")}
          >
            <SelectTrigger className={`${selectClass()} w-[200px]`} data-testid="select-size">
              <SelectValue placeholder="Company size" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#141414] text-white">
              <SelectItem value="all">All company sizes</SelectItem>
              {storeSizeFilters.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {onPriceBandChange && (
          <Select
            value={priceBandValue}
            onValueChange={(v) => onPriceBandChange(v as StorePriceBandId | "all")}
          >
            <SelectTrigger className={`${selectClass()} w-[160px]`} data-testid="select-price-band">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#141414] text-white">
              <SelectItem value="all">All price bands</SelectItem>
              {storePriceBandFilters.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {onPurchasePathChange && (
          <Select
            value={purchasePathValue}
            onValueChange={(v) => onPurchasePathChange(v as StorePurchasePathId | "all")}
          >
            <SelectTrigger
              className={`${selectClass()} w-[170px]`}
              data-testid="select-purchase-path"
            >
              <SelectValue placeholder="Buy path" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#141414] text-white">
              <SelectItem value="all">Checkout or quote</SelectItem>
              {storePurchasePathFilters.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {onCoverageChange && (
          <Select
            value={coverageValue}
            onValueChange={(v) => onCoverageChange(v as CoverageDimension | "all")}
          >
            <SelectTrigger className={`${selectClass()} w-[170px]`} data-testid="select-coverage">
              <SelectValue placeholder="Coverage" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#141414] text-white">
              <SelectItem value="all">All coverage areas</SelectItem>
              {coverageDimensions.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </>
  );

  return (
    <div
      className="mb-7 space-y-4 rounded-xl border border-white/10 bg-[#121212] p-5 lg:sticky lg:top-24 lg:z-20"
      data-testid="store-catalog-toolbar"
      role="search"
      aria-label="Catalog filters"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/55" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search within results (products, vendors, problems)"
            className="h-12 border-white/15 bg-[#0a0a0a] pl-11 text-base text-white placeholder:text-white/55"
            data-testid="input-store-search"
            aria-label="Search within catalog results"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-12 border-white/15 bg-transparent text-white hover:bg-white/5 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          data-testid="button-toggle-filters"
        >
          <Filter className="mr-2 h-4 w-4" />
          {mobileOpen ? "Hide filters" : "Show filters"}
          {mobileOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>

      <div className={`${mobileOpen ? "block" : "hidden"} space-y-4 lg:block`}>
        {filterControls}
      </div>

      {activeChips.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4"
          data-testid="active-filter-chips"
          aria-label="Active filters"
        >
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.onClear}
              className="inline-flex items-center gap-1.5 rounded-md border border-de-accent/35 bg-de-accent/15 px-2.5 py-1.5 text-sm text-de-accent-ink transition-colors hover:bg-de-accent/25 hover:text-white"
              data-testid={`chip-clear-${chip.key}`}
            >
              {chip.label}
              <X className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only">Remove {chip.label} filter</span>
            </button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-white/60 hover:text-white"
            onClick={clearAll}
            data-testid="button-clear-filter-chips"
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
        <p className="text-base text-white/60" data-testid="text-product-count" aria-live="polite">
          Showing <span className="font-medium text-white">{resultCount}</span> of{" "}
          <span className="text-white/80">{totalCount}</span> products
        </p>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white"
            onClick={clearAll}
            data-testid="button-clear-filters"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
