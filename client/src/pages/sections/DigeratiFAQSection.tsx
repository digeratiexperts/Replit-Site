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
      answer: "Our most comprehensive service is the Enterprise package, which includes full compliance modules (HIPAA, GDPR), penetration testing, disaster recovery runbooks, and privileged access controls. However, most businesses find our Business package provides the perfect balance of SOC/MDR protection, SMART HR, and vCIO advisory at a great value."
    },
    {
      question: "How do I choose the right plan for my business?",
      answer: "Evaluate your business size, needs, and goals. Our Office package is ideal for small teams (5-30 users) who need security-first IT basics. Business adds SOC/MDR monitoring and SMART HR. Enterprise is designed for organizations with compliance requirements. We offer a free FTA (First Time Appointment) to help you choose."
    },
    {
      question: "Can I customize the solutions?",
      answer: "Yes! We understand every business is unique. Our packages can be customized with additional services, and we offer both co-managed and fully managed options to fit your existing IT structure."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We employ enterprise-grade encryption, 24/7 monitoring, and follow strict security protocols. We're SOC 2 Type II certified and help our clients meet HIPAA, PCI DSS, and other compliance standards."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-[#F7FAFC]">
      <FAQJsonLd faqs={faqs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.35 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-500 px-4">
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
                  className={`bg-white rounded-xl shadow-md border-l-4 transition-all duration-300 hover:shadow-lg ${
                    isOpen 
                      ? 'border-l-violet-600 shadow-lg' 
                      : 'border-l-violet-400/50 hover:border-l-violet-500'
                  }`}
                >
                  <button
                    className="w-full px-5 py-5 md:px-6 md:py-6 flex items-center justify-between text-left group"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    data-testid={`faq-trigger-${index}`}
                  >
                    <span className={`text-base md:text-lg font-semibold pr-4 transition-colors duration-200 ${
                      isOpen ? 'text-violet-700' : 'text-gray-900 group-hover:text-violet-600'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-violet-600 rotate-180' 
                        : 'bg-violet-100 group-hover:bg-violet-200'
                    }`}>
                      <ChevronDown 
                        className={`h-5 w-5 transition-colors duration-200 flex-shrink-0 ${
                          isOpen ? 'text-white' : 'text-violet-600'
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
                            <p className="text-base text-gray-600 leading-relaxed" data-testid={`faq-answer-${index}`}>
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
