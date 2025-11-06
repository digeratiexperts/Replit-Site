import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Briefcase } from "lucide-react";

export default function Team() {
  const team = [
    {
      name: "Leadership Team",
      description: "Industry veterans with decades of combined experience in IT and cybersecurity",
      certifications: ["CISSP", "CISM", "Microsoft Certified", "CompTIA Security+"]
    },
    {
      name: "Security Engineers",
      description: "Specialized cybersecurity experts protecting your business 24/7",
      certifications: ["CEH", "GIAC", "OSCP", "Security+"]
    },
    {
      name: "System Engineers",
      description: "Infrastructure experts ensuring your systems run smoothly",
      certifications: ["MCSE", "VMware VCP", "AWS Certified", "Azure Administrator"]
    },
    {
      name: "Support Team",
      description: "Friendly, responsive technicians ready to help when you need it",
      certifications: ["A+", "Network+", "ITIL", "HDI Support"]
    }
  ];

  return (
    <PageTemplate
      title="Meet The Experts"
      subtitle="Our certified team of IT and security professionals serving Chandler and the Phoenix metro area"
    >
      <div className="space-y-12">
        {/* Introduction */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-700">
            Our team brings together decades of experience in IT management, cybersecurity, and business technology. 
            We're passionate about protecting Arizona businesses and helping them succeed with technology.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {team.map((group, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {group.certifications.map((cert, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Award className="h-8 w-8 text-purple-600" />
            Our Certifications & Partnerships
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Security Certifications</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• CISSP - Certified Information Systems Security Professional</li>
                <li>• CISM - Certified Information Security Manager</li>
                <li>• CEH - Certified Ethical Hacker</li>
                <li>• OSCP - Offensive Security Certified Professional</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Technical Certifications</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Microsoft Certified Solutions Expert</li>
                <li>• VMware Certified Professional</li>
                <li>• AWS Certified Solutions Architect</li>
                <li>• CompTIA A+, Network+, Security+</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Partner Status</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Microsoft Partner Network</li>
                <li>• Apple Consultants Network</li>
                <li>• SOC 2 Type II Certified</li>
                <li>• Better Business Bureau A+ Rating</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with Our Team?</h2>
          <p className="text-lg mb-6">Schedule a free consultation to meet the team that will protect your business.</p>
          <button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold" data-testid="button-schedule">
            Schedule Consultation
          </button>
        </div>
      </div>
    </PageTemplate>
  );
}