# Digerati Experts - CyberPanel/OpenLiteSpeed Deployment Guide

## Overview

This guide covers deploying the Digerati Experts MSP Portal to a CyberPanel server with OpenLiteSpeed.

## Prerequisites

- CyberPanel with OpenLiteSpeed installed
- Node.js 18+ installed on server
- PostgreSQL database (local or remote)
- Domain configured: `digeratiexperts.com` and `portal.digeratiexperts.com`

## Environment Variables

Create a `.env` file or set these in CyberPanel's environment configuration:

```bash
# Required
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/digerati_experts

# Security (REQUIRED - Generate secure values!)
JWT_SECRET=your-secure-jwt-secret-min-32-chars
SESSION_SECRET=your-secure-session-secret

# Stripe Integration
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# OpenAI Integration (optional)
OPENAI_API_KEY=sk-xxxxx
OPENAI_BASE_URL=https://api.openai.com/v1

# Zoho Integration
ZOHO_CLIENT_ID=your-zoho-client-id
ZOHO_CLIENT_SECRET=your-zoho-client-secret

# Domain Configuration
MAIN_DOMAIN=digeratiexperts.com
PORTAL_DOMAIN=portal.digeratiexperts.com
ALLOWED_ORIGINS=https://digeratiexperts.com,https://portal.digeratiexperts.com
```

## Database Setup

### Option 1: External PostgreSQL (Recommended)

1. Create a PostgreSQL database:
```sql
CREATE DATABASE digerati_experts;
CREATE USER digerati_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE digerati_experts TO digerati_user;
```

2. Update `DATABASE_URL` with your connection string

3. Run migrations:
```bash
npm run db:push
```

### Option 2: Local PostgreSQL on CyberPanel

1. Install PostgreSQL:
```bash
apt install postgresql postgresql-contrib
```

2. Configure and create database as above

## Build & Deploy

### Step 1: Clone Repository

```bash
cd /home/digeratiexperts/public_html
git clone <your-repo> .
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build Production Bundle

```bash
npm run build
```

### Step 4: Database Migration

```bash
npm run db:push
```

### Step 5: Start Application

Using PM2 (recommended):
```bash
npm install -g pm2
pm2 start npm --name "digerati" -- start
pm2 save
pm2 startup
```

## OpenLiteSpeed Configuration

### Main Website (digeratiexperts.com)

Create a `.htaccess` or configure via CyberPanel:

```apache
RewriteEngine On

# Handle client-side routing (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(?!api/)(.*)$ /index.html [L]

# Proxy API requests to Node.js
RewriteRule ^api/(.*)$ http://127.0.0.1:5000/api/$1 [P,L]
```

### Portal Subdomain (portal.digeratiexperts.com)

Configure in CyberPanel:
1. Create subdomain pointing to same directory
2. Add proxy configuration for `/portal` routes

### OpenLiteSpeed Context Configuration

In OpenLiteSpeed Admin → Virtual Hosts → Your Site → Context:

```
Type: Proxy
URI: /api/
Web Server: [PROXY_SETTINGS]
  Name: Node Backend
  Address: http://127.0.0.1:5000
```

## SSL/TLS Configuration

1. In CyberPanel, navigate to SSL → Issue SSL
2. Select both domains
3. Issue Let's Encrypt certificates

## Health Checks

The application provides health check endpoints:

- `/api/health` - Comprehensive status with service details
- `/healthz` - Simple OK response for load balancers
- `/ready` - Readiness check

## Monitoring

### PM2 Monitoring

```bash
pm2 monit
pm2 logs digerati
```

### Application Logs

Check the application health:
```bash
curl http://localhost:5000/api/health
```

## Troubleshooting

### Database Connection Issues

1. Verify DATABASE_URL is correct
2. Check PostgreSQL is running: `systemctl status postgresql`
3. Test connection: `psql $DATABASE_URL`

### Application Won't Start

1. Check logs: `pm2 logs digerati`
2. Verify Node.js version: `node --version` (must be 18+)
3. Rebuild: `npm run build`

### OpenLiteSpeed Proxy Errors

1. Restart OpenLiteSpeed: `systemctl restart lsws`
2. Check proxy configuration in admin panel
3. Verify Node.js app is running on port 5000

## Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET and SESSION_SECRET
- [ ] Configure HTTPS-only cookies
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Configure backup strategy
- [ ] Set up monitoring/alerting

## Support

For deployment assistance, contact the development team.
