import { Shield, MapPin, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DigeratiEnhancedFooterSection } from '@/pages/sections/DigeratiEnhancedFooterSection';
import { MegaMenu } from '@/components/MegaMenu';

interface LocationPageProps {
  city: string;
  state: string;
  localArea: string;
  serviceRadius: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  keywordPhrase: string;
  whyChooseUs: string[];
  localProof: {
    officeLocation: string;
    yearsServing: string;
    testimonialCount: string;
    industries: string[];
  };
  serviceFocus: string[];
  neighborhoods: string[];
  cta: string;
}

export function LocationServicePage(props: LocationPageProps) {
  return (
    <>
      <MegaMenu />
      {/* Main Content */}
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#030228] via-[#1a0f3f] to-[#2d1b69] py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 text-6xl">{props.heroImage}</div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-[#5034ff]" />
                <span className="text-[#5034ff] font-semibold text-sm">{props.localArea}</span>
              </div>
              <h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4 [font-family:'Poppins',Helvetica]"
                data-testid={`location-title-${props.city.toLowerCase()}`}
              >
                {props.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">{props.subtitle}</p>
              <p className="text-lg text-gray-400 mb-8">{props.description}</p>
              <Button
                className="bg-gradient-to-r from-[#5034ff] to-[#3d28cc] hover:from-[#4028dd] hover:to-[#3620bb] text-white px-8 py-3 font-semibold text-lg shadow-lg"
                data-testid={`cta-location-${props.city.toLowerCase()}`}
              >
                {props.cta}
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Why Choose Digerati Experts in {props.city}?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {props.whyChooseUs.map((reason, index) => (
                <div 
                  key={index}
                  className="flex gap-4"
                  data-testid={`why-reason-${index}`}
                >
                  <Shield className="h-6 w-6 text-[#5034ff] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-800 font-medium">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Proof Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Local {props.city} Expertise
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#5034ff]">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Our {props.city} Presence</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#5034ff] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Local Office</p>
                          <p className="text-gray-700">{props.localProof.officeLocation}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-[#5034ff] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Experience</p>
                          <p className="text-gray-700">{props.localProof.yearsServing}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-[#5034ff] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Track Record</p>
                          <p className="text-gray-700">{props.localProof.testimonialCount}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Industries We Serve</h3>
                    <ul className="space-y-2">
                      {props.localProof.industries.map((industry, index) => (
                        <li 
                          key={index}
                          className="flex items-center gap-2 text-gray-700"
                          data-testid={`industry-${index}`}
                        >
                          <div className="w-2 h-2 bg-[#5034ff] rounded-full"></div>
                          {industry}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Focus Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Services Available in {props.city}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {props.serviceFocus.map((service, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200 hover:shadow-lg transition-shadow"
                  data-testid={`service-${index}`}
                >
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-[#5034ff] flex-shrink-0 mt-1" />
                    <h3 className="font-semibold text-gray-900">{service}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our {props.city} Service Area
            </h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-6 text-center">{props.serviceRadius}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {props.neighborhoods.map((neighborhood, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-[#5034ff] px-4 py-2 rounded-full font-medium text-sm"
                    data-testid={`neighborhood-${index}`}
                  >
                    {neighborhood}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#5034ff] to-[#3d28cc]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{props.cta}</h2>
            <p className="text-xl text-purple-100 mb-8">
              Contact our {props.city} team today for your free consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-[#5034ff] hover:bg-gray-100 font-semibold px-8 py-3"
                data-testid={`cta-button-${props.city.toLowerCase()}`}
              >
                Start Your Free Assessment
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
                data-testid={`cta-secondary-${props.city.toLowerCase()}`}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 325-480-9870
              </Button>
            </div>
          </div>
        </section>
      </main>

      <DigeratiEnhancedFooterSection />
    </>
  );
}
