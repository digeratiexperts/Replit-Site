import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface PricingPlan {
  name: string;
  tier: string;
  monthlyPrice: number;
  perUserPrice: number;
  note: string;
  features: string[];
  learnMoreUrl: string;
  isPopular?: boolean;
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Office",
    tier: "Basic IT",
    monthlyPrice: 750,
    perUserPrice: 165,
    note: "A clean, managed IT baseline.",
    learnMoreUrl: "/solutions/managed-it-support",
    features: [
      "Email + Calendar + Team Chat",
      "MFA + SSO + Password Manager",
      "Endpoint Security (EDR)",
      "Email Protection (Anti-Phishing)",
      "Managed Network + Internet",
      "Service Desk + Backup Strategy"
    ]
  },
  {
    name: "Business",
    tier: "Security",
    monthlyPrice: 1200,
    perUserPrice: 245,
    note: "Adds stronger protection and response.",
    learnMoreUrl: "/solutions/security-operations",
    isPopular: true,
    features: [
      "Everything in Office",
      "SOC / MDR Monitoring + Response",
      "SMART HR + Onboarding Workflows",
      "Security Awareness Training",
      "vCIO + Technology Business Reviews",
      "Cyber Insurance Readiness"
    ]
  },
  {
    name: "Enterprise",
    tier: "Compliance",
    monthlyPrice: 1200,
    perUserPrice: 345,
    note: "Adds governance and audit readiness.",
    learnMoreUrl: "/solutions/compliance-reports",
    features: [
      "Everything in Business",
      "HIPAA / GDPR Compliance Modules",
      "Penetration Testing (scoped)",
      "Disaster Recovery Runbooks",
      "Privileged Access + Audit Logs",
      "AI & Cloud Automation"
    ]
  }
];

interface ServiceMatrixProps {
  variant?: "full" | "compact";
  plans?: PricingPlan[];
  showCTA?: boolean;
  className?: string;
  highlightTier?: "office" | "business" | "enterprise";
  showOnlyHighlighted?: boolean;
}

export function ServiceMatrix({ 
  variant = "full", 
  plans = defaultPlans,
  showCTA = true,
  className = "",
  highlightTier,
  showOnlyHighlighted = false
}: ServiceMatrixProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const filteredPlans = showOnlyHighlighted && highlightTier 
    ? plans.filter(p => p.name.toLowerCase() === highlightTier)
    : plans;

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (variant === "compact") {
    return (
      <div className={`rounded-2xl border border-white/10 p-6 bg-white/[0.02] ${className}`} data-testid="service-matrix-compact">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Protection Plans</h3>
            <p className="text-white/60 text-sm">Starting at $165/user/month</p>
          </div>
          <Link href="/pricing">
            <Button 
              className="bg-violet-600 hover:bg-violet-700 text-white"
              data-testid="button-view-pricing"
            >
              View Full Pricing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className={`grid gap-4 ${filteredPlans.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-3'}`}>
          {filteredPlans.map((plan) => {
            const isHighlighted = highlightTier && plan.name.toLowerCase() === highlightTier;
            return (
              <div 
                key={plan.name}
                className={`rounded-xl p-4 text-center border transition-all ${
                  isHighlighted 
                    ? 'border-violet-500 bg-violet-500/20 ring-2 ring-violet-500/30 shadow-lg shadow-violet-500/10' 
                    : plan.isPopular 
                      ? 'border-violet-500/50 bg-violet-500/10' 
                      : 'border-white/10 bg-white/[0.02]'
                }`}
                data-testid={`plan-compact-${plan.name.toLowerCase()}`}
              >
                {isHighlighted && (
                  <div className="text-xs text-violet-400 font-medium mb-2">Recommended for this service</div>
                )}
                <div className="text-white font-bold text-lg">{plan.name}</div>
                <div className="text-violet-400 text-sm">{plan.tier}</div>
                <div className="text-white font-bold text-2xl mt-2">${plan.perUserPrice}</div>
                <div className="text-white/50 text-xs">/user/mo</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`grid grid-cols-1 gap-6 ${filteredPlans.length === 1 ? 'max-w-lg mx-auto' : 'md:grid-cols-3'} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      data-testid="service-matrix-full"
    >
      {filteredPlans.map((plan) => {
        const isHighlighted = highlightTier && plan.name.toLowerCase() === highlightTier;
        return (
          <motion.div
            key={plan.name}
            className={`relative rounded-2xl p-6 border backdrop-blur-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 ${
              isHighlighted 
                ? 'border-violet-500 bg-gradient-to-b from-violet-500/15 to-violet-500/5 ring-2 ring-violet-500/30 shadow-xl shadow-violet-500/10' 
                : plan.isPopular 
                  ? 'border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-transparent' 
                  : 'border-white/10 bg-white/[0.03]'
            }`}
            variants={cardVariants}
            data-testid={`plan-${plan.name.toLowerCase()}`}
          >
            {(isHighlighted || plan.isPopular) && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
            )}
            
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                isHighlighted || plan.isPopular 
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' 
                  : 'bg-white/5 text-white border border-white/10'
              }`}>
                {plan.name}
              </span>
              {isHighlighted ? (
                <span className="text-xs text-violet-400 font-medium">Recommended</span>
              ) : plan.isPopular && (
                <span className="text-xs text-violet-400 font-medium">Most Popular</span>
              )}
            </div>
            
            <div className="text-white/60 text-xs uppercase tracking-wide mb-1">{plan.tier}</div>
            
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-white font-black text-4xl">${plan.monthlyPrice.toLocaleString()}</span>
              <span className="text-white/50">/mo</span>
            </div>
            
            <div className="text-white/50 text-sm mb-4">
              5 users • ${plan.perUserPrice}/user
            </div>
            
            <p className="text-white/70 text-sm mb-6">{plan.note}</p>
            
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
            
            {showCTA && (
              <Link href={plan.learnMoreUrl}>
                <Button 
                  className={`w-full ${
                    isHighlighted || plan.isPopular 
                      ? 'bg-violet-600 hover:bg-violet-700 text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  data-testid={`button-learn-more-${plan.name.toLowerCase()}`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
