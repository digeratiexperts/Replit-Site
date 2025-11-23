import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { isValidCorporateEmail } from '@/lib/emailValidator';
import { useLocation } from 'wouter';

// Step 1: Seat sizing
const step1Schema = z.object({
  seats: z.number().min(1).max(100),
  enterpriseToggle: z.boolean(),
});

// Step 2: Needs snapshot
const step2Schema = z.object({
  connectivity: z.enum(['yes', 'no', 'not-sure']),
  devices: z.enum(['yes', 'no', 'not-sure']),
});

// Step 3: Lead capture
const step3Schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  email: z.string().email('Invalid email format').refine(
    isValidCorporateEmail,
    'Please use your company email address, not a personal email'
  ),
  consent: z.boolean().refine(val => val === true, 'You must agree to be contacted'),
});

// Full form data
const fullFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FormData = z.infer<typeof fullFormSchema>;

const getPlanMatch = (data: {
  seats: number;
  enterpriseToggle: boolean;
  connectivity: string;
  devices: string;
}): { plan: string; reasons: string[] } => {
  if (data.enterpriseToggle || data.seats > 100) {
    return {
      plan: 'Enterprise Plan',
      reasons: [
        'Your organization requires custom scaling and dedicated support',
        'Enterprise-grade security and compliance controls',
        'Direct executive access and strategic guidance'
      ]
    };
  }

  if (data.connectivity === 'yes' && data.devices === 'yes') {
    return {
      plan: 'Techtility Plan',
      reasons: [
        'Complete ecosystem covering connectivity, devices, and productivity',
        'Integrated security across all infrastructure layers',
        'Unified management for optimal efficiency'
      ]
    };
  }

  if (data.connectivity === 'yes') {
    return {
      plan: 'Connectivity Plan',
      reasons: [
        'Secure network infrastructure and cloud connectivity',
        'Advanced security awareness and threat detection',
        'Optimized for hybrid and remote work'
      ]
    };
  }

  if (data.devices === 'yes') {
    return {
      plan: 'Productivity Plan',
      reasons: [
        'End-to-end device and endpoint management',
        'User productivity and support focus',
        'Perfect for office-based environments'
      ]
    };
  }

  return {
    plan: 'Productivity Plan',
    reasons: [
      'Complete user support and device management',
      'Essential security baseline for your organization',
      'Flexible scaling as your needs grow'
    ]
  };
};

export default function LeadQuoteWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<{ plan: string; reasons: string[] } | null>(null);
  const [formData, setFormData] = useState<Partial<FormData>>({
    seats: 10,
    enterpriseToggle: false,
    connectivity: 'not-sure',
    devices: 'not-sure',
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<FormData>({
    resolver: zodResolver(
      currentStep === 1 ? step1Schema : currentStep === 2 ? step2Schema : step3Schema
    ),
    defaultValues: formData,
  });

  const handleStep1Next = async () => {
    const data = await form.trigger(['seats', 'enterpriseToggle']);
    if (data) {
      setFormData(prev => ({ ...prev, ...form.getValues() }));
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleStep2Next = async () => {
    const data = await form.trigger(['connectivity', 'devices']);
    if (data) {
      setFormData(prev => ({ ...prev, ...form.getValues() }));
      setCurrentStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const plan = getPlanMatch({
        seats: data.seats,
        enterpriseToggle: data.enterpriseToggle,
        connectivity: data.connectivity,
        devices: data.devices,
      });

      const payload = {
        seats: data.seats,
        enterpriseToggle: data.enterpriseToggle,
        connectivity: data.connectivity,
        devices: data.devices,
        recommendedPlan: plan.plan,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        email: data.email,
        consent: data.consent,
        source: 'header-instant-quote',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/lead-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      setRecommendedPlan(plan);
      setFormData(prev => ({ ...prev, ...data }));
      setShowResults(true);

      // Navigate to confirmation page with data
      sessionStorage.setItem('leadQuoteResult', JSON.stringify({
        plan: plan.plan,
        reasons: plan.reasons,
        firstName: data.firstName,
        company: data.company,
      }));

      setLocation('/quote-confirmation');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full transition-colors ${
                step <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-4">Step {currentStep} of 3</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Step 1: Seat Sizing */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How many users?</h2>
                <p className="text-gray-600">Includes employees and shared devices.</p>
              </div>

              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Count: {field.value}</FormLabel>
                    <FormControl>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        disabled={form.watch('enterpriseToggle')}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enterpriseToggle"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">More than 100 users? We'll tailor enterprise sizing.</FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button variant="outline" type="button" onClick={() => setLocation('/')}>
                  Skip and talk to us
                </Button>
                <Button className="ml-auto" onClick={handleStep1Next}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Needs Snapshot */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you need?</h2>
                <p className="text-gray-600">Help us understand your infrastructure needs.</p>
              </div>

              <FormField
                control={form.control}
                name="connectivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you need secure connectivity and cloud storage?</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="not-sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="devices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you need desktops and laptops managed?</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="not-sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button className="ml-auto" onClick={handleStep2Next}>
                  See My Best Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Lead Capture */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Show Me The Best Plan!</h2>
                <p className="text-gray-600">We'll need a few details to confirm your perfect fit.</p>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.name@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 text-sm">I agree to be contacted about my plan match</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get My Instant Match
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
