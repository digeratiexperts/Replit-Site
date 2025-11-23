import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PortalLayout } from "./PortalLayout";
import { ArrowLeft, Send, MessageCircle, Clock, User, AlertCircle } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
}

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  comments: Comment[];
}

const mockTicket: Ticket = {
  id: "1",
  ticketNumber: "#TK001",
  subject: "Email not syncing",
  description: "Outlook is not syncing emails from the Exchange server. Started this morning around 9 AM. Tried restarting the client but issue persists.",
  status: "open",
  priority: "high",
  category: "Email",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  assignedTo: "Sarah Johnson",
  comments: [
    {
      id: "1",
      author: "Sarah Johnson",
      role: "Support Engineer",
      content: "Thanks for reporting this. I'm looking into your Exchange connectivity. Can you confirm if you have VPN enabled?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isInternal: false,
    },
    {
      id: "2",
      author: "You",
      role: "Client",
      content: "Yes, VPN is enabled. I'm currently working from home.",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isInternal: false,
    },
    {
      id: "3",
      author: "Sarah Johnson",
      role: "Support Engineer",
      content: "Let me check your device configuration in our system.",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      isInternal: true,
    },
  ],
};

export default function PortalTicketDetail() {
  const [, navigate] = useLocation();
  const [ticket] = useState(mockTicket);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setCommentText("");
      setSubmitting(false);
    }, 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 dark:bg-red-900/30";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30";
      case "pending_client":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30";
    }
  };

  return (
    <PortalLayout title="Ticket Details">
      <div className="space-y-6 max-w-4xl">
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

        {/* Ticket Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{ticket.subject}</h1>
              <p className="text-gray-600 dark:text-gray-400">{ticket.ticketNumber}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(ticket.status)}>
                {ticket.status.replace(/_/g, " ")}
              </Badge>
              <Badge className={getPriorityColor(ticket.priority)}>
                {ticket.priority}
              </Badge>
            </div>
          </div>

          {/* Ticket Info Grid */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="font-semibold">{ticket.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Assigned To</p>
                  <p className="font-semibold">{ticket.assignedTo || "Unassigned"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                  <p className="font-semibold text-sm">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                  <p className="font-semibold text-sm">
                    {new Date(ticket.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {ticket.description}
            </p>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Comments Thread */}
            <div className="space-y-4">
              {ticket.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg border ${
                    comment.isInternal
                      ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900/30"
                      : "bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700"
                  }`}
                  data-testid={`comment-${comment.id}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {comment.role}
                      </span>
                      {comment.isInternal && (
                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">
                          Internal Note
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <div className="border-t dark:border-slate-700 pt-4">
              <form onSubmit={handleAddComment} className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Add a comment</label>
                  <Textarea
                    placeholder="Type your response here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-24"
                    data-testid="textarea-comment"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!commentText || submitting}
                  className="bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                  data-testid="button-send-comment"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {submitting ? "Sending..." : "Send Comment"}
                </Button>
              </form>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Internal notes from our support team are shown above. Only you and our support engineers can see this ticket.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
