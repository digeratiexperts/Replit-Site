import { motion } from "framer-motion";

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
      className="py-16 md:py-20 lg:py-24 bg-[#0a0118] relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 30% 20%, rgba(139,92,246,0.1), transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(34,211,238,0.08), transparent 50%)
        `
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            How We Protect Your Business
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
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
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/60 via-cyan-400/60 to-purple-500/60 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.4)]" />

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
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center relative animate-pulse"
                    style={{ animationDuration: '3s' }}
                  >
                    {/* Gradient Border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-cyan-400 to-purple-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#0a0118] flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-400/20 blur-xl" />
                  </div>
                </div>

                {/* Step Card */}
                <motion.div 
                  className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
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
