import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, Phone, Mail, ArrowRight, Shield, Clock, Users } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { useEffect } from "react";

export default function ThankYouSuccess() {
  useEffect(() => {
    document.title = "Thank You | Digerati Experts";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MegaMenu />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-6">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            
            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" data-testid="text-thank-you-title">
              Thank You for Reaching Out!
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto" data-testid="text-thank-you-message">
              Your submission has been received. A member of our team will contact you within <strong className="text-purple-600">1 business day</strong> to discuss your cybersecurity needs.
            </p>
            
            {/* Confirmation Details */}
            <Card className="bg-white/80 backdrop-blur border-green-200 shadow-lg mb-12">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Submission Confirmed</span>
                </div>
                <p className="text-slate-600 text-sm">
                  A confirmation email has been sent to your inbox. Please check your spam folder if you don't see it.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* What Happens Next */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              What Happens Next?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-sm font-semibold text-purple-600 mb-2">Step 1</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Quick Review</h3>
                  <p className="text-slate-600 text-sm">
                    Our team reviews your submission and prepares personalized recommendations for your business.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">Step 2</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Personal Consultation</h3>
                  <p className="text-slate-600 text-sm">
                    A cybersecurity expert will reach out to schedule a free consultation at your convenience.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-sm font-semibold text-green-600 mb-2">Step 3</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Custom Solution</h3>
                  <p className="text-slate-600 text-sm">
                    We'll design a tailored security strategy that fits your business needs and budget.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Immediate Action Options */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
              Can't Wait? Take Action Now
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Schedule Consultation */}
              <Card className="bg-gradient-to-br from-purple-600 to-blue-600 border-0 text-white">
                <CardContent className="p-6">
                  <Calendar className="h-10 w-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Schedule a Consultation</h3>
                  <p className="text-purple-100 mb-4 text-sm">
                    Skip the wait and book a time that works for you. Our calendar is open for immediate scheduling.
                  </p>
                  <Button 
                    asChild 
                    className="bg-white text-purple-600 hover:bg-purple-50 w-full"
                    data-testid="button-schedule-consultation"
                  >
                    <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Contact Directly */}
              <Card className="bg-white border shadow-md">
                <CardContent className="p-6">
                  <Users className="h-10 w-10 text-slate-700 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Contact Us Directly</h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    Have an urgent security concern? Our team is ready to help you right away.
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="tel:+14808448123" 
                      className="flex items-center gap-2 text-slate-700 hover:text-purple-600 transition-colors"
                      data-testid="link-phone"
                    >
                      <Phone className="h-4 w-4" />
                      <span>(480) 844-8123</span>
                    </a>
                    <a 
                      href="mailto:security@digeratiexperts.com" 
                      className="flex items-center gap-2 text-slate-700 hover:text-purple-600 transition-colors"
                      data-testid="link-email"
                    >
                      <Mail className="h-4 w-4" />
                      <span>security@digeratiexperts.com</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Continue Exploring */}
        <section className="py-16 px-4 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              While You Wait, Explore Our Resources
            </h2>
            <p className="text-slate-400 mb-8">
              Learn more about how we protect Arizona businesses from cyber threats
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10" data-testid="link-solutions">
                <Link href="/solutions">
                  Our Solutions
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10" data-testid="link-industries">
                <Link href="/industries/healthcare">
                  Industries We Serve
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10" data-testid="link-case-studies">
                <Link href="/resources/case-studies">
                  Case Studies
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10" data-testid="link-homepage">
                <Link href="/">
                  Back to Homepage
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <DigeratiEnhancedFooterSection />
    </div>
  );
}
