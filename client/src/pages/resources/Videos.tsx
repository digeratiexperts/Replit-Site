import { Link } from "wouter";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, Calendar, Users, ExternalLink } from "lucide-react";

import trendsImg from "@assets/stock_images/cybersecurity_trends_d69267d4.jpg";
import hipaaImg from "@assets/stock_images/healthcare_medical_r_3bfa1a64.jpg";
import ransomwareImg from "@assets/stock_images/ransomware_protectio_63d2a35d.jpg";
import cloudImg from "@assets/stock_images/cloud_backup_server__4ac65288.jpg";
import realEstateImg from "@assets/stock_images/real_estate_house_ke_f7c5422b.jpg";
import trainingImg from "@assets/stock_images/employee_security_tr_12ae4644.jpg";

const videos = [
  {
    id: 1,
    title: "Cybersecurity 101 for Small Business",
    description: "Learn the fundamentals of protecting your business from cyber threats in this comprehensive overview.",
    duration: "45 min",
    type: "Webinar",
    date: "2024-11-15",
    attendees: 234,
    thumbnail: trendsImg,
  },
  {
    id: 2,
    title: "HIPAA Compliance Workshop",
    description: "Everything healthcare providers need to know about maintaining HIPAA compliance in 2025.",
    duration: "60 min",
    type: "Workshop",
    date: "2024-11-08",
    attendees: 156,
    thumbnail: hipaaImg,
  },
  {
    id: 3,
    title: "Ransomware Defense Strategies",
    description: "Practical steps to protect your organization from ransomware attacks.",
    duration: "30 min",
    type: "Webinar",
    date: "2024-10-25",
    attendees: 312,
    thumbnail: ransomwareImg,
  },
  {
    id: 4,
    title: "Cloud Security Best Practices",
    description: "Secure your cloud infrastructure with these proven strategies and tools.",
    duration: "40 min",
    type: "Tutorial",
    date: "2024-10-18",
    attendees: 189,
    thumbnail: cloudImg,
  },
  {
    id: 5,
    title: "Wire Fraud Prevention for Real Estate",
    description: "Protect your real estate transactions from increasingly sophisticated wire fraud schemes.",
    duration: "35 min",
    type: "Webinar",
    date: "2024-10-10",
    attendees: 145,
    thumbnail: realEstateImg,
  },
  {
    id: 6,
    title: "Employee Security Training Demo",
    description: "See how our security awareness training platform helps reduce human error risks.",
    duration: "20 min",
    type: "Demo",
    date: "2024-10-05",
    attendees: 278,
    thumbnail: trainingImg,
  },
];

const upcomingWebinars = [
  {
    id: 1,
    title: "2025 Cybersecurity Predictions",
    date: "January 15, 2025",
    time: "11:00 AM MST",
    presenter: "Michael Torres, CISSP",
  },
  {
    id: 2,
    title: "Zero Trust Architecture for SMBs",
    date: "January 22, 2025",
    time: "2:00 PM MST",
    presenter: "Sarah Chen, Security Architect",
  },
  {
    id: 3,
    title: "Compliance Updates: What's New in 2025",
    date: "February 5, 2025",
    time: "10:00 AM MST",
    presenter: "David Martinez, Compliance Lead",
  },
];

export default function Videos() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet-500/20 text-violet-400 border-violet-500/30">
              Videos & Webinars
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn From the Experts
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Watch our on-demand webinars and video tutorials to enhance your cybersecurity knowledge.
            </p>
          </div>

          {/* Upcoming Webinars */}
          <Card className="mb-12 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Calendar className="h-6 w-6 text-violet-400" />
                Upcoming Webinars
              </CardTitle>
              <CardDescription className="text-white/60">
                Register for our live sessions and get your questions answered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {upcomingWebinars.map((webinar) => (
                  <Card key={webinar.id} className="bg-white/[0.02] border-white/10" data-testid={`card-upcoming-${webinar.id}`}>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-white mb-2">{webinar.title}</h4>
                      <div className="space-y-2 text-sm text-white/50 mb-4">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {webinar.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {webinar.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {webinar.presenter}
                        </p>
                      </div>
                      <Link href="/book">
                        <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white" data-testid={`button-register-${webinar.id}`}>
                          Register Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Library */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">On-Demand Library</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="bg-white/[0.02] border-white/10 overflow-hidden hover:border-violet-500/50 transition-colors group" data-testid={`card-video-${video.id}`}>
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Link
                      href="/resources/blog"
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                      aria-label={`Related reading for ${video.title}`}
                    >
                      <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </Link>
                    <Badge className="absolute top-3 right-3 bg-black/50 text-white border-0">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-violet-500/20 text-violet-400">
                        {video.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-violet-400 transition-colors">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {video.attendees} views
                      </span>
                      <span>{new Date(video.date).toLocaleDateString()}</span>
                    </div>
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
                className="bg-violet-600 hover:bg-violet-500 text-white"
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
