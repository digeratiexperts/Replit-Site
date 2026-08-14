import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
    <section className="de-paper-chapter py-14 md:py-18 lg:py-20">
      <FAQJsonLd faqs={faqs} />
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.35 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-5 px-2">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-500 px-4">
            Find answers to common queries about us.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                data-testid={`faq-${index}`}
              >
                <div 
                  className={`de-paper-lift rounded-xl border-l-4 transition-all duration-300 ${
                    isOpen 
                      ? 'border-l-[#D3126A] shadow-lg'
                      : 'border-l-[#D3126A]/40 hover:border-l-[#D3126A] hover:shadow-lg'
                  }`}
                >
                  <button
                    className="w-full px-6 py-6 md:px-8 md:py-7 flex items-center justify-between text-left group"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    data-testid={`faq-trigger-${index}`}
                  >
                    <span className={`text-base md:text-lg font-semibold pr-4 transition-colors duration-200 ${
                      isOpen ? 'text-[#D3126A]' : 'text-gray-900 group-hover:text-[#D3126A]'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-[#D3126A] rotate-180' 
                        : 'bg-[#D3126A]/10 group-hover:bg-[#D3126A]/15'
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
                        <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-lg text-gray-600 leading-relaxed" data-testid={`faq-answer-${index}`}>
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
