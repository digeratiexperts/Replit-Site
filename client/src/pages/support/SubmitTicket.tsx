import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Clock, Phone } from "lucide-react";

export default function SubmitTicket() {
  return (
    <PageTemplate
      title="Submit Support Ticket"
      subtitle="Get help from our expert support team. We typically respond within 15 minutes."
      gradientColors="from-slate-600 via-slate-700 to-gray-800"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Support Request</CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us resolve your issue quickly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" placeholder="John Smith" data-testid="input-name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john@company.com" data-testid="input-email" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="(480) 000-0000" data-testid="input-phone" />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <Select>
                      <SelectTrigger id="priority" data-testid="select-priority">
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
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="Brief description of your issue" data-testid="input-subject" />
                </div>

                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please describe your issue in detail. Include any error messages, when the issue started, and steps you've already tried."
                    rows={8}
                    data-testid="textarea-description"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  data-testid="button-submit-ticket"
                >
                  Submit Support Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Response Times</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-purple-600">Critical Issues</p>
                <p className="text-sm text-gray-600">Immediate response</p>
              </div>
              <div>
                <p className="font-semibold text-blue-600">High Priority</p>
                <p className="text-sm text-gray-600">Within 15 minutes</p>
              </div>
              <div>
                <p className="font-semibold text-green-600">Medium/Low Priority</p>
                <p className="text-sm text-gray-600">Within 2 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For urgent issues, call us directly:
              </p>
              <a 
                href="tel:480-519-5892"
                className="text-2xl font-bold text-purple-600 hover:text-purple-700"
              >
                (480) 519-5892
              </a>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <AlertCircle className="h-10 w-10 text-amber-600 mb-2" />
              <CardTitle className="text-amber-900">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-800">
                For after-hours emergencies, use our emergency hotline available 24/7 to all managed service clients.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}