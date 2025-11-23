/**
 * Zoho Integration Service
 * Handles integration with Zoho One, Zoho Flow, and Zoho Desk/ASAP
 */

import axios, { AxiosInstance } from "axios";

export interface ZohoConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accessToken?: string;
  tokenExpiry?: number;
  region: "us" | "eu" | "in" | "com";
}

export interface ZohoTicket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  assigneeId?: string;
  createdTime: string;
}

export interface ZohoFlow {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdTime: string;
}

export class ZohoService {
  private config: ZohoConfig;
  private client: AxiosInstance;
  private baseURL: string;

  constructor(config: ZohoConfig) {
    this.config = config;
    const regionMap = {
      us: "zoho.com",
      eu: "zoho.eu",
      in: "zoho.in",
      com: "zoho.com",
    };
    this.baseURL = `https://www.${regionMap[config.region]}/desk/api/v1`;

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
    });
  }

  /**
   * Refresh OAuth token
   */
  async refreshAccessToken(): Promise<void> {
    try {
      const response = await axios.post(
        `https://accounts.${this.baseURL.includes("eu") ? "zoho.eu" : "zoho.com"}/oauth/v2/token`,
        {
          refresh_token: this.config.refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          grant_type: "refresh_token",
        }
      );

      this.config.accessToken = response.data.access_token;
      this.config.tokenExpiry = Date.now() + response.data.expires_in * 1000;
    } catch (error) {
      console.error("Failed to refresh Zoho token:", error);
      throw new Error("Zoho token refresh failed");
    }
  }

  /**
   * Get authorization headers
   */
  private getHeaders() {
    return {
      "Authorization": `Zoho-oauthtoken ${this.config.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Create a ticket in Zoho Desk
   */
  async createTicket(
    subject: string,
    description: string,
    email: string,
    priority: "Low" | "Medium" | "High" | "Urgent" = "Medium"
  ): Promise<ZohoTicket> {
    try {
      const response = await this.client.post(
        "/tickets",
        {
          subject,
          description,
          email,
          priority,
          status: "Open",
        },
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error: any) {
      console.error("Failed to create Zoho ticket:", error.response?.data || error.message);
      throw new Error("Failed to create support ticket");
    }
  }

  /**
   * Get all tickets for a contact
   */
  async getTickets(email: string): Promise<ZohoTicket[]> {
    try {
      const response = await this.client.get("/tickets", {
        params: { email },
        headers: this.getHeaders(),
      });

      return response.data.data || [];
    } catch (error: any) {
      console.error("Failed to fetch Zoho tickets:", error.response?.data || error.message);
      return [];
    }
  }

  /**
   * Get ticket by ID
   */
  async getTicket(ticketId: string): Promise<ZohoTicket | null> {
    try {
      const response = await this.client.get(`/tickets/${ticketId}`, {
        headers: this.getHeaders(),
      });

      return response.data.data;
    } catch (error: any) {
      console.error("Failed to fetch Zoho ticket:", error.response?.data || error.message);
      return null;
    }
  }

  /**
   * Add comment to ticket
   */
  async addComment(ticketId: string, content: string, isPublic: boolean = true): Promise<boolean> {
    try {
      await this.client.post(
        `/tickets/${ticketId}/comments`,
        {
          content,
          isPublic,
        },
        { headers: this.getHeaders() }
      );

      return true;
    } catch (error: any) {
      console.error("Failed to add comment:", error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Update ticket status
   */
  async updateTicketStatus(
    ticketId: string,
    status: "Open" | "On Hold" | "Pending Review" | "Closed"
  ): Promise<boolean> {
    try {
      await this.client.patch(
        `/tickets/${ticketId}`,
        { status },
        { headers: this.getHeaders() }
      );

      return true;
    } catch (error: any) {
      console.error("Failed to update ticket:", error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Get Zoho Flows (from Zoho Flow API)
   */
  async getFlows(): Promise<ZohoFlow[]> {
    try {
      const flowBaseURL = this.baseURL.replace("/desk/api/v1", "/flow/api/v1");
      const response = await axios.get(`${flowBaseURL}/flows`, {
        headers: this.getHeaders(),
      });

      return response.data.data || [];
    } catch (error: any) {
      console.error("Failed to fetch Zoho Flows:", error.response?.data || error.message);
      return [];
    }
  }

  /**
   * Execute Zoho Flow
   */
  async executeFlow(flowId: string, data: Record<string, any>): Promise<boolean> {
    try {
      const flowBaseURL = this.baseURL.replace("/desk/api/v1", "/flow/api/v1");
      await axios.post(
        `${flowBaseURL}/flows/${flowId}/executions`,
        data,
        { headers: this.getHeaders() }
      );

      return true;
    } catch (error: any) {
      console.error("Failed to execute flow:", error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Get ASAP widget configuration
   */
  getASAPWidgetCode(accountId: string, portalId: string): string {
    return `
    <script>
      window.ZohoDeskAsapConfig = {
        accountId: "${accountId}",
        portalId: "${portalId}"
      };
    </script>
    <script src="https://static.zohocdn.com/desk/web-client/asap/v1/api.js"></script>
    `;
  }

  /**
   * Generate ASAP embed HTML with routing
   */
  generateASAPEmbed(accountId: string, portalId: string, customCSS?: string): string {
    return `
      <div id="zoho-asap-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
        <div id="asap-launcher" style="
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #5034ff 0%, #030228 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(80, 52, 255, 0.4);
          transition: all 0.3s ease;
        " data-testid="button-open-support">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </div>
      
      <script>
        window.ZohoDeskAsapReady = function(fn) {
          const readyFn = function() {
            const launcher = document.getElementById('asap-launcher');
            if (launcher) {
              launcher.addEventListener('click', function() {
                ZohoDeskAsap.invoke('show', 'app.launcher');
              });
            }
            fn();
          };
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', readyFn);
          } else {
            readyFn();
          }
        };

        ${customCSS || ""}
      </script>
    `;
  }
}

// Store Zoho configuration in memory (in production, store in database with encryption)
let zohoServiceInstance: ZohoService | null = null;

/**
 * Initialize Zoho service with configuration
 */
export function initializeZohoService(config: ZohoConfig): ZohoService {
  if (!zohoServiceInstance) {
    zohoServiceInstance = new ZohoService(config);
  }
  return zohoServiceInstance;
}

/**
 * Get Zoho service instance
 */
export function getZohoService(): ZohoService | null {
  return zohoServiceInstance;
}
