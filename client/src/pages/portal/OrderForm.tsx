import { useState, useMemo } from "react";
import { PortalLayout } from "./PortalLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Server, Shield, Database, Network, Phone, ClipboardCheck, Users, 
  Check, Plus, Minus, ChevronRight, FileText, Send, Calculator,
  Building2, Mail, User, Calendar, DollarSign, Star, Info
} from "lucide-react";
import { serviceCatalog, coreDocuments, getDocumentKeysForServices, type ServiceItem } from "@/data/serviceCatalog";
import { useToast } from "@/hooks/use-toast";
import { portalPost } from "@/lib/portalApi";
import { useLocation } from "wouter";

const iconMap: Record<string, any> = {
  Server, Shield, Database, Network, Phone, ClipboardCheck, Users
};

interface SelectedService {
  serviceId: string;
  quantity: number;
}

interface ClientInfo {
  legalName: string;
  dbaName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
  signatoryPhone: string;
  techContactName: string;
  techContactEmail: string;
  billingContactName: string;
  billingContactEmail: string;
  numberOfSites: number;
  numberOfUsers: number;
  preferredStartDate: string;
  contractTerm: string;
  notes: string;
}

export function OrderForm() {
  const { toast } = useToast();
  const [step, setStep] = useState<'services' | 'details' | 'review'>('services');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    legalName: '',
    dbaName: '',
    address: '',
    city: '',
    state: 'AZ',
    zipCode: '',
    phone: '',
    website: '',
    signatoryName: '',
    signatoryTitle: '',
    signatoryEmail: '',
    signatoryPhone: '',
    techContactName: '',
    techContactEmail: '',
    billingContactName: '',
    billingContactEmail: '',
    numberOfSites: 1,
    numberOfUsers: 10,
    preferredStartDate: '',
    contractTerm: '12',
    notes: ''
  });

  const toggleService = (serviceId: string, service: ServiceItem) => {
    setSelectedServices(prev => {
      const existing = prev.find(s => s.serviceId === serviceId);
      if (existing) {
        return prev.filter(s => s.serviceId !== serviceId);
      }
      return [...prev, { serviceId, quantity: service.minQuantity }];
    });
  };

  const updateQuantity = (serviceId: string, delta: number) => {
    setSelectedServices(prev => prev.map(s => {
      if (s.serviceId === serviceId) {
        const service = getServiceFromCatalog(serviceId);
        const newQty = Math.max(service?.minQuantity || 1, s.quantity + delta);
        return { ...s, quantity: newQty };
      }
      return s;
    }));
  };

  const getServiceFromCatalog = (serviceId: string): ServiceItem | undefined => {
    for (const category of serviceCatalog) {
      const service = category.services.find(s => s.id === serviceId);
      if (service) return service;
    }
    return undefined;
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(s => s.serviceId === serviceId);
  };

  const getQuantity = (serviceId: string) => {
    return selectedServices.find(s => s.serviceId === serviceId)?.quantity || 0;
  };

  const pricing = useMemo(() => {
    let monthlyTotal = 0;
    let oneTimeTotal = 0;
    
    for (const selected of selectedServices) {
      const service = getServiceFromCatalog(selected.serviceId);
      if (!service) continue;
      
      const lineTotal = service.basePrice * selected.quantity;
      
      if (service.pricingType === 'flat' || service.pricingType === 'custom') {
        oneTimeTotal += lineTotal;
      } else {
        monthlyTotal += lineTotal;
      }
    }
    
    return { monthlyTotal, oneTimeTotal, annualTotal: monthlyTotal * 12 };
  }, [selectedServices]);

  const requiredDocuments = useMemo(() => {
    const serviceIds = selectedServices.map(s => s.serviceId);
    const docKeys = getDocumentKeysForServices(serviceIds);
    
    const allDocs = [
      ...coreDocuments,
      ...docKeys.map(key => ({
        key,
        name: `SOW - ${key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
        required: true
      }))
    ];
    
    return allDocs;
  }, [selectedServices]);

  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!clientInfo.legalName || !clientInfo.signatoryEmail) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get document keys from selected services
      const serviceIds = selectedServices.map(s => s.serviceId);
      const documentKeys = getDocumentKeysForServices(serviceIds);
      
      // Create order request with service selections and client info
      const orderData = {
        serviceSelections: documentKeys,
        clientInfo: {
          legalName: clientInfo.legalName,
          dbaName: clientInfo.dbaName,
          address: clientInfo.address,
          city: clientInfo.city,
          state: clientInfo.state,
          zipCode: clientInfo.zipCode,
          phone: clientInfo.phone,
          website: clientInfo.website,
          signatoryName: clientInfo.signatoryName,
          signatoryTitle: clientInfo.signatoryTitle,
          signatoryEmail: clientInfo.signatoryEmail,
          signatoryPhone: clientInfo.signatoryPhone,
          techContactName: clientInfo.techContactName,
          techContactEmail: clientInfo.techContactEmail,
          billingContactName: clientInfo.billingContactName,
          billingContactEmail: clientInfo.billingContactEmail,
          numberOfSites: clientInfo.numberOfSites,
          numberOfUsers: clientInfo.numberOfUsers,
          preferredStartDate: clientInfo.preferredStartDate,
          contractTerm: clientInfo.contractTerm,
          notes: clientInfo.notes
        },
        selectedServices: selectedServices.map(s => ({
          serviceId: s.serviceId,
          quantity: s.quantity,
          serviceName: getServiceFromCatalog(s.serviceId)?.name || s.serviceId
        })),
        pricing: {
          monthlyTotal: pricing.monthlyTotal,
          oneTimeTotal: pricing.oneTimeTotal,
          contractTerm: parseInt(clientInfo.contractTerm)
        },
        name: `Service Order - ${clientInfo.legalName} - ${new Date().toLocaleDateString()}`
      };

      // Submit order to create onboarding data and document packet
      const response = await portalPost<{success: boolean; packet: any; items: any[]; message: string}>('/api/portal/order-form', orderData);

      toast({
        title: "Order Submitted Successfully",
        description: "Your service order has been submitted. You can view your contract documents in the Contracts section.",
      });

      // Navigate to contracts page after successful submission
      setTimeout(() => {
        navigate('/portal/contracts');
      }, 2000);
      
    } catch (error: any) {
      console.error('Order submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PortalLayout title="Service Order Form">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-8">
          <div className={`flex items-center gap-2 ${step === 'services' ? 'text-violet-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'services' ? 'bg-violet-500 text-white' : 'bg-gray-700'}`}>
              1
            </div>
            <span className="font-medium">Select Services</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <div className={`flex items-center gap-2 ${step === 'details' ? 'text-violet-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-violet-500 text-white' : 'bg-gray-700'}`}>
              2
            </div>
            <span className="font-medium">Company Details</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <div className={`flex items-center gap-2 ${step === 'review' ? 'text-violet-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-violet-500 text-white' : 'bg-gray-700'}`}>
              3
            </div>
            <span className="font-medium">Review & Submit</span>
          </div>
        </div>

        {step === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Server className="w-5 h-5 text-violet-400" />
                    Select Your Services
                  </CardTitle>
                  <CardDescription>
                    Choose the services that best fit your business needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="core" className="w-full">
                    <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-6 bg-gray-900/50">
                      {serviceCatalog.map(category => {
                        const IconComponent = iconMap[category.icon] || Server;
                        return (
                          <TabsTrigger 
                            key={category.id} 
                            value={category.id}
                            className="text-xs data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
                          >
                            <IconComponent className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    {serviceCatalog.map(category => (
                      <TabsContent key={category.id} value={category.id} className="space-y-4">
                        <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                        <div className="grid gap-4">
                          {category.services.map(service => {
                            const isSelected = isServiceSelected(service.id);
                            const qty = getQuantity(service.id);
                            
                            return (
                              <div 
                                key={service.id}
                                className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                  isSelected 
                                    ? 'border-violet-500 bg-violet-500/10' 
                                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                                }`}
                                onClick={() => toggleService(service.id, service)}
                                data-testid={`service-card-${service.id}`}
                              >
                                {service.isPopular && (
                                  <Badge className="absolute -top-2 right-4 bg-violet-500 text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                                
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-white">{service.name}</h3>
                                      {service.tier && (
                                        <Badge variant="outline" className={`text-xs ${
                                          service.tier === 'enterprise' ? 'border-violet-400 text-violet-400' :
                                          service.tier === 'business' ? 'border-blue-400 text-blue-400' :
                                          'border-gray-400 text-gray-400'
                                        }`}>
                                          {service.tier.charAt(0).toUpperCase() + service.tier.slice(1)}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                                    
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {service.features.slice(0, 3).map((feature, i) => (
                                        <span key={i} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded">
                                          {feature}
                                        </span>
                                      ))}
                                      {service.features.length > 3 && (
                                        <span className="text-xs text-violet-400">+{service.features.length - 3} more</span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="text-right ml-4">
                                    <div className="text-2xl font-bold text-white">
                                      ${service.basePrice.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      per {service.pricingUnit}
                                      {service.pricingType !== 'flat' && '/mo'}
                                    </div>
                                    {service.minQuantity > 1 && (
                                      <div className="text-xs text-gray-500">
                                        Min: {service.minQuantity} {service.pricingUnit}s
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {isSelected && (
                                  <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center gap-2">
                                      <Check className="w-5 h-5 text-violet-400" />
                                      <span className="text-violet-400 font-medium">Selected</span>
                                    </div>
                                    
                                    {service.pricingType !== 'flat' && (
                                      <div className="flex items-center gap-3">
                                        <span className="text-gray-400 text-sm">Quantity:</span>
                                        <div className="flex items-center gap-2">
                                          <Button 
                                            size="sm" 
                                            variant="outline"
                                            className="h-8 w-8 p-0"
                                            onClick={() => updateQuantity(service.id, -1)}
                                            data-testid={`decrease-${service.id}`}
                                          >
                                            <Minus className="w-4 h-4" />
                                          </Button>
                                          <span className="w-12 text-center font-medium text-white">{qty}</span>
                                          <Button 
                                            size="sm" 
                                            variant="outline"
                                            className="h-8 w-8 p-0"
                                            onClick={() => updateQuantity(service.id, 1)}
                                            data-testid={`increase-${service.id}`}
                                          >
                                            <Plus className="w-4 h-4" />
                                          </Button>
                                        </div>
                                        <span className="text-violet-400 font-medium">
                                          ${(service.basePrice * qty).toLocaleString()}/mo
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700 sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calculator className="w-5 h-5 text-violet-400" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedServices.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">
                      Select services to see pricing
                    </p>
                  ) : (
                    <>
                      <div className="space-y-2">
                        {selectedServices.map(selected => {
                          const service = getServiceFromCatalog(selected.serviceId);
                          if (!service) return null;
                          
                          return (
                            <div key={selected.serviceId} className="flex justify-between text-sm">
                              <span className="text-gray-300">
                                {service.shortName}
                                {selected.quantity > 1 && ` x${selected.quantity}`}
                              </span>
                              <span className="text-white font-medium">
                                ${(service.basePrice * selected.quantity).toLocaleString()}
                                {service.pricingType !== 'flat' && '/mo'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      {pricing.monthlyTotal > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Monthly Total</span>
                          <span className="text-xl font-bold text-white">
                            ${pricing.monthlyTotal.toLocaleString()}/mo
                          </span>
                        </div>
                      )}
                      
                      {pricing.oneTimeTotal > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">One-Time</span>
                          <span className="text-xl font-bold text-white">
                            ${pricing.oneTimeTotal.toLocaleString()}
                          </span>
                        </div>
                      )}
                      
                      {pricing.monthlyTotal > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Annual Value</span>
                          <span className="text-gray-400">
                            ${pricing.annualTotal.toLocaleString()}/yr
                          </span>
                        </div>
                      )}
                    </>
                  )}
                  
                  <Separator className="bg-gray-700" />
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Required Documents ({requiredDocuments.length})
                    </h4>
                    <div className="space-y-1">
                      {requiredDocuments.map(doc => (
                        <div key={doc.key} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check className="w-3 h-3 text-violet-400" />
                          {doc.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-violet-500 hover:bg-violet-600"
                    disabled={selectedServices.length === 0}
                    onClick={() => setStep('details')}
                    data-testid="continue-to-details"
                  >
                    Continue to Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Building2 className="w-5 h-5 text-violet-400" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="legalName">Legal Company Name *</Label>
                      <Input 
                        id="legalName"
                        value={clientInfo.legalName}
                        onChange={e => setClientInfo(prev => ({ ...prev, legalName: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-legal-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dbaName">DBA / Trade Name</Label>
                      <Input 
                        id="dbaName"
                        value={clientInfo.dbaName}
                        onChange={e => setClientInfo(prev => ({ ...prev, dbaName: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-dba-name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input 
                      id="address"
                      value={clientInfo.address}
                      onChange={e => setClientInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="bg-gray-900/50 border-gray-600"
                      data-testid="input-address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city"
                        value={clientInfo.city}
                        onChange={e => setClientInfo(prev => ({ ...prev, city: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select value={clientInfo.state} onValueChange={v => setClientInfo(prev => ({ ...prev, state: v }))}>
                        <SelectTrigger className="bg-gray-900/50 border-gray-600" data-testid="select-state">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NV">Nevada</SelectItem>
                          <SelectItem value="NM">New Mexico</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input 
                        id="zipCode"
                        value={clientInfo.zipCode}
                        onChange={e => setClientInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-zip"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input 
                        id="phone"
                        value={clientInfo.phone}
                        onChange={e => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website"
                        value={clientInfo.website}
                        onChange={e => setClientInfo(prev => ({ ...prev, website: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        placeholder="https://"
                        data-testid="input-website"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <User className="w-5 h-5 text-violet-400" />
                    Authorized Signatory
                  </CardTitle>
                  <CardDescription>
                    The person authorized to sign contracts on behalf of the company
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signatoryName">Full Name *</Label>
                      <Input 
                        id="signatoryName"
                        value={clientInfo.signatoryName}
                        onChange={e => setClientInfo(prev => ({ ...prev, signatoryName: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-signatory-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signatoryTitle">Title *</Label>
                      <Input 
                        id="signatoryTitle"
                        value={clientInfo.signatoryTitle}
                        onChange={e => setClientInfo(prev => ({ ...prev, signatoryTitle: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        placeholder="e.g., CEO, Owner, President"
                        data-testid="input-signatory-title"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signatoryEmail">Email *</Label>
                      <Input 
                        id="signatoryEmail"
                        type="email"
                        value={clientInfo.signatoryEmail}
                        onChange={e => setClientInfo(prev => ({ ...prev, signatoryEmail: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-signatory-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signatoryPhone">Phone</Label>
                      <Input 
                        id="signatoryPhone"
                        value={clientInfo.signatoryPhone}
                        onChange={e => setClientInfo(prev => ({ ...prev, signatoryPhone: e.target.value }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-signatory-phone"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-violet-400" />
                    Service Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="numberOfSites">Number of Sites</Label>
                      <Input 
                        id="numberOfSites"
                        type="number"
                        min="1"
                        value={clientInfo.numberOfSites}
                        onChange={e => setClientInfo(prev => ({ ...prev, numberOfSites: parseInt(e.target.value) || 1 }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-sites"
                      />
                    </div>
                    <div>
                      <Label htmlFor="numberOfUsers">Number of Users</Label>
                      <Input 
                        id="numberOfUsers"
                        type="number"
                        min="1"
                        value={clientInfo.numberOfUsers}
                        onChange={e => setClientInfo(prev => ({ ...prev, numberOfUsers: parseInt(e.target.value) || 1 }))}
                        className="bg-gray-900/50 border-gray-600"
                        data-testid="input-users"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractTerm">Contract Term</Label>
                      <Select value={clientInfo.contractTerm} onValueChange={v => setClientInfo(prev => ({ ...prev, contractTerm: v }))}>
                        <SelectTrigger className="bg-gray-900/50 border-gray-600" data-testid="select-term">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 Months</SelectItem>
                          <SelectItem value="24">24 Months</SelectItem>
                          <SelectItem value="36">36 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
                    <Input 
                      id="preferredStartDate"
                      type="date"
                      value={clientInfo.preferredStartDate}
                      onChange={e => setClientInfo(prev => ({ ...prev, preferredStartDate: e.target.value }))}
                      className="bg-gray-900/50 border-gray-600"
                      data-testid="input-start-date"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes"
                      value={clientInfo.notes}
                      onChange={e => setClientInfo(prev => ({ ...prev, notes: e.target.value }))}
                      className="bg-gray-900/50 border-gray-600"
                      rows={3}
                      placeholder="Any special requirements or notes..."
                      data-testid="input-notes"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('services')}
                  data-testid="back-to-services"
                >
                  Back to Services
                </Button>
                <Button 
                  className="flex-1 bg-violet-500 hover:bg-violet-600"
                  onClick={() => setStep('review')}
                  data-testid="continue-to-review"
                >
                  Review & Submit
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div>
              <Card className="bg-gray-800/50 border-gray-700 sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <DollarSign className="w-5 h-5 text-violet-400" />
                    Pricing Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {selectedServices.map(selected => {
                      const service = getServiceFromCatalog(selected.serviceId);
                      if (!service) return null;
                      
                      return (
                        <div key={selected.serviceId} className="flex justify-between text-sm">
                          <span className="text-gray-300">{service.shortName}</span>
                          <span className="text-white">
                            ${(service.basePrice * selected.quantity).toLocaleString()}
                            {service.pricingType !== 'flat' && '/mo'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Separator className="bg-gray-700" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly</span>
                      <span className="text-xl font-bold text-white">
                        ${pricing.monthlyTotal.toLocaleString()}
                      </span>
                    </div>
                    {pricing.oneTimeTotal > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">One-Time</span>
                        <span className="text-white font-medium">
                          ${pricing.oneTimeTotal.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Review</CardTitle>
                <CardDescription>
                  Please review your order before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-violet-400" />
                      Company
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-white font-medium">{clientInfo.legalName || 'Not provided'}</p>
                      {clientInfo.dbaName && <p className="text-gray-400">DBA: {clientInfo.dbaName}</p>}
                      <p className="text-gray-400">{clientInfo.address}</p>
                      <p className="text-gray-400">{clientInfo.city}, {clientInfo.state} {clientInfo.zipCode}</p>
                      <p className="text-gray-400">{clientInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-violet-400" />
                      Authorized Signatory
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-white font-medium">{clientInfo.signatoryName || 'Not provided'}</p>
                      <p className="text-gray-400">{clientInfo.signatoryTitle}</p>
                      <p className="text-gray-400">{clientInfo.signatoryEmail}</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Server className="w-4 h-4 text-violet-400" />
                    Selected Services
                  </h4>
                  <div className="space-y-2">
                    {selectedServices.map(selected => {
                      const service = getServiceFromCatalog(selected.serviceId);
                      if (!service) return null;
                      
                      return (
                        <div key={selected.serviceId} className="flex justify-between p-3 bg-gray-900/30 rounded-lg">
                          <div>
                            <p className="text-white font-medium">{service.name}</p>
                            <p className="text-gray-400 text-sm">
                              {selected.quantity} {service.pricingUnit}(s) @ ${service.basePrice}/{service.pricingUnit}
                            </p>
                          </div>
                          <p className="text-xl font-bold text-violet-400">
                            ${(service.basePrice * selected.quantity).toLocaleString()}
                            {service.pricingType !== 'flat' && '/mo'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-violet-400" />
                    Documents to be Signed
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {requiredDocuments.map(doc => (
                      <div key={doc.key} className="flex items-center gap-2 text-sm text-gray-300 p-2 bg-gray-900/30 rounded">
                        <FileText className="w-4 h-4 text-violet-400" />
                        {doc.name}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400">Total Monthly Investment</p>
                      <p className="text-3xl font-bold text-white">${pricing.monthlyTotal.toLocaleString()}/mo</p>
                      {pricing.oneTimeTotal > 0 && (
                        <p className="text-gray-400 text-sm">+ ${pricing.oneTimeTotal.toLocaleString()} one-time</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Contract Term</p>
                      <p className="text-white font-medium">{clientInfo.contractTerm} Months</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-900/30 rounded-lg">
                  <Info className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-400">
                    Upon submission, our team will prepare your service agreement documents. 
                    You will receive an email at <span className="text-white">{clientInfo.signatoryEmail || 'your email'}</span> with 
                    a link to review and digitally sign the documents.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('details')}
                    data-testid="back-to-details"
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-violet-500 hover:bg-violet-600"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    data-testid="submit-order"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Order
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

export default OrderForm;
