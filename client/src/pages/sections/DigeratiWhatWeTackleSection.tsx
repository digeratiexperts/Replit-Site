import { Shield, Bug, Lock, Database, AlertTriangle, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";


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
      gradient: "from-violet-500 to-purple-500"
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
    <section className="py-12 lg:py-16 relative overflow-hidden bg-[#0a0a0a]">

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Shield className="w-4 h-4 text-[#FF477F]" />
            <span className="text-sm text-gray-300">Problems we solve</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300">Tackle</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Your business faces evolving cyber threats daily. We handle these complex challenges 
            with enterprise-grade solutions, so you can focus on growth without worry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 max-w-[100rem] mx-auto">
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
              {/* Card */}
              <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl rounded-2xl p-7 lg:p-8 h-full border border-white/10 transition-all duration-300 group-hover:border-violet-400/40 group-hover:shadow-2xl group-hover:shadow-violet-950/40 group-hover:-translate-y-1">
                {/* Subtle top accent */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${challenge.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Ambient glow */}
                <div className={`absolute -right-8 -top-8 w-28 h-28 bg-gradient-to-br ${challenge.gradient} opacity-0 group-hover:opacity-15 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none`} />

                {/* Icon container with gradient */}
                <div className="mb-5">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${challenge.gradient} bg-opacity-20 border border-white/15 shadow-inner shadow-white/10 group-hover:scale-105 transition-transform duration-300`}>
                    <div className="text-white">
                      {challenge.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-pink-200 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-white/65 text-base md:text-lg leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-14 md:mt-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-white/70 mb-6">
            Don't see your specific challenge? We handle custom infrastructure and security architectures.
          </p>
          <a 
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 text-base sm:text-lg bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 text-white font-semibold rounded-xl hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 border border-pink-300/30"
            data-testid="tackle-cta"
          >
            <span>Talk to a Security Expert</span>
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
