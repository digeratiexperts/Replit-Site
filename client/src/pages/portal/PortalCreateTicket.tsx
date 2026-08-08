import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PortalLayout } from "./PortalLayout";
import { ArrowLeft, Upload, AlertCircle, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient } from "@/lib/queryClient";

export default function PortalCreateTicket() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Email",
    "Access & Security",
    "Network & VPN",
    "Software & Applications",
    "Hardware & Devices",
    "Backup & Recovery",
    "Collaboration",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const ticketData = {
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        description: formData.description,
      };

      const response = await fetch("/api/portal/tickets", {
        method: "POST",
        body: JSON.stringify(ticketData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("portalToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create ticket");
      }

      queryClient.invalidateQueries({ queryKey: ["/api/portal/tickets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portal/dashboard"] });

      setFormData({ subject: "", category: "", priority: "medium", description: "" });
      navigate("/portal/tickets");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PortalLayout title="Create Support Ticket">
      <div className="space-y-6 max-w-2xl">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-300" data-testid="error-message">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/portal/tickets")}
          className="gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </Button>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              For urgent issues, please call our support team at (480) 519-5892. Response time: Critical (1 hour), High (4 hours), Medium (24 hours).
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit a New Ticket</CardTitle>
            <CardDescription>
              Describe the issue you're experiencing and our team will get back to you shortly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject *</label>
                <Input
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  data-testid="input-subject"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority *</label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger data-testid="select-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Can wait</SelectItem>
                    <SelectItem value="medium">Medium - Soon</SelectItem>
                    <SelectItem value="high">High - Urgent</SelectItem>
                    <SelectItem value="critical">Critical - Down</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  placeholder="Please provide detailed information about your issue:
- What were you trying to do?
- What error did you see?
- When did this start?
- What have you already tried?"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-32"
                  required
                  data-testid="textarea-description"
                />
              </div>

              {/* Attachments — disabled: no multipart upload API on ticket create */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Attachments</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-6 text-center bg-gray-50/50 dark:bg-slate-900/40 opacity-80">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    File upload not available on this form
                  </p>
                  <div className="flex gap-2 justify-center items-start max-w-md mx-auto text-left">
                    <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Create the ticket first, then add screenshots or logs by replying on the ticket detail page (or email them to support and reference your ticket ID).
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4 cursor-not-allowed"
                    disabled
                    data-testid="button-choose-files"
                  >
                    Choose Files (unavailable)
                  </Button>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={!formData.subject || !formData.category || !formData.description || submitting}
                  className="bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                  data-testid="button-submit"
                >
                  {submitting ? "Creating..." : "Create Ticket"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/portal/tickets")}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
