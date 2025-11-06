import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  gradientColors?: string;
}

export const PageTemplate = ({ 
  title, 
  subtitle, 
  children, 
  showBackButton = true,
  gradientColors = "from-purple-600 via-indigo-600 to-blue-600"
}: PageTemplateProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors}`}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-700/50 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {showBackButton && (
            <Button
              variant="ghost"
              className="text-white hover:text-yellow-300 mb-6"
              onClick={() => window.history.back()}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};