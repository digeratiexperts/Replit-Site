import { motion, useReducedMotion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Headphones, Wifi, Monitor, Activity, RefreshCw, Shield, ArrowRight } from "lucide-react";

const ProActiveEcosystemPricing = () => {
  const prefersReducedMotion = useReducedMotion();

  const plans = [
    {
      name: "Office",
      tier: "Basic IT",
      price: 129,
      note: "A clean, managed IT baseline.",
      gradient: "from-cyan-500 to-blue-500",
      testId: "plan-office"
    },
    {
      name: "Business",
      tier: "Security",
      price: 189,
      note: "Adds stronger protection and response.",
      gradient: "from-blue-500 to-purple-500",
      testId: "plan-business"
    },
    {
      name: "Enterprise",
      tier: "Compliance",
      price: 249,
      note: "Adds governance and audit readiness.",
      gradient: "from-purple-500 to-pink-500",
      testId: "plan-enterprise"
    }
  ];

  const features = [
    {
      icon: Headphones,
      title: "Service Desk & Support",
      description: "Fast help for day-to-day issues, questions, and requests—plus escalation when it's more complex.",
      wide: false
    },
    {
      icon: Wifi,
      title: "Managed Network Security & Connectivity",
      description: "Works with your current network or replaces it when needed. We review router/firewall, Wi-Fi, and switches, identify support/end-of-life risks, and provide a recommended timeline—plus ongoing monitoring, updates, and security settings management.",
      wide: true
    },
    {
      icon: Monitor,
      title: "Device & User Management",
      description: "We manage users, devices, access, and standard configurations to keep everything consistent.",
      wide: false
    },
    {
      icon: Activity,
      title: "Monitoring & Maintenance",
      description: "Always-on monitoring and proactive maintenance to reduce downtime and surprises.",
      wide: false
    },
    {
      icon: RefreshCw,
      title: "Updates & Patch Management",
      description: "Operating systems and core apps kept current to reduce security and stability risks.",
      wide: false
    },
    {
      icon: Shield,
      title: "Security Settings Management",
      description: "Baseline hardening and secure configuration management, maintained consistently over time.",
      wide: false
    }
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#050312]">
      <MegaMenu />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 relative overflow-hidden"
            style={{
              background: `
                radial-gradient(900px 420px at 12% 8%, rgba(39,202,242,0.18), transparent 55%),
                radial-gradient(900px 420px at 88% 18%, rgba(179,0,255,0.16), transparent 55%),
                radial-gradient(900px 420px at 70% 92%, rgba(0,86,245,0.14), transparent 55%),
                linear-gradient(135deg, rgba(7,8,19,0.92), rgba(7,8,19,0.70))
              `,
              boxShadow: '0 18px 60px rgba(0,0,0,0.35)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="absolute -inset-0.5 rounded-3xl opacity-30 blur-xl pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(39,202,242,0.45), rgba(0,86,245,0.35), rgba(179,0,255,0.40), rgba(206,15,181,0.35))'
              }}
            />

            <div className="relative z-10">
              <header className="mb-8">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-gray-400 text-xs uppercase tracking-wider mb-4">
                  Included in every plan
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
                  ProActive Ecosystem Foundation
                </h1>
                <p className="text-gray-400 text-base sm:text-lg max-w-3xl leading-relaxed">
                  Office, Business, and Enterprise all include the same managed foundation. Higher tiers add depth: 
                  <span className="text-white font-medium"> Basic IT → Security → Compliance</span>.
                </p>
              </header>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {plans.map((plan) => (
                  <motion.article
                    key={plan.name}
                    className="relative rounded-2xl p-5 border border-white/10 backdrop-blur-xl overflow-hidden group hover:-translate-y-1 transition-all duration-200"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))'
                    }}
                    variants={itemVariants}
                    data-testid={plan.testId}
                  >
                    <div className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${plan.gradient} opacity-90`} />
                    
                    <div className="flex items-center justify-between mt-1 mb-3">
                      <span className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold">
                        {plan.name}
                      </span>
                      <span className="text-white font-extrabold text-sm tracking-tight">
                        {plan.tier}
                      </span>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-white font-black text-4xl tracking-tight">${plan.price}</span>
                      <span className="text-gray-400 text-sm">/ user / month</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {plan.note}
                    </p>
                  </motion.article>
                ))}
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {features.map((feature, index) => (
                  <motion.article
                    key={feature.title}
                    className={`rounded-2xl p-5 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1 hover:border-white/20 transition-all duration-200 ${feature.wide ? 'md:col-span-2 lg:col-span-1' : ''}`}
                    style={{
                      background: `
                        radial-gradient(400px 180px at 20% 0%, rgba(39,202,242,0.10), transparent 55%),
                        linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))
                      `
                    }}
                    variants={itemVariants}
                    data-testid={`feature-${index}`}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/15 mb-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(39,202,242,0.22), rgba(179,0,255,0.18))'
                      }}
                    >
                      <feature.icon className="w-5 h-5 text-white/90" />
                    </div>
                    
                    <h3 className="text-white font-extrabold text-base mb-2 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.article>
                ))}
              </motion.div>

              <motion.div 
                className="mt-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg"
                    className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
                    data-testid="button-schedule-call"
                  >
                    Schedule a Strategy Call
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <p className="text-gray-500 text-sm mt-4">
                  Custom pricing available for larger organizations and specific compliance requirements.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default ProActiveEcosystemPricing;
