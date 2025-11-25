import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Clock, RefreshCw } from "lucide-react";
import { Phone } from "lucide-react";

export default function RemoteSupport() {
  return (
    <PageTemplate
      title="Remote Support"
      subtitle="Instant, secure remote assistance from our expert technicians"
      gradientColors="from-blue-600 via-indigo-600 to-violet-600"
    >
      <div className="space-y-12">
        {/* How It Works */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">How Remote Support Works</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Need immediate help? Our remote support technicians can securely access your computer to diagnose and resolve issues in minutes, not hours.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-xl">Instant Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Connect in under 2 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>No software installation required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Works on Windows, Mac, and Linux</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-xl">Secure & Encrypted</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>End-to-end encrypted sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Session recording for compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>HIPAA and GDPR compliant</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <RefreshCw className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-xl">Screen Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Control your mouse and keyboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Multi-monitor support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>File transfer capability</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-xl">24/7 Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>24/7/365 support availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>15-minute response guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Escalation to senior engineers available</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-lg mb-6">Contact our support team now for instant remote assistance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/support/submit-ticket" 
              className="inline-flex items-center justify-center bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-submit-ticket-remote"
            >
              Submit Support Request
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-call-remote"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Support
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
