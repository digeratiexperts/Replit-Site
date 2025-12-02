/**
 * Production Configuration for Digerati Experts MSP Portal
 * 
 * This file contains configuration for deploying to production environments
 * including CyberPanel/OpenLiteSpeed.
 */

export const productionConfig = {
  // Server Configuration
  server: {
    port: parseInt(process.env.PORT || '5000', 10),
    host: '0.0.0.0',
    trustProxy: true, // Enable for reverse proxy (OpenLiteSpeed)
  },

  // Database Configuration
  database: {
    url: process.env.DATABASE_URL,
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000', 10),
  },

  // Security Configuration
  security: {
    jwtSecret: process.env.JWT_SECRET || 'CHANGE_THIS_IN_PRODUCTION',
    jwtExpiry: process.env.JWT_EXPIRY || '24h',
    sessionSecret: process.env.SESSION_SECRET,
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10), // 15 minutes
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },

  // External Services
  services: {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY || process.env.STRIPE_LIVE_API_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
    openai: {
      baseUrl: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL,
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
    },
    zoho: {
      clientId: process.env.ZOHO_CLIENT_ID,
      clientSecret: process.env.ZOHO_CLIENT_SECRET,
      bookingsUrl: 'https://meet.digerati-experts.com/',
    },
  },

  // Domain Configuration
  domains: {
    main: process.env.MAIN_DOMAIN || 'digeratiexperts.com',
    portal: process.env.PORTAL_DOMAIN || 'portal.digeratiexperts.com',
    allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean),
  },

  // Feature Flags
  features: {
    enableOpenAI: process.env.ENABLE_OPENAI !== 'false',
    enableStripe: process.env.ENABLE_STRIPE !== 'false',
    enableZoho: process.env.ENABLE_ZOHO !== 'false',
  },
};

// Validate critical configuration
export function validateProductionConfig(): string[] {
  const errors: string[] = [];

  if (!process.env.DATABASE_URL) {
    errors.push('DATABASE_URL is required for production');
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'CHANGE_THIS_IN_PRODUCTION') {
    errors.push('JWT_SECRET must be set to a secure value in production');
  }

  if (!process.env.SESSION_SECRET) {
    errors.push('SESSION_SECRET is required for production');
  }

  if (process.env.NODE_ENV === 'production') {
    if (!process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_LIVE_API_KEY) {
      errors.push('Stripe API key is required for production payment processing');
    }
  }

  return errors;
}

// Environment detection
export function getEnvironment(): 'development' | 'staging' | 'production' {
  const env = process.env.NODE_ENV?.toLowerCase();
  if (env === 'production') return 'production';
  if (env === 'staging') return 'staging';
  return 'development';
}

export default productionConfig;
