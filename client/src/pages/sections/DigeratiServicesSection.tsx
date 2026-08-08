import { Eye, ShieldCheck, UserCheck, KeyRound, Cloud, AlertCircle, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";

export const DigeratiServicesSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - reduced for smoother scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-3%", "3%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : 20, prefersReducedMotion ? 0 : -20]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : -15, prefersReducedMotion ? 0 : 15]);

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
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { 
      opacity: 0, 
      y: 25,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-10 md:py-14 lg:py-16 bg-[#0a0a0a] overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Parallax gradient orbs */}
      <motion.div 
        className="absolute top-20 left-0 w-[600px] h-[600px] pointer-events-none opacity-40"
        style={{ 
          y: backgroundY,
          background: "radial-gradient(circle at 0% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{ 
          y: floatingY2,
          background: "radial-gradient(circle at 100% 70%, rgba(192, 38, 211, 0.12) 0%, transparent 50%)" 
        }}
      />
      
      {/* Floating decorative elements - hidden on mobile */}
      <motion.div 
        className="absolute top-40 right-20 w-6 h-6 rounded-full border border-violet-500/20 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
      />
      <motion.div 
        className="absolute bottom-40 left-16 w-4 h-4 rounded-lg bg-purple-500/15 rotate-45 pointer-events-none hidden lg:block"
        style={{ y: floatingY2 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-8 md:mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#D3126A]/15 border border-[#D3126A]/30 mb-4 md:mb-6">
            <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF477F]" />
            <span className="text-xs md:text-sm font-medium text-[#FF477F]">Ways to engage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4 text-white">
            What We <span className="bg-gradient-to-r from-[#FF477F] via-[#D3126A] to-fuchsia-400 bg-clip-text text-transparent">Provide</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto px-4">
            Clear paths into managed security and IT — pick the engagement that fits how you work today.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8"
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
                <div className={`absolute -inset-[1px] rounded-xl md:rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Card */}
                <div className="relative bg-[#111111] border border-white/[0.08] rounded-xl md:rounded-2xl p-5 sm:p-6 lg:p-8 h-full
                               group-hover:border-transparent transition-all duration-300">
                  {/* Icon with gradient */}
                  <div 
                    className={`w-10 h-10 md:w-12 lg:w-14 md:h-12 lg:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 md:mb-6`}
                  >
                    <Icon className="h-5 w-5 md:h-6 lg:h-7 md:w-6 lg:w-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-violet-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-base text-white/60 leading-relaxed mb-4 md:mb-6">
                    {service.description}
                  </p>
                  
                  {/* Link */}
                  <Link href={service.link} data-testid={`link-${service.testId}`}>
                    <span className="inline-flex items-center gap-2 text-base text-violet-400 font-medium hover:text-violet-300 transition-colors cursor-pointer group/link">
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
