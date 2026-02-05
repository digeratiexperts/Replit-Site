import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, Plus, Search, Send, Eye, Clock, CheckCircle, XCircle, 
  AlertTriangle, Upload, Loader, Building2, User, Calendar, 
  FileSignature, MoreVertical, Filter
} from "lucide-react";
import { portalGet, portalPost, portalFetch } from "@/lib/portalApi";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { SignatureCapture } from "@/components/portal/SignatureCapture";
import { PDFViewer } from "@/components/portal/PDFViewer";

interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  requiresCountersign: boolean;
  expirationDays: number;
  isActive: boolean;
  createdAt: string;
}

interface Contract {
  id: string;
  templateId: string | null;
  clientId: string;
  contractNumber: string;
  title: string;
  description: string;
  status: 'draft' | 'pending' | 'signed' | 'countersigned' | 'expired' | 'declined' | 'cancelled';
  sentAt: string | null;
  expiresAt: string | null;
  signedAt: string | null;
  countersignedAt: string | null;
  createdAt: string;
}

interface Client {
  id: string;
  companyName: string;
  contactEmail: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: 'Draft', color: 'bg-slate-500', icon: FileText },
  pending: { label: 'Pending Signature', color: 'bg-amber-500', icon: Clock },
  signed: { label: 'Signed', color: 'bg-blue-500', icon: CheckCircle },
  countersigned: { label: 'Completed', color: 'bg-emerald-500', icon: CheckCircle },
  expired: { label: 'Expired', color: 'bg-red-500', icon: AlertTriangle },
  declined: { label: 'Declined', color: 'bg-red-500', icon: XCircle },
  cancelled: { label: 'Cancelled', color: 'bg-slate-500', icon: XCircle }
};

export function AdminContracts() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contracts");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showContractDetail, setShowContractDetail] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [showCountersignDialog, setShowCountersignDialog] = useState(false);
  const [countersignData, setCountersignData] = useState<{ signature: string | null; name: string; title: string }>({ 
    signature: null, 
    name: '', 
    title: 'Administrator' 
  });

  const [newContract, setNewContract] = useState({
    templateId: '',
    clientId: '',
    title: '',
    description: ''
  });

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'msa',
    version: '1.0',
    requiresCountersign: false,
    expirationDays: 30
  });

  const { data: contractsData, isLoading: contractsLoading } = useQuery({
    queryKey: ['/api/admin/contracts'],
    queryFn: () => portalGet('/api/admin/contracts')
  });

  const { data: templatesData, isLoading: templatesLoading } = useQuery({
    queryKey: ['/api/admin/contract-templates'],
    queryFn: () => portalGet('/api/admin/contract-templates')
  });

  const { data: clientsData } = useQuery({
    queryKey: ['/api/admin/clients'],
    queryFn: () => portalGet('/api/admin/clients')
  });

  const createTemplateMutation = useMutation({
    mutationFn: (data: typeof newTemplate) => portalPost('/api/admin/contract-templates', data),
    onSuccess: () => {
      toast({ title: "Template created", description: "Contract template has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contract-templates'] });
      setShowTemplateDialog(false);
      setNewTemplate({ name: '', description: '', category: 'msa', version: '1.0', requiresCountersign: false, expirationDays: 30 });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create template.", variant: "destructive" });
    }
  });

  const createContractMutation = useMutation({
    mutationFn: (data: typeof newContract) => portalPost('/api/admin/contracts', data),
    onSuccess: () => {
      toast({ title: "Contract created", description: "Contract has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contracts'] });
      setShowCreateDialog(false);
      setNewContract({ templateId: '', clientId: '', title: '', description: '' });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create contract.", variant: "destructive" });
    }
  });

  const sendContractMutation = useMutation({
    mutationFn: (contractId: string) => portalPost(`/api/admin/contracts/${contractId}/send`, {}),
    onSuccess: () => {
      toast({ title: "Contract sent", description: "Contract has been sent to the client for signature." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contracts'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to send contract.", variant: "destructive" });
    }
  });

  const cancelContractMutation = useMutation({
    mutationFn: (contractId: string) => portalPost(`/api/admin/contracts/${contractId}/cancel`, {}),
    onSuccess: () => {
      toast({ title: "Contract cancelled", description: "Contract has been cancelled." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contracts'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to cancel contract.", variant: "destructive" });
    }
  });

  const countersignMutation = useMutation({
    mutationFn: ({ contractId, data }: { contractId: string; data: any }) => 
      portalPost(`/api/admin/contracts/${contractId}/countersign`, data),
    onSuccess: () => {
      toast({ title: "Contract countersigned", description: "Contract is now fully executed." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contracts'] });
      setShowCountersignDialog(false);
      setCountersignData({ signature: null, name: '', title: 'Administrator' });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to countersign contract.", variant: "destructive" });
    }
  });

  const contracts: Contract[] = (contractsData as any)?.contracts || [];
  const templates: ContractTemplate[] = (templatesData as any)?.templates || [];
  const clients: Client[] = (clientsData as any)?.clients || [];

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.companyName || 'Unknown Client';
  };

  const handleCountersign = () => {
    if (!selectedContract || !countersignData.signature || !countersignData.name) {
      toast({ title: "Error", description: "Please provide signature and name.", variant: "destructive" });
      return;
    }
    countersignMutation.mutate({
      contractId: selectedContract.id,
      data: {
        signatureData: countersignData.signature,
        signerName: countersignData.name,
        signerTitle: countersignData.title
      }
    });
  };

  return (
    <div className="space-y-6" data-testid="admin-contracts-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contract Management</h1>
          <p className="text-slate-400">Create, send, and manage client contracts and agreements</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10"
            onClick={() => setShowTemplateDialog(true)}
            data-testid="button-create-template"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
          <Button 
            className="bg-violet-600 hover:bg-violet-700"
            onClick={() => setShowCreateDialog(true)}
            data-testid="button-create-contract"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Contract
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800">
          <TabsTrigger value="contracts" className="data-[state=active]:bg-violet-600">
            <FileSignature className="w-4 h-4 mr-2" />
            Contracts
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-violet-600">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-700"
                data-testid="input-search-contracts"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700" data-testid="select-status-filter">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="countersigned">Completed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {contractsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-violet-500" />
            </div>
          ) : filteredContracts.length === 0 ? (
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-slate-600 mb-4" />
                <p className="text-slate-400">No contracts found</p>
                <Button 
                  className="mt-4 bg-violet-600 hover:bg-violet-700"
                  onClick={() => setShowCreateDialog(true)}
                >
                  Create your first contract
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredContracts.map((contract) => {
                const status = statusConfig[contract.status];
                const StatusIcon = status.icon;
                return (
                  <Card key={contract.id} className="bg-slate-900/50 border-slate-700 hover:border-violet-500/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${status.color}/20`}>
                            <StatusIcon className={`w-5 h-5 ${status.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{contract.title}</h3>
                            <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {getClientName(contract.clientId)}
                              </span>
                              <span>#{contract.contractNumber}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(contract.createdAt), 'MMM d, yyyy')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${status.color} text-white`}>
                            {status.label}
                          </Badge>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedContract(contract);
                                setShowContractDetail(true);
                              }}
                              data-testid={`button-view-contract-${contract.id}`}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {contract.status === 'draft' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-violet-400 hover:text-violet-300"
                                onClick={() => sendContractMutation.mutate(contract.id)}
                                disabled={sendContractMutation.isPending}
                                data-testid={`button-send-contract-${contract.id}`}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                            {contract.status === 'signed' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-emerald-400 hover:text-emerald-300"
                                onClick={() => {
                                  setSelectedContract(contract);
                                  setShowCountersignDialog(true);
                                }}
                                data-testid={`button-countersign-${contract.id}`}
                              >
                                <FileSignature className="w-4 h-4" />
                              </Button>
                            )}
                            {['draft', 'pending'].includes(contract.status) && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => cancelContractMutation.mutate(contract.id)}
                                disabled={cancelContractMutation.isPending}
                                data-testid={`button-cancel-contract-${contract.id}`}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="mt-6 space-y-4">
          {templatesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-violet-500" />
            </div>
          ) : templates.length === 0 ? (
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-slate-600 mb-4" />
                <p className="text-slate-400">No templates found</p>
                <Button 
                  className="mt-4 bg-violet-600 hover:bg-violet-700"
                  onClick={() => setShowTemplateDialog(true)}
                >
                  Create your first template
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id} className="bg-slate-900/50 border-slate-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-white">{template.name}</CardTitle>
                        <CardDescription className="mt-1">{template.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="border-violet-500/50 text-violet-400">
                        v{template.version}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span className="capitalize">{template.category.toUpperCase()}</span>
                      <span>{template.expirationDays} days to sign</span>
                    </div>
                    {template.requiresCountersign && (
                      <Badge className="mt-2 bg-amber-500/20 text-amber-400 border-amber-500/30">
                        Requires Countersign
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Contract Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Contract</DialogTitle>
            <DialogDescription>Assign a contract to a client for signature</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Client</Label>
              <Select value={newContract.clientId} onValueChange={(v) => setNewContract({ ...newContract, clientId: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700" data-testid="select-client">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Template (Optional)</Label>
              <Select value={newContract.templateId} onValueChange={(v) => setNewContract({ ...newContract, templateId: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700" data-testid="select-template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No template</SelectItem>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Contract Title</Label>
              <Input
                placeholder="e.g., Master Service Agreement"
                value={newContract.title}
                onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                className="bg-slate-800 border-slate-700"
                data-testid="input-contract-title"
              />
            </div>
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea
                placeholder="Brief description of the contract..."
                value={newContract.description}
                onChange={(e) => setNewContract({ ...newContract, description: e.target.value })}
                className="bg-slate-800 border-slate-700"
                data-testid="input-contract-description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-violet-600 hover:bg-violet-700"
              onClick={() => createContractMutation.mutate(newContract)}
              disabled={!newContract.clientId || !newContract.title || createContractMutation.isPending}
              data-testid="button-submit-contract"
            >
              {createContractMutation.isPending ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Create Contract Template</DialogTitle>
            <DialogDescription>Define a reusable contract template</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input
                placeholder="e.g., Master Service Agreement"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                className="bg-slate-800 border-slate-700"
                data-testid="input-template-name"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Brief description..."
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                className="bg-slate-800 border-slate-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newTemplate.category} onValueChange={(v) => setNewTemplate({ ...newTemplate, category: v })}>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="msa">MSA</SelectItem>
                    <SelectItem value="sow">Statement of Work</SelectItem>
                    <SelectItem value="nda">NDA</SelectItem>
                    <SelectItem value="sla">SLA</SelectItem>
                    <SelectItem value="addendum">Addendum</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Days to Sign</Label>
                <Input
                  type="number"
                  value={newTemplate.expirationDays}
                  onChange={(e) => setNewTemplate({ ...newTemplate, expirationDays: parseInt(e.target.value) || 30 })}
                  className="bg-slate-800 border-slate-700"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="requiresCountersign"
                checked={newTemplate.requiresCountersign}
                onChange={(e) => setNewTemplate({ ...newTemplate, requiresCountersign: e.target.checked })}
                className="rounded border-slate-600"
              />
              <Label htmlFor="requiresCountersign">Requires admin countersign after client signs</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-violet-600 hover:bg-violet-700"
              onClick={() => createTemplateMutation.mutate(newTemplate)}
              disabled={!newTemplate.name || createTemplateMutation.isPending}
              data-testid="button-submit-template"
            >
              {createTemplateMutation.isPending ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Countersign Dialog */}
      <Dialog open={showCountersignDialog} onOpenChange={setShowCountersignDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Countersign Contract</DialogTitle>
            <DialogDescription>
              Add your signature to complete the contract for "{selectedContract?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input
                  placeholder="Full legal name"
                  value={countersignData.name}
                  onChange={(e) => setCountersignData({ ...countersignData, name: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                  data-testid="input-countersign-name"
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="e.g., CEO, Account Manager"
                  value={countersignData.title}
                  onChange={(e) => setCountersignData({ ...countersignData, title: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                  data-testid="input-countersign-title"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Your Signature</Label>
              <SignatureCapture
                signerName={countersignData.name}
                onSignatureChange={(sig) => setCountersignData({ ...countersignData, signature: sig })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCountersignDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleCountersign}
              disabled={!countersignData.signature || !countersignData.name || countersignMutation.isPending}
              data-testid="button-submit-countersign"
            >
              {countersignMutation.isPending ? <Loader className="w-4 h-4 animate-spin mr-2" /> : <FileSignature className="w-4 h-4 mr-2" />}
              Countersign Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contract Detail Dialog */}
      <Dialog open={showContractDetail} onOpenChange={setShowContractDetail}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedContract?.title}</DialogTitle>
            <DialogDescription>
              Contract #{selectedContract?.contractNumber} - {getClientName(selectedContract?.clientId || '')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <PDFViewer 
              title={selectedContract?.title}
              className="h-[500px]"
            />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Status:</span>
                <Badge className={`ml-2 ${statusConfig[selectedContract?.status || 'draft'].color}`}>
                  {statusConfig[selectedContract?.status || 'draft'].label}
                </Badge>
              </div>
              <div>
                <span className="text-slate-400">Created:</span>
                <span className="ml-2 text-white">
                  {selectedContract?.createdAt ? format(new Date(selectedContract.createdAt), 'PPP') : '-'}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Expires:</span>
                <span className="ml-2 text-white">
                  {selectedContract?.expiresAt ? format(new Date(selectedContract.expiresAt), 'PPP') : 'Not sent'}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminContracts;
