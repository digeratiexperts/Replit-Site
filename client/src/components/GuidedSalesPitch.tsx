import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Lightbulb, HelpCircle, MessageSquare, Trophy } from "lucide-react";

interface SalesPitchData {
  corePitch: string[];
  discoveryQuestions: string[];
  objections: Array<{ objection: string; response: string }>;
  valueProof: string[];
}

interface GuidedSalesPitchProps {
  data: SalesPitchData;
}

type TabKey = "core-pitch" | "questions" | "objections" | "value-proof";

const tabs = [
  { key: "core-pitch" as TabKey, label: "Core Pitch", icon: Lightbulb, testId: "tab-core-pitch" },
  { key: "questions" as TabKey, label: "Discovery Questions", icon: HelpCircle, testId: "tab-questions" },
  { key: "objections" as TabKey, label: "Objections & Responses", icon: MessageSquare, testId: "tab-objections" },
  { key: "value-proof" as TabKey, label: "Value Proof", icon: Trophy, testId: "tab-value-proof" },
];

export function GuidedSalesPitch({ data }: GuidedSalesPitchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("core-pitch");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sales") === "1") {
      setIsExpanded(true);
    }
  }, []);

  return (
    <div 
      className="bg-violet-500/10 border border-violet-500/30 rounded-2xl overflow-hidden"
      data-testid="section-sales-pitch"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-violet-500/5 transition-colors"
        data-testid="button-sales-toggle"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <span className="font-semibold text-violet-300 text-lg">Guided Sales Pitch</span>
            <p className="text-violet-400/70 text-sm">Key talking points, questions, and objection handlers</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-violet-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-violet-400 flex-shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6">
              <div className="flex flex-wrap gap-2 mb-6 border-b border-violet-500/20 pb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-violet-500/30 text-violet-200 border border-violet-500/50"
                        : "text-violet-400 hover:bg-violet-500/10 border border-transparent"
                    }`}
                    data-testid={tab.testId}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="min-h-[200px]">
                {activeTab === "core-pitch" && (
                  <div className="space-y-3">
                    <h4 className="text-violet-300 font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Main Selling Points
                    </h4>
                    <ul className="space-y-3">
                      {data.corePitch.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-violet-400 text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="text-white/80">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "questions" && (
                  <div className="space-y-3">
                    <h4 className="text-violet-300 font-semibold mb-4 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      Discovery Questions to Ask Prospects
                    </h4>
                    <ul className="space-y-3">
                      {data.discoveryQuestions.map((question, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "objections" && (
                  <div className="space-y-4">
                    <h4 className="text-violet-300 font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Common Objections & Responses
                    </h4>
                    <div className="space-y-4">
                      {data.objections.map((item, index) => (
                        <div key={index} className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="px-2 py-0.5 bg-violet-600/30 text-violet-300 text-xs font-semibold rounded">
                              OBJECTION
                            </span>
                            <span className="text-white/90 font-medium">"{item.objection}"</span>
                          </div>
                          <div className="flex items-start gap-3 pl-4 border-l-2 border-violet-500/30">
                            <span className="px-2 py-0.5 bg-violet-400/20 text-violet-200 text-xs font-semibold rounded">
                              RESPONSE
                            </span>
                            <span className="text-white/80">{item.response}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "value-proof" && (
                  <div className="space-y-3">
                    <h4 className="text-violet-300 font-semibold mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Key Outcomes & Differentiators
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {data.valueProof.map((proof, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-violet-500/10 border border-violet-500/20 rounded-lg p-4"
                        >
                          <Trophy className="w-5 h-5 text-violet-400 flex-shrink-0" />
                          <span className="text-white/80">{proof}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
