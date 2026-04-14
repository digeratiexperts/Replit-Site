import { useRef } from "react";
import { useParams, Link } from "wouter";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, ChevronRight } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

import trendsImg from "@assets/stock_images/cybersecurity_trends_d69267d4.jpg";
import hipaaImg from "@assets/stock_images/healthcare_medical_r_3bfa1a64.jpg";
import ransomwareImg from "@assets/stock_images/ransomware_protectio_63d2a35d.jpg";
import cloudImg from "@assets/stock_images/cloud_backup_server__4ac65288.jpg";
import realEstateImg from "@assets/stock_images/real_estate_house_ke_f7c5422b.jpg";
import trainingImg from "@assets/stock_images/employee_security_tr_12ae4644.jpg";

const blogPosts: Record<string, {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}> = {
  "2025-cybersecurity-trends": {
    id: 1,
    title: "2025 Cybersecurity Trends: What Arizona Businesses Need to Know",
    excerpt: "The cybersecurity landscape is evolving rapidly. Learn about the key threats and defensive strategies that will define 2025.",
    category: "Cybersecurity",
    author: "Michael Torres",
    authorRole: "Chief Security Officer",
    date: "2024-12-01",
    readTime: "8 min read",
    image: trendsImg,
    content: [
      "The cybersecurity landscape continues to evolve at an unprecedented pace, presenting both new challenges and opportunities for Arizona businesses. As we approach 2025, understanding these trends isn't just important—it's essential for survival in an increasingly digital world.",
      "## AI-Powered Attacks Are on the Rise",
      "Artificial intelligence has become a double-edged sword in cybersecurity. While defenders leverage AI for threat detection and response, attackers are using the same technology to create more sophisticated phishing campaigns, automate vulnerability discovery, and generate convincing deepfakes for social engineering attacks.",
      "For Arizona businesses, this means traditional security awareness training is no longer sufficient. Organizations must implement AI-powered email security solutions that can detect subtle manipulation attempts that would fool human observers.",
      "## Zero Trust Architecture Becomes Standard",
      "The perimeter-based security model is officially dead. In 2025, zero trust architecture—where no user or device is trusted by default—will become the standard approach for businesses of all sizes. This shift is driven by the continued growth of remote work and cloud adoption.",
      "Implementing zero trust requires a fundamental rethinking of how access is granted and verified. Every request must be authenticated, authorized, and encrypted, regardless of where it originates. For small businesses, this can seem daunting, but managed security providers now offer zero trust solutions that are both affordable and manageable.",
      "## Ransomware Evolution: Double and Triple Extortion",
      "Ransomware attacks have evolved beyond simple file encryption. Modern ransomware gangs now employ double extortion (threatening to leak stolen data) and triple extortion (targeting customers and partners of the victim). This evolution makes backup strategies alone insufficient as a defense.",
      "Arizona healthcare practices, legal firms, and financial services are particularly attractive targets due to the sensitive nature of their data. Prevention must focus on multiple layers: email security, endpoint protection, network segmentation, and comprehensive backup solutions.",
      "## Supply Chain Security Takes Center Stage",
      "The SolarWinds and Log4j incidents highlighted the vulnerabilities inherent in software supply chains. In 2025, businesses will face increased pressure to verify the security posture of their vendors and the software they use.",
      "This means implementing vendor risk assessment programs, requiring security certifications from partners, and maintaining detailed software inventories. For businesses using managed IT services, ensure your provider conducts regular security audits and can demonstrate compliance with industry standards.",
      "## Regulatory Compliance Becomes More Complex",
      "New privacy regulations continue to emerge at both state and federal levels. Arizona businesses must navigate an increasingly complex compliance landscape that includes HIPAA (for healthcare), PCI DSS (for payment processing), and various state-level privacy laws.",
      "The key to managing compliance is automation. Manual compliance tracking is no longer feasible given the volume of requirements. Invest in compliance management platforms that can track controls, generate reports, and alert you to gaps before they become violations.",
      "## Preparing Your Business for 2025",
      "The threats facing Arizona businesses are real and growing, but they're not insurmountable. Start by conducting a comprehensive security assessment to identify your current vulnerabilities. Then, develop a roadmap that addresses the trends outlined above.",
      "Consider partnering with a managed security service provider (MSSP) that understands the unique challenges facing Arizona businesses. The right partner can help you implement enterprise-grade security without the enterprise-grade budget.",
      "Remember: cybersecurity is not a destination but a journey. The threats will continue to evolve, and your defenses must evolve with them. The businesses that thrive in 2025 will be those that treat security as a strategic priority, not an afterthought."
    ]
  },
  "hipaa-compliance-checklist": {
    id: 2,
    title: "HIPAA Compliance Checklist for Healthcare Providers",
    excerpt: "A comprehensive guide to maintaining HIPAA compliance in your medical practice, including technical safeguards and documentation requirements.",
    category: "Compliance",
    author: "Sarah Chen",
    authorRole: "Compliance Director",
    date: "2024-11-28",
    readTime: "12 min read",
    image: hipaaImg,
    content: [
      "HIPAA compliance isn't optional for healthcare providers—it's a legal requirement with significant penalties for violations. This comprehensive checklist will help Arizona medical practices ensure they meet all requirements while protecting patient data.",
      "## Understanding HIPAA Requirements",
      "The Health Insurance Portability and Accountability Act establishes national standards for protecting sensitive patient health information. Compliance requires implementing administrative, physical, and technical safeguards to ensure the confidentiality, integrity, and availability of protected health information (PHI).",
      "## Administrative Safeguards",
      "Administrative safeguards are the policies and procedures that govern how your practice handles PHI. These include designating a HIPAA Privacy Officer and Security Officer, conducting regular risk assessments, developing comprehensive policies and procedures, implementing workforce training programs, and establishing business associate agreements with all vendors who access PHI.",
      "## Physical Safeguards",
      "Physical safeguards protect the physical access to systems containing PHI. This includes facility access controls such as badge systems and visitor logs, workstation security policies, device and media controls for laptops and portable devices, and proper disposal procedures for hardware containing PHI.",
      "## Technical Safeguards",
      "Technical safeguards are the technology-based protections for PHI. Key requirements include implementing access controls with unique user identification, enabling automatic logoff after periods of inactivity, encrypting PHI both at rest and in transit, maintaining audit controls to track access to PHI, and establishing integrity controls to prevent unauthorized alterations.",
      "## Documentation Requirements",
      "HIPAA requires extensive documentation of your compliance efforts. You must maintain written policies and procedures, risk assessment documentation, training records, business associate agreements, breach notification procedures, and incident response plans.",
      "## Common Compliance Gaps",
      "Many Arizona healthcare practices struggle with specific areas of compliance. The most common gaps include inadequate encryption of portable devices, missing or outdated business associate agreements, insufficient access controls and audit logging, lack of regular security awareness training, and incomplete or outdated risk assessments.",
      "## Creating a Compliance Culture",
      "True HIPAA compliance goes beyond checklists—it requires creating a culture where protecting patient data is everyone's responsibility. This means regular training, clear reporting procedures for potential violations, and leadership commitment to privacy and security.",
      "## Working with a Compliance Partner",
      "Given the complexity of HIPAA requirements, many practices benefit from working with a managed IT provider that specializes in healthcare compliance. The right partner can help you implement appropriate technical controls, maintain required documentation, respond to audits, and stay current with regulatory changes.",
      "Protecting patient data isn't just about avoiding fines—it's about maintaining the trust that's essential to the patient-provider relationship. Use this checklist as a starting point, but remember that compliance is an ongoing process that requires constant attention and improvement."
    ]
  },
  "ransomware-protection": {
    id: 3,
    title: "Ransomware Protection: A Multi-Layer Approach",
    excerpt: "How to build a robust defense against ransomware attacks using endpoint protection, backup strategies, and employee training.",
    category: "Security",
    author: "David Martinez",
    authorRole: "Security Architect",
    date: "2024-11-25",
    readTime: "10 min read",
    image: ransomwareImg,
    content: [
      "Ransomware remains one of the most significant threats facing Arizona businesses. A successful attack can cripple operations, destroy years of data, and cost hundreds of thousands of dollars in recovery—or worse, force a business to close permanently.",
      "## Understanding Modern Ransomware",
      "Today's ransomware is far more sophisticated than the simple file-encrypting malware of a decade ago. Modern ransomware-as-a-service (RaaS) operations employ advanced evasion techniques, can spread laterally across networks, and often exfiltrate data before encryption for double-extortion purposes.",
      "## Layer 1: Email Security",
      "Email remains the primary attack vector for ransomware. Phishing emails containing malicious attachments or links are responsible for the majority of successful attacks. Implement advanced email filtering with sandbox analysis, enable multi-factor authentication for all email accounts, train employees to recognize phishing attempts, and implement DMARC, DKIM, and SPF to prevent email spoofing.",
      "## Layer 2: Endpoint Protection",
      "Modern endpoint protection goes far beyond traditional antivirus. Today's solutions use behavioral analysis and machine learning to detect threats. Deploy next-generation endpoint protection on all devices, enable real-time monitoring and automatic response, implement application whitelisting where possible, and keep all systems patched and updated.",
      "## Layer 3: Network Segmentation",
      "Proper network segmentation can contain a ransomware outbreak, preventing it from spreading across your entire organization. Separate critical systems from general-use networks, implement micro-segmentation for sensitive data, use next-generation firewalls with deep packet inspection, and monitor east-west traffic for anomalies.",
      "## Layer 4: Backup and Recovery",
      "Even with the best defenses, you must prepare for the possibility of a successful attack. A robust backup strategy is your last line of defense. Follow the 3-2-1 rule: three copies, two different media types, one offsite. Test recovery procedures regularly, keep backups isolated from production networks, and consider immutable backup solutions that can't be encrypted.",
      "## Layer 5: Incident Response",
      "Having a plan before an attack occurs dramatically reduces recovery time and cost. Develop and document incident response procedures, identify key stakeholders and their roles, establish relationships with forensic and legal resources, and practice your response with tabletop exercises.",
      "## The Human Element",
      "Technology alone cannot stop ransomware. Your employees are both your greatest vulnerability and your strongest defense. Regular security awareness training, simulated phishing exercises, and a culture that encourages reporting suspicious activity are essential components of any ransomware defense strategy.",
      "## Taking Action",
      "Don't wait for an attack to expose the gaps in your defenses. Conduct a comprehensive security assessment, identify your vulnerabilities, and develop a roadmap for implementing the multi-layer approach described above. The cost of prevention is always less than the cost of recovery."
    ]
  },
  "cloud-backup-best-practices": {
    id: 4,
    title: "Cloud Backup Best Practices for Small Businesses",
    excerpt: "Protect your critical data with these proven cloud backup strategies that won't break the bank.",
    category: "Backup & Recovery",
    author: "Jennifer Lee",
    authorRole: "Cloud Solutions Specialist",
    date: "2024-11-20",
    readTime: "6 min read",
    image: cloudImg,
    content: [
      "Data loss can devastate a small business. Whether from ransomware, hardware failure, human error, or natural disaster, losing critical business data can mean losing customers, revenue, and even the business itself. Cloud backup provides affordable, reliable protection—if implemented correctly.",
      "## Why Cloud Backup Matters",
      "Traditional on-premise backup solutions require significant upfront investment and ongoing maintenance. Cloud backup eliminates these burdens while providing geographic redundancy, scalability, and accessibility that local solutions simply cannot match.",
      "## The 3-2-1 Backup Rule",
      "The foundation of any backup strategy is the 3-2-1 rule: maintain three copies of your data, store them on two different types of media, and keep one copy offsite. Cloud backup naturally satisfies the offsite requirement and, when combined with local backup, provides robust protection.",
      "## Choosing the Right Cloud Backup Solution",
      "Not all cloud backup solutions are created equal. When evaluating options, consider security features including encryption and access controls, reliability and uptime guarantees, recovery time objectives (RTO) and recovery point objectives (RPO), compliance certifications for your industry, and total cost of ownership including storage and bandwidth.",
      "## What to Back Up",
      "Many businesses make the mistake of backing up everything or nothing. The right approach is to identify and prioritize critical data. Start with customer and financial data, then add intellectual property and business documents, followed by email and communication records, and finally system configurations and application data.",
      "## Backup Frequency and Retention",
      "How often you back up and how long you keep backups depends on your business needs. Consider continuous backup for critical, frequently changing data, daily backups for general business data, weekly full backups with daily incrementals, and retention policies that meet regulatory requirements.",
      "## Testing Your Backups",
      "A backup that can't be restored is worthless. Regularly test your backup and recovery procedures. Perform test restores at least quarterly, document recovery procedures, measure actual recovery times against objectives, and verify data integrity after restoration.",
      "## Common Backup Mistakes",
      "Avoid these common pitfalls: not encrypting backups, storing backup credentials in backed-up systems, failing to include cloud application data (like Microsoft 365), not monitoring backup job success, and assuming cloud services automatically back up your data.",
      "## Getting Started",
      "If you don't have a cloud backup strategy, start today. Identify your critical data, evaluate solutions, and implement a pilot program. If you're unsure where to begin, a managed IT provider can assess your needs and recommend appropriate solutions.",
      "The cost of cloud backup is minimal compared to the cost of data loss. Don't wait for a disaster to discover the gaps in your protection."
    ]
  },
  "wire-fraud-prevention-real-estate": {
    id: 5,
    title: "Wire Fraud Prevention for Real Estate Transactions",
    excerpt: "Real estate professionals are prime targets for wire fraud. Learn how to protect your clients and your business.",
    category: "Industry Focus",
    author: "Michael Torres",
    authorRole: "Chief Security Officer",
    date: "2024-11-15",
    readTime: "7 min read",
    image: realEstateImg,
    content: [
      "Wire fraud in real estate transactions has reached epidemic proportions, with losses exceeding $1.9 billion annually. Arizona's active real estate market makes local professionals and their clients particularly attractive targets for sophisticated cybercriminals.",
      "## How Wire Fraud Works",
      "Real estate wire fraud typically begins with business email compromise (BEC). Criminals gain access to email accounts of real estate agents, title companies, or attorneys involved in transactions. They monitor communications, waiting for the optimal moment to strike.",
      "When closing approaches, the criminal sends fraudulent wire instructions, often from a spoofed or compromised email address that appears legitimate. By the time the fraud is discovered, the money has been moved through multiple accounts and is unrecoverable.",
      "## Why Real Estate Is Targeted",
      "Several factors make real estate transactions attractive to criminals: large sums of money changing hands, multiple parties involved in each transaction, time pressure that discourages verification, and public records that reveal transaction details.",
      "## Protecting Your Clients",
      "Prevention requires a multi-layered approach. Establish verification procedures by creating and communicating a clear policy: wire instructions should never be sent via email and should always be verified by phone using a known number.",
      "Secure your email with multi-factor authentication, advanced threat protection, and regular security audits. Train your team to recognize phishing attempts and suspicious communications.",
      "## Warning Signs of Wire Fraud",
      "Train everyone involved in transactions to recognize red flags: last-minute changes to wire instructions, pressure to complete transfers quickly, slight variations in email addresses, and requests to keep changes confidential.",
      "## If Fraud Occurs",
      "Time is critical. If you suspect wire fraud, immediately contact your bank to attempt to recall the wire, report to the FBI's Internet Crime Complaint Center (IC3), notify local law enforcement, and inform all parties to the transaction.",
      "## Building a Security Culture",
      "The best protection is a culture where security is everyone's responsibility. Regular training, clear procedures, and open communication about threats can prevent most wire fraud attempts.",
      "The criminals are sophisticated and persistent, but they rely on speed and confusion. Slow down, verify everything, and trust your instincts when something seems wrong."
    ]
  },
  "security-awareness-training-roi": {
    id: 6,
    title: "Employee Security Awareness Training: ROI Analysis",
    excerpt: "Investing in security training pays dividends. See the data on how training reduces security incidents and costs.",
    category: "Training",
    author: "Sarah Chen",
    authorRole: "Compliance Director",
    date: "2024-11-10",
    readTime: "5 min read",
    image: trainingImg,
    content: [
      "Security awareness training is often viewed as a checkbox compliance exercise rather than a strategic investment. However, the data tells a different story: effective training programs deliver substantial returns while significantly reducing security risk.",
      "## The Cost of Human Error",
      "Human error is involved in over 80% of security breaches. Phishing attacks, weak passwords, mishandled data, and social engineering all exploit the human element. Without training, employees are your greatest vulnerability.",
      "## Measuring Training Effectiveness",
      "The ROI of security training can be measured through several metrics: reduction in successful phishing attempts, decreased security incidents, faster incident reporting, improved compliance audit results, and reduced remediation costs.",
      "## The Numbers",
      "Organizations with comprehensive security awareness programs see dramatic improvements. Phishing susceptibility drops from 30-40% to under 5% with regular training. The average cost of a data breach is $4.45 million—training that prevents even one incident delivers massive returns.",
      "## Elements of Effective Training",
      "Not all training programs are equally effective. Key elements include regular, ongoing training rather than annual events, simulated phishing exercises with immediate feedback, role-specific content for high-risk positions, engaging formats that maintain attention, and metrics and reporting to track progress.",
      "## Common Training Mistakes",
      "Avoid these pitfalls that reduce training effectiveness: treating training as a one-time event, using generic content that doesn't apply to your industry, punishing employees for training failures, not measuring results, and failing to update content as threats evolve.",
      "## Building a Security Culture",
      "The ultimate goal of security awareness training is to build a culture where security is everyone's responsibility. This requires leadership commitment, positive reinforcement, clear reporting channels, and integration with business processes.",
      "## Making the Case for Investment",
      "When presenting training ROI to leadership, focus on risk reduction, compare training costs to potential breach costs, highlight compliance benefits, and share industry benchmarks and case studies.",
      "Security awareness training isn't an expense—it's an investment that protects your business, your clients, and your reputation. The question isn't whether you can afford training; it's whether you can afford not to train."
    ]
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const articleRef = useRef<HTMLElement>(null);
  
  const post = slug ? blogPosts[slug] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <MegaMenu />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-white/70 mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/resources/blog">
              <Button className="bg-white text-violet-700 hover:bg-white/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        author={post.author}
        datePublished={post.date}
        image={post.image}
        url={`/resources/blog/${slug}`}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Blog", url: "/resources/blog" },
        { name: post.title, url: `/resources/blog/${slug}` }
      ]} />
      <ReadingProgressBar targetRef={articleRef} />
      <MegaMenu />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/resources/blog" className="hover:text-violet-400 transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white/70 truncate max-w-[200px]">{post.title}</span>
          </nav>
          
          <Link href="/resources/blog" className="inline-flex items-center text-violet-400 hover:text-violet-300 mb-6 transition-colors" data-testid="link-back-blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>

          <header className="mb-10">
            <Badge className="mb-4 bg-violet-500/20 text-violet-400 border-violet-500/30">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-white/70 mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{post.author}</p>
                  <p className="text-sm text-white/50">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </header>

          <div className="aspect-video rounded-xl overflow-hidden mb-10">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex gap-4 mb-10 pb-10 border-b border-white/10">
            <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white" data-testid="button-share">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white" data-testid="button-save">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>

          <article ref={articleRef} className="prose prose-lg prose-invert max-w-none" data-testid="article-content">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-white mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              return (
                <p key={index} className="text-white/80 text-base leading-relaxed mb-6">
                  {paragraph}
                </p>
              );
            })}
          </article>

          <Card className="mt-12 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/30">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-2">Need help implementing these strategies?</h3>
              <p className="text-white/70 mb-6">Our team of cybersecurity experts can help protect your Arizona business.</p>
              <a href="/book">
                <Button className="bg-white text-violet-700 hover:bg-white/90" data-testid="button-consultation">
                  Schedule a Free Consultation
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
