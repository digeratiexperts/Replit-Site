import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Search, AlertCircle, Shield, Lock, Bug, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";
import { useThreatFeed } from "@/hooks/useThreatFeed";
import {
  formatUpdateDisplayDate,
  getSecurityUpdatesSorted,
} from "@/data/securityUpdates";
import {
  formatThreatDate,
  THREAT_ATTRIBUTION,
  THREAT_CATEGORIES,
  type ThreatItem,
} from "@shared/threatFeed";

const complianceArchive = getSecurityUpdatesSorted().filter((item) => item.category === "Compliance Update");

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Active Exploitation":
    case "Ransomware":
      return <AlertCircle className="h-4 w-4" />;
    case "Critical Vulnerability":
    case "Malware Activity":
      return <Bug className="h-4 w-4" />;
    case "Microsoft Security":
    case "Compliance Update":
      return <Lock className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

function badgeClass(item: Pick<ThreatItem, "severity"> | { severity?: string }): string {
  if (item.severity === "critical") return "bg-red-500/20 text-red-400 border-red-500/30";
  if (item.severity === "high") return "border-[#D3126A] bg-transparent text-white";
  return "border-de-hairline bg-transparent text-white/70";
}

export default function SecurityUpdates() {
  const { openBooking } = useBooking();
  const { payload, loading } = useThreatFeed("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const present = new Set(payload.items.map((item) => item.category));
    return ["All", ...THREAT_CATEGORIES.filter((category) => present.has(category))];
  }, [payload.items]);

  const filteredUpdates = payload.items.filter((update) => {
    const matchesCategory = activeCategory === "All" || update.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      update.title.toLowerCase().includes(q) ||
      update.excerpt.toLowerCase().includes(q) ||
      (update.cve || "").toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--de-bg)]">
      <MegaMenu />

      <main className="de-nav-clear pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30">
              <AlertCircle className="w-3 h-3 mr-1" />
              Security Intelligence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Security Updates
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A scored stream of actively exploited vulnerabilities, CISA advisories, and Microsoft
              security updates — not a generic CVE ticker.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search title, CVE, or excerpt…"
                className="pl-10 bg-de-raised border-de-hairline text-white placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-security"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`min-h-11 rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "border-[#D3126A] bg-transparent text-white"
                      : "border-de-hairline bg-transparent text-white/55 hover:border-white/20 hover:text-white"
                  }`}
                  onClick={() => setActiveCategory(category)}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-de-hairline bg-de-raised p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg border border-de-hairline bg-[var(--de-bg)]">
                <AlertCircle className="h-6 w-6 text-[#D3126A]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Authoritative sources, scored for SMBs</h2>
                <p className="text-white/60 leading-relaxed">{THREAT_ATTRIBUTION}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-white/55 py-12">Loading the live threat stream…</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpdates.map((update) => (
                <Card
                  key={update.id}
                  className="h-full border-de-hairline bg-de-raised overflow-hidden"
                  data-testid={`security-update-${update.id}`}
                >
                  <div className="h-1 bg-[#D3126A]" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <Badge className={`${badgeClass(update)} border`}>
                        <span className="flex items-center gap-1">
                          {getCategoryIcon(update.category)}
                          {update.category}
                        </span>
                      </Badge>
                      <span className="text-xs text-white/70 flex items-center gap-1 whitespace-nowrap">
                        <Calendar className="h-3 w-3" />
                        {formatThreatDate(update.publishedAt, "short")}
                      </span>
                    </div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#D3126A]">
                      {update.kicker}
                    </p>
                    <CardTitle className="text-lg text-white line-clamp-2">{update.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                      {update.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
                      <span className="text-xs text-white/70 truncate">
                        {update.sourceName}
                        {update.cve ? ` · ${update.cve}` : ""}
                      </span>
                      <a
                        href={update.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D3126A] hover:text-[#f0187a] font-medium text-sm flex items-center gap-1 shrink-0"
                      >
                        Source
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredUpdates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No security updates match your search criteria.</p>
            </div>
          )}

          {complianceArchive.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-3">Compliance archive</h2>
              <p className="text-white/55 mb-6 max-w-3xl">
                Historical HHS OCR enforcement notes kept for industry context. These are dated
                source records, not live threat intelligence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complianceArchive.map((update) => (
                  <Card
                    key={update.id}
                    className="h-full border-de-hairline bg-de-raised overflow-hidden"
                    data-testid={`compliance-archive-${update.id}`}
                  >
                    <div className="h-1 bg-white/20" />
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="border-de-hairline bg-transparent text-white/70 border">
                          <span className="flex items-center gap-1">
                            <Lock className="h-4 w-4" />
                            Compliance Update
                          </span>
                        </Badge>
                        <span className="text-xs text-white/70 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatUpdateDisplayDate(update.date)}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-white line-clamp-2">{update.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                        {update.excerpt}
                      </CardDescription>
                      <a
                        href={update.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D3126A] hover:text-[#f0187a] font-medium text-sm inline-flex items-center gap-1"
                      >
                        {update.sourceName}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 text-center">
            <div className="rounded-2xl border border-de-hairline bg-de-raised p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Need help prioritizing a patch?</h3>
              <p className="text-white/60 mb-6">
                We can map these items against your stack and tell you what actually needs attention
                this week.
              </p>
              <button
                type="button"
                onClick={() => openBooking("security_updates")}
                className="inline-flex min-h-11 items-center rounded-lg bg-[#D3126A] px-6 py-2.5 text-base font-semibold text-white hover:bg-[#e01874]"
              >
                {CTA.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
