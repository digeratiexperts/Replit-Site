import { Helmet } from "react-helmet-async";
import { MegaMenu } from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Smile,
  MessageCircle,
  Gem,
  Target,
  Handshake,
  Phone,
  Lock,
  ClipboardList,
  Clock,
  BarChart3,
  Trophy,
} from "lucide-react";

interface ThingCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ThingCard({ index, icon, title, description }: ThingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-[#0A0E1A] to-[#0F1420] border border-[#2A2F3F] rounded-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(139,92,246,0.15)] hover:border-violet-500/50 overflow-hidden"
      data-testid={`thing-card-${index + 1}`}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-amber-400 transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />
      
      <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-violet-500/15 to-amber-400/15 border-2 border-violet-500 flex items-center justify-center mb-5 transition-all duration-300 group-hover:rotate-[5deg] group-hover:scale-110 group-hover:border-amber-400 group-hover:shadow-[0_8px_20px_rgba(139,92,246,0.3)]">
        <div className="text-violet-400 group-hover:text-amber-400 transition-colors duration-300">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-amber-400 mb-4 leading-tight">
        {title}
      </h3>
      
      <p className="text-white/80 leading-relaxed text-[15px]">
        {description}
      </p>
    </motion.div>
  );
}

const thingsData = [
  {
    icon: <Smile className="w-8 h-8" />,
    title: "We Are FUN To Work With.",
    description:
      "Anyone can secure a network, but the experience of working with the person helping you is so important (recall the last time you went to a nice restaurant vs. McDonalds). The Digerati Experts Team genuinely cares about every client. This drives us to provide absolute fanatical support of their systems.",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "We Talk Plain English.",
    description:
      "We want you to understand what we are doing and what the problem is. No geek-speak here! We explain cybersecurity risks and technical issues in terms that make sense for your business, so you can make informed decisions without feeling overwhelmed by jargon.",
  },
  {
    icon: <Gem className="w-8 h-8" />,
    title: "Committed to Quality.",
    description:
      "We don't pursue every company that needs IT support. We choose only clients that share in our values. Serving a company's IT and critical security needs is a HUGE responsibility that we take very seriously. It takes teamwork and a solid commitment to good communication, excellence, and industry best practices to serve a company in an excellent manner.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "A Wide Spectrum Of Skills And Experience.",
    description:
      "From quick workstation fixes to comprehensive cybersecurity architecture, cloud infrastructure, and compliance management – we've got it. And if there's ever a problem we can't solve, we know who to contact to get it fixed. Our team brings decades of combined experience across multiple industries.",
  },
  {
    icon: <Handshake className="w-8 h-8" />,
    title: "We Help Solve Your Business Problems.",
    description:
      "We sit on the same side of the table as YOU to provide business solutions to business problems. We don't try to sell you the latest tech gadget – instead – we listen to your business challenges and offer strategic solutions to resolve the ROOT of the problem and achieve your objectives.",
  },
  {
    icon: <Phone className="w-8 h-8" />,
    title: "We Strive For LIVE Answer On Our Calls.",
    description:
      "Our goal is to answer every call with a LIVE person. Forget being in automated menu hell. If getting someone to fix your IT issue is as painful as the problem itself, it's a never-ending cycle of frustration. If you happen to get our voicemail it becomes a ticket on our service board immediately and you can be sure to get a call back quickly.",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Security Is Paramount.",
    description:
      "At Digerati Experts we follow and enforce Security Best Practices for all our clients, as well as internally. Your Security is only as good as the weakest link in the chain. We educate our team and our clients on cybersecurity to keep networks safe. We implement multi-layered defenses, 24/7 monitoring, and proactive threat detection.",
  },
  {
    icon: <ClipboardList className="w-8 h-8" />,
    title: "We LOVE Documentation.",
    description:
      "Proper documentation of your network is critical for fast resolution of problems and to get projects done right the first time. All requests are documented, resolution is documented, network diagrams are created and maintained, passwords are stored in a secure encrypted location, and compliance records are meticulously kept for audit readiness.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Fast Response & Critical Response Time Guaranteed.",
    description:
      "Some companies think if your problem doesn't seem that bad they can wait a few days to call you back.... We get back to you fast so you know when your problem will be resolved. Our ProActive Ecosystem contracts spell out our response times clearly. And when you're dead in the water with a critical issue, we respond – FAST.",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "A Proven Track Record.",
    description:
      "Unlike others in our industry, we can prove and show you how we deliver Peace of Mind, Less Downtime, Faster Problem Resolution, Data Protection, Cost Savings, Streamlined Communications, and Simplicity in IT management for you. We provide regular reports, security assessments, and transparent metrics so you always know the value we're delivering.",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Satisfaction Guaranteed.",
    description:
      "All our programs and services come with an unprecedented 100% Money-Back Guarantee. If you're not completely satisfied with our service, we'll make it right or refund your investment. That's how confident we are in our ability to protect and support your business. We stand behind our work, period.",
  },
];

export default function ElevenThingsBetter() {
  return (
    <>
      <Helmet>
        <title>11 Things We Do Better | Digerati Experts</title>
        <meta
          name="description"
          content="Discover the 11 things that set Digerati Experts apart from other IT and cybersecurity providers in the Phoenix metro area. From exceptional service to guaranteed satisfaction."
        />
        <meta property="og:title" content="11 Things We Do Better | Digerati Experts" />
        <meta
          property="og:description"
          content="Why businesses throughout the Phoenix metro area choose Digerati Experts for their cybersecurity and IT needs."
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a]">
        <MegaMenu />

        <div className="max-w-6xl mx-auto px-6 py-16 pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              data-testid="heading-main-title"
            >
              <span className="text-orange-500">11</span>{" "}
              <span className="text-white">THINGS WE DO</span>{" "}
              <span className="text-violet-400">BETTER</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white/60 max-w-3xl mx-auto"
              data-testid="text-subtitle"
            >
              Why businesses throughout the Phoenix metro area choose Digerati Experts
              for their cybersecurity and IT needs
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {thingsData.map((thing, index) => (
              <ThingCard
                key={index}
                index={index}
                icon={thing.icon}
                title={thing.title}
                description={thing.description}
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
