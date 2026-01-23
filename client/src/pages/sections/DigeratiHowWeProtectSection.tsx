import { motion, useReducedMotion } from "framer-motion";
import { Shield, Search, FileText, Settings, Activity } from "lucide-react";

export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  
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
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const stepVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: "linear-gradient(180deg, #fafafa 0%, #ffffff 50%, #fafafa 100%)"
        }}
      />
      
      {/* Subtle accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-50"
        style={{ background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.05) 0%, transparent 70%)" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 mb-6">
            <Shield className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Our Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            How We Protect Your Business
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our proven 4-step process ensures your business stays secure and compliant
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
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
                <div className="h-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10">
                  {/* Step number badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                      <span className="text-lg font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-violet-600" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
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
      </div>
    </section>
  );
};
