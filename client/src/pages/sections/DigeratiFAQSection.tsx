import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

export const DigeratiFAQSection = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What is your best service?",
      answer: "Our most comprehensive service is the Enterprise package, which includes zero-trust networking, incident response, compliance support, and disaster recovery testing. However, most businesses find our Advanced Security package provides the perfect balance of protection and value."
    },
    {
      question: "How do I choose the right plan for my business?",
      answer: "Evaluate your business size, needs, and goals. Our Basic plan is great for small businesses, while Advanced Security and Enterprise are designed for larger teams and advanced requirements. We offer a free consultation to help you choose."
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
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Find answers to common queries about us.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className="bg-white border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
              data-testid={`faq-${index}`}
            >
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </CardHeader>
              {openIndex === index && (
                <CardContent>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};