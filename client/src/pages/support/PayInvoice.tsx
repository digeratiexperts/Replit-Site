import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Lock, Download, Eye, Zap, Shield } from "lucide-react";

export default function PayInvoice() {
  const methods = [
    { icon: CreditCard, title: "Credit/Debit Card", color: "from-blue-500 to-cyan-500", features: ["Visa, MasterCard, Amex", "Instant processing", "Secure Stripe gateway"] },
    { icon: Lock, title: "Bank Transfer (ACH)", color: "from-green-500 to-emerald-500", features: ["Direct account transfer", "1-3 business days", "No credit card fees"] }
  ];

  const features = [
    { icon: Download, title: "Download Invoices", desc: "View and download all invoices and receipts" },
    { icon: Zap, title: "Auto-Pay Setup", desc: "Set up automatic monthly payments" },
    { icon: Shield, title: "Secure Payments", desc: "PCI-DSS compliant encryption" },
    { icon: CreditCard, title: "Payment History", desc: "Complete transaction records" }
  ];

  return (
    <PageTemplate
      title="Pay Your Invoice"
      subtitle="Secure online payment portal for Digerati Experts clients"
      gradientColors="from-green-600 via-emerald-600 to-teal-600"
    >
      <div className="space-y-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Multiple Payment Options</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            We accept credit cards and bank transfers for your convenience. All payments are processed securely and encrypted with enterprise-grade security.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <div key={idx} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${method.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition-all`} />
                <Card className="relative bg-white hover:shadow-lg transition-all border-2 border-white/50 group-hover:border-green-200 h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {method.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Portal Features */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-12 border border-green-100/50">
          <h2 className="text-2xl font-bold mb-8 text-center">Payment Portal Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex gap-4 p-4 bg-white/70 rounded-lg backdrop-blur-sm border border-white/50">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { badge: "PCI-DSS", label: "Level 1 Certified" },
            { badge: "SSL", label: "256-bit Encryption" },
            { badge: "SOC 2", label: "Type II" },
            { badge: "GDPR", label: "Compliant" }
          ].map((cert, idx) => (
            <div key={idx} className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg">
              <p className="font-semibold text-green-900">{cert.badge}</p>
              <p className="text-xs text-green-700">{cert.label}</p>
            </div>
          ))}
        </div>

        {/* Support */}
        <div className="border-2 border-green-200 rounded-xl p-8 bg-green-50/50">
          <h2 className="text-2xl font-bold mb-4 text-center">Having Trouble?</h2>
          <p className="text-gray-700 mb-6 text-center">
            Our MSP billing support team is ready to help with any payment questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/support/submit-ticket" 
              className="inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition-all"
              data-testid="button-support-payment"
            >
              Contact Support
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-all"
              data-testid="button-call-payment"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
