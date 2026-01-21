import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const DigeratiPricingSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const pricingPlans = [
    {
      name: "Office",
      monthlyPrice: 825,
      perUserPrice: 165,
      isPopular: false,
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
      monthlyPrice: 1225,
      perUserPrice: 245,
      isPopular: true,
      learnMoreUrl: "/solutions/security-operations",
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
      monthlyPrice: 1725,
      perUserPrice: 345,
      isPopular: false,
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

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="pricing" 
      className="relative py-20 pt-28 pb-28 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Subtle violet accent glow */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)" }} />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <span className="text-sm font-medium text-violet-300">Transparent Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
            ProActive Ecosystem <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            Clear, predictable, and compliance-ready. Pricing shown for a <span className="font-bold text-white">5-user office</span>.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                plan.isPopular 
                  ? 'bg-white border-2 border-violet-500 ring-2 ring-violet-500/30 shadow-xl shadow-violet-500/10' 
                  : 'bg-white border border-gray-200 hover:border-violet-300 hover:shadow-lg'
              }`}
              data-testid={`pricing-${plan.name.toLowerCase().replace(' ', '-')}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                
                {/* Starting at price */}
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Starting at</span>
                </div>
                
                {/* Main price display */}
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    ${plan.monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-2 text-base">/mo</span>
                </div>
                
                {/* Per user breakdown */}
                <div className="text-sm text-gray-500">
                  for 5 users <span className="text-gray-400">•</span> ${plan.perUserPrice}/user
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className={`text-base text-gray-600 ${featureIndex === 0 && plan.name !== "Office" ? 'font-semibold text-gray-900' : ''}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <a href={plan.learnMoreUrl}>
                  <Button 
                    className="w-full border-2 border-violet-600 text-violet-600 bg-transparent hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 transition-all duration-200" 
                    variant="outline"
                    data-testid={`button-learn-more-${plan.name.toLowerCase()}`}
                  >
                    Learn More
                  </Button>
                </a>
                <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                  <Button 
                    className={`w-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                      plan.isPopular 
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 border-0' 
                        : 'border-2 border-violet-600 text-violet-600 bg-transparent hover:bg-violet-50'
                    }`}
                    variant={plan.isPopular ? "default" : "outline"}
                    data-testid={`button-strategy-call-${plan.name.toLowerCase()}`}
                  >
                    Book a Strategy Call
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-8 text-center text-sm text-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p>Offices with fewer than 5 users are billed per-user only — no minimum.</p>
          <p>Final pricing is tailored to your users, sites, and compliance needs.</p>
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="border-2 border-white/30 text-white bg-transparent hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 transition-all duration-200"
                variant="outline"
                data-testid="button-book-intro-call"
              >
                Book a 15-Minute Intro Call
              </Button>
            </a>
            <a href="/quote-wizard">
              <Button 
                size="lg" 
                className="border-2 border-white/30 text-white bg-transparent hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 transition-all duration-200"
                variant="outline"
                data-testid="button-see-pricing"
              >
                See Full Pricing & Packages
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
