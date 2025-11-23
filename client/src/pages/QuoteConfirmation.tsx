import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { CheckCircle, Calendar, Mail, ArrowRight } from 'lucide-react';

interface ConfirmationData {
  plan: string;
  reasons: string[];
  firstName: string;
  company: string;
}

export default function QuoteConfirmation() {
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const stored = sessionStorage.getItem('leadQuoteResult');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading your quote...</p>
          <Button onClick={() => setLocation('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success State */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Perfect! We've Got Your Match</h1>
          <p className="text-lg text-gray-600 mb-2">Hi {data.firstName},</p>
          <p className="text-lg text-gray-600">We've analyzed your needs and found the ideal plan for {data.company}.</p>
        </div>

        {/* Plan Card */}
        <Card className="mb-12 p-8 border-2 border-purple-200 bg-white shadow-lg">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">{data.plan}</h2>
            <p className="text-gray-600">Your personalized recommendation</p>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-sm text-gray-600 font-semibold uppercase">Why this fits you:</p>
            {data.reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 text-sm font-semibold">{idx + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 mb-4">
              Next steps: Our team will review your profile and reach out within 24 hours with:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-purple-600">✓</span> Custom pricing for your company size
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">✓</span> Implementation timeline and options
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">✓</span> Answers to any questions
              </li>
            </ul>
          </div>
        </Card>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white h-12" data-testid="button-schedule-call">
            <Calendar className="mr-2 h-5 w-5" />
            Schedule 15-Minute Fit Call
          </Button>
          <Button size="lg" variant="outline" className="h-12" data-testid="button-email-details">
            <Mail className="mr-2 h-5 w-5" />
            Email Me These Details
          </Button>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Questions before we reach out?</p>
          <Button variant="outline" onClick={() => setLocation('/contact')}>
            Contact Us Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Trust Message */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-center text-sm text-gray-600">
            <span className="font-semibold">We respect your privacy:</span> Your information is secure and you'll only hear from our team about your specific plan match. <a href="/legal/privacy-policy" className="text-purple-600 hover:underline">View our privacy policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
