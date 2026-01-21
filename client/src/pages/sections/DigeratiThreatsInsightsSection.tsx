import { Calendar, User, ArrowRight, AlertCircle, Shield, Lock, Zap } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";

export const DigeratiThreatsInsightsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  
  const insights = [
    {
      category: "CISA Alert",
      date: "January 7, 2026",
      title: "KEV Added: HPE OneView Remote Code Execution (CVE-2025-37164)",
      excerpt: "CISA added an HPE OneView code injection/RCE issue to the Known Exploited Vulnerabilities catalog. Apply vendor mitigations and patch per guidance.",
      author: "Security Team",
      readTime: "3 min read",
      urgent: true,
      icon: <AlertCircle className="h-5 w-5" />,
      gradient: "from-red-500 to-orange-500",
      slug: "kev-hpe-oneview-cve-2025-37164"
    },
    {
      category: "Threat Analysis",
      date: "December 5, 2025",
      title: "Active Exploitation: React Server Components RCE Added to KEV",
      excerpt: "CISA KEV lists an RCE risk tied to React Server Components endpoints (CVE-2025-55182). Prioritize exposure review and patch immediately.",
      author: "Security Team",
      readTime: "5 min read",
      urgent: true,
      icon: <Shield className="h-5 w-5" />,
      gradient: "from-purple-500 to-pink-500",
      slug: "kev-react-server-components-cve-2025-55182"
    },
    {
      category: "Compliance Update",
      date: "December 16, 2025",
      title: "HIPAA Enforcement: OCR Settlement Includes $112,500 Payment",
      excerpt: "HHS OCR announced a HIPAA Right of Access enforcement action resolved via settlement. Verify your access request workflows are compliant.",
      author: "Compliance Team",
      readTime: "4 min read",
      urgent: false,
      icon: <Lock className="h-5 w-5" />,
      gradient: "from-cyan-500 to-blue-500",
      slug: "hhs-ocr-right-of-access-concentra-2025-12-16"
    }
  ];

  const categories = ["All", "CISA Alerts", "Ransomware", "Compliance", "Best Practices"];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Subtle violet accent glow */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">
            <Zap className="w-3 h-3 mr-1" />
            24/7 Security Response Team
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recent Threats & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400">Insights</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay ahead of cyber threats with real-time alerts and expert analysis from our security team.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                index === 0
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="group h-full bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.07] overflow-hidden"
                data-testid={`insight-card-${index}`}
              >
                {/* Gradient accent line */}
                <div className={`h-1 bg-gradient-to-r ${insight.gradient}`} />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      className={`${
                        insight.urgent 
                          ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                          : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      } border`}
                    >
                      <span className="flex items-center gap-1">
                        {insight.icon}
                        {insight.category}
                      </span>
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {insight.date}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all cursor-pointer">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                    {insight.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="h-3.5 w-3.5" />
                      <span>{insight.author}</span>
                      <span>•</span>
                      <span>{insight.readTime}</span>
                    </div>
                    <Link 
                      href="/resources/security-updates"
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-1 group/btn"
                    >
                      Know More
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/resources/security-updates"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 font-semibold inline-flex items-center gap-2 hover:scale-105"
            data-testid="view-all-updates"
          >
            View All Security Updates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
