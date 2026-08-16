import { Link } from "wouter";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";

import trendsImg from "@assets/stock_images/cybersecurity_trends_d69267d4.jpg";
import hipaaImg from "@assets/stock_images/healthcare_medical_r_3bfa1a64.jpg";
import ransomwareImg from "@assets/stock_images/ransomware_protectio_63d2a35d.jpg";
import cloudImg from "@assets/stock_images/cloud_backup_server__4ac65288.jpg";
import realEstateImg from "@assets/stock_images/real_estate_house_ke_f7c5422b.jpg";
import trainingImg from "@assets/stock_images/employee_security_tr_12ae4644.jpg";

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
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />
      
      <main className="de-nav-clear pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-de-raised text-de-accent-ink border-de-hairline">
              Learning Topics
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn From the Experts
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore cybersecurity topics we cover with Arizona businesses. This page is a topic guide — not a live on-demand webinar library. Book a session or continue with related reading from our journal.
            </p>
          </div>

          {/* Book a session */}
          <Card className="mb-12 bg-de-raised border-de-hairline">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Calendar className="h-6 w-6 text-de-accent-ink" />
                Request a Live Session
              </CardTitle>
              <CardDescription className="text-white/60">
                Interested in a briefing or team workshop on these topics? Book a conversation and we&apos;ll schedule it with you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {trainingTopics.map((topic) => (
                  <Card key={topic.id} className="bg-white/[0.02] border-white/10" data-testid={`card-upcoming-${topic.id}`}>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-white mb-2">{topic.title}</h4>
                      <p className="text-sm text-white/50 mb-4">{topic.summary}</p>
                      <Link href="/book">
                        <Button className="w-full bg-de-accent hover:bg-de-accent text-white" data-testid={`button-register-${topic.id}`}>
                          Book a Session
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Topic library */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Topic Library</h2>
            <p className="text-white/60 mb-6">
              Related reading from our journal — these are articles and guides, not playable webinar recordings.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <Card key={topic.id} className="bg-white/[0.02] border-white/10 overflow-hidden hover:border-de-hairline transition-colors group" data-testid={`card-video-${topic.id}`}>
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={topic.thumbnail} 
                      alt={topic.title} 
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 bg-de-raised rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-de-raised text-de-accent-ink">
                        {topic.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-de-accent-ink transition-colors">
                      {topic.title}
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/resources/blog">
                      <Button
                        variant="outline"
                        className="w-full border-de-hairline text-de-accent-ink hover:bg-de-raised hover:text-de-accent-ink"
                        data-testid={`button-related-reading-${topic.id}`}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Related reading
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="mt-12 bg-white/[0.02] border-white/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Want a Custom Training Session?</h3>
              <p className="text-white/70 mb-6">We offer personalized security training for your team. Contact us to schedule.</p>
              <Button 
                className="bg-de-accent hover:bg-de-accent text-white"
                onClick={() => window.location.href = "/book"}
                data-testid="button-schedule-training"
              >
                Schedule Training
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
