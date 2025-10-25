import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const DigeratiCTASection = (): JSX.Element => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get a $20,000 Pen Test – Free
        </h2>
        <p className="text-xl text-gray-100 mb-8">
          Discover vulnerabilities before attackers do – without paying a cent.
        </p>
        
        <div className="flex items-center justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <p className="text-white mb-8 font-semibold">Trusted by 100+ Arizona Businesses.</p>
        
        <Button 
          size="lg" 
          className="bg-white !text-purple-700 font-semibold hover:bg-gray-100 hover:!text-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl" 
          data-testid="button-cta-assessment"
        >
          Get My Free Assessment
        </Button>
      </div>
    </section>
  );
};