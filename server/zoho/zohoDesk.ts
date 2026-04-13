import { zohoClient } from './zohoClient';

export interface ZohoTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  channel: string;
  contactId: string;
  departmentId: string;
  assigneeId: string;
  createdTime: string;
  modifiedTime: string;
  closedTime?: string;
  dueDate?: string;
  resolution?: string;
  customerResponseTime?: string;
}

export interface ZohoDeskContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountId?: string;
  accountName?: string;
}

class ZohoDeskService {
  private orgId: string | null = null;

  private async getOrgId(): Promise<string> {
    if (this.orgId) return this.orgId;
    
    const client = await zohoClient.getDeskClient();
    const response = await client.get('/organizations');
    
    if (response.data?.data?.[0]?.id) {
      const orgId = response.data.data[0].id;
      this.orgId = orgId;
      return orgId;
    }
    
    throw new Error('No Zoho Desk organization found');
  }

  async getTickets(params?: {
    status?: string;
    limit?: number;
    from?: number;
    sortBy?: string;
  }): Promise<{ tickets: ZohoTicket[]; count: number }> {
    try {
      const client = await zohoClient.getDeskClient();
      const orgId = await this.getOrgId();
      
      const response = await client.get('/tickets', {
        headers: { orgId },
        params: {
          limit: params?.limit || 50,
          from: params?.from || 0,
          status: params?.status,
          sortBy: params?.sortBy || '-modifiedTime',
        },
      });

      return {
        tickets: response.data?.data || [],
        count: response.data?.count || 0,
      };
    } catch (error: any) {
      console.error('Error fetching Zoho Desk tickets:', error.response?.data || error.message);
      throw error;
    }
  }

  async getTicketById(ticketId: string): Promise<ZohoTicket | null> {
    try {
      const client = await zohoClient.getDeskClient();
      const orgId = await this.getOrgId();
      
      const response = await client.get(`/tickets/${ticketId}`, {
        headers: { orgId },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error fetching ticket:', error.response?.data || error.message);
      return null;
    }
  }

  async createTicket(data: {
    subject: string;
    description: string;
    contactId?: string;
    email?: string;
    departmentId?: string;
    priority?: string;
  }): Promise<ZohoTicket> {
    try {
      const client = await zohoClient.getDeskClient();
      const orgId = await this.getOrgId();
      
      const response = await client.post('/tickets', data, {
        headers: { orgId },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error creating ticket:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateTicket(ticketId: string, data: Partial<ZohoTicket>): Promise<ZohoTicket> {
    try {
      const client = await zohoClient.getDeskClient();
      const orgId = await this.getOrgId();
      
      const response = await client.patch(`/tickets/${ticketId}`, data, {
        headers: { orgId },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error updating ticket:', error.response?.data || error.message);
      throw error;
    }
  }

  async getContacts(params?: {
    limit?: number;
    from?: number;
  }): Promise<{ contacts: ZohoDeskContact[]; count: number }> {
    try {
      const client = await zohoClient.getDeskClient();
      const orgId = await this.getOrgId();
      
      const response = await client.get('/contacts', {
        headers: { orgId },
        params: {
          limit: params?.limit || 50,
          from: params?.from || 0,
        },
      });

      return {
        contacts: response.data?.data || [],
        count: response.data?.count || 0,
      };
    } catch (error: any) {
      console.error('Error fetching contacts:', error.response?.data || error.message);
      throw error;
    }
  }

  async getContactByEmail(email: string): Promise<ZohoDeskContact | null> {
    try {
      const client = await zohoClient.getDeskClient();
      const orgId = await this.getOrgId();
      
      const response = await client.get('/contacts/search', {
        headers: { orgId },
        params: { email },
      });

      return response.data?.data?.[0] || null;
    } catch (error: any) {
      console.error('Error searching contact:', error.response?.data || error.message);
      return null;
    }
  }

  async getTicketsByContact(contactId: string): Promise<ZohoTicket[]> {
    try {
      const client = await zohoClient.getDeskClient();
      const orgId = await this.getOrgId();
      
      const response = await client.get(`/contacts/${contactId}/tickets`, {
        headers: { orgId },
      });

      return response.data?.data || [];
    } catch (error: any) {
      console.error('Error fetching contact tickets:', error.response?.data || error.message);
      return [];
    }
  }

  async getDepartments(): Promise<any[]> {
    try {
      const client = await zohoClient.getDeskClient();
      const orgId = await this.getOrgId();
      
      const response = await client.get('/departments', {
        headers: { orgId },
      });

      return response.data?.data || [];
    } catch (error: any) {
      console.error('Error fetching departments:', error.response?.data || error.message);
      return [];
    }
  }
}

export const zohoDeskService = new ZohoDeskService();
