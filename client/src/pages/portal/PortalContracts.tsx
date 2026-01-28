import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, Clock, CheckCircle, XCircle, AlertTriangle, Eye, 
  FileSignature, Calendar, Download, Loader, AlertCircle, Info
} from "lucide-react";
import { portalGet, portalPost } from "@/lib/portalApi";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from "date-fns";
import { SignatureCapture } from "@/components/portal/SignatureCapture";
import { PDFViewer } from "@/components/portal/PDFViewer";

interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  description: string;
  status: 'pending' | 'signed' | 'countersigned' | 'expired' | 'declined';
  sentAt: string | null;
  expiresAt: string | null;
  signedAt: string | null;
  countersignedAt: string | null;
  pdfUrl: string | null;
  pdfContent: string | null;
  createdAt: string;
}

interface Signature {
  id: string;
  signerName: string;
  signerEmail: string;
  signerTitle: string;
  signedAt: string;
  isCountersign: boolean;
}

const statusConfig: Record<string, { label: string; color: string; icon: any; bgColor: string }> = {
  pending: { label: 'Awaiting Your Signature', color: 'text-amber-400', bgColor: 'bg-amber-500/20', icon: Clock },
  signed: { label: 'Awaiting Countersign', color: 'text-blue-400', bgColor: 'bg-blue-500/20', icon: CheckCircle },
  countersigned: { label: 'Fully Executed', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20', icon: CheckCircle },
  expired: { label: 'Expired', color: 'text-red-400', bgColor: 'bg-red-500/20', icon: AlertTriangle },
  declined: { label: 'Declined', color: 'text-red-400', bgColor: 'bg-red-500/20', icon: XCircle }
};

export function PortalContracts() {
  const { toast } = useToast();
  const [showSignDialog, setShowSignDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [declineReason, setDeclineReason] = useState("");
  const [signatureData, setSignatureData] = useState<{
    signature: string | null;
    type: 'drawn' | 'typed';
    name: string;
    title: string;
  }>({
    signature: null,
    type: 'drawn',
    name: '',
    title: ''
  });

  const { data: contractsData, isLoading } = useQuery({
    queryKey: ['/api/portal/contracts'],
    queryFn: () => portalGet('/api/portal/contracts')
  });

  const signContractMutation = useMutation({
    mutationFn: ({ contractId, data }: { contractId: string; data: any }) => 
      portalPost(`/api/portal/contracts/${contractId}/sign`, data),
    onSuccess: () => {
      toast({ 
        title: "Contract signed successfully", 
        description: "Thank you for signing. The contract is now being processed." 
      });
      queryClient.invalidateQueries({ queryKey: ['/api/portal/contracts'] });
      setShowSignDialog(false);
      resetSignatureData();
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to sign contract.", 
        variant: "destructive" 
      });
    }
  });

  const declineContractMutation = useMutation({
    mutationFn: ({ contractId, reason }: { contractId: string; reason: string }) => 
      portalPost(`/api/portal/contracts/${contractId}/decline`, { reason }),
    onSuccess: () => {
      toast({ 
        title: "Contract declined", 
        description: "You have declined this contract. Please contact us if you have questions." 
      });
      queryClient.invalidateQueries({ queryKey: ['/api/portal/contracts'] });
      setShowDeclineDialog(false);
      setDeclineReason("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to decline contract.", variant: "destructive" });
    }
  });

  const contracts: Contract[] = (contractsData as any)?.contracts || [];

  const pendingContracts = contracts.filter(c => c.status === 'pending');
  const completedContracts = contracts.filter(c => ['signed', 'countersigned'].includes(c.status));

  const resetSignatureData = () => {
    setSignatureData({ signature: null, type: 'drawn', name: '', title: '' });
  };

  const handleSign = () => {
    if (!selectedContract || !signatureData.signature || !signatureData.name) {
      toast({ title: "Error", description: "Please provide your signature and name.", variant: "destructive" });
      return;
    }

    signContractMutation.mutate({
      contractId: selectedContract.id,
      data: {
        signatureData: signatureData.signature,
        signerName: signatureData.name,
        signerTitle: signatureData.title,
        signatureType: signatureData.type
      }
    });
  };

  const handleDecline = () => {
    if (!selectedContract) return;
    declineContractMutation.mutate({
      contractId: selectedContract.id,
      reason: declineReason
    });
  };

  const openSignDialog = (contract: Contract) => {
    setSelectedContract(contract);
    setShowSignDialog(true);
  };

  const openDeclineDialog = (contract: Contract) => {
    setSelectedContract(contract);
    setShowDeclineDialog(true);
  };

  const openViewDialog = (contract: Contract) => {
    setSelectedContract(contract);
    setShowViewDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="portal-contracts-page">
      <div>
        <h1 className="text-2xl font-bold text-white">Contracts & Agreements</h1>
        <p className="text-slate-400">Review and sign your service agreements</p>
      </div>

      {/* Pending Contracts Alert */}
      {pendingContracts.length > 0 && (
        <Alert className="bg-amber-500/10 border-amber-500/50">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            You have {pendingContracts.length} contract{pendingContracts.length > 1 ? 's' : ''} awaiting your signature.
          </AlertDescription>
        </Alert>
      )}

      {/* Pending Contracts */}
      {pendingContracts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            Requires Your Signature
          </h2>
          <div className="grid gap-4">
            {pendingContracts.map((contract) => {
              const isExpiringSoon = contract.expiresAt && 
                new Date(contract.expiresAt).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;
              
              return (
                <Card 
                  key={contract.id} 
                  className="bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/30 hover:border-amber-400/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-amber-500/20">
                          <FileSignature className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{contract.title}</h3>
                          <p className="text-sm text-slate-400 mt-1">{contract.description || 'Please review and sign this agreement'}</p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                            <span>#{contract.contractNumber}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Sent {contract.sentAt ? formatDistanceToNow(new Date(contract.sentAt), { addSuffix: true }) : 'recently'}
                            </span>
                            {contract.expiresAt && (
                              <span className={`flex items-center gap-1 ${isExpiringSoon ? 'text-red-400' : ''}`}>
                                <AlertTriangle className={`w-3 h-3 ${isExpiringSoon ? 'text-red-400' : ''}`} />
                                Expires {format(new Date(contract.expiresAt), 'MMM d, yyyy')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => openViewDialog(contract)}
                          className="border-slate-600 hover:bg-slate-800"
                          data-testid={`button-view-contract-${contract.id}`}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => openDeclineDialog(contract)}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          data-testid={`button-decline-contract-${contract.id}`}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => openSignDialog(contract)}
                          className="bg-violet-600 hover:bg-violet-700"
                          data-testid={`button-sign-contract-${contract.id}`}
                        >
                          <FileSignature className="w-4 h-4 mr-1" />
                          Sign Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Contracts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          Signed Agreements
        </h2>
        {completedContracts.length === 0 ? (
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 text-slate-600 mb-4" />
              <p className="text-slate-400">No signed contracts yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {completedContracts.map((contract) => {
              const status = statusConfig[contract.status];
              const StatusIcon = status.icon;
              
              return (
                <Card key={contract.id} className="bg-slate-900/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${status.bgColor}`}>
                          <StatusIcon className={`w-5 h-5 ${status.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{contract.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                            <span>#{contract.contractNumber}</span>
                            <span>
                              Signed {contract.signedAt ? format(new Date(contract.signedAt), 'MMM d, yyyy') : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${status.bgColor} ${status.color} border-0`}>
                          {status.label}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openViewDialog(contract)}
                          data-testid={`button-view-signed-${contract.id}`}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-violet-400"
                          data-testid={`button-download-${contract.id}`}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* No Contracts State */}
      {contracts.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-white">No Contracts</h3>
            <p className="text-slate-400 text-center mt-2 max-w-md">
              You don't have any contracts or agreements at this time. 
              When new agreements are ready for your review, they will appear here.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Sign Contract Dialog */}
      <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Sign Agreement</DialogTitle>
            <DialogDescription>
              {selectedContract?.title} - #{selectedContract?.contractNumber}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Contract Preview */}
            <div className="rounded-lg border border-slate-700 overflow-hidden">
              <PDFViewer 
                pdfUrl={selectedContract?.pdfUrl || undefined}
                pdfContent={selectedContract?.pdfContent || undefined}
                title={selectedContract?.title}
                className="h-[300px]"
              />
            </div>

            {/* Agreement Acknowledgment */}
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                By signing below, you acknowledge that you have read, understood, and agree to all the terms and conditions outlined in this agreement.
              </AlertDescription>
            </Alert>

            {/* Signer Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Legal Name <span className="text-red-400">*</span></Label>
                <Input
                  placeholder="Enter your full legal name"
                  value={signatureData.name}
                  onChange={(e) => setSignatureData({ ...signatureData, name: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                  data-testid="input-signer-name"
                />
              </div>
              <div className="space-y-2">
                <Label>Title / Position</Label>
                <Input
                  placeholder="e.g., CEO, Owner, IT Director"
                  value={signatureData.title}
                  onChange={(e) => setSignatureData({ ...signatureData, title: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                  data-testid="input-signer-title"
                />
              </div>
            </div>

            {/* Signature Capture */}
            <div className="space-y-2">
              <Label>Your Signature <span className="text-red-400">*</span></Label>
              <SignatureCapture
                signerName={signatureData.name}
                onSignatureChange={(sig, type) => setSignatureData({ 
                  ...signatureData, 
                  signature: sig, 
                  type 
                })}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => { setShowSignDialog(false); resetSignatureData(); }}
            >
              Cancel
            </Button>
            <Button 
              className="bg-violet-600 hover:bg-violet-700"
              onClick={handleSign}
              disabled={!signatureData.signature || !signatureData.name || signContractMutation.isPending}
              data-testid="button-confirm-sign"
            >
              {signContractMutation.isPending ? (
                <Loader className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <FileSignature className="w-4 h-4 mr-2" />
              )}
              Sign Agreement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decline Contract Dialog */}
      <Dialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Decline Contract</DialogTitle>
            <DialogDescription>
              Are you sure you want to decline "{selectedContract?.title}"?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert className="bg-red-500/10 border-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                Declining this contract cannot be undone. You may need to request a new contract if you change your mind.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label>Reason for Declining (Optional)</Label>
              <Textarea
                placeholder="Please let us know why you're declining this agreement..."
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="bg-slate-800 border-slate-700"
                rows={3}
                data-testid="input-decline-reason"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => { setShowDeclineDialog(false); setDeclineReason(""); }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDecline}
              disabled={declineContractMutation.isPending}
              data-testid="button-confirm-decline"
            >
              {declineContractMutation.isPending ? (
                <Loader className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <XCircle className="w-4 h-4 mr-2" />
              )}
              Decline Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Contract Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedContract?.title}</DialogTitle>
            <DialogDescription>
              Contract #{selectedContract?.contractNumber}
            </DialogDescription>
          </DialogHeader>
          
          <PDFViewer 
            pdfUrl={selectedContract?.pdfUrl || undefined}
            pdfContent={selectedContract?.pdfContent || undefined}
            title={selectedContract?.title}
            className="h-[600px]"
          />

          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              {selectedContract?.signedAt && (
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  Signed on {format(new Date(selectedContract.signedAt), 'PPP')}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Close
              </Button>
              {selectedContract?.status === 'pending' && (
                <Button 
                  className="bg-violet-600 hover:bg-violet-700"
                  onClick={() => { 
                    setShowViewDialog(false); 
                    openSignDialog(selectedContract); 
                  }}
                >
                  <FileSignature className="w-4 h-4 mr-2" />
                  Sign Now
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PortalContracts;
