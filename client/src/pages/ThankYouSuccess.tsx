import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, Clock, MapPin, Video, ExternalLink } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { useEffect } from "react";
import { SiGoogle } from "react-icons/si";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

export default function ThankYouSuccess() {
  useEffect(() => {
    document.title = "Thank You | Digerati Experts";
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MegaMenu />
      
      {/* Dark Header Section */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-900 pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={logoImage} 
              alt="Digerati Experts" 
              className="h-12 mx-auto"
              data-testid="img-logo"
            />
          </div>
          
          {/* Success Checkmark */}
          <div className="mb-6 flex justify-center">
            <div className="bg-slate-700/50 rounded-full p-4">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2">
                <CheckCircle className="h-8 w-8 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
          
          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-thank-you-title">
            Thank You!
          </h1>
          <p className="text-lg text-slate-300 max-w-lg mx-auto" data-testid="text-thank-you-message">
            Your form has been successfully submitted. Our team will review it and get back to you shortly.
          </p>
        </div>
      </section>
      
      {/* White Card Section */}
      <section className="flex-1 bg-slate-100 py-12 px-4 -mt-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Section Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
                Here's What You Can Do Next
              </h2>
              
              <p className="text-slate-600 text-center mb-2">
                Book a private session with our cybersecurity consultant.
              </p>
              <p className="text-slate-600 text-center mb-2">
                Identify how you can better protect your business from cyber threats.
              </p>
              <p className="text-slate-600 text-center mb-8">
                If you qualify, you will receive a <strong className="text-purple-600">free security assessment</strong>.
              </p>
              
              {/* Divider */}
              <div className="border-t border-slate-200 my-8" />
              
              {/* Meeting Scheduled Card */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Schedule Your Consultation
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Thank you for your interest. Click below to book a time that works for you.<br />
                  Call our office at <a href="tel:+14808448123" className="text-purple-600 hover:underline">(480) 844-8123</a> if you have any questions.
                </p>
                
                {/* Meeting Details */}
                <div className="bg-slate-50 rounded-xl p-6 mb-6 text-left max-w-sm mx-auto">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-700">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">30 Minutes</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <Video className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">Video Conference or Phone Call</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">America/Phoenix (MST)</span>
                    </div>
                  </div>
                </div>
                
                {/* Book Now Button */}
                <Button 
                  asChild 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                  data-testid="button-book-consultation"
                >
                  <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                    Book Your Free Consultation <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
              
              {/* Divider */}
              <div className="border-t border-slate-200 my-8" />
              
              {/* Calendar Buttons */}
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-4">Already have an appointment? Add it to your calendar:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button 
                    variant="outline" 
                    className="border-slate-300 hover:bg-slate-50"
                    data-testid="button-google-calendar"
                    asChild
                  >
                    <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer">
                      <SiGoogle className="h-4 w-4 mr-2" />
                      Google Calendar
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-slate-300 hover:bg-slate-50"
                    data-testid="button-outlook-calendar"
                    asChild
                  >
                    <a href="https://outlook.live.com/calendar" target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-4 w-4 mr-2" />
                      Outlook Calendar
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-slate-300 hover:bg-slate-50"
                    data-testid="button-apple-calendar"
                    asChild
                  >
                    <a href="https://www.icloud.com/calendar" target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-4 w-4 mr-2" />
                      iCloud Calendar
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Trust Badges Section */}
      <section className="bg-slate-800 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-6">
          {/* Google Reviews Badge */}
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
            <SiGoogle className="h-6 w-6 text-blue-500" />
            <div>
              <div className="text-xs font-semibold text-slate-700">Google Reviews</div>
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
            </div>
          </div>
          
          {/* Google Partner Badge */}
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
            <SiGoogle className="h-6 w-6 text-blue-500" />
            <div className="text-xs font-semibold text-slate-700">Google Partner</div>
          </div>
          
          {/* SOC 2 Badge */}
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
            <div className="text-xs font-semibold text-slate-700">SOC 2 Compliant</div>
          </div>
        </div>
      </section>
      
      <DigeratiEnhancedFooterSection />
    </div>
  );
}
