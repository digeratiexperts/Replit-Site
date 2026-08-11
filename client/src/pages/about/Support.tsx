import GenericServicePage from "@/pages/GenericServicePage";

export default function Support() {
  return (
    <GenericServicePage
      title="Fast, Reliable Support & Response"
      subtitle="Ticketed ownership with clear escalation — not a black hole"
      description="Digerati Experts commits to accountable support. We track work to resolution with remote and onsite options, vendor coordination, and response targets defined in your agreement — not marketing SLAs we can’t prove on a brochure page."
      canonical="/about/support"
      features={[
        { title: "Defined response targets", description: "Response expectations are written into your MSA/SOW for the package you buy" },
        { title: "Expert Support Team", description: "Technicians with deep knowledge of your IT environment" },
        { title: "Remote & Onsite Support", description: "Fast remote troubleshooting with onsite visits when needed" },
        { title: "Escalation Procedures", description: "Clear escalation paths to specialists and management when needed" },
        { title: "Support Ticket Tracking", description: "Full visibility into your support requests with transparent status updates" },
        { title: "Vendor Coordination", description: "We handle vendor escalations and third-party issue management" }
      ]}
      benefits={[
        "Owned tickets instead of endless reopen cycles",
        "Response targets you can hold us to in writing",
        "Expert support without the headcount costs",
        "Coverage options that match your package",
        "Reduced repeat incidents through root-cause analysis",
        "A principal-led team that stays accountable"
      ]}
      gradientColors="from-blue-600 via-cyan-600 to-teal-600"
    />
  );
}
