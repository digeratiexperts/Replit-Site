import { MapPin, Shield, Cloud, FileCheck } from "lucide-react";
import { storeTrustClaims } from "@/data/storeMerchandising";

const icons = [MapPin, Shield, Cloud, FileCheck] as const;

export function StoreTrustStrip() {
  return (
    <section
      className="mb-12 rounded-xl border border-white/10 bg-[#121212] px-5 py-5 sm:px-7 sm:py-6"
      data-testid="store-trust-strip"
      aria-label="Why shop with Digerati Experts"
    >
      <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {storeTrustClaims.map((claim, i) => {
          const Icon = icons[i] ?? Shield;
          return (
            <li key={claim.label} className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-de-accent/15 border border-de-accent/25">
                <Icon className="h-5 w-5 text-de-accent-ink" />
              </div>
              <div>
                <p className="text-base font-medium text-white">{claim.label}</p>
                <p className="mt-0.5 text-sm text-white/55">{claim.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
