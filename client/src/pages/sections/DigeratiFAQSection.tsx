import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { revealInitial, revealInView, revealTransition, revealViewport } from "@/lib/animations";
import { FAQJsonLd } from "@/components/JsonLd";

interface FAQ {
  question: string;
  answer: string;
}

export const DigeratiFAQSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What is your best service?",
      answer: "There isn’t a universally “best” package. ProActive is four operating models — IT, Office, Business, and Enterprise — matched to users, devices, locations, infrastructure, security, compliance, and whether you need fully or co-managed coverage. If Office would need heavy modification, Business is the correct fit for that environment, not a higher rank."
    },
    {
      question: "How do I choose the right plan for my business?",
      answer: "User count is a signal, never the sole criterion. We start with a Cyber Risk Assessment of your environment, then match IT, Office, Business, or Enterprise. We do not start with a package and pile on add-ons."
    },
    {
      question: "Can I customize the solutions?",
      answer: "Yes! We understand every business is unique. Our packages can be customized with additional services, and we offer both co-managed and fully managed options to fit your existing IT structure."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. We use enterprise-grade controls, 24/7 monitoring, and documented security protocols. We help Arizona businesses prepare for HIPAA, PCI DSS, SOC 2, and cyber-insurance reviews — with clear ownership of credentials, policies, and evidence."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="de-paper-chapter de-paper-hairline de-chapter-fade-to-surface de-field-grain-paper de-field-lit relative py-16 md:py-20 lg:py-24">
      <FAQJsonLd faqs={faqs} />
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : revealInitial}
          whileInView={revealInView}
          viewport={revealViewport}
          transition={revealTransition}
          className="text-center mb-10 md:mb-12"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#D3126A] md:text-base">
            Common questions
          </p>
          <h2 className="mb-4 px-2 font-heading text-3xl font-semibold tracking-[-0.02em] text-[#1A1228] sm:text-4xl md:mb-5 md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="px-4 text-lg text-[#5A5368] md:text-xl">
            Straight answers on how we work, what we recommend, and why.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? false : revealInitial}
                whileInView={revealInView}
                viewport={revealViewport}
                transition={{ ...revealTransition, delay: index * 0.04 }}
                data-testid={`faq-${index}`}
              >
                <div 
                  className={`de-paper-lift rounded-xl border-l-4 transition-all duration-300 ${
                    isOpen 
                      ? 'border-l-[#D3126A] shadow-[0_6px_28px_-8px_rgba(211,18,106,0.22)]'
                      : 'border-l-[#D3126A]/30 hover:border-l-[#D3126A] hover:shadow-[0_4px_20px_-8px_rgba(211,18,106,0.18)]'
                  }`}
                >
                  <button
                    className="w-full px-6 py-6 md:px-8 md:py-7 flex items-center justify-between text-left group"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    data-testid={`faq-trigger-${index}`}
                  >
                    <span className={`pr-4 text-base font-semibold transition-colors duration-200 md:text-lg ${
                      isOpen ? 'text-[#D3126A]' : 'text-[#1A1228] group-hover:text-[#D3126A]'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-[#D3126A] rotate-180 shadow-[0_0_14px_-2px_rgba(211,18,106,0.55)]' 
                        : 'bg-[#D3126A]/10 group-hover:bg-[#D3126A]/20'
                    }`}>
                      <ChevronDown 
                        className={`h-5 w-5 transition-colors duration-200 flex-shrink-0 ${
                          isOpen ? 'text-white' : 'text-[#D3126A]'
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 md:px-8 md:pb-7 pt-0">
                          <div className="border-t border-[var(--de-paper-hairline)] pt-4">
                            <p className="text-base leading-relaxed text-[#3A3448] md:text-lg" id={`faq-answer-${index}`} data-testid={`faq-answer-${index}`}>
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
