import { MapPin, Shield, Cloud, FileCheck } from "lucide-react";
import { storeTrustClaims } from "@/data/storeMerchandising";

const icons = [MapPin, Shield, Cloud, FileCheck] as const;

export function StoreTrustStrip() {
  return (
    <section
      className="mb-10 rounded-xl border border-white/10 bg-[#121212] px-4 py-4 sm:px-6"
      data-testid="store-trust-strip"
      aria-label="Why shop with Digerati Experts"
    >
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {storeTrustClaims.map((claim, i) => {
          const Icon = icons[i] ?? Shield;
          return (
            <li key={claim.label} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#5034ff]/15 border border-[#5034ff]/25">
                <Icon className="h-4 w-4 text-[#a78bfa]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{claim.label}</p>
                <p className="text-xs text-white/50">{claim.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
