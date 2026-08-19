import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Lock, Download, Zap, Shield, ExternalLink, ArrowRight } from "lucide-react";

const PORTAL_LOGIN = "https://portal.digeratiexperts.com/portal/login";
const PORTAL_INVOICES = "https://portal.digeratiexperts.com/portal/invoices";

export default function PayInvoice() {
  const methods = [
    { icon: CreditCard, title: "Credit/Debit Card", color: "from-blue-500 to-cyan-500", features: ["Visa, MasterCard, Amex", "Processed in the Client Portal", "Secure payment gateway"] },
    { icon: Lock, title: "Bank Transfer (ACH)", color: "from-green-500 to-emerald-500", features: ["Direct account transfer", "1-3 business days", "No credit card fees"] }
  ];

  const features = [
    { icon: Download, title: "Download Invoices", desc: "View and download all invoices and receipts in the portal" },
    { icon: Zap, title: "Auto-Pay Setup", desc: "Set up automatic monthly payments where available" },
    { icon: Shield, title: "Secure Payments", desc: "Encrypted checkout through the Client Portal" },
    { icon: CreditCard, title: "Payment History", desc: "Complete transaction records in your account" }
  ];

  return (
    <PageTemplate
      title="Pay Your Invoice"
      subtitle="Pay invoices securely through the Digerati Experts Client Portal"
      gradientColors="from-green-600 via-emerald-600 to-teal-600"
    >
      <div className="space-y-16">
        {/* Prominent portal CTA — this page is not a live card form */}
        <div className="relative rounded-2xl overflow-hidden border border-green-400/40 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Pay invoices in the Client Portal
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            This marketing page does not process payments. Sign in to the Client Portal to view open invoices and pay securely. If you&apos;re already logged in, go straight to Invoices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PORTAL_LOGIN}
              className="inline-flex items-center justify-center bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg"
              data-testid="button-portal-login-pay"
            >
              Sign in to Client Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href={PORTAL_INVOICES}
              className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all"
              data-testid="button-portal-invoices"
            >
              Go to Invoices
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
          <p className="text-sm text-white/70 mt-4">
            Portal login: portal.digeratiexperts.com/portal/login
          </p>
        </div>

        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">Multiple Payment Options</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Once signed in, you can use credit cards and bank transfers for your convenience. All payments are processed securely through the Client Portal — not on this page.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <div key={idx} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${method.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition-all`} />
                <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-400/50 transition-all h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-white">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {method.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
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
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-12 border border-white/10">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Payment Portal Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { badge: "Encrypted checkout", label: "TLS in transit" },
            { badge: "Security questionnaires", label: "Available on request" },
            { badge: "Framework alignment", label: "HIPAA · SOC 2 · insurance" },
          ].map((cert, idx) => (
            <div key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <p className="font-semibold text-white">{cert.badge}</p>
              <p className="text-xs text-gray-400">{cert.label}</p>
            </div>
          ))}
        </div>

        {/* Support */}
        <div className="border border-white/10 rounded-xl p-8 bg-white/5 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Having Trouble?</h2>
          <p className="text-gray-300 mb-6 text-center">
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
              href="tel:+13254809870"
              className="inline-flex items-center justify-center border-2 border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3 rounded-lg font-semibold transition-all"
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
