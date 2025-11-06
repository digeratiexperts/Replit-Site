import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Users, CheckCircle, Phone } from "lucide-react";

export default function ManagedITSupport() {
  return (
    <PageTemplate
      title="Managed IT Support"
      subtitle="Full-service IT support and maintenance for your business. We handle everything from helpdesk to infrastructure management."
    >
      <div className="space-y-12">
        {/* Key Benefits */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Why Choose Our Managed IT Support?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Proactive Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">24/7 monitoring and maintenance to prevent issues before they impact your business.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>15-Minute Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our team responds to support tickets within 15 minutes during business hours.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Dedicated Support Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Work with a consistent team that knows your business and environment.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Unlimited Help Desk Support",
              "Server & Workstation Management",
              "Network Monitoring & Maintenance",
              "Software Updates & Patch Management",
              "Email & Microsoft 365 Support",
              "Remote & On-site Support",
              "Security Monitoring & Protection",
              "Backup Monitoring & Testing",
              "IT Strategy & Planning",
              "Monthly Business Reviews"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">Schedule a free consultation to see how we can support your IT needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100"
              data-testid="button-schedule-consultation"
            >
              Schedule Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
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