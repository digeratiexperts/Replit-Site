import GenericServicePage from "@/pages/GenericServicePage";

export default function Insurance() {
  return (
    <GenericServicePage
      title="Insurance-Aligned Security & Compliance"
      subtitle="Meet your cyber insurance carrier requirements"
      description="Digerati Experts builds your security posture to meet cyber insurance requirements. We help you satisfy carrier mandates, reduce premiums through better security controls, and maintain the documentation needed for claims."
      features={[
        { title: "Insurance Control Alignment", description: "Security controls mapped to carrier requirements and underwriting criteria" },
        { title: "Documentation for Claims", description: "Comprehensive incident documentation and forensic evidence for claim support" },
        { title: "Risk Assessment Support", description: "Annual risk assessments aligned to insurance carrier questionnaires" },
        { title: "Incident Response Planning", description: "IR procedures that satisfy carrier notification and response requirements" },
        { title: "Evidence of Controls", description: "Documented proof of security controls for insurance underwriting reviews" },
        { title: "Premium Justification", description: "Data and reports to justify security investments and lower premiums" }
      ]}
      benefits={[
        "Meet all cyber insurance underwriting requirements",
        "Potential premium reductions through better security posture",
        "Faster claim processing with documented evidence",
        "Better incident response aligned to carrier expectations",
        "Continuous compliance monitoring for insurance requirements",
        "Strategic security decisions that reduce insurance risk"
      ]}
      gradientColors="from-emerald-600 via-teal-600 to-cyan-600"
    />
  );
}
