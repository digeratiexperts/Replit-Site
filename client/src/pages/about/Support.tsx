import GenericServicePage from "@/pages/GenericServicePage";

export default function Support() {
  return (
    <GenericServicePage
      title="Fast, Reliable Support & Response"
      subtitle="15-minute response guarantee for your peace of mind"
      description="Digerati Experts commits to rapid response and expert support. We don't just answer calls—we resolve issues quickly with our proven stack and experienced team, backed by clear SLAs and accountability."
      features={[
        { title: "15-Minute Response SLA", description: "Guaranteed response to critical issues within 15 minutes, 24/7/365" },
        { title: "Expert Support Team", description: "Certified technicians with deep knowledge of your IT environment" },
        { title: "Remote & Onsite Support", description: "Fast remote troubleshooting with onsite visits when needed" },
        { title: "Escalation Procedures", description: "Clear escalation paths to specialists and management when needed" },
        { title: "Support Ticket Tracking", description: "Full visibility into your support requests with transparent status updates" },
        { title: "Vendor Coordination", description: "We handle vendor escalations and third-party issue management" }
      ]}
      benefits={[
        "Rapid issue resolution minimizes downtime",
        "Predictable SLA compliance you can rely on",
        "Expert support without the headcount costs",
        "Weekend and after-hours coverage included",
        "Reduced repeat incidents through root-cause analysis",
        "Peace of mind knowing help is always available"
      ]}
      gradientColors="from-blue-600 via-cyan-600 to-teal-600"
    />
  );
}
