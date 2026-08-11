import { useState } from "react";
import { useLocation } from "wouter";
import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Clock, Phone, Loader2 } from "lucide-react";

export default function SubmitTicket() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [priority, setPriority] = useState("medium");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim() || !email.trim() || !phone.trim() || !subject.trim() || !description.trim()) {
      toast({
        title: "Missing fields",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const priorityLabel =
        priority === "critical"
          ? "Critical"
          : priority === "high"
            ? "High"
            : priority === "low"
              ? "Low"
              : "Medium";

      const response = await fetch("/api/portal/zoho/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          subject: subject.trim(),
          description: [
            description.trim(),
            "",
            `Submitted by: ${name.trim()}`,
            `Phone: ${phone.trim()}`,
            `Source: /support/submit-ticket`,
          ].join("\n"),
          priority: priorityLabel,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error((result as { error?: string }).error || "Failed to submit ticket");
      }

      toast({
        title: "Ticket submitted",
        description: "Our support team will follow up shortly.",
      });
      setLocation("/support/ticket-confirmation");
    } catch (error: any) {
      toast({
        title: "Could not submit ticket",
        description: error?.message || "Please try again or call us.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTemplate
      title="Submit Support Ticket"
      subtitle="Get help from our support team. Open a ticket and we’ll track it to resolution."
      gradientColors="from-slate-600 via-slate-700 to-gray-800"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">New Support Request</CardTitle>
              <CardDescription className="text-gray-400">
                Please provide as much detail as possible to help us resolve your issue quickly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Your Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith"
                      required
                      data-testid="input-name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      required
                      data-testid="input-email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(480) 000-0000"
                      required
                      data-testid="input-phone"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-gray-300">Priority *</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger id="priority" data-testid="select-priority" className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General Question</SelectItem>
                        <SelectItem value="medium">Medium - Minor Issue</SelectItem>
                        <SelectItem value="high">High - Production Issue</SelectItem>
                        <SelectItem value="critical">Critical - System Down</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of your issue"
                    required
                    data-testid="input-subject"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please describe your issue in detail. Include any error messages, when the issue started, and steps you've already tried."
                    rows={8}
                    required
                    data-testid="textarea-description"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  data-testid="button-submit-ticket"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Submit Support Ticket"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <Clock className="h-10 w-10 text-purple-400 mb-2" />
              <CardTitle className="text-white">Response Times</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-purple-400">Critical Issues</p>
                <p className="text-sm text-gray-400">Immediate response</p>
              </div>
              <div>
                <p className="font-semibold text-blue-400">High Priority</p>
                <p className="text-sm text-gray-400">Tracked to resolution</p>
              </div>
              <div>
                <p className="font-semibold text-green-400">Medium/Low Priority</p>
                <p className="text-sm text-gray-400">Within 2 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <Phone className="h-10 w-10 text-purple-400 mb-2" />
              <CardTitle className="text-white">Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                For urgent issues, call us directly:
              </p>
              <a
                href="tel:480-519-5892"
                className="text-2xl font-bold text-purple-400 hover:text-purple-300"
              >
                480-519-5892
              </a>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/10 backdrop-blur-sm border border-amber-500/20">
            <CardHeader>
              <AlertCircle className="h-10 w-10 text-amber-400 mb-2" />
              <CardTitle className="text-amber-200">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-300/80">
                For after-hours emergencies, use our emergency hotline available 24/7 to all managed service clients.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}
