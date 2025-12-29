import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Shield, FileText, CheckCircle, Target, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function CaseStudies() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  const caseStudies = [
    {
      industry: "Healthcare",
      title: "Phoenix Medical Practice Achieves HIPAA Compliance",
      challenge: "Medical practice with 25 employees needed HIPAA-compliant IT infrastructure and failed their security audit.",
      solution: "Implemented encrypted email, secure file sharing, access controls, and comprehensive compliance documentation.",
      results: [
        "Passed HIPAA audit with zero findings",
        "Reduced security incidents by 95%",
        "Saved $50K in potential HIPAA fines"
      ],
      icon: Shield,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      industry: "Law Firm",
      title: "Law Firm Eliminates Downtime and Data Loss",
      challenge: "50-attorney law firm experiencing frequent server crashes and lost billable hours due to IT issues.",
      solution: "Deployed proactive monitoring, cloud backup, and dedicated IT support team.",
      results: [
        "Zero unplanned downtime in 12 months",
        "Recovered from ransomware attack in 4 hours",
        "Increased productivity by 30%"
      ],
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      industry: "Accounting",
      title: "CPA Firm Meets Insurance Requirements",
      challenge: "Accounting firm's cyber insurance required enhanced security measures and audit documentation.",
      solution: "Implemented MFA, EDR, security awareness training, and compliance reporting.",
      results: [
        "Renewed cyber insurance with 20% lower premium",
        "Passed all insurance security requirements",
        "Zero security incidents in 18 months"
      ],
      icon: FileText,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50"
    }
  ];

  const stats = [
    { value: "100+", label: "Arizona Businesses Served" },
    { value: "95%", label: "Average Incident Reduction" },
    { value: "$2M+", label: "Client Savings in Fines" },
    { value: "99.9%", label: "Uptime Achieved" }
  ];

  return (
    <PageTemplate
      title="Case Studies"
      subtitle="Real-world success stories from Arizona businesses that transformed their IT security and operations."
      icon={<Target className="w-10 h-10 text-white" />}
      breadcrumbs={[{ label: "Resources", href: "/" }, { label: "Case Studies" }]}
    >
      <div className="space-y-16">
        {/* Stats Section */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 text-white"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-purple-100 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="overflow-hidden border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader className={`bg-gradient-to-r ${study.bgGradient} border-b border-gray-100`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${study.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <Badge className={`mb-2 bg-gradient-to-r ${study.gradient} text-white border-0`}>
                            {study.industry}
                          </Badge>
                          <CardTitle className="text-2xl text-gray-900">{study.title}</CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Challenge */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-red-600" />
                          </div>
                          <h4 className="font-semibold text-lg text-gray-900">The Challenge</h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                      </div>
                      
                      {/* Solution */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Target className="w-4 h-4 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-lg text-gray-900">Our Solution</h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                      </div>
                      
                      {/* Results */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-lg text-gray-900">Results</h4>
                        </div>
                        <ul className="space-y-2">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                              <span className="text-gray-700 text-sm">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600" />
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="case-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#case-grid)" />
            </svg>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Write Your Success Story?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss how we can help your business achieve similar results.
            </p>
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105" 
              data-testid="button-contact-us"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  );
}
