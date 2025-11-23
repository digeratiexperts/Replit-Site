import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";

interface ServiceFeature {
  title: string;
  description: string;
}

interface GenericServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  features: ServiceFeature[];
  benefits: string[];
  gradientColors?: string;
}

export default function GenericServicePage({
  title,
  subtitle,
  description,
  features,
  benefits,
  gradientColors = "from-purple-600 via-indigo-600 to-blue-600"
}: GenericServicePageProps) {
  return (
    <PageTemplate
      title={title}
      subtitle={subtitle}
      gradientColors={gradientColors}
    >
      <div className="space-y-12">
        {/* Description */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700">{description}</p>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">What You Get</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
          <p className="text-lg mb-6">Contact us today to discuss how we can help your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100"
              data-testid="button-contact"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-purple-700 bg-white hover:bg-gray-100"
              data-testid="button-call"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call (480) 519-5892
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}