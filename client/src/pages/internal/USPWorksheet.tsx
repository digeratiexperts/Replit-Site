import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Save, Trash2, Printer } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  problem1: string;
  claim1: string;
  standard1: string;
  better1: string;
  benefit1: string;
  proof1: string;
  problem2: string;
  claim2: string;
  standard2: string;
  better2: string;
  benefit2: string;
  proof2: string;
  problem3: string;
  claim3: string;
  standard3: string;
  better3: string;
  benefit3: string;
  proof3: string;
  reason1: string;
  reason2: string;
  reason3: string;
  reason4: string;
  reason5: string;
  reason6: string;
  reason7: string;
  reason8: string;
  reason9: string;
  reason10: string;
  competitive: string;
  weeklyGoals: string;
  monthlyGoals: string;
  quarterlyGoals: string;
  actionItem1: string;
  actionItem2: string;
  actionItem3: string;
  actionItem4: string;
  actionItem5: string;
}

const initialFormData: FormData = {
  problem1: "",
  claim1: "",
  standard1: "",
  better1: "",
  benefit1: "",
  proof1: "",
  problem2: "",
  claim2: "",
  standard2: "",
  better2: "",
  benefit2: "",
  proof2: "",
  problem3: "",
  claim3: "",
  standard3: "",
  better3: "",
  benefit3: "",
  proof3: "",
  reason1: "",
  reason2: "",
  reason3: "",
  reason4: "",
  reason5: "",
  reason6: "",
  reason7: "",
  reason8: "",
  reason9: "",
  reason10: "",
  competitive: "",
  weeklyGoals: "",
  monthlyGoals: "",
  quarterlyGoals: "",
  actionItem1: "",
  actionItem2: "",
  actionItem3: "",
  actionItem4: "",
  actionItem5: "",
};

const STORAGE_KEY = "usp-worksheet-data";

const differentiationItems = [
  "1. Niche/Specialization",
  "2. Price/Value",
  "3. Guarantee of service level",
  "4. Solving a big problem",
  "5. Guarantee of business result",
  "6. Convenience & ease",
  "7. Proof & validation",
  "8. Affinity (being FOR someone)",
  "9. Marketing & sales process",
  "10. Celebrity (self or clients)",
];

export default function USPWorksheet() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setShowSaveIndicator(true);
    toast({
      title: "Progress Saved",
      description: "Your worksheet has been saved to local storage.",
    });
    setTimeout(() => setShowSaveIndicator(false), 2000);
  };

  const clearForm = () => {
    if (window.confirm("Are you sure you want to clear all form data? This cannot be undone.")) {
      setFormData(initialFormData);
      localStorage.removeItem(STORAGE_KEY);
      toast({
        title: "Form Cleared",
        description: "All data has been cleared.",
        variant: "destructive",
      });
    }
  };

  const printToPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050810] text-[#E8E8E8]">
      <Helmet>
        <title>USP Development Worksheet | Internal Sales Tool | Digerati Experts</title>
        <meta name="description" content="Internal USP Development Worksheet for developing clear, concise and compelling marketing messages. Sales tool for Digerati Experts staff." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <MegaMenu />

      <div className="max-w-[1000px] mx-auto px-6 py-10 print:px-5 print:py-5">
        <header className="border-b-[3px] border-[#FFD700] pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:hidden">
          <div>
            <Link href="/internal" className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors text-sm mb-4" data-testid="link-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Sales Tools
            </Link>
            <div className="font-mono text-2xl font-bold text-[#FFD700] tracking-tight" data-testid="logo-text">
              DIGERATI EXPERTS
            </div>
            <div className="text-xs text-[#A0A0A0] uppercase tracking-[2px] font-medium mt-2">
              USP Development Worksheet
            </div>
          </div>
          <div className="flex flex-wrap gap-3 no-print">
            <button
              onClick={saveToLocalStorage}
              className="flex items-center gap-2 px-6 py-3 border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] text-sm font-semibold rounded cursor-pointer transition-all hover:bg-[#1E90FF] hover:text-[#0A0E1A] hover:-translate-y-0.5"
              data-testid="button-save"
            >
              <Save className="w-4 h-4" /> Save Progress
            </button>
            <button
              onClick={clearForm}
              className="flex items-center gap-2 px-6 py-3 border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] text-sm font-semibold rounded cursor-pointer transition-all hover:bg-[#1E90FF] hover:text-[#0A0E1A] hover:-translate-y-0.5"
              data-testid="button-clear"
            >
              <Trash2 className="w-4 h-4" /> Clear Form
            </button>
            <button
              onClick={printToPDF}
              className="flex items-center gap-2 px-6 py-3 border-2 border-[#1E90FF] bg-[#1E90FF] text-[#0A0E1A] text-sm font-semibold rounded cursor-pointer transition-all hover:bg-[#FFD700] hover:border-[#FFD700] hover:-translate-y-0.5"
              data-testid="button-print"
            >
              <Printer className="w-4 h-4" /> Print to PDF
            </button>
          </div>
        </header>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#FFD700] mb-5 leading-tight" data-testid="heading-main">
          Developing A Clear, Concise And Compelling Marketing Message
        </h1>
        <p className="text-base text-[#A0A0A0] text-center italic mb-10" data-testid="quote-robins">
          "No one knows how good you are until AFTER the sale; before they buy, they only know how good your MARKETING is." – Robin Robins
        </p>

        {/* 10 Ways to Differentiate */}
        <section className="bg-[#0A0E1A] border border-[#2A2F3F] border-l-4 border-l-[#1E90FF] p-8 mb-8 rounded" data-testid="section-differentiation">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-5" data-testid="heading-differentiation">
            10 Ways To Differentiate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiationItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#1A1F2E] p-4 border border-[#2A2F3F] rounded text-sm"
                data-testid={`diff-item-${index + 1}`}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Building Your Case */}
        <section className="bg-[#0A0E1A] border border-[#2A2F3F] border-l-4 border-l-[#1E90FF] p-8 mb-8 rounded" data-testid="section-building-case">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-5" data-testid="heading-building-case">
            Building Your Case
          </h2>
          <p className="mb-6 text-[#A0A0A0]">
            Work through this framework to develop a compelling USP for a specific problem or desire your prospects have:
          </p>

          <FormField
            label="1. State a problem a typical prospect would have OR something they're LOOKING for:"
            example={"Most IT firms are highly unresponsive and require us to constantly follow up with them to resolve problems we have."}
            value={formData.problem1}
            onChange={(v) => handleInputChange("problem1", v)}
            placeholder="Enter the problem or desire..."
            testId="input-problem1"
            number={1}
          />

          <FormField
            label="2. Make a claim about how you resolve this problem better than the competition:"
            example={"We are more responsive than the average IT support firm."}
            value={formData.claim1}
            onChange={(v) => handleInputChange("claim1", v)}
            placeholder="Enter your claim..."
            testId="input-claim1"
            number={2}
          />

          <FormField
            label="3. What is the industry standard?"
            example={'The average industry response time is 4-6 hours or longer. Most don\'t guarantee any response time in their SLA and many outsource their help desk.'}
            value={formData.standard1}
            onChange={(v) => handleInputChange("standard1", v)}
            placeholder="Describe the industry standard..."
            testId="input-standard1"
            number={3}
          />

          <FormField
            label="4. How do you do it better, SPECIFICALLY? (Detail 2-3 ways)"
            example={"We have a far more mature and well-staffed help desk than most IT service companies, which enables us to answer our support lines LIVE and guarantee to have a competent technician working on resolving a problem within 10 minutes or less of receiving the call."}
            value={formData.better1}
            onChange={(v) => handleInputChange("better1", v)}
            placeholder="Detail specifically how you do it better..."
            testId="input-better1"
            large
            number={4}
          />

          <FormField
            label="5. Why should the prospect care? What's the specific, QUANTIFIABLE benefit?"
            example={"If your company has an average of one support request a week and it takes your technician 4 hours to respond on average, you'll end up wasting 208 hours – or 8.6 weeks – WAITING on your technician to simply respond. Is that really acceptable to you?"}
            value={formData.benefit1}
            onChange={(v) => handleInputChange("benefit1", v)}
            placeholder="Quantify the benefit to the prospect..."
            testId="input-benefit1"
            large
            number={5}
          />

          <FormField
            label="6. How can you PROVE you can do it better? What evidence can you provide?"
            example="• Provide testimonials from clients validating this claim
• Have a solid guarantee to deliver on this promise
• Publish reports showing our average response time was 4.7 minutes over the last 6 months"
            value={formData.proof1}
            onChange={(v) => handleInputChange("proof1", v)}
            placeholder="List your proof points..."
            testId="input-proof1"
            large
            number={6}
          />

          <div className="bg-[rgba(255,215,0,0.08)] border border-[#FFD700] p-5 rounded my-5" data-testid="tips-box-proof">
            <h4 className="text-[#FFD700] mb-3 font-semibold">💡 Tips for Providing Meaningful Proof:</h4>
            <ul className="ml-5 text-[#A0A0A0] text-sm list-disc space-y-2">
              <li>Actual stats and data from your PSA/RMM tools</li>
              <li>Bold guarantees with real consequences if you don't deliver</li>
              <li>Testimonials, case studies, number of reviews</li>
              <li>Awards won, certifications earned</li>
              <li>Proof of your systems and documentation</li>
              <li>Specific details in your claims (e.g., "24 hours of customer service training annually")</li>
            </ul>
          </div>
        </section>

        {/* Additional USP Development */}
        <section className="bg-[#0A0E1A] border border-[#2A2F3F] border-l-4 border-l-[#1E90FF] p-8 mb-8 rounded" data-testid="section-additional-usp">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-5" data-testid="heading-additional-usp">
            Additional USP Development
          </h2>
          <p className="mb-6 text-[#A0A0A0]">
            Complete this exercise for every common frustration your prospects have. Use the same framework above:
          </p>

          <h3 className="text-lg font-semibold text-[#1E90FF] mb-4 mt-6" data-testid="heading-usp2">
            USP Development #2
          </h3>
          <FormFieldSimple label="Problem/Desire:" value={formData.problem2} onChange={(v) => handleInputChange("problem2", v)} placeholder="Enter the problem or desire..." testId="input-problem2" />
          <FormFieldSimple label="Your Claim:" value={formData.claim2} onChange={(v) => handleInputChange("claim2", v)} placeholder="Enter your claim..." testId="input-claim2" />
          <FormFieldSimple label="Industry Standard:" value={formData.standard2} onChange={(v) => handleInputChange("standard2", v)} placeholder="Describe the industry standard..." testId="input-standard2" />
          <FormFieldSimple label="How You Do It Better (Specifically):" value={formData.better2} onChange={(v) => handleInputChange("better2", v)} placeholder="Detail specifically how you do it better..." testId="input-better2" large />
          <FormFieldSimple label="Quantifiable Benefit:" value={formData.benefit2} onChange={(v) => handleInputChange("benefit2", v)} placeholder="Quantify the benefit..." testId="input-benefit2" />
          <FormFieldSimple label="Proof/Evidence:" value={formData.proof2} onChange={(v) => handleInputChange("proof2", v)} placeholder="List your proof points..." testId="input-proof2" />

          <h3 className="text-lg font-semibold text-[#1E90FF] mb-4 mt-8" data-testid="heading-usp3">
            USP Development #3
          </h3>
          <FormFieldSimple label="Problem/Desire:" value={formData.problem3} onChange={(v) => handleInputChange("problem3", v)} placeholder="Enter the problem or desire..." testId="input-problem3" />
          <FormFieldSimple label="Your Claim:" value={formData.claim3} onChange={(v) => handleInputChange("claim3", v)} placeholder="Enter your claim..." testId="input-claim3" />
          <FormFieldSimple label="Industry Standard:" value={formData.standard3} onChange={(v) => handleInputChange("standard3", v)} placeholder="Describe the industry standard..." testId="input-standard3" />
          <FormFieldSimple label="How You Do It Better (Specifically):" value={formData.better3} onChange={(v) => handleInputChange("better3", v)} placeholder="Detail specifically how you do it better..." testId="input-better3" large />
          <FormFieldSimple label="Quantifiable Benefit:" value={formData.benefit3} onChange={(v) => handleInputChange("benefit3", v)} placeholder="Quantify the benefit..." testId="input-benefit3" />
          <FormFieldSimple label="Proof/Evidence:" value={formData.proof3} onChange={(v) => handleInputChange("proof3", v)} placeholder="List your proof points..." testId="input-proof3" />
        </section>

        {/* Top 10 Reasons */}
        <section className="bg-[#0A0E1A] border border-[#2A2F3F] border-l-4 border-l-[#1E90FF] p-8 mb-8 rounded" data-testid="section-top10">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-5" data-testid="heading-top10">
            Top 10 Reasons Why A Prospect Should Choose You
          </h2>
          <p className="mb-6 text-[#A0A0A0]">
            Summarize your key differentiators into 10 concise, compelling reasons:
          </p>

          <div className="space-y-4">
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((num) => (
              <NumberedInput
                key={num}
                number={num}
                value={formData[`reason${num}` as keyof FormData]}
                onChange={(v) => handleInputChange(`reason${num}` as keyof FormData, v)}
                placeholder={`Reason #${num}...`}
                testId={`input-reason${num}`}
              />
            ))}
          </div>
        </section>

        {/* Competitive Research */}
        <section className="bg-[#0A0E1A] border border-[#2A2F3F] border-l-4 border-l-[#1E90FF] p-8 mb-8 rounded" data-testid="section-competitive">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-5" data-testid="heading-competitive">
            Competitive Research Notes
          </h2>
          <p className="mb-6 text-[#A0A0A0]">
            Use this section to document your competitive analysis:
          </p>

          <FormFieldSimple
            label="Competitor Analysis (Call their office, review their website, secret shop, etc.):"
            value={formData.competitive}
            onChange={(v) => handleInputChange("competitive", v)}
            placeholder="Document what you learn about competitors..."
            testId="input-competitive"
            large
          />

          <div className="bg-[rgba(255,215,0,0.08)] border border-[#FFD700] p-5 rounded my-5" data-testid="tips-box-competitive">
            <h4 className="text-[#FFD700] mb-3 font-semibold">🔍 Competitive Analysis Checklist:</h4>
            <ul className="ml-5 text-[#A0A0A0] text-sm list-disc space-y-2">
              <li>Call their office - how do they answer?</li>
              <li>Review their website - what do they promise?</li>
              <li>Secret shop as a prospect - how do they sell?</li>
              <li>Research online reviews - what do clients say?</li>
              <li>Check their social media presence</li>
              <li>Look up their certifications and partnerships</li>
            </ul>
          </div>
        </section>

        {/* Implementation Plan */}
        <section className="bg-[#0A0E1A] border border-[#2A2F3F] border-l-4 border-l-[#1E90FF] p-8 mb-8 rounded" data-testid="section-implementation">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-5" data-testid="heading-implementation">
            Implementation Plan
          </h2>
          <p className="mb-6 text-[#A0A0A0]">
            Plan how you will implement your USP messaging across your marketing:
          </p>

          <FormFieldSimple
            label="Weekly Goals:"
            value={formData.weeklyGoals}
            onChange={(v) => handleInputChange("weeklyGoals", v)}
            placeholder="What will you accomplish this week..."
            testId="input-weekly-goals"
          />

          <FormFieldSimple
            label="Monthly Goals:"
            value={formData.monthlyGoals}
            onChange={(v) => handleInputChange("monthlyGoals", v)}
            placeholder="What will you accomplish this month..."
            testId="input-monthly-goals"
          />

          <FormFieldSimple
            label="Quarterly Goals:"
            value={formData.quarterlyGoals}
            onChange={(v) => handleInputChange("quarterlyGoals", v)}
            placeholder="What will you accomplish this quarter..."
            testId="input-quarterly-goals"
          />
        </section>

        {/* Action Items */}
        <section className="bg-[#0A0E1A] border border-[#2A2F3F] border-l-4 border-l-[#1E90FF] p-8 mb-8 rounded" data-testid="section-action-items">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-5" data-testid="heading-action-items">
            Action Items
          </h2>
          <p className="mb-6 text-[#A0A0A0]">
            List specific action items to complete based on this worksheet:
          </p>

          <div className="space-y-4">
            {([1, 2, 3, 4, 5] as const).map((num) => (
              <NumberedInput
                key={num}
                number={num}
                value={formData[`actionItem${num}` as keyof FormData]}
                onChange={(v) => handleInputChange(`actionItem${num}` as keyof FormData, v)}
                placeholder={`Action Item #${num}...`}
                testId={`input-action${num}`}
              />
            ))}
          </div>

          <div className="bg-[rgba(30,144,255,0.1)] border-l-[3px] border-[#1E90FF] p-5 rounded mt-6" data-testid="example-box-next-steps">
            <div className="font-bold text-[#1E90FF] mb-2">Next Steps:</div>
            <p className="text-sm text-[#A0A0A0]">
              After completing this worksheet, share it with your team for feedback, schedule time to refine your messaging, and begin incorporating your USP into all sales materials.
            </p>
          </div>
        </section>

        <div className="text-center text-[#A0A0A0] text-sm mt-8 pb-8 border-t border-[#2A2F3F] pt-8">
          DIGERATI EXPERTS | (480) 519-5892 | info@digeratiexperts.com
        </div>
      </div>

      {showSaveIndicator && (
        <div className="fixed bottom-8 right-8 bg-[#1E90FF] text-[#0A0E1A] px-5 py-3 rounded font-semibold text-sm z-50 shadow-lg animate-fade-in" data-testid="save-indicator">
          ✓ Progress Saved
        </div>
      )}

      <div className="print:hidden">
        <Footer />
      </div>

      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .print\\:hidden { display: none !important; }
          .no-print { display: none !important; }
          .bg-\\[\\#050810\\] { background: white !important; }
          .bg-\\[\\#0A0E1A\\] { background: #f5f5f5 !important; border: 1px solid #ccc !important; }
          .bg-\\[\\#1A1F2E\\] { background: white !important; border: 1px solid #ccc !important; }
          .text-\\[\\#FFD700\\] { color: #0A0E1A !important; }
          .text-\\[\\#1E90FF\\] { color: #1E90FF !important; }
          .text-\\[\\#E8E8E8\\], .text-\\[\\#A0A0A0\\] { color: #333 !important; }
          textarea, input { background: white !important; color: black !important; border: 1px solid #ccc !important; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  example: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  testId: string;
  large?: boolean;
  number: number;
}

function FormField({ label, example, value, onChange, placeholder, testId, large, number }: FormFieldProps) {
  return (
    <div className="mb-6 relative pl-12">
      <div className="absolute left-0 top-1 w-8 h-8 bg-[#1E90FF] text-[#0A0E1A] rounded-full flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <label className="block text-sm font-semibold text-[#E8E8E8] mb-2">{label}</label>
      <div className="bg-[rgba(30,144,255,0.1)] border-l-[3px] border-[#1E90FF] p-4 rounded my-3" data-testid={`example-${testId}`}>
        <div className="font-bold text-[#1E90FF] mb-1">Example:</div>
        <p className="text-sm text-[#A0A0A0] whitespace-pre-wrap">{example}</p>
      </div>
      <textarea
        className={`w-full p-4 bg-[#1A1F2E] border border-[#2A2F3F] text-[#E8E8E8] text-[15px] rounded transition-all focus:outline-none focus:border-[#1E90FF] focus:ring-2 focus:ring-[rgba(30,144,255,0.1)] resize-y ${
          large ? "min-h-[180px]" : "min-h-[120px]"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={testId}
      />
    </div>
  );
}

interface FormFieldSimpleProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  testId: string;
  large?: boolean;
}

function FormFieldSimple({ label, value, onChange, placeholder, testId, large }: FormFieldSimpleProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-[#E8E8E8] mb-2">{label}</label>
      <textarea
        className={`w-full p-4 bg-[#1A1F2E] border border-[#2A2F3F] text-[#E8E8E8] text-[15px] rounded transition-all focus:outline-none focus:border-[#1E90FF] focus:ring-2 focus:ring-[rgba(30,144,255,0.1)] resize-y ${
          large ? "min-h-[180px]" : "min-h-[120px]"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={testId}
      />
    </div>
  );
}

interface NumberedInputProps {
  number: number;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  testId: string;
}

function NumberedInput({ number, value, onChange, placeholder, testId }: NumberedInputProps) {
  return (
    <div className="relative pl-12">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1E90FF] text-[#0A0E1A] rounded-full flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <input
        type="text"
        className="w-full p-4 bg-[#1A1F2E] border border-[#2A2F3F] text-[#E8E8E8] text-[15px] rounded transition-all focus:outline-none focus:border-[#1E90FF] focus:ring-2 focus:ring-[rgba(30,144,255,0.1)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={testId}
      />
    </div>
  );
}
