import { Shield, Bug, Lock, Database, AlertTriangle, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PatternOverlay, GlowOrb } from "@/components/SectionPatterns";

export const DigeratiWhatWeTackleSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  
  const challenges = [
    {
      icon: <Bug className="h-8 w-8" />,
      title: "Ransomware & Malware",
      description: "Advanced threat detection and rapid response to eliminate malicious attacks before damage occurs",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Loss Prevention",
      description: "Comprehensive backup strategies with tested disaster recovery ensuring business continuity",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Compliance Gaps",
      description: "Navigate HIPAA, PCI DSS, and SOC 2 requirements with continuous monitoring and reporting",
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Phishing & Social Engineering",
      description: "Multi-layered email security combined with ongoing employee security awareness training",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Zero-Day Vulnerabilities",
      description: "Proactive patch management and security assessments to close gaps before exploitation",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Insider Threats",
      description: "User behavior analytics and access controls to prevent internal security breaches",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Subtle violet accent glow */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Threat Protection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">Tackle</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Your business faces evolving cyber threats daily. We handle these complex challenges 
            with enterprise-grade solutions, so you can focus on growth without worry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {challenges.map((challenge, index) => (
            <motion.div 
              key={index} 
              className="group relative"
              data-testid={`tackle-card-${index}`}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${challenge.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 h-full border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:bg-white/[0.07]">
                {/* Icon container with gradient */}
                <div className="mb-5">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${challenge.gradient} bg-opacity-20 border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {challenge.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                  {challenge.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  {challenge.description}
                </p>

                {/* Subtle corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${challenge.gradient} opacity-5 rounded-tr-2xl rounded-bl-full`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-400 mb-6">
            Don't see your specific challenge? We handle it all.
          </p>
          <a 
            href="https://meet.digerati-experts.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
            data-testid="tackle-cta"
          >
            Discuss Your Security Needs
            <Shield className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
