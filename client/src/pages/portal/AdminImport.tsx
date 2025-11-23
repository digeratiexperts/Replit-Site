import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

interface ImportJob {
  id: string;
  system: string;
  status: "idle" | "importing" | "completed" | "failed";
  totalRecords: number;
  successCount: number;
  failureCount: number;
  lastRun?: string;
  nextRun?: string;
}

const importSystems: ImportJob[] = [
  {
    id: "1",
    system: "Zoho CRM (Companies)",
    status: "completed",
    totalRecords: 45,
    successCount: 45,
    failureCount: 0,
    lastRun: "2025-01-15 10:30",
    nextRun: "2025-01-16 10:30",
  },
  {
    id: "2",
    system: "Zoho Desk (Contacts)",
    status: "completed",
    totalRecords: 128,
    successCount: 126,
    failureCount: 2,
    lastRun: "2025-01-15 11:15",
    nextRun: "2025-01-16 11:15",
  },
  {
    id: "3",
    system: "JumpCloud (Users)",
    status: "idle",
    totalRecords: 0,
    successCount: 0,
    failureCount: 0,
  },
  {
    id: "4",
    system: "Seamless.ai (Companies)",
    status: "idle",
    totalRecords: 0,
    successCount: 0,
    failureCount: 0,
  },
];

export function AdminImport() {
  const [jobs, setJobs] = useState<ImportJob[]>(importSystems);
  const [showApiForm, setShowApiForm] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "importing":
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "failed":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      case "importing":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  const handleStartImport = async () => {
    if (!selectedSystem || !apiKey) {
      alert("Please select a system and enter API key");
      return;
    }

    setIsImporting(true);

    // Simulate import
    setTimeout(() => {
      setJobs(
        jobs.map((job) => {
          if (job.id === selectedSystem) {
            return {
              ...job,
              status: "completed",
              totalRecords: Math.floor(Math.random() * 200) + 50,
              successCount: Math.floor(Math.random() * 195) + 50,
              failureCount: Math.floor(Math.random() * 5),
              lastRun: new Date().toLocaleString(),
              nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString(),
            };
          }
          return job;
        })
      );

      setIsImporting(false);
      setShowApiForm(false);
      setApiKey("");
      setSelectedSystem(null);
      alert("Import completed successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Import Data from External Systems</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Sync companies and users from Zoho, JumpCloud, and Seamless.ai
        </p>
      </div>

      {/* Import Systems */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card key={job.id} data-testid={`import-card-${job.id}`}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <h3 className="font-semibold">{job.system}</h3>
                    {job.lastRun && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last synced: {job.lastRun}
                      </p>
                    )}
                  </div>
                </div>
                <Badge className={getStatusBadge(job.status)}>
                  {job.status.toUpperCase()}
                </Badge>
              </div>

              {job.totalRecords > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Records</p>
                    <p className="font-semibold">{job.totalRecords}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Imported</p>
                    <p className="font-semibold text-green-600">{job.successCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Failed</p>
                    <p className="font-semibold text-red-600">{job.failureCount}</p>
                  </div>
                </div>
              )}

              <Button
                onClick={() => {
                  setSelectedSystem(job.id);
                  setShowApiForm(true);
                }}
                disabled={job.status === "importing"}
                className="bg-[#5034ff] hover:bg-[#5034ff]/90"
                data-testid={`button-import-${job.id}`}
              >
                {job.status === "importing" ? "Importing..." : "Run Import"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Key Form */}
      {showApiForm && selectedSystem && (
        <Card className="border-[#5034ff]/50">
          <CardHeader>
            <CardTitle>
              API Credentials for{" "}
              {jobs.find((j) => j.id === selectedSystem)?.system}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">API Key / Token</label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your API key"
                data-testid="input-api-key"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your credentials are never stored. Used only for this import.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleStartImport}
                disabled={isImporting}
                className="flex-1 bg-[#5034ff] hover:bg-[#5034ff]/90"
                data-testid="button-start-import"
              >
                {isImporting ? "Importing..." : "Start Import"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowApiForm(false);
                  setApiKey("");
                }}
                className="flex-1"
                data-testid="button-cancel-import"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
