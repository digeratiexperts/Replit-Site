import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Briefcase, Users, Star, Trophy, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Team() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  const team = [
    {
      name: "Leadership Team",
      description: "Industry veterans with decades of combined experience in IT and cybersecurity",
      certifications: ["CISSP", "CISM", "Microsoft Certified", "CompTIA Security+"],
      icon: Trophy,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      name: "Security Engineers",
      description: "Specialized cybersecurity experts protecting your business 24/7",
      certifications: ["CEH", "GIAC", "OSCP", "Security+"],
      icon: Shield,
      gradient: "from-purple-500 to-violet-600"
    },
    {
      name: "System Engineers",
      description: "Infrastructure experts ensuring your systems run smoothly",
      certifications: ["MCSE", "VMware VCP", "AWS Certified", "Azure Administrator"],
      icon: Briefcase,
      gradient: "from-violet-500 to-fuchsia-600"
    },
    {
      name: "Support Team",
      description: "Friendly, responsive technicians ready to help when you need it",
      certifications: ["A+", "Network+", "ITIL", "HDI Support"],
      icon: Users,
      gradient: "from-fuchsia-500 to-pink-600"
    }
  ];

  const certCategories = [
    {
      title: "Security Certifications",
      items: [
        "CISSP - Certified Information Systems Security Professional",
        "CISM - Certified Information Security Manager",
        "CEH - Certified Ethical Hacker",
        "OSCP - Offensive Security Certified Professional"
      ]
    },
    {
      title: "Technical Certifications",
      items: [
        "Microsoft Certified Solutions Expert",
        "VMware Certified Professional",
        "AWS Certified Solutions Architect",
        "CompTIA A+, Network+, Security+"
      ]
    },
    {
      title: "Partner Status",
      items: [
        "Microsoft Partner Network",
        "Apple Consultants Network",
        "SOC 2 Type II Certified",
        "Better Business Bureau A+ Rating"
      ]
    }
  ];

  return (
    <PageTemplate
      title="Meet The Experts"
      subtitle="Our certified team of IT and security professionals serving Chandler and the Phoenix metro area"
      icon={<Users className="w-10 h-10 text-white" />}
      breadcrumbs={[{ label: "About", href: "/" }, { label: "Team" }]}
    >
      <div className="space-y-16">
        {/* Introduction */}
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            Our team brings together decades of experience in IT management, cybersecurity, and business technology. 
            We're passionate about protecting Arizona businesses and helping them succeed with technology.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {team.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${group.gradient} opacity-10 rounded-bl-full`} />
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl flex items-center gap-2 text-white">
                      {group.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4 leading-relaxed">{group.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.certifications.map((cert, idx) => (
                        <Badge 
                          key={idx} 
                          className={`bg-gradient-to-r ${group.gradient} text-white border-0`}
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Team Stats */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 text-white"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { value: "50+", label: "Certifications" },
            { value: "100+", label: "Years Combined Experience" },
            { value: "24/7", label: "Support Coverage" },
            { value: "15 min", label: "Avg Response Time" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-purple-100 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Certifications & Partnerships */}
        <motion.div 
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Certifications & Partnerships</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {certCategories.map((category, catIdx) => (
                <motion.div 
                  key={catIdx}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1, duration: 0.3 }}
                >
                  <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-400" />
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600" />
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="team-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#team-grid)" />
            </svg>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Work with Our Team?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Schedule a free consultation to meet the team that will protect your business.
            </p>
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105" 
              data-testid="button-schedule"
            >
              Schedule Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  );
}
