import { Link } from "wouter";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import trendsImg from "@assets/stock_images/cybersecurity_trends_d69267d4.jpg";
import hipaaImg from "@assets/stock_images/healthcare_medical_r_3bfa1a64.jpg";
import ransomwareImg from "@assets/stock_images/ransomware_protectio_63d2a35d.jpg";
import cloudImg from "@assets/stock_images/cloud_backup_server__4ac65288.jpg";
import realEstateImg from "@assets/stock_images/real_estate_house_ke_f7c5422b.jpg";
import trainingImg from "@assets/stock_images/employee_security_tr_12ae4644.jpg";

const blogPosts = [
  {
    id: 1,
    title: "2025 Cybersecurity Trends: What Arizona Businesses Need to Know",
    excerpt: "The cybersecurity landscape is evolving rapidly. Learn about the key threats and defensive strategies that will define 2025.",
    category: "Cybersecurity",
    author: "Michael Torres",
    date: "2024-12-01",
    readTime: "8 min read",
    featured: true,
    image: trendsImg,
    slug: "2025-cybersecurity-trends",
  },
  {
    id: 2,
    title: "HIPAA Compliance Checklist for Healthcare Providers",
    excerpt: "A comprehensive guide to maintaining HIPAA compliance in your medical practice, including technical safeguards and documentation requirements.",
    category: "Compliance",
    author: "Sarah Chen",
    date: "2024-11-28",
    readTime: "12 min read",
    featured: true,
    image: hipaaImg,
    slug: "hipaa-compliance-checklist",
  },
  {
    id: 3,
    title: "Ransomware Protection: A Multi-Layer Approach",
    excerpt: "How to build a robust defense against ransomware attacks using endpoint protection, backup strategies, and employee training.",
    category: "Security",
    author: "David Martinez",
    date: "2024-11-25",
    readTime: "10 min read",
    featured: false,
    image: ransomwareImg,
    slug: "ransomware-protection",
  },
  {
    id: 4,
    title: "Cloud Backup Best Practices for Small Businesses",
    excerpt: "Protect your critical data with these proven cloud backup strategies that won't break the bank.",
    category: "Backup & Recovery",
    author: "Jennifer Lee",
    date: "2024-11-20",
    readTime: "6 min read",
    featured: false,
    image: cloudImg,
    slug: "cloud-backup-best-practices",
  },
  {
    id: 5,
    title: "Wire Fraud Prevention for Real Estate Transactions",
    excerpt: "Real estate professionals are prime targets for wire fraud. Learn how to protect your clients and your business.",
    category: "Industry Focus",
    author: "Michael Torres",
    date: "2024-11-15",
    readTime: "7 min read",
    featured: false,
    image: realEstateImg,
    slug: "wire-fraud-prevention-real-estate",
  },
  {
    id: 6,
    title: "Employee Security Awareness Training: ROI Analysis",
    excerpt: "Investing in security training pays dividends. See the data on how training reduces security incidents and costs.",
    category: "Training",
    author: "Sarah Chen",
    date: "2024-11-10",
    readTime: "5 min read",
    featured: false,
    image: trainingImg,
    slug: "security-awareness-training-roi",
  },
];

const categories = ["All", "Cybersecurity", "Compliance", "Security", "Backup & Recovery", "Industry Focus", "Training"];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet-500/20 text-violet-400 border-violet-500/30">
              Blog & News
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Insights & Updates
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Stay informed with the latest cybersecurity news, compliance updates, and IT best practices for Arizona businesses.
            </p>
          </div>

          {/* Search and Categories */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 bg-white/[0.04] border-white/10 text-white placeholder:text-white/40"
                data-testid="input-search-blog"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="border-violet-500/30 bg-transparent text-white/70 hover:bg-violet-500/10 hover:text-violet-400 hover:border-violet-400"
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link href={`/resources/blog/${post.slug}`} key={post.id}>
                  <Card className="bg-white/[0.02] border-white/10 overflow-hidden hover:border-violet-500/50 transition-colors cursor-pointer" data-testid={`card-post-${post.id}`}>
                    <div className="aspect-video overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="bg-violet-500/20 text-violet-400">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-white/50 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-xl text-white hover:text-violet-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-white/60">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <User className="h-4 w-4" />
                          {post.author}
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Recent Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link href={`/resources/blog/${post.slug}`} key={post.id}>
                  <Card className="bg-white/[0.02] border-white/10 hover:border-violet-500/50 transition-colors overflow-hidden cursor-pointer" data-testid={`card-post-${post.id}`}>
                    <div className="aspect-video overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit bg-violet-500/20 text-violet-400 mb-2">
                        {post.category}
                      </Badge>
                      <CardTitle className="text-lg text-white hover:text-violet-400 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/50 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-white/40">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <Card className="mt-12 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-white/70 mb-6">Subscribe to our newsletter for the latest security insights and industry news.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/40"
                  data-testid="input-newsletter-email"
                />
                <Button className="bg-white text-violet-700 hover:bg-white/90" data-testid="button-subscribe">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
