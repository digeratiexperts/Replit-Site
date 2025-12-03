import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  DollarSign,
} from "lucide-react";
import { PortalLayout } from "./PortalLayout";

interface ApprovalRequest {
  id: string;
  type: string;
  title: string;
  requester: string;
  amount?: number;
  status: "pending" | "approved" | "rejected";
  requestedDate: string;
  priority: "low" | "medium" | "high";
  description: string;
  approvers: Array<{
    name: string;
    role: string;
    status: "pending" | "approved" | "rejected";
  }>;
}

const approvalRequests: ApprovalRequest[] = [
  {
    id: "APR-001",
    type: "Software License",
    title: "Adobe Creative Suite - Design Team",
    requester: "Sarah Chen",
    amount: 4800,
    status: "pending",
    requestedDate: "Jan 15, 2025",
    priority: "high",
    description:
      "Team needs upgraded Adobe suite for Q1 design projects. 5 licenses.",
    approvers: [
      { name: "John Manager", role: "Department Lead", status: "approved" },
      { name: "CFO Finance", role: "Finance Approval", status: "pending" },
    ],
  },
  {
    id: "APR-002",
    type: "Access Request",
    title: "Database Access - Analytics Team",
    requester: "Mike Johnson",
    status: "pending",
    requestedDate: "Jan 16, 2025",
    priority: "medium",
    description: "Need production database read access for Q1 analytics.",
    approvers: [
      { name: "Tech Lead", role: "Team Lead", status: "approved" },
      { name: "Security Team", role: "Security Review", status: "pending" },
    ],
  },
  {
    id: "APR-003",
    type: "Hardware Purchase",
    title: "15 Laptops - New Hires",
    requester: "HR Department",
    amount: 28500,
    status: "pending",
    requestedDate: "Jan 10, 2025",
    priority: "high",
    description:
      "Dell XPS 15 laptops for Q1 new hires. Dell Business Account pricing.",
    approvers: [
      { name: "HR Director", role: "HR Lead", status: "approved" },
      { name: "CFO Finance", role: "Finance Approval", status: "approved" },
      { name: "CEO", role: "Executive", status: "pending" },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
    case "rejected":
      return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
    case "pending":
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-4 h-4" />;
    case "rejected":
      return <AlertCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    default:
      return null;
  }
};

export function PortalApprovals() {
  const [selectedRequest, setSelectedRequest] =
    useState<ApprovalRequest | null>(null);

  const totalPending = approvalRequests.filter(
    (r) => r.status === "pending"
  ).length;
  const totalValue = approvalRequests
    .filter((r) => r.amount)
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  const renderContent = () => {
    if (selectedRequest) {
      const approvalProgress = selectedRequest.approvers.filter(
        (a) => a.status === "approved"
      ).length;
      const totalApprovers = selectedRequest.approvers.length;

      return (
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => setSelectedRequest(null)}
            data-testid="button-back-to-approvals"
          >
            ← Back to Approvals
          </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedRequest.title}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedRequest.id} • {selectedRequest.type}
                </p>
              </div>
              <Badge className={getStatusColor(selectedRequest.status)}>
                {selectedRequest.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Request Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Requested By
                </p>
                <p className="font-medium flex items-center gap-2 mt-1">
                  <User size={16} /> {selectedRequest.requester}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Requested Date
                </p>
                <p className="font-medium">{selectedRequest.requestedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Priority
                </p>
                <Badge
                  variant={
                    selectedRequest.priority === "high"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {selectedRequest.priority.toUpperCase()}
                </Badge>
              </div>
              {selectedRequest.amount && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Amount
                  </p>
                  <p className="font-medium flex items-center gap-2 mt-1">
                    <DollarSign size={16} /> ${selectedRequest.amount.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-medium mb-2">Description</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {selectedRequest.description}
              </p>
            </div>

            {/* Approval Chain */}
            <div>
              <p className="text-sm font-medium mb-3">
                Approval Status ({approvalProgress}/{totalApprovers})
              </p>
              <div className="space-y-2">
                {selectedRequest.approvers.map((approver, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                    data-testid={`approval-step-${idx}`}
                  >
                    <div>
                      <p className="font-medium text-sm">{approver.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {approver.role}
                      </p>
                    </div>
                    <Badge className={getStatusColor(approver.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(approver.status)}
                        {approver.status.toUpperCase()}
                      </span>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {selectedRequest.status === "pending" && (
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  data-testid="button-approve-request"
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  data-testid="button-reject-request"
                >
                  Reject
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  data-testid="button-request-more-info"
                >
                  Request Info
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Approval Requests</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage pending approvals and request workflows
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">{totalPending}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Pending Approvals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">${(totalValue / 1000).toFixed(1)}K</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Total Value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Approval Requests List */}
      <div className="space-y-3">
        {approvalRequests.map((request) => (
          <Card
            key={request.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedRequest(request)}
            data-testid={`approval-card-${request.id}`}
          >
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="font-medium">{request.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {request.id} • {request.type}
                  </p>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status.toUpperCase()}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    By: {request.requester}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {request.requestedDate}
                  </span>
                </div>
                {request.amount && (
                  <span className="font-medium">
                    ${request.amount.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                {request.approvers.filter((a) => a.status === "approved").length}/
                {request.approvers.length} approvals
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    );
  };

  return (
    <PortalLayout title="Approvals">
      {renderContent()}
    </PortalLayout>
  );
}
