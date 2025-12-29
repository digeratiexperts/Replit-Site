import { Bot, Cpu, Brain, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";

export const DigeratiAIAssistanceSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  
  const aiFeatures = [
    "Predictive threat analysis using machine learning",
    "Automated incident response and remediation",
    "Smart vulnerability prioritization",
    "Behavioral anomaly detection",
    "Intelligent security recommendations",
    "24/7 autonomous monitoring"
  ];

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, #0f0720, #0d0720)`
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]" />
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(147, 51, 234, 0.2) 35px, rgba(147, 51, 234, 0.2) 70px)`,
          }} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Robot illustration */}
          <motion.div 
            className="flex justify-center lg:justify-start"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Robot container */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                {/* Animated circles behind robot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 border border-purple-500/30 rounded-full animate-pulse" />
                  <div className="absolute w-64 h-64 border border-cyan-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute w-56 h-56 border border-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                
                {/* Robot icon/illustration */}
                <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full p-8 shadow-2xl shadow-purple-500/30">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-8">
                    <Bot className="h-32 w-32 text-white" strokeWidth={1.5} />
                    {/* Floating elements around robot */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 animate-bounce shadow-lg shadow-yellow-500/30">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full p-2 animate-bounce shadow-lg shadow-cyan-500/30" style={{ animationDelay: '0.5s' }}>
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute top-1/2 -right-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-2 animate-bounce shadow-lg shadow-purple-500/30" style={{ animationDelay: '1s' }}>
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Protection
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Expert Assistance Using AI
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Our AI-powered security platform works 24/7 to predict, prevent, and respond to threats 
                before they impact your business. Think of it as your tireless digital security expert.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats card */}
            <div className="relative mb-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-xl blur opacity-75" />
              <div className="relative bg-[#1a0a2e]/80 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-white font-semibold mb-2">Smarter Security, Better Results</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Our AI reduces false positives by 85% and identifies real threats 3x faster than traditional methods.
                </p>
                <div className="flex gap-6">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">0.3s</div>
                    <div className="text-xs text-gray-500">Threat Detection</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">99.9%</div>
                    <div className="text-xs text-gray-500">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">24/7</div>
                    <div className="text-xs text-gray-500">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25"
                  data-testid="button-ai-action"
                >
                  See AI in Action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                data-testid="button-ai-learn-more"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
