import { Star, Shield, Award, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PatternOverlay } from "@/components/SectionPatterns";

const badges = [
  { name: "SOC 2 Type II", icon: Shield },
  { name: "Microsoft Partner", icon: Award },
  { name: "HIPAA Compliant", icon: CheckCircle },
  { name: "ISO 27001", icon: Shield },
];

export const DigeratiCTASection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section className="py-[60px] bg-[#0a0118] relative overflow-hidden">
      {/* Pattern overlay for texture */}
      <PatternOverlay variant="grid" opacity={0.015} />
      
      {/* Mesh gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(59,130,246,0.3), transparent 60%),
            radial-gradient(circle at 80% 10%, rgba(147,51,234,0.35), transparent 55%),
            radial-gradient(circle at 50% 80%, rgba(139,92,246,0.2), transparent 50%),
            radial-gradient(circle at 90% 90%, rgba(59,130,246,0.15), transparent 45%)
          `
        }}
      />
      
      {/* Animated floating orbs - hidden for reduced motion */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-20 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, -25, 0],
              y: [0, 25, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
      {/* Static orbs for reduced motion users */}
      {prefersReducedMotion && (
        <>
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        </>
      )}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated headline with light sweep */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative inline-block"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 relative overflow-hidden">
            <span className="relative z-10">
              Get a{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                $20,000 Pen Test
              </span>
              {" "}– Free
            </span>
            {/* Light sweep animation - hidden for reduced motion */}
            {!prefersReducedMotion && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              />
            )}
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed mb-2"
        >
          Discover vulnerabilities before attackers do – without paying a cent.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-gray-400 mb-6"
        >
          *With qualifying managed services package. Limited availability.
        </motion.p>
        
        {/* Stars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-1 mb-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            >
              <Star className="h-6 w-6 text-yellow-400 fill-current drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-gray-300 mb-10 font-semibold"
        >
          Trusted by 100+ Arizona Businesses.
        </motion.p>
        
        {/* CTA Button with intense glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.button
            className="h-14 px-10 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white text-lg font-bold shadow-[0_0_40px_rgba(139,92,246,0.5)] inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0118]"
            data-testid="button-cta-assessment"
            onClick={() => {
              document.getElementById('assessment-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 60px rgba(139,92,246,0.7), 0 0 100px rgba(59,130,246,0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get My Free Assessment
          </motion.button>
        </motion.div>
        
        {/* Floating Badge Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-6">
            Enterprise-Grade Compliance & Certifications
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {badges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(139,92,246,0.5)"
                  }}
                  className="flex items-center gap-2 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10"
                  data-testid={`badge-${badge.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <IconComponent className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-medium text-gray-300">{badge.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0118] to-transparent pointer-events-none" />
    </section>
  );
};
