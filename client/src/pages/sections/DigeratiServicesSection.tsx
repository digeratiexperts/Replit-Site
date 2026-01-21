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
      className="relative py-[60px] bg-gradient-to-br from-[#07041a] via-[#0f0b2c] to-[#1a1143] overflow-hidden"
    >
      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(139,92,246,0.15), transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59,130,246,0.12), transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(34,211,238,0.08), transparent 60%)
          `
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
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
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 
                           transition-all duration-300 
                           hover:bg-white/10 hover:border-white/20 hover:-translate-y-2
                           shadow-[0_20px_40px_-20px_rgba(139,92,246,0.3)]"
                variants={cardVariants}
                data-testid={service.testId}
              >
                {/* Neon edge highlight on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                     style={{
                       background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, transparent 50%, rgba(34,211,238,0.2) 100%)',
                       padding: '1px',
                       mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       maskComposite: 'xor',
                       WebkitMaskComposite: 'xor'
                     }}
                />
                
                {/* Icon container with gradient and glow */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl 
                                bg-gradient-to-br from-purple-600/30 to-cyan-600/30 
                                border border-purple-500/20 mb-6
                                shadow-[0_0_20px_rgba(139,92,246,0.2)]
                                group-hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]
                                transition-shadow duration-300">
                  <Icon className="text-cyan-400 h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed line-clamp-2 mb-4">
                  {service.description}
                </p>
                <a 
                  href={service.link}
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
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
                       bg-gradient-to-r from-purple-600 to-cyan-600 
                       hover:from-purple-500 hover:to-cyan-500
                       text-white font-semibold rounded-lg 
                       transition-all duration-300 
                       shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)]
                       hover:shadow-[0_15px_40px_-10px_rgba(139,92,246,0.6)]
                       hover:-translate-y-1"
            data-testid="button-explore-services"
          >
            Explore More Services <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
