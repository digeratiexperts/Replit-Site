import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Lock, Download } from "lucide-react";

export default function PayInvoice() {
  return (
    <PageTemplate
      title="Pay Your Invoice"
      subtitle="Secure online payment portal for Digerati Experts clients"
      gradientColors="from-green-600 via-emerald-600 to-teal-600"
    >
      <div className="space-y-12">
        {/* Payment Options */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Payment Options</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            We accept multiple payment methods for your convenience. All payments are processed securely and encrypted.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CreditCard className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle className="text-xl">Credit/Debit Card</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Visa, MasterCard, American Express</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Instant payment processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Secure Stripe payment gateway</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle className="text-xl">Bank Transfer (ACH)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Direct bank transfer from your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Processes within 1-3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>No credit card processing fees</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Payment Portal Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Download className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Download Invoices</h3>
                <p className="text-gray-600">View and download all your invoices and payment receipts</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Auto-Pay Setup</h3>
                <p className="text-gray-600">Set up automatic monthly payments for recurring invoices</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Lock className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure Payments</h3>
                <p className="text-gray-600">PCI-DSS compliant encryption for all transactions</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CreditCard className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Payment History</h3>
                <p className="text-gray-600">Complete record of all payments and transactions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Having Issues?</h2>
          <p className="text-gray-700 mb-6">
            If you're having trouble making a payment or have questions about your invoice, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/support/submit-ticket" 
              className="inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-support-payment"
            >
              Contact Support
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-md font-semibold transition-all"
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
