import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Eye, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-white">
      <MegaMenu />
      
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-12 w-12 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Accessibility Statement</h1>
            </div>
            <p className="text-xl text-gray-300">
              Our Commitment to Digital Accessibility
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-lg text-gray-700 mb-6">
              Digerati Experts is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant 
              accessibility standards.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conformance Status</h2>
              <p className="text-gray-700 mb-3">
                We are working toward conformance with the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 
                Level AA</strong>. These guidelines explain how to make web content more accessible to people with disabilities.
              </p>
              <p className="text-gray-700">
                Conformance with these guidelines helps us ensure our website is accessible to people who are:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-3">
                <li>Blind or have low vision</li>
                <li>Deaf or have hearing loss</li>
                <li>Living with mobility impairments</li>
                <li>Living with cognitive disabilities</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
              <p className="text-gray-700 mb-3">Our website includes the following accessibility features:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Keyboard navigation support</li>
                <li>Alternative text for images</li>
                <li>Semantic HTML structure</li>
                <li>Clear heading hierarchy</li>
                <li>Sufficient color contrast ratios</li>
                <li>Readable fonts and text sizes</li>
                <li>Skip navigation links</li>
                <li>ARIA labels and landmarks</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Known Limitations</h2>
            <p className="text-gray-700 mb-3">
              Despite our best efforts, some content may not yet be fully accessible. We are actively 
              working to address these limitations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Some third-party embedded content may not meet accessibility standards</li>
              <li>Older PDF documents may not be fully accessible (we're working to remediate these)</li>
              <li>Some complex interactive elements are being enhanced for better screen reader support</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Assistive Technologies</h2>
            <p className="text-gray-700 mb-3">
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Feedback and Support</h2>
            <p className="text-gray-700 mb-3">
              We welcome your feedback on the accessibility of our website. If you encounter accessibility 
              barriers or have suggestions for improvement, please let us know:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-900 mb-2"><strong>Email:</strong> accessibility@digeratiexperts.com</p>
              <p className="text-gray-900 mb-2"><strong>Phone:</strong> 325-480-9870</p>
              <p className="text-gray-900 mb-2"><strong>Mail:</strong> 3165 S Alma School Rd Suite 29, Chandler, AZ 85248</p>
            </div>

            <p className="text-gray-700 mb-6">
              We aim to respond to accessibility feedback within 2 business days and will work with you to 
              provide the information, item, or transaction you seek through a communication method that is 
              accessible for you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Ongoing Efforts</h2>
            <p className="text-gray-700 mb-3">
              Accessibility is an ongoing effort. We regularly:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Conduct accessibility audits and testing</li>
              <li>Train our team on accessibility best practices</li>
              <li>Integrate accessibility into our development process</li>
              <li>Monitor and respond to accessibility feedback</li>
              <li>Update content and features to improve accessibility</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Third-Party Content</h2>
            <p className="text-gray-700 mb-6">
              While we strive to ensure accessibility across our entire website, some content is provided 
              by third parties. We cannot guarantee the accessibility of third-party content, but we work 
              with vendors who share our commitment to accessibility.
            </p>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Report an Accessibility Issue</h2>
              <p className="text-gray-700 mb-6">
                Your feedback helps us improve. Please report any accessibility concerns.
              </p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                onClick={() => window.location.href = 'mailto:accessibility@digeratiexperts.com?subject=Accessibility Feedback'}
                data-testid="button-report-accessibility"
              >
                <Mail className="h-5 w-5 mr-2" />
                Report Accessibility Issue
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-gray-600 text-sm">
                This accessibility statement was last updated on November 6, 2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
