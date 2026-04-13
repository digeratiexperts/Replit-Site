import axios, { AxiosInstance } from 'axios';

interface ZohoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  api_domain: string;
}

class ZohoClient {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private apiDomain: string = 'https://www.zohoapis.com';
  
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly refreshToken: string;

  constructor() {
    this.clientId = process.env.ZOHO_CLIENT_ID_API || '';
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET_API || '';
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN || '';
    
    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      console.warn('⚠️ Zoho API credentials not fully configured');
    }
  }

  private async refreshAccessToken(): Promise<string> {
    try {
      const response = await axios.post<ZohoTokenResponse>(
        'https://accounts.zoho.com/oauth/v2/token',
        null,
        {
          params: {
            grant_type: 'refresh_token',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            refresh_token: this.refreshToken,
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000;
      this.apiDomain = response.data.api_domain || this.apiDomain;
      
      console.log('✅ Zoho access token refreshed');
      return this.accessToken;
    } catch (error: any) {
      console.error('❌ Failed to refresh Zoho token:', error.response?.data || error.message);
      throw new Error('Failed to refresh Zoho access token');
    }
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessToken || Date.now() >= this.tokenExpiry) {
      return this.refreshAccessToken();
    }
    return this.accessToken;
  }

  async getClient(): Promise<AxiosInstance> {
    const token = await this.getAccessToken();
    
    return axios.create({
      baseURL: this.apiDomain,
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getDeskClient(): Promise<AxiosInstance> {
    const token = await this.getAccessToken();
    
    return axios.create({
      baseURL: 'https://desk.zoho.com/api/v1',
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret && this.refreshToken);
  }
}

export const zohoClient = new ZohoClient();
