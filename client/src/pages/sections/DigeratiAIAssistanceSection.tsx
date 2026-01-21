import { Bot, Cpu, Brain, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";

import teamMeetingImg from "@assets/business-colleagues-working-office_1767027918693.png";

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
    <section className="py-20 relative overflow-hidden bg-[#0a0a0a]">
      {/* Subtle violet accent glow */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div 
            className="flex justify-center lg:justify-start order-2 lg:order-1"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-violet-500/15 rounded-3xl blur-2xl" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={teamMeetingImg} 
                  alt="Expert team collaboration" 
                  className="w-full max-w-md object-cover"
                />
                
                {/* Overlay with stats */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">0.3s</div>
                      <div className="text-xs text-gray-300">Detection</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-xs text-gray-300">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-xs text-gray-300">Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AI badge */}
              <div className="absolute -top-4 -right-4 bg-white/5 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">AI Status</div>
                    <div className="text-base font-semibold text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Protection
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                Expert Assistance <span className="text-violet-400">Using AI</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Our AI-powered security platform works 24/7 to predict, prevent, and respond to threats 
                before they impact your business. Think of it as your tireless digital security expert.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-200">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Feature highlights */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
              <h3 className="text-white font-semibold mb-2">Smarter Security, Better Results</h3>
              <p className="text-gray-300 text-base">
                Our AI reduces false positives by 85% and identifies real threats 3x faster than traditional methods.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-white"
                  data-testid="button-ai-action"
                >
                  See AI in Action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/solutions/security-operations">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-white"
                  data-testid="button-ai-learn-more"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
