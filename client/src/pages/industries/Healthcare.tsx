import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, FileCheck, CheckCircle, Phone } from "lucide-react";

export default function Healthcare() {
  return (
    <PageTemplate
      title="IT Solutions for Healthcare"
      subtitle="HIPAA-compliant IT solutions designed to protect patient data and ensure regulatory compliance."
      gradientColors="from-blue-600 via-cyan-600 to-teal-600"
    >
      <div className="space-y-12">
        {/* Key Challenges */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Healthcare IT Challenges We Solve</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>HIPAA Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Maintain full HIPAA compliance with our comprehensive security solutions and documentation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Lock className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Protect sensitive patient data with enterprise-grade encryption and access controls.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <FileCheck className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Audit-Ready Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Always audit-ready with comprehensive documentation and compliance reporting.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* HIPAA Compliance Features */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">HIPAA Compliance Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Business Associate Agreements (BAA)",
              "Encrypted Email Solutions",
              "Secure File Sharing",
              "Access Controls & Audit Logs",
              "Backup & Disaster Recovery",
              "Risk Assessment & Analysis",
              "Security Awareness Training",
              "Incident Response Planning",
              "Regular Security Updates",
              "Compliance Documentation"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Protect Your Patient Data</h2>
          <p className="text-lg mb-6">Get a free HIPAA compliance assessment for your practice.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-gray-100"
              data-testid="button-get-assessment"
            >
              Get Free Assessment
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              data-testid="button-call-now"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call (480) 519-5892
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}