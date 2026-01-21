import { Eye, ShieldCheck, UserCheck, KeyRound, Cloud, AlertCircle, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const DigeratiServicesSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const services = [
    {
      icon: Eye,
      title: "SOC / MDR Monitoring + Response",
      description: "24/7 Security Operations Center with real-time threat detection and response.",
      link: "/solutions/security-operations",
      testId: "card-threat-monitoring"
    },
    {
      icon: ShieldCheck,
      title: "Endpoint Security (EDR)",
      description: "Advanced endpoint detection protecting all devices in your environment.",
      link: "/solutions/endpoint-management",
      testId: "card-endpoint"
    },
    {
      icon: UserCheck,
      title: "SMART Identity (MFA + SSO)",
      description: "Multi-factor authentication and single sign-on for secure access.",
      link: "/solutions/identity-management",
      testId: "card-mfa"
    },
    {
      icon: KeyRound,
      title: "Privileged Access Controls",
      description: "Admin controls, audit logs, and device trust for enterprise security.",
      link: "/solutions/identity-management",
      testId: "card-identity"
    },
    {
      icon: Cloud,
      title: "Backup & Disaster Recovery",
      description: "Backup strategy with DR runbooks for business continuity.",
      link: "/solutions/backup-disaster-recovery",
      testId: "card-cloud"
    },
    {
      icon: AlertCircle,
      title: "Email Protection (Anti-Phishing)",
      description: "Advanced email filtering and protection against phishing attacks.",
      link: "/solutions/email-security",
      testId: "card-phishing"
    }
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section 
      id="services" 
      className="relative py-20 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Subtle purple accent */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 60%)" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
            What We Provide
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Our comprehensive suite of security services is designed to protect your business at every level, from endpoints to cloud infrastructure.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index} 
                className="group relative bg-[#161616] border border-white/[0.08] rounded-2xl p-8 
                           shadow-[0_4px_24px_rgba(0,0,0,0.4)]
                           transition-all duration-300 
                           hover:bg-[#1a1a1a] hover:border-violet-500/30 hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]"
                variants={cardVariants}
                data-testid={service.testId}
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl 
                                bg-violet-500/10 border border-violet-500/20 mb-6">
                  <Icon className="text-violet-400 h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-base text-white/70 leading-relaxed line-clamp-2 mb-4">
                  {service.description}
                </p>
                <a 
                  href={service.link}
                  className="inline-flex items-center text-violet-400 hover:text-violet-300 font-medium text-base transition-colors"
                  data-testid={`link-${service.testId}`}
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="/solutions"
            className="inline-flex items-center justify-center px-6 py-3 
                       bg-white text-black font-semibold rounded-lg 
                       transition-all duration-300 hover:bg-white/90"
            data-testid="button-explore-services"
          >
            Explore More Services <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
