import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

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
      className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#07041a] via-[#0f0b2c] to-[#1a1143] overflow-hidden"
    >
      {/* Mesh gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.08),transparent_60%)]" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            ProActive Ecosystem Pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Clear, predictable, and compliance-ready. Packages start at <span className="font-bold text-cyan-400">$165 per user/month</span>. 
            A <span className="font-bold text-cyan-400">$1,200/site minimum</span> applies for offices with 5+ users.
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
                  ? 'bg-white/10 backdrop-blur-xl border-2 border-cyan-400/60 ring-2 ring-cyan-400/60 shadow-[0_30px_70px_-30px_rgba(139,92,246,0.45)]' 
                  : 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/[0.08] hover:border-white/20'
              }`}
              data-testid={`pricing-${plan.name.toLowerCase().replace(' ', '-')}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-purple-500/30">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2 text-sm">per user avg</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm text-gray-300 ${featureIndex === 0 && plan.name !== "Office" ? 'font-semibold text-white' : ''}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0b2c] transition-all duration-200" 
                  variant="ghost"
                >
                  Learn More
                </Button>
                <Button 
                  className={`w-full font-semibold transition-all duration-200 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40'
                      : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 shadow-md hover:shadow-lg'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0b2c]`}
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
                className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0b2c] transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40"
                data-testid="button-book-intro-call"
              >
                Book a 15-Minute Intro Call
              </Button>
            </a>
            <a href="/lead-quote-wizard">
              <Button 
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0b2c] transition-all duration-200"
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
