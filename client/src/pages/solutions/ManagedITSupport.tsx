import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Users, CheckCircle, Phone } from "lucide-react";
import { ServiceMatrix } from "@/components/ServiceMatrix";

export default function ManagedITSupport() {
  return (
    <PageTemplate
      title="Managed IT Support"
      subtitle="Full-service IT support and maintenance for your business. We handle everything from helpdesk to infrastructure management."
      variant="dark"
    >
      <div className="space-y-12">
        {/* Key Benefits */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-white">Why Choose Our Managed IT Support?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.08] transition-all">
              <CardHeader>
                <Shield className="h-10 w-10 text-violet-400 mb-2" />
                <CardTitle className="text-white">Proactive Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">24/7 monitoring and maintenance to prevent issues before they impact your business.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.08] transition-all">
              <CardHeader>
                <Clock className="h-10 w-10 text-violet-400 mb-2" />
                <CardTitle className="text-white">15-Minute Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Our team responds to support tickets within 15 minutes during business hours.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.08] transition-all">
              <CardHeader>
                <Users className="h-10 w-10 text-violet-400 mb-2" />
                <CardTitle className="text-white">Dedicated Support Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Work with a consistent team that knows your business and environment.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-white">What's Included</h2>
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
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Matrix */}
        <div className="py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Recommended Plan for Managed IT Support</h2>
            <p className="text-white/60 text-center">This service is included in the following plan</p>
          </div>
          <ServiceMatrix 
            variant="full" 
            showCTA={true}
            highlightTier="office"
            showOnlyHighlighted={true}
          />
          <div className="mt-6 text-center">
            <a href="/pricing" className="text-violet-400 hover:text-violet-300 underline text-sm">
              View all pricing tiers and full service matrix →
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6 text-white/90">Schedule a free consultation to see how we can support your IT needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-white text-violet-700 hover:bg-gray-100"
                data-testid="button-schedule-consultation"
              >
                Schedule Consultation
              </Button>
            </a>
            <a href="tel:325-480-9870">
              <Button 
                size="lg" 
                className="bg-transparent border border-white text-white hover:bg-white hover:text-violet-600"
                data-testid="button-call-now"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call 325-480-9870
              </Button>
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
