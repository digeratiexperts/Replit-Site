import { Shield, Users, Activity, ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export const DigeratiAlertBanner = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-5%", "5%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : 30, prefersReducedMotion ? 0 : -30]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : -20, prefersReducedMotion ? 0 : 20]);

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
      ref={sectionRef}
      className="py-12 lg:py-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 50%, #E2E8F0 100%)'
      }}
    >
      {/* Parallax background elements */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ 
          y: backgroundY,
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.1) 0%, transparent 60%)" 
        }}
      />
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-16 h-16 rounded-full border-2 border-violet-300/20 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
      />
      <motion.div 
        className="absolute bottom-32 right-16 w-8 h-8 rounded-lg bg-violet-400/10 rotate-45 pointer-events-none hidden lg:block"
        style={{ y: floatingY2 }}
      />
      <motion.div 
        className="absolute top-1/2 right-8 w-4 h-4 rounded-full bg-purple-400/15 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
      />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-gray-900">
            We Exist to Protect and Enable Your Business
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            If you're like most business leaders, you don't want another vendor — you want a security-first partner who proactively reduces risk, improves uptime, and keeps your team moving.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              data-testid={feature.testId}
              className="group relative"
            >
              {/* Gradient border effect on hover */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
              
              {/* Card */}
              <div className="relative bg-white border border-gray-200 rounded-2xl p-6 h-full shadow-sm group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-violet-500/10 transition-all duration-300">
                {/* Icon with gradient background */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg"
                  style={{
                    background: index === 0 
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' 
                      : index === 1 
                        ? 'linear-gradient(135deg, #a855f7 0%, #c026d3 100%)'
                        : 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)'
                  }}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-700 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Gradient CTA Card */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div 
            className="relative rounded-2xl p-10 md:p-12 overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 35%, #c026d3 70%, #d946ef 100%)'
            }}
          >
            {/* Grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Secure Your Business?
              </h3>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Get enterprise-grade protection tailored for Arizona businesses. Let's discuss your security needs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/book">
                  <Button 
                    size="lg"
                    className="h-14 px-8 bg-white text-violet-700 hover:bg-white/90 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    data-testid="button-schedule-consultation-banner"
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Schedule Consultation
                  </Button>
                </a>
                <a href="tel:480-519-5892">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300"
                    data-testid="button-call-banner"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call 480-519-5892
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
