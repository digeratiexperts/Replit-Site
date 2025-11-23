# 🚚 Shipping API Reference

## Quick Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/portal/shipping/track/:trackingNumber` | GET | Track a shipment |
| `/api/portal/shipping/rates` | POST | Get shipping rates |
| `/api/portal/shipping/label` | POST | Create shipping label |
| `/api/portal/shipping/shipments` | GET | List client shipments |
| `/api/portal/admin/shipping/carriers` | GET/POST | Manage carriers |
| `/api/portal/admin/shipping/test-carrier` | POST | Test carrier connection |
| `/api/portal/admin/shipping/rates-cache` | GET | View cache stats |

---

## Detailed Endpoints

### 1. Track Shipment
```
GET /api/portal/shipping/track/:trackingNumber?carrier=fedex
```

**Parameters:**
- `trackingNumber` (required, path): Tracking number
- `carrier` (optional, query): Carrier name (usps, fedex, ups)

**Response:**
```json
{
  "trackingNumber": "7921903284",
  "carrier": "fedex",
  "status": "in_transit",
  "location": "Memphis Hub, TN",
  "estimatedDelivery": "2025-11-24T18:00:00Z",
  "lastUpdate": "2025-11-23T14:30:00Z",
  "events": [
    {
      "timestamp": "2025-11-22T08:15:00Z",
      "status": "picked_up",
      "location": "Phoenix, AZ",
      "description": "Picked up from sender"
    },
    {
      "timestamp": "2025-11-23T10:45:00Z",
      "status": "in_transit",
      "location": "Memphis Hub, TN",
      "description": "In transit to destination"
    }
  ]
}
```

**Status Values:**
- `picked_up` - Package picked up
- `in_transit` - On the way
- `out_for_delivery` - Out for delivery
- `delivered` - Delivered
- `exception` - Delivery exception
- `returned` - Returned to sender

---

### 2. Get Shipping Rates
```
POST /api/portal/shipping/rates
```

**Request Body:**
```json
{
  "fromZip": "85001",
  "toZip": "90210",
  "weight": 2.5
}
```

**Response:**
```json
{
  "rates": [
    {
      "carrier": "usps",
      "service": "Priority Mail",
      "cost": 15.95,
      "estimatedDays": 1,
      "currency": "USD"
    },
    {
      "carrier": "usps",
      "service": "Ground Advantage",
      "cost": 8.50,
      "estimatedDays": 3,
      "currency": "USD"
    },
    {
      "carrier": "fedex",
      "service": "FedEx Overnight",
      "cost": 35.50,
      "estimatedDays": 1,
      "currency": "USD"
    },
    {
      "carrier": "fedex",
      "service": "FedEx 2Day",
      "cost": 24.99,
      "estimatedDays": 2,
      "currency": "USD"
    },
    {
      "carrier": "fedex",
      "service": "FedEx Ground",
      "cost": 12.75,
      "estimatedDays": 5,
      "currency": "USD"
    },
    {
      "carrier": "ups",
      "service": "Next Day Air",
      "cost": 38.99,
      "estimatedDays": 1,
      "currency": "USD"
    },
    {
      "carrier": "ups",
      "service": "2nd Day Air",
      "cost": 26.50,
      "estimatedDays": 2,
      "currency": "USD"
    },
    {
      "carrier": "ups",
      "service": "Ground",
      "cost": 14.25,
      "estimatedDays": 5,
      "currency": "USD"
    }
  ]
}
```

**Service Names by Carrier:**

**USPS:**
- Priority Mail (1-3 days)
- Priority Mail Express (1-2 days)
- Ground Advantage (1-5 days)

**FedEx:**
- Overnight (1 day)
- 2Day (2 days)
- Ground (3-5 days)

**UPS:**
- Next Day Air (1 day)
- 2nd Day Air (2 days)
- Ground (3-5 days)

---

### 3. Create Shipping Label
```
POST /api/portal/shipping/label
```

**Request Body:**
```json
{
  "carrier": "fedex",
  "service": "FedEx 2Day",
  "fromZip": "85001",
  "toZip": "90210",
  "weight": 2.5,
  "fromAddress": "123 Main St, Phoenix, AZ 85001",
  "toAddress": "456 Oak Ave, Los Angeles, CA 90210"
}
```

**Response:**
```json
{
  "success": true,
  "trackingNumber": "7921903284",
  "carrier": "fedex",
  "service": "FedEx 2Day",
  "labelUrl": "https://example.com/labels/label.pdf",
  "labelFormat": "4x6",
  "cost": 24.99,
  "message": "Shipping label created successfully"
}
```

**Label Formats:**
- `4x6` - Standard thermal label
- `8x11` - Letter size
- `pdf` - PDF format
- `png` - Image format
- `zpl` - Zebra printer format

---

### 4. Get Client Shipments
```
GET /api/portal/shipping/shipments?clientId=abc123
```

**Response:**
```json
{
  "shipments": [
    {
      "id": "ship-001",
      "shipmentNumber": "SHP-2025-001",
      "carrier": "fedex",
      "trackingNumber": "7921903284",
      "status": "in_transit",
      "cost": 24.99,
      "createdAt": "2025-11-21T10:00:00Z",
      "estimatedDelivery": "2025-11-24T18:00:00Z"
    },
    {
      "id": "ship-002",
      "shipmentNumber": "SHP-2025-002",
      "carrier": "usps",
      "trackingNumber": "9400111899223456789012",
      "status": "delivered",
      "cost": 15.95,
      "createdAt": "2025-11-18T14:30:00Z",
      "deliveredAt": "2025-11-22T16:45:00Z"
    }
  ]
}
```

---

### 5. Configure Carriers (Admin)
```
POST /api/portal/admin/shipping/carriers
```

**Request Body:**
```json
{
  "carrierName": "fedex",
  "accountId": "987654321",
  "apiKey": "your_fedex_api_key",
  "apiSecret": "optional_secret",
  "testMode": false
}
```

**Response:**
```json
{
  "success": true,
  "carrier": {
    "id": "carrier-fedex",
    "carrierName": "fedex",
    "accountId": "987654321",
    "isActive": true,
    "testMode": false,
    "createdAt": "2025-11-23T19:00:00Z"
  },
  "message": "FEDEX carrier configured successfully"
}
```

---

### 6. Get Configured Carriers (Admin)
```
GET /api/portal/admin/shipping/carriers
```

**Response:**
```json
{
  "carriers": [
    {
      "id": "carrier-usps",
      "carrierName": "usps",
      "accountId": "12345678",
      "isActive": true,
      "testMode": false,
      "lastValidated": "2025-11-23T18:30:00Z"
    },
    {
      "id": "carrier-fedex",
      "carrierName": "fedex",
      "accountId": "987654321",
      "isActive": true,
      "testMode": false,
      "lastValidated": "2025-11-23T19:00:00Z"
    },
    {
      "id": "carrier-ups",
      "carrierName": "ups",
      "accountId": "556677889",
      "isActive": true,
      "testMode": true,
      "lastValidated": "2025-11-23T19:15:00Z"
    }
  ]
}
```

---

### 7. Test Carrier Connection (Admin)
```
POST /api/portal/admin/shipping/test-carrier
```

**Request Body:**
```json
{
  "carrierName": "fedex",
  "accountId": "987654321",
  "apiKey": "your_fedex_api_key"
}
```

**Response:**
```json
{
  "success": true,
  "carrier": "fedex",
  "status": "connected",
  "message": "Successfully connected to FEDEX"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid API key",
  "message": "Failed to connect to FEDEX"
}
```

---

### 8. View Rates Cache (Admin)
```
GET /api/portal/admin/shipping/rates-cache
```

**Response:**
```json
{
  "cached_rates": 1247,
  "memory_usage": "2.3 MB",
  "oldest_entry": "2025-11-16T14:00:00Z",
  "newest_entry": "2025-11-23T19:05:00Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Missing required fields",
  "details": "fromZip, toZip, weight required"
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "message": "Shipment not found"
}
```

### 500 Server Error
```json
{
  "message": "Failed to get shipping rates",
  "error": "Carrier API error"
}
```

---

## Rate Limiting

All shipping endpoints are rate limited:
- **User endpoints**: 100 requests/hour
- **Admin endpoints**: 50 requests/hour
- **Tracking**: 200 requests/hour

---

## Authentication

All endpoints require bearer token:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Admin-only endpoints:
- `/api/portal/admin/shipping/carriers` (GET/POST)
- `/api/portal/admin/shipping/test-carrier`
- `/api/portal/admin/shipping/rates-cache`

---

## Common Workflows

### Workflow 1: Get Quote & Ship
```bash
# 1. Get rates
curl -X POST /api/portal/shipping/rates \
  -d '{"fromZip": "85001", "toZip": "90210", "weight": 2.5}'

# 2. Create label for cheapest option
curl -X POST /api/portal/shipping/label \
  -d '{"carrier": "usps", "service": "Ground Advantage", ...}'

# 3. Track shipment
curl -X GET /api/portal/shipping/track/TRK1234567890 \
  -d 'carrier=usps'
```

### Workflow 2: Admin Setup
```bash
# 1. Configure all carriers
curl -X POST /api/portal/admin/shipping/carriers \
  -d '{"carrierName": "usps", ...}'

# 2. Test connections
curl -X POST /api/portal/admin/shipping/test-carrier \
  -d '{"carrierName": "usps", ...}'

# 3. Monitor cache
curl -X GET /api/portal/admin/shipping/rates-cache
```

---

## Performance Tips

1. **Cache rates** - Rates expire in 30 minutes
2. **Batch requests** - Get multiple quotes at once
3. **Use test mode** - Don't incur charges during development
4. **Monitor cache** - Keep cache under 5MB for best performance
5. **Validate input** - Validate addresses before label creation

---

## Support

For API issues:
- Check rate limiting status
- Verify API credentials
- Test carrier connection
- Review logs at `/api/portal/admin/shipping`

For carrier-specific issues:
- USPS: https://www.usps.com/business/web-tools-apis/
- FedEx: https://developer.fedex.com/
- UPS: https://www.ups.com/upsdeveloperkit
