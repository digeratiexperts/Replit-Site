import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WaveDivider } from "@/components/SectionPatterns";

export const DigeratiPricingSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const pricingPlans = [
    {
      name: "Office",
      price: 165,
      isPopular: false,
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
      price: 245,
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
      price: 345,
      isPopular: false,
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
      className="relative py-[80px] pt-32 pb-32 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 50%, #171923 100%)'
      }}
    >
      {/* Wave transitions for visual flow */}
      <WaveDivider position="top" toColor="#0a0a0a" height={60} />
      <WaveDivider position="bottom" toColor="#0a0a0a" height={60} flip />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
            ProActive Ecosystem Pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Clear, predictable, and compliance-ready. Packages start at <span className="font-bold text-white">$165 per user/month</span>. 
            A <span className="font-bold text-white">$1,200/site minimum</span> applies for offices with 5+ users.
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
                  ? 'bg-white border-2 border-purple-500 ring-2 ring-purple-500/30 shadow-xl' 
                  : 'bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg'
              }`}
              data-testid={`pricing-${plan.name.toLowerCase().replace(' ', '-')}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#1A202C] mb-4">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-purple-600">
                    ${plan.price}
                  </span>
                  <span className="text-[#718096] ml-2 text-sm">per user avg</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm text-[#4A5568] ${featureIndex === 0 && plan.name !== "Office" ? 'font-semibold text-[#1A202C]' : ''}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <Button 
                  className="w-full border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition-all duration-200" 
                  variant="outline"
                >
                  Learn More
                </Button>
                <Button 
                  className="w-full border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  variant="outline"
                >
                  Book a Strategy Call
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-8 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p>Small sites under 5 users are billed per-user only — no minimum. Offices with 5+ users include a $1,200/site minimum.</p>
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
                className="border-2 border-white/40 text-white bg-transparent hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition-all duration-200"
                variant="outline"
                data-testid="button-book-intro-call"
              >
                Book a 15-Minute Intro Call
              </Button>
            </a>
            <a href="/quote-wizard">
              <Button 
                size="lg" 
                className="border-2 border-white/40 text-white bg-transparent hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition-all duration-200"
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
