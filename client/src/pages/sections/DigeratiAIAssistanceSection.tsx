import { Bot, Cpu, Brain, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const DigeratiAIAssistanceSection = (): JSX.Element => {
  const aiFeatures = [
    "Predictive threat analysis using machine learning",
    "Automated incident response and remediation",
    "Smart vulnerability prioritization",
    "Behavioral anomaly detection",
    "Intelligent security recommendations",
    "24/7 autonomous monitoring"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(147, 51, 234, 0.1) 35px, rgba(147, 51, 234, 0.1) 70px)`,
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Robot illustration */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Robot container */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                {/* Animated circles behind robot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 border border-purple-500/20 rounded-full animate-pulse"></div>
                  <div className="absolute w-64 h-64 border border-blue-500/20 rounded-full animate-pulse delay-500"></div>
                  <div className="absolute w-56 h-56 border border-purple-500/20 rounded-full animate-pulse delay-1000"></div>
                </div>
                
                {/* Robot icon/illustration */}
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-8 shadow-2xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-8">
                    <Bot className="h-32 w-32 text-white" strokeWidth={1.5} />
                    {/* Floating elements around robot */}
                    <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-2 animate-bounce">
                      <Sparkles className="h-6 w-6 text-yellow-900" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-blue-400 rounded-full p-2 animate-bounce delay-500">
                      <Cpu className="h-6 w-6 text-blue-900" />
                    </div>
                    <div className="absolute top-1/2 -right-8 bg-purple-400 rounded-full p-2 animate-bounce delay-1000">
                      <Brain className="h-6 w-6 text-purple-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <div className="mb-6">
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Protection
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Expert Assistance Using AI
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Our AI-powered security platform works 24/7 to predict, prevent, and respond to threats 
                before they impact your business. Think of it as your tireless digital security expert.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 mb-8">
              <h3 className="text-gray-900 font-semibold mb-2">Smarter Security, Better Results</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our AI reduces false positives by 85% and identifies real threats 3x faster than traditional methods.
              </p>
              <div className="flex gap-4">
                <div>
                  <div className="text-2xl font-bold text-purple-600">0.3s</div>
                  <div className="text-xs text-gray-600">Threat Detection</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">99.9%</div>
                  <div className="text-xs text-gray-600">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-xs text-gray-600">Monitoring</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                See AI in Action
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};