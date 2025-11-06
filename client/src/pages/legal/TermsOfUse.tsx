import { PageTemplate } from "@/components/PageTemplate";

export default function TermsOfUse() {
  return (
    <PageTemplate
      title="Terms of Use"
      subtitle="Please read these terms carefully before using our services"
      gradientColors="from-slate-600 via-slate-700 to-slate-800"
    >
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using Digerati Experts' services, you accept and agree to be bound by these Terms of Use. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Service Description</h2>
          <p className="text-gray-700">
            Digerati Experts provides managed IT services, cybersecurity solutions, and related technology consulting services. 
            The specific services provided to each client are outlined in individual Master Service Agreements (MSA) and 
            Statements of Work (SOW).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
          <p className="text-gray-700 mb-4">As a user of our services, you agree to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use services in compliance with applicable laws and regulations</li>
            <li>Not interfere with or disrupt our services</li>
            <li>Promptly notify us of any security breaches</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
          <p className="text-gray-700">
            All content, trademarks, and other intellectual property on our website and in our services remain the property 
            of Digerati Experts. You may not use our intellectual property without written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
          <p className="text-gray-700">
            Digerati Experts shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
            resulting from your use of our services. Our liability is limited as specified in your Master Service Agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-gray-700">
            For questions about these Terms of Use, contact us at:
          </p>
          <div className="mt-4 text-gray-700">
            <p><strong>Email:</strong> legal@digerati-experts.com</p>
            <p><strong>Phone:</strong> (480) 519-5892</p>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}