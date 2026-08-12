import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User, Search, AlertCircle, Shield, Lock, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  formatUpdateDisplayDate,
  getSecurityUpdatesSorted,
} from "@/data/securityUpdates";

const securityUpdates = getSecurityUpdatesSorted();

const categories = ["All", "CISA Alert", "Threat Analysis", "Compliance Update"];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "CISA Alert":
      return <AlertCircle className="h-4 w-4" />;
    case "Threat Analysis":
      return <Shield className="h-4 w-4" />;
    case "Compliance Update":
      return <Lock className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getCategoryColors = (category: string) => {
  switch (category) {
    case "CISA Alert":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "Threat Analysis":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "Compliance Update":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getGradient = (category: string) => {
  switch (category) {
    case "CISA Alert":
      return "from-red-500 to-orange-500";
    case "Threat Analysis":
      return "from-purple-500 to-pink-500";
    case "Compliance Update":
      return "from-cyan-500 to-blue-500";
    default:
      return "from-gray-500 to-gray-600";
  }
};

export default function SecurityUpdates() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUpdates = securityUpdates.filter(update => {
    const matchesCategory = activeCategory === "All" || update.category === activeCategory;
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          update.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateStr: string) => formatUpdateDisplayDate(dateStr);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030228] to-[#0f0d2e]">
      <MegaMenu />
      
      <main className="de-nav-clear pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30">
              <AlertCircle className="w-3 h-3 mr-1" />
              Security Intelligence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Security Updates & Alerts
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time security alerts, CISA KEV updates, and compliance news from authoritative sources. 
              Stay informed about threats affecting Arizona businesses.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search security updates..." 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-security"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className={`border-white/20 text-white hover:bg-white/10 ${
                    activeCategory === category ? 'bg-white/20' : ''
                  }`}
                  onClick={() => setActiveCategory(category)}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Authoritative Sources Only</h3>
                <p className="text-gray-400">
                  All alerts on this page are sourced directly from{" "}
                  <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                    CISA's Known Exploited Vulnerabilities catalog
                  </a>{" "}
                  and{" "}
                  <a href="https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                    HHS OCR enforcement actions
                  </a>. 
                  Contact us for guidance on how these impact your organization.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.map((update) => (
              <Card 
                key={update.id}
                className="group h-full bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.07] overflow-hidden"
                data-testid={`security-update-${update.id}`}
              >
                <div className={`h-1 bg-gradient-to-r ${getGradient(update.category)}`} />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${getCategoryColors(update.category)} border`}>
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(update.category)}
                        {update.category}
                      </span>
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(update.date)}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all">
                    {update.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                    {update.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="h-3.5 w-3.5" />
                      <span>{update.author}</span>
                      <span>•</span>
                      <Clock className="h-3.5 w-3.5" />
                      <span>{update.readTime}</span>
                    </div>
                    <a 
                      href={update.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-1 group/btn"
                    >
                      Source
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUpdates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No security updates match your search criteria.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Need Help Responding to a Threat?</h3>
              <p className="text-gray-400 mb-6">
                Our security team can help you assess your exposure and implement mitigations for any of these vulnerabilities.
              </p>
              <a 
                href="/book"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                  Schedule Security Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
