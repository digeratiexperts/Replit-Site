import { Shield, Bug, Lock, Database, AlertTriangle, Users } from "lucide-react";

export const DigeratiWhatWeTackleSection = (): JSX.Element => {
  const challenges = [
    {
      icon: <Bug className="h-10 w-10" />,
      title: "Ransomware & Malware",
      description: "Advanced threat detection and rapid response to eliminate malicious attacks before damage occurs"
    },
    {
      icon: <Database className="h-10 w-10" />,
      title: "Data Loss Prevention",
      description: "Comprehensive backup strategies with tested disaster recovery ensuring business continuity"
    },
    {
      icon: <AlertTriangle className="h-10 w-10" />,
      title: "Compliance Gaps",
      description: "Navigate HIPAA, PCI DSS, and SOC 2 requirements with continuous monitoring and reporting"
    },
    {
      icon: <Lock className="h-10 w-10" />,
      title: "Phishing & Social Engineering",
      description: "Multi-layered email security combined with ongoing employee security awareness training"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Zero-Day Vulnerabilities",
      description: "Proactive patch management and security assessments to close gaps before exploitation"
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Insider Threats",
      description: "User behavior analytics and access controls to prevent internal security breaches"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            What We Tackle
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your business faces evolving cyber threats daily. We handle these complex challenges 
            with enterprise-grade solutions, so you can focus on growth without worry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {challenges.map((challenge, index) => (
            <div 
              key={index} 
              className="group relative"
              data-testid={`tackle-card-${index}`}
            >
              {/* Card with gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
              <div className="relative bg-white backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
                {/* Icon container */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200 group-hover:border-purple-400 transition-colors">
                    <div className="text-purple-600 group-hover:text-purple-700 transition-colors">
                      {challenge.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Don't see your specific challenge? We handle it all.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            data-testid="tackle-cta"
          >
            Discuss Your Security Needs
            <Shield className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};