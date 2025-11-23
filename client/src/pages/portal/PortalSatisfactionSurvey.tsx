import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Star } from "lucide-react";

interface SurveyResponse {
  rating: number;
  comment: string;
  submittedAt: Date;
}

interface TicketSurvey {
  ticketId: string;
  ticketNumber: string;
  subject: string;
  completedDate: string;
}

const recentTickets: TicketSurvey[] = [
  {
    ticketId: "TKT-001",
    ticketNumber: "TICKET-001",
    subject: "VPN connectivity resolved",
    completedDate: "2 days ago",
  },
  {
    ticketId: "TKT-002",
    ticketNumber: "TICKET-002",
    subject: "Password reset assistance",
    completedDate: "5 days ago",
  },
  {
    ticketId: "TKT-003",
    ticketNumber: "TICKET-003",
    subject: "Software installation completed",
    completedDate: "1 week ago",
  },
];

export function PortalSatisfactionSurvey() {
  const [selectedTicket, setSelectedTicket] = useState<TicketSurvey | null>(
    null
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState<SurveyResponse | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const response: SurveyResponse = {
      rating,
      comment,
      submittedAt: new Date(),
    };

    console.log("Survey submitted:", {
      ticket: selectedTicket,
      response,
    });

    setSubmitted(response);

    setTimeout(() => {
      setSubmitted(null);
      setSelectedTicket(null);
      setRating(0);
      setComment("");
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="mx-auto mb-2 text-green-600" size={40} />
          <p className="text-green-700 dark:text-green-300 font-medium">
            ✅ Thank you for your feedback!
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            Your satisfaction rating helps us improve our service.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!selectedTicket) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Customer Satisfaction Surveys</h2>
        <p className="text-gray-600 dark:text-gray-400">
          We'd love to know how we're doing! Please rate your recent ticket
          experience.
        </p>

        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <Card
              key={ticket.ticketId}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedTicket(ticket)}
              data-testid={`survey-ticket-${ticket.ticketId}`}
            >
              <CardContent className="pt-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{ticket.ticketNumber}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {ticket.subject}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Completed {ticket.completedDate}
                  </p>
                </div>
                <Button variant="outline" data-testid={`button-rate-${ticket.ticketId}`}>
                  Rate Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedTicket(null)}
          data-testid="button-back-to-surveys"
        >
          ← Back to Tickets
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            How satisfied are you with this ticket resolution?
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {selectedTicket.ticketNumber}: {selectedTicket.subject}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Star Rating */}
          <div className="space-y-3">
            <p className="font-medium">Overall Satisfaction</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-transform hover:scale-110"
                  data-testid={`button-star-${star}`}
                >
                  <Star
                    size={40}
                    className={`transition-colors ${
                      star <= (hoveredStar || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {rating > 0 && (
                <>
                  {rating === 1 && "Very Unsatisfied"}
                  {rating === 2 && "Unsatisfied"}
                  {rating === 3 && "Neutral"}
                  {rating === 4 && "Satisfied"}
                  {rating === 5 && "Very Satisfied"}
                </>
              )}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Additional Comments (Optional)
            </label>
            <Textarea
              placeholder="Tell us what we did well or how we can improve..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-24"
              data-testid="textarea-survey-comment"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              data-testid="button-submit-survey"
            >
              Submit Survey
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedTicket(null)}
              data-testid="button-cancel-survey"
            >
              Skip
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
