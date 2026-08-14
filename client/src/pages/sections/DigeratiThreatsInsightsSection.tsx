import { Calendar, ArrowRight, AlertCircle, Shield, Lock, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  formatUpdateDisplayDate,
  getHomepageRecentThreats,
  type SecurityUpdate,
  type SecurityUpdateCategory,
} from "@/data/securityUpdates";

const categoryIcon: Record<SecurityUpdateCategory, JSX.Element> = {
  "CISA Alert": <AlertCircle className="h-5 w-5" />,
  "Threat Analysis": <Shield className="h-5 w-5" />,
  "Compliance Update": <Lock className="h-5 w-5" />,
};

function InsightCard({ insight, index }: { insight: SecurityUpdate; index: number }) {
  return (
    <Card
      className="h-full overflow-hidden border-de-hairline bg-de-raised transition-colors hover:border-white/20"
      data-testid={`insight-card-${index}`}
    >
      <div className="h-1 bg-[#D3126A]" />
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 gap-2">
          <Badge
            className={`${
              insight.urgent
                ? "bg-red-500/20 text-red-400 border-red-500/30"
                : "border-de-hairline bg-transparent text-white/70"
            } border text-base`}
          >
            <span className="flex items-center gap-1">
              {categoryIcon[insight.category]}
              <span className="hidden sm:inline">{insight.category}</span>
              <span className="sm:hidden">{insight.category.split(" ")[0]}</span>
            </span>
          </Badge>
          <span className="text-base text-gray-400 flex items-center gap-1 whitespace-nowrap">
            <Calendar className="h-3 w-3" />
            <span className="hidden sm:inline">{formatUpdateDisplayDate(insight.date)}</span>
            <span className="sm:hidden">{formatUpdateDisplayDate(insight.date).split(",")[0]}</span>
          </span>
        </div>
        <CardTitle className="text-base sm:text-lg text-white line-clamp-2">
          {insight.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <CardDescription className="text-gray-400 mb-4 line-clamp-3 text-base">
          {insight.excerpt}
        </CardDescription>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-base text-gray-400">{insight.sourceName}</span>
          <Link
            href="/resources/security-updates"
            className="flex items-center gap-1 text-base font-medium text-[#D3126A] hover:text-[#f0187a]"
          >
            Read this update
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export const DigeratiThreatsInsightsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCategory, setActiveCategory] = useState<"All" | SecurityUpdateCategory>("All");

  const insights = useMemo(() => getHomepageRecentThreats(), []);
  const categories = useMemo(() => {
    const present = Array.from(new Set(insights.map((item) => item.category)));
    return present.length ? (["All", ...present] as Array<"All" | SecurityUpdateCategory>) : [];
  }, [insights]);
  const displayed = useMemo(
    () => (activeCategory === "All" ? insights : insights.filter((item) => item.category === activeCategory)),
    [insights, activeCategory],
  );

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, [displayed.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="de-dark-chapter de-chapter-hairline relative overflow-hidden py-10 md:py-14 lg:py-16"
      style={{ position: "relative" }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.35 }}
        >
          <Badge className="mb-3 md:mb-4 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 text-base">
            <Zap className="w-3 h-3 mr-1" />
            24/7 Security Response Team
          </Badge>
          <h2 className="mb-3 px-2 text-2xl font-bold text-white sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
            Recent Threats & Insights
            <span className="text-[#D3126A]" aria-hidden="true">
              :
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            A short teaser of current alerts. Full feed, dates, and sources live on{" "}
            <Link href="/resources/blog">
              <span className="font-semibold text-white/80 underline decoration-white/20 underline-offset-4 hover:text-white">
                Resources
              </span>
            </Link>
            .
          </p>
        </motion.div>

        {insights.length > 0 && (
          <motion.div
            className="flex overflow-x-auto scrollbar-hide gap-2 mb-8 md:mb-10 pb-2 md:justify-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-11 shrink-0 whitespace-nowrap rounded-xl border px-3 py-1.5 text-base font-medium transition-colors md:px-4 md:py-2 ${
                  activeCategory === category
                    ? "border-[#D3126A] bg-transparent text-white shadow-[inset_0_0_0_1px_#D3126A]"
                    : "border-de-hairline bg-transparent text-white/55 hover:border-white/20 hover:text-white"
                }`}
                data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {displayed.length === 0 ? (
          <div
            className="mx-auto mb-12 max-w-2xl rounded-2xl border border-de-hairline bg-de-raised p-6 text-center md:p-8"
            data-testid="insights-empty"
          >
            <p className="text-lg font-semibold text-white">No current alerts available.</p>
            <p className="mt-2 text-base leading-relaxed text-white/55">
              We only surface homepage items within the last 45 days. The archive stays on Security
              Updates with dates and sources — nothing is backfilled to look recent.
            </p>
          </div>
        ) : (
          <>
            <div className="lg:hidden relative mb-8">
              <button
                onClick={() => scroll("left")}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all ${
                  canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-label="Scroll left"
                data-testid="threats-scroll-left"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => scroll("right")}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all ${
                  canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-label="Scroll right"
                data-testid="threats-scroll-right"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-de-surface to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-de-surface to-transparent z-10 pointer-events-none" />
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {displayed.map((insight, index) => (
                  <div key={insight.slug} className="flex-shrink-0 w-[300px] sm:w-[340px] snap-center">
                    <InsightCard insight={insight} index={index} />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-3 gap-6 mb-12">
              {displayed.map((insight, index) => (
                <motion.div
                  key={insight.slug}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <InsightCard insight={insight} index={index} />
                </motion.div>
              ))}
            </div>
          </>
        )}

        <motion.div
          className="text-center flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <Link
            href="/resources/security-updates"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#D3126A] px-6 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#e01874] md:px-8 md:py-3"
            data-testid="view-all-updates"
          >
            View All Security Updates
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/resources/blog"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-de-hairline bg-transparent px-6 py-2.5 text-base font-semibold text-white transition-colors hover:border-white/25 md:px-8 md:py-3"
            data-testid="view-digerati-journal"
          >
            Read the Digerati Journal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
