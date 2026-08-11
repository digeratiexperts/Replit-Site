import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Shield, Search, FileText, Settings, Activity, Eye, ShieldCheck, UserCheck, KeyRound, Cloud, AlertCircle } from "lucide-react";
import { useRef } from "react";
import { Link } from "wouter";


export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - subtle depth effect for light section
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-3%", "3%"]);
  
  const steps = [
    {
      number: 1,
      title: "Discovery & Assessment",
      description: "We analyze your current security posture, identify vulnerabilities, and understand your business needs.",
      icon: Search,
      testId: "step-discovery"
    },
    {
      number: 2,
      title: "Strategic Planning",
      description: "Custom security roadmap aligned with your business goals, compliance requirements, and budget.",
      icon: FileText,
      testId: "step-planning"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Deploy enterprise-grade security tools, configure policies, and train your team on best practices.",
      icon: Settings,
      testId: "step-implementation"
    },
    {
      number: 4,
      title: "Continuous Protection",
      description: "24/7 monitoring, regular updates, proactive threat hunting, and quarterly business reviews.",
      icon: Activity,
      testId: "step-protection"
    }
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const stepVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="protection"
      className="py-10 md:py-14 lg:py-16 relative overflow-hidden bg-white"
      style={{ position: 'relative' }}
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: "linear-gradient(180deg, #fafafa 0%, #ffffff 50%, #fafafa 100%)"
        }}
      />
      {/* Subtle parallax accent */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-50"
        style={{ 
          y: backgroundY,
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.05) 0%, transparent 70%)" 
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.35 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-violet-50 border border-violet-200 mb-4 md:mb-6">
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
            <span className="text-xs md:text-sm font-medium text-violet-600">Our Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 md:mb-4 px-2">
            How We Protect Your Business
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
            Our proven 4-step process ensures your business stays secure and compliant
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <motion.div 
                key={step.number}
                className="relative group"
                variants={stepVariants}
                data-testid={step.testId}
              >
                <div className="h-full bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10">
                  {/* Step number badge */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-lg md:rounded-xl bg-violet-400 flex items-center justify-center shadow-lg shadow-violet-400/25">
                      <span className="text-sm sm:text-base md:text-lg font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                    <div className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-lg md:rounded-xl bg-violet-50 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 sm:w-4.5 md:w-5 sm:h-4.5 md:h-5 text-violet-400" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-violet-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line for desktop (except last item) */}
                {step.number < 4 && (
                  <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-gradient-to-r from-violet-300 to-violet-100" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 md:mt-16 max-w-6xl mx-auto" id="protection-stack">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Security stack we manage
            </h3>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Technical depth lives here and on each solution page — so the homepage stays clear
              without losing capability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: Eye, title: "SOC / MDR Monitoring", link: "/solutions/security-operations", desc: "24/7 detection and response." },
              { icon: ShieldCheck, title: "Endpoint Security (EDR)", link: "/solutions/threat-detection", desc: "Protect devices across the environment." },
              { icon: UserCheck, title: "SMART Identity (MFA + SSO)", link: "/solutions/unified-security", desc: "Stronger access without user chaos." },
              { icon: KeyRound, title: "Privileged Access Controls", link: "/solutions/unified-security", desc: "Admin controls and audit visibility." },
              { icon: Cloud, title: "Backup & Disaster Recovery", link: "/solutions/backup-disaster-recovery", desc: "Recovery planning and restore discipline." },
              { icon: AlertCircle, title: "Email Protection", link: "/solutions/security-operations", desc: "Anti-phishing and mailbox defenses." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.link}>
                  <div className="h-full rounded-xl border border-gray-200 bg-white p-4 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-violet-500" aria-hidden="true" />
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
