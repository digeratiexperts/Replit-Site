import { Search, Filter, ArrowUpDown } from "lucide-react";
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
  type StoreOutcomeId,
  type StoreComplianceId,
  type StoreSizeId,
  type StoreSortOption,
} from "@/data/storeMerchandising";

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
  sort: StoreSortOption;
  onSortChange: (value: StoreSortOption) => void;
  resultCount: number;
  totalCount: number;
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
  sort,
  onSortChange,
  resultCount,
  totalCount,
}: StoreCatalogToolbarProps) {
  const outcomeValue = outcome && outcome !== null ? outcome : "all";
  const vendorValue = vendor || "all";
  const complianceValue = compliance || "all";
  const sizeValue = size || "all";
  const hasActiveFilters =
    search ||
    category !== "all" ||
    billingType !== "all" ||
    (onOutcomeChange && outcomeValue !== "all") ||
    (onVendorChange && vendorValue !== "all") ||
    (onComplianceChange && complianceValue !== "all") ||
    (onSizeChange && sizeValue !== "all");

  const showExtended =
    onVendorChange || onComplianceChange || onSizeChange;

  return (
    <div
      className="mb-7 space-y-4 rounded-xl border border-white/10 bg-[#121212] p-5"
      data-testid="store-catalog-toolbar"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products, vendors, or problems (e.g. phishing, M365, helpdesk)"
            className="h-12 border-white/15 bg-[#0a0a0a] pl-11 text-base text-white placeholder:text-white/35"
            data-testid="input-store-search"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-sm text-white/50">
            <Filter className="h-4 w-4" />
            Filters
          </div>
          <Select
            value={category}
            onValueChange={(v) => onCategoryChange(v as ProductCategory | "all")}
          >
            <SelectTrigger
              className="h-11 w-[190px] border-white/15 bg-[#0a0a0a] text-base text-white"
              data-testid="select-category"
            >
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
              <SelectTrigger
                className="h-11 w-[180px] border-white/15 bg-[#0a0a0a] text-base text-white"
                data-testid="select-outcome"
              >
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
            <SelectTrigger
              className="h-11 w-[170px] border-white/15 bg-[#0a0a0a] text-base text-white"
              data-testid="select-billing"
            >
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
            <ArrowUpDown className="h-4 w-4 text-white/45" />
            <Select value={sort} onValueChange={(v) => onSortChange(v as StoreSortOption)}>
              <SelectTrigger
                className="h-11 w-[180px] border-white/15 bg-[#0a0a0a] text-base text-white"
                data-testid="select-sort"
              >
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
      </div>

      {showExtended && (
        <div className="flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-4">
          <span className="text-sm text-white/45">Refine</span>
          {onVendorChange && (
            <Select
              value={vendorValue}
              onValueChange={(v) => onVendorChange(v as string | "all")}
            >
              <SelectTrigger
                className="h-11 w-[170px] border-white/15 bg-[#0a0a0a] text-base text-white"
                data-testid="select-vendor"
              >
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
              <SelectTrigger
                className="h-11 w-[190px] border-white/15 bg-[#0a0a0a] text-base text-white"
                data-testid="select-compliance"
              >
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
              <SelectTrigger
                className="h-11 w-[200px] border-white/15 bg-[#0a0a0a] text-base text-white"
                data-testid="select-size"
              >
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
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-base text-white/60" data-testid="text-product-count">
          Showing <span className="font-medium text-white">{resultCount}</span> of{" "}
          <span className="text-white/80">{totalCount}</span> products
        </p>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white"
            onClick={() => {
              onSearchChange("");
              onCategoryChange("all");
              onBillingTypeChange("all");
              onOutcomeChange?.("all");
              onVendorChange?.("all");
              onComplianceChange?.("all");
              onSizeChange?.("all");
            }}
            data-testid="button-clear-filters"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
