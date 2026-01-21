import { Shield, Users, Activity } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const DigeratiAlertBanner = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  const features = [
    {
      icon: Shield,
      title: "Security-First Operations",
      description: "Every system, endpoint, and user is protected - by design, not by reaction.",
      testId: "card-security-first"
    },
    {
      icon: Users,
      title: "Co-Managed or Fully Managed",
      description: "We support your internal IT or serve as your outsourced technology team.",
      testId: "card-co-managed"
    },
    {
      icon: Activity,
      title: "Executive-Level Transparency",
      description: "Reports, KPIs, and compliance insights that make sense - and drive decisions.",
      testId: "card-transparency"
    }
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 30 },
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
      className="py-20 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Subtle purple glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 60%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
            We Exist to Protect and Enable Your Business
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            If you're like most business leaders, you don't want another vendor — you want a security-first partner who proactively reduces risk, improves uptime, and keeps your team moving.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            Digerati Experts brings managed IT, cybersecurity, and compliance together in one streamlined operation – built for results, not noise.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              data-testid={feature.testId}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 h-full hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                  <feature.icon className="h-6 w-6 text-violet-400" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
