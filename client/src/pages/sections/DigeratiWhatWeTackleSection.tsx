import { Shield, Server, Users, FileCheck, Bug, Laptop, Zap, Clock, Database, Lock, AlertTriangle, HeadphonesIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const DigeratiWhatWeTackleSection = (): JSX.Element => {
  const services = [
    {
      icon: <Bug className="h-8 w-8" />,
      title: "Malware & Ransomware",
      description: "Advanced threat detection and immediate response to malicious software attacks"
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "System Downtime",
      description: "Proactive monitoring to prevent outages and rapid recovery when issues occur"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Insider Threats",
      description: "Monitor and control access to prevent internal security breaches"
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Compliance Gaps",
      description: "Ensure HIPAA, PCI DSS, and industry-specific compliance requirements"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Loss",
      description: "Comprehensive backup strategies and disaster recovery planning"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Access Control",
      description: "Multi-factor authentication and zero-trust security models"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Phishing Attacks",
      description: "Email security and employee training to prevent social engineering"
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Vulnerability Management",
      description: "Regular security assessments and patch management"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Incident Response",
      description: "24/7 security operations center with rapid incident containment"
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Endpoint Security",
      description: "Protect all devices with advanced EDR solutions"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Network Defense",
      description: "Firewall management and intrusion prevention systems"
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8" />,
      title: "IT Support",
      description: "Comprehensive help desk and technical support services"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            What We Tackle
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From ransomware to compliance gaps, we handle the full spectrum of IT and security challenges 
            so you can focus on growing your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <CardHeader>
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors mb-2">
                  {service.icon}
                </div>
                <CardTitle className="text-white text-lg">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">
            Don't see your specific challenge? We customize solutions for any IT or security need.
          </p>
          <button 
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore More Solutions
          </button>
        </div>
      </div>
    </section>
  );
};