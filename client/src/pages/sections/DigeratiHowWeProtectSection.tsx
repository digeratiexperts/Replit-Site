import { motion } from "framer-motion";
import { PatternOverlay, DiagonalDivider } from "@/components/SectionPatterns";

export const DigeratiHowWeProtectSection = (): JSX.Element => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const stepVariants = {
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
      className="py-20 pt-32 pb-32 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 50%, #E2E8F0 100%)'
      }}
    >
      {/* Diagonal clip from dark section above */}
      <DiagonalDivider position="top" toColor="#0a0118" height={80} angle="right" />
      
      {/* Diagonal clip to dark section below */}
      <DiagonalDivider position="bottom" toColor="#0f0720" height={80} angle="left" />
      
      {/* Subtle pattern overlay for texture */}
      <PatternOverlay variant="dots" opacity={0.03} />
      
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-400/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A202C] leading-tight mb-4">
            How We Protect Your Business
          </h2>
          <p className="text-lg md:text-xl text-[#4A5568] leading-relaxed max-w-3xl mx-auto">
            Our proven 4-step process ensures your business stays secure and compliant
          </p>
        </motion.div>

        <motion.div 
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-400 to-purple-500 rounded-full" />

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
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold text-purple-600">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Card */}
                <motion.div 
                  className="flex-1 bg-white border border-gray-200 rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-purple-300 hover:shadow-lg group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-[#1A202C] mb-3 group-hover:text-purple-600 transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#4A5568] leading-relaxed">
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
