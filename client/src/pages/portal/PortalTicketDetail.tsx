import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PortalLayout } from "./PortalLayout";
import { ArrowLeft, Send, MessageCircle, Clock, User, AlertCircle, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

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

export default function PortalTicketDetail() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const ticketId = params.id;
  const [commentText, setCommentText] = useState("");

  const { data: ticketData, isLoading, error } = useQuery<{ ticket: Ticket }>({
    queryKey: ['/api/portal/tickets', ticketId],
    enabled: !!ticketId,
  });

  const ticket = ticketData?.ticket;

  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest('POST', `/api/portal/tickets/${ticketId}/comments`, { content });
      return response.json();
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ['/api/portal/tickets', ticketId] });
    },
  });

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentMutation.mutate(commentText);
  };

  if (isLoading) {
    return (
      <PortalLayout title="Ticket Details">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#5034ff]" />
        </div>
      </PortalLayout>
    );
  }

  if (error || !ticket) {
    return (
      <PortalLayout title="Ticket Details">
        <div className="space-y-6 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/portal/tickets")}
            className="gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tickets
          </Button>
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">
                Ticket Not Found
              </h2>
              <p className="text-red-600 dark:text-red-400">
                The ticket you're looking for doesn't exist or you don't have permission to view it.
              </p>
            </CardContent>
          </Card>
        </div>
      </PortalLayout>
    );
  }

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
                  disabled={!commentText || addCommentMutation.isPending}
                  className="bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                  data-testid="button-send-comment"
                >
                  {addCommentMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {addCommentMutation.isPending ? "Sending..." : "Send Comment"}
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
