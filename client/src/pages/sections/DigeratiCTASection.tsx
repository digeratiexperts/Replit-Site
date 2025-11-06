import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const DigeratiCTASection = (): JSX.Element => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-100/50 to-blue-100/50 blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Get a $20,000 Pen Test – Free
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
          Discover vulnerabilities before attackers do – without paying a cent.
        </p>
        
        <div className="flex items-center justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
          ))}
        </div>
        
        <p className="text-gray-700 mb-8 font-semibold">Trusted by 100+ Arizona Businesses.</p>
        
        <button 
          className="h-12 px-8 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-semibold"
          data-testid="button-cta-assessment"
          onClick={() => {
            document.getElementById('assessment-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Get My Free Assessment
        </button>
      </div>
    </section>
  );
};