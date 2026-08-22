import { Link } from "wouter";
import { PageTemplate } from "@/components/PageTemplate";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";

import trendsImg from "@assets/stock_images/cybersecurity_trends_d69267d4.jpg";
import hipaaImg from "@assets/stock_images/healthcare_medical_r_3bfa1a64.jpg";
import ransomwareImg from "@assets/stock_images/ransomware_protectio_63d2a35d.jpg";
import cloudImg from "@assets/stock_images/cloud_backup_server__4ac65288.jpg";
import realEstateImg from "@assets/stock_images/real_estate_house_ke_f7c5422b.jpg";
import trainingImg from "@assets/stock_images/employee_security_tr_12ae4644.jpg";

const cardClass = "rounded-2xl border border-de-hairline bg-de-raised";

const topics = [
  {
    id: 1,
    title: "Cybersecurity 101 for Small Business",
    description: "Learn the fundamentals of protecting your business from cyber threats in this comprehensive overview.",
    type: "Topic guide",
    thumbnail: trendsImg,
  },
  {
    id: 2,
    title: "HIPAA Compliance Workshop",
    description: "Everything healthcare providers need to know about maintaining HIPAA compliance.",
    type: "Topic guide",
    thumbnail: hipaaImg,
  },
  {
    id: 3,
    title: "Ransomware Defense Strategies",
    description: "Practical steps to protect your organization from ransomware attacks.",
    type: "Topic guide",
    thumbnail: ransomwareImg,
  },
  {
    id: 4,
    title: "Cloud Security Best Practices",
    description: "Secure your cloud infrastructure with proven strategies and tools.",
    type: "Topic guide",
    thumbnail: cloudImg,
  },
  {
    id: 5,
    title: "Wire Fraud Prevention for Real Estate",
    description: "Protect your real estate transactions from increasingly sophisticated wire fraud schemes.",
    type: "Topic guide",
    thumbnail: realEstateImg,
  },
  {
    id: 6,
    title: "Employee Security Training Demo",
    description: "See how security awareness training helps reduce human error risks.",
    type: "Topic guide",
    thumbnail: trainingImg,
  },
];

const trainingTopics = [
  {
    id: 1,
    title: "Cybersecurity Predictions & Planning",
    summary: "Threat trends and practical planning for Arizona SMBs",
  },
  {
    id: 2,
    title: "Zero Trust Architecture for SMBs",
    summary: "How smaller teams can adopt Zero Trust without enterprise complexity",
  },
  {
    id: 3,
    title: "Compliance Updates That Matter",
    summary: "HIPAA, cyber insurance, and audit-ready controls for growing firms",
  },
];

export default function Videos() {
  useSEO({
    title: "Videos & Learning Topics",
    description:
      "Cybersecurity topic guides from Digerati Experts. This is a topic library — not a live on-demand webinar catalog.",
    canonical: "/resources/videos",
  });

  return (
    <PageTemplate
      title="Learn From the Experts"
      subtitle="Explore cybersecurity topics we cover with Arizona businesses. This page is a topic guide — not a live on-demand webinar library."
      icon={<BookOpen className="h-10 w-10 text-de-accent-ink" />}
      breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "Videos" }]}
      actions={
        <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold">
          <a href="/book">{CTA.primary}</a>
        </Button>
      }
    >
      <div className="space-y-16">
        <section className={`p-6 md:p-8 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-de-accent-ink" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-white">Request a Live Session</h2>
          </div>
          <p className="mb-6 text-white/65">
            Interested in a briefing or team workshop on these topics? Book a conversation and we&apos;ll schedule it with
            you.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {trainingTopics.map((topic) => (
              <article key={topic.id} className="rounded-xl border border-de-hairline bg-de-bg p-6" data-testid={`card-upcoming-${topic.id}`}>
                <h3 className="mb-2 font-semibold text-white">{topic.title}</h3>
                <p className="mb-4 text-sm text-white/55">{topic.summary}</p>
                <Button asChild variant="brand" className="w-full" data-testid={`button-register-${topic.id}`}>
                  <Link href="/book">Book a Session</Link>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-bold text-white">Topic Library</h2>
          <p className="mb-6 text-white/60">
            Related reading from our journal — these are articles and guides, not playable webinar recordings.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <article
                key={topic.id}
                className={`overflow-hidden ${cardClass}`}
                data-testid={`card-video-${topic.id}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={topic.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-de-hairline bg-de-raised">
                      <BookOpen className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Badge className="mb-2 border border-de-hairline bg-de-bg text-de-accent-ink">{topic.type}</Badge>
                  <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                  <p className="mt-2 text-white/60">{topic.description}</p>
                  <Button asChild variant="outline" className="mt-4 w-full border-de-hairline text-white hover:bg-de-bg" data-testid={`button-related-reading-${topic.id}`}>
                    <Link href="/resources/blog">
                      <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                      Related reading
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ConversionPathBar
          headline="Want a custom training session?"
          body="We offer personalized security training for your team. Book an assessment to scope it."
          primaryTestId="button-schedule-training"
        />
      </div>
    </PageTemplate>
  );
}
