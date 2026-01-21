import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-5%", "5%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : 25, prefersReducedMotion ? 0 : -25]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : -20, prefersReducedMotion ? 0 : 20]);
  const timelineScale = useTransform(scrollYProgress, [0.2, 0.5], prefersReducedMotion ? [1, 1] : [0.98, 1]);
  
  const steps = [
    {
      number: 1,
      title: "Discovery & Assessment",
      description: "We analyze your current security posture and identify vulnerabilities",
      testId: "step-discovery"
    },
    {
      number: 2,
      title: "Strategic Planning",
      description: "Custom security roadmap aligned with your business goals",
      testId: "step-planning"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Deploy enterprise-grade security tools and protocols",
      testId: "step-implementation"
    },
    {
      number: 4,
      title: "Continuous Protection",
      description: "24/7 monitoring, updates, and proactive threat hunting",
      testId: "step-protection"
    }
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const stepVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 50%, #E2E8F0 100%)'
      }}
    >
      {/* Parallax background elements */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ 
          y: backgroundY,
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 60%)" 
        }}
      />
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-24 right-16 w-20 h-20 rounded-full border-2 border-violet-300/20 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
      />
      <motion.div 
        className="absolute bottom-32 left-12 w-6 h-6 rounded-lg bg-purple-400/15 rotate-45 pointer-events-none hidden lg:block"
        style={{ y: floatingY2 }}
      />
      <motion.div 
        className="absolute top-1/3 left-8 w-3 h-3 rounded-full bg-violet-400/20 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-24 w-10 h-10 rounded-full border border-fuchsia-300/15 pointer-events-none hidden lg:block"
        style={{ y: floatingY2 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-6">
            <span className="text-sm font-medium text-violet-700">Our Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            How We <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Protect</span> Your Business
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our proven 4-step process ensures your business stays secure and compliant
          </p>
        </motion.div>

        <motion.div 
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ scale: timelineScale }}
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500 rounded-full shadow-lg shadow-violet-500/30" />

          {/* Timeline Steps */}
          <div className="space-y-8 md:space-y-12">
            {steps.map((step) => (
              <motion.div 
                key={step.number}
                className="relative flex items-start gap-6 md:gap-8"
                variants={stepVariants}
                data-testid={step.testId}
              >
                {/* Step Number Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div 
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center relative"
                  >
                    {/* Gradient Border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-[2px] shadow-lg shadow-violet-500/30">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Card */}
                <motion.div 
                  className="flex-1 bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 group"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
