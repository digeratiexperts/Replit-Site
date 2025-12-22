import { Calendar, User, ArrowRight, AlertCircle, Shield, Lock, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";

export const DigeratiThreatsInsightsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  
  const insights = [
    {
      category: "CISA Alert",
      date: "March 5, 2025",
      title: "New CISA Alert: Patch These 5 Vulnerabilities Now",
      excerpt: "New security flaws are actively being exploited in the wild. Critical patches required for Microsoft Exchange and VMware systems.",
      author: "Security Team",
      readTime: "3 min read",
      urgent: true,
      icon: <AlertCircle className="h-5 w-5" />,
      gradient: "from-red-500 to-orange-500"
    },
    {
      category: "Threat Analysis",
      date: "March 4, 2025",
      title: "Ransomware Groups Targeting Arizona Healthcare",
      excerpt: "BlackCat ransomware group increases attacks on regional healthcare providers. Learn how to protect your medical practice.",
      author: "James Wilson",
      readTime: "5 min read",
      urgent: true,
      icon: <Shield className="h-5 w-5" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      category: "Compliance Update",
      date: "March 3, 2025",
      title: "HIPAA Penalties Increase 40% in 2025",
      excerpt: "OCR announces stricter enforcement and higher fines for HIPAA violations. Ensure your compliance program is up to date.",
      author: "Compliance Team",
      readTime: "4 min read",
      urgent: false,
      icon: <Lock className="h-5 w-5" />,
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  const categories = ["All", "CISA Alerts", "Ransomware", "Compliance", "Best Practices"];

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0118, #0f0720)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

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
                    <button className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-1 group/btn">
                      Know More
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
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
          <button 
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 font-semibold inline-flex items-center gap-2 hover:scale-105"
            data-testid="view-all-updates"
          >
            View All Security Updates
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
