import { Eye, ShieldCheck, UserCheck, KeyRound, Cloud, AlertCircle, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";

export const DigeratiServicesSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const services = [
    {
      icon: Eye,
      title: "SOC / MDR Monitoring + Response",
      description: "24/7 Security Operations Center with real-time threat detection and response.",
      link: "/solutions/security-operations",
      testId: "card-threat-monitoring",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: ShieldCheck,
      title: "Endpoint Security (EDR)",
      description: "Advanced endpoint detection protecting all devices in your environment.",
      link: "/solutions/endpoint-management",
      testId: "card-endpoint",
      gradient: "from-purple-500 to-fuchsia-600"
    },
    {
      icon: UserCheck,
      title: "SMART Identity (MFA + SSO)",
      description: "Multi-factor authentication and single sign-on for secure access.",
      link: "/solutions/identity-management",
      testId: "card-mfa",
      gradient: "from-fuchsia-500 to-pink-600"
    },
    {
      icon: KeyRound,
      title: "Privileged Access Controls",
      description: "Admin controls, audit logs, and device trust for enterprise security.",
      link: "/solutions/identity-management",
      testId: "card-identity",
      gradient: "from-violet-600 to-indigo-600"
    },
    {
      icon: Cloud,
      title: "Backup & Disaster Recovery",
      description: "Backup strategy with DR runbooks for business continuity.",
      link: "/solutions/backup-disaster-recovery",
      testId: "card-cloud",
      gradient: "from-purple-600 to-violet-600"
    },
    {
      icon: AlertCircle,
      title: "Email Protection (Anti-Phishing)",
      description: "Advanced email filtering and protection against phishing attacks.",
      link: "/solutions/email-security",
      testId: "card-phishing",
      gradient: "from-fuchsia-600 to-purple-600"
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
      className="relative py-24 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Gradient orbs */}
      <div 
        className="absolute top-20 left-0 w-[600px] h-[600px] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle at 0% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)" }}
      />
      <div 
        className="absolute bottom-20 right-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle at 100% 70%, rgba(192, 38, 211, 0.12) 0%, transparent 50%)" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <ShieldCheck className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Core Security Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
            What We <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Provide</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            Enterprise-grade security services designed to protect your business at every level.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
                className="group relative"
                variants={cardVariants}
                data-testid={service.testId}
              >
                {/* Gradient border on hover */}
                <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Card */}
                <div className="relative bg-[#111111] border border-white/[0.08] rounded-2xl p-8 h-full
                               group-hover:border-transparent transition-all duration-300">
                  {/* Icon with gradient */}
                  <div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Link */}
                  <Link href={service.link} data-testid={`link-${service.testId}`}>
                    <span className="inline-flex items-center gap-2 text-violet-400 font-medium hover:text-violet-300 transition-colors cursor-pointer group/link">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
