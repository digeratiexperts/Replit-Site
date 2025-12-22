import { Briefcase, Calculator, Stethoscope, Home, Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const DigeratiIndustriesSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const industries = [
    { 
      icon: Briefcase, 
      name: "Law Firms", 
      testId: "industry-law",
      color: "purple",
      gradient: "from-purple-500 to-violet-600",
      glowColor: "rgba(139,92,246,0.3)",
      glyphGradient: "radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.25),transparent_60%)"
    },
    { 
      icon: Calculator, 
      name: "CPA Firms", 
      testId: "industry-cpa",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      glowColor: "rgba(59,130,246,0.3)",
      glyphGradient: "radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.25),transparent_60%)"
    },
    { 
      icon: Stethoscope, 
      name: "Medical\nPractices", 
      testId: "industry-medical",
      color: "cyan",
      gradient: "from-cyan-400 to-teal-500",
      glowColor: "rgba(34,211,238,0.3)",
      glyphGradient: "radial-gradient(circle_at_100%_0%,rgba(34,211,238,0.25),transparent_60%)"
    },
    { 
      icon: Home, 
      name: "Real Estate\nFirms", 
      testId: "industry-realestate",
      color: "emerald",
      gradient: "from-emerald-500 to-green-500",
      glowColor: "rgba(16,185,129,0.3)",
      glyphGradient: "radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.25),transparent_60%)"
    },
    { 
      icon: Heart, 
      name: "Animal\nHospitals", 
      testId: "industry-animal",
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
      glowColor: "rgba(236,72,153,0.3)",
      glyphGradient: "radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.25),transparent_60%)"
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
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const titleVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      className="py-16 md:py-20 lg:py-24 bg-[#0d0720] relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.12),transparent_50%),
          radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.08),transparent_50%),
          #0d0720
        `
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Industries We Serve
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Specialized cybersecurity solutions for Arizona's essential sectors
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div 
                key={index} 
                className="group cursor-pointer"
                data-testid={industry.testId}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <div 
                  className="relative bg-[#0f0b28]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-white/20 overflow-hidden h-full"
                  style={{
                    boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 40px ${industry.glowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.3)`;
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: industry.glyphGradient }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${industry.gradient} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                      style={{
                        boxShadow: `0 4px 15px ${industry.glowColor}`
                      }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white whitespace-pre-line leading-tight">
                      {industry.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
