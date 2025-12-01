import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, Calendar, Users, ExternalLink } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Cybersecurity 101 for Small Business",
    description: "Learn the fundamentals of protecting your business from cyber threats in this comprehensive overview.",
    duration: "45 min",
    type: "Webinar",
    date: "2024-11-15",
    attendees: 234,
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
  },
  {
    id: 2,
    title: "HIPAA Compliance Workshop",
    description: "Everything healthcare providers need to know about maintaining HIPAA compliance in 2025.",
    duration: "60 min",
    type: "Workshop",
    date: "2024-11-08",
    attendees: 156,
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600",
  },
  {
    id: 3,
    title: "Ransomware Defense Strategies",
    description: "Practical steps to protect your organization from ransomware attacks.",
    duration: "30 min",
    type: "Webinar",
    date: "2024-10-25",
    attendees: 312,
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600",
  },
  {
    id: 4,
    title: "Cloud Security Best Practices",
    description: "Secure your cloud infrastructure with these proven strategies and tools.",
    duration: "40 min",
    type: "Tutorial",
    date: "2024-10-18",
    attendees: 189,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
  },
  {
    id: 5,
    title: "Wire Fraud Prevention for Real Estate",
    description: "Protect your real estate transactions from increasingly sophisticated wire fraud schemes.",
    duration: "35 min",
    type: "Webinar",
    date: "2024-10-10",
    attendees: 145,
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
  },
  {
    id: 6,
    title: "Employee Security Training Demo",
    description: "See how our security awareness training platform helps reduce human error risks.",
    duration: "20 min",
    type: "Demo",
    date: "2024-10-05",
    attendees: 278,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
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
    <div className="min-h-screen bg-gradient-to-b from-[#030228] to-[#0f0d2e]">
      <MegaMenu />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#5034ff]/20 text-[#5034ff] border-[#5034ff]/30">
              Videos & Webinars
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn From the Experts
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch our on-demand webinars and video tutorials to enhance your cybersecurity knowledge.
            </p>
          </div>

          {/* Upcoming Webinars */}
          <Card className="mb-12 bg-gradient-to-r from-[#5034ff]/20 to-purple-600/20 border-[#5034ff]/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Calendar className="h-6 w-6 text-[#5034ff]" />
                Upcoming Webinars
              </CardTitle>
              <CardDescription className="text-gray-300">
                Register for our live sessions and get your questions answered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {upcomingWebinars.map((webinar) => (
                  <Card key={webinar.id} className="bg-white/5 border-white/10" data-testid={`card-upcoming-${webinar.id}`}>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-white mb-2">{webinar.title}</h4>
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
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
                      <Button className="w-full bg-[#5034ff] hover:bg-[#5034ff]/90" data-testid={`button-register-${webinar.id}`}>
                        Register Now
                      </Button>
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
                <Card key={video.id} className="bg-white/5 border-white/10 overflow-hidden hover:border-[#5034ff]/50 transition-colors group" data-testid={`card-video-${video.id}`}>
                  <div className="aspect-video bg-gradient-to-r from-purple-600/30 to-blue-600/30 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-[#5034ff] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-3 right-3 bg-black/50 text-white border-0">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-[#5034ff]/20 text-[#5034ff]">
                        {video.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-[#5034ff] transition-colors">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-400">
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
          <Card className="mt-12 bg-white/5 border-white/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Want a Custom Training Session?</h3>
              <p className="text-gray-300 mb-6">We offer personalized security training for your team. Contact us to schedule.</p>
              <Button 
                className="bg-[#5034ff] hover:bg-[#5034ff]/90"
                onClick={() => window.open("https://meet.digerati-experts.com/", "_blank")}
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
