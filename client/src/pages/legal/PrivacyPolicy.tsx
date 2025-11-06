import { PageTemplate } from "@/components/PageTemplate";

export default function PrivacyPolicy() {
  const lastUpdated = "January 6, 2025";

  return (
    <PageTemplate
      title="Privacy Policy"
      subtitle={`Last updated: ${lastUpdated}`}
      gradientColors="from-slate-600 via-slate-700 to-slate-800"
    >
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-gray-700">
            Digerati Experts ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
          <p className="text-gray-700 mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Request a consultation or assessment</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us for support</li>
            <li>Use our services</li>
          </ul>
          
          <p className="text-gray-700 mt-4">
            This information may include your name, email address, phone number, company name, 
            and other details necessary to provide our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Send you technical notices and updates</li>
            <li>Communicate about products, services, and events</li>
            <li>Monitor and analyze usage and trends</li>
            <li>Detect and prevent fraud and security incidents</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational security measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction. 
            However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
          <p className="text-gray-700">
            We do not sell, trade, or rent your personal information to third parties. We may share 
            your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>With service providers who assist us in operating our business</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Request restriction of processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-4 text-gray-700">
            <p><strong>Email:</strong> privacy@digerati-experts.com</p>
            <p><strong>Phone:</strong> (480) 519-5892</p>
            <p><strong>Address:</strong> Chandler, Arizona</p>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}