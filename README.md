# NexaTel Connect – Mock Billing API

A lightweight REST API that simulates a telecom billing system for the **Sprinklr Invoice Explanation Bot**. Designed to be the external endpoint Sprinklr Webhooks call in place of a real billing system.

---

## 📁 Project Structure

```
nexatel-billing-api/
├── src/
│   └── server.js        ← Express API (all endpoints)
├── data/
│   └── db.js            ← In-memory database (5 customers, 5 months history)
├── package.json
└── README.md
```

---

## 🗄️ Database: Simulated Customers

| Account ID | Customer        | Plan                | Bill Scenario                    |
|------------|-----------------|---------------------|----------------------------------|
| NXT-001    | Sophie Dubois   | NexaTel Premium     | International calls spike        |
| NXT-002    | James Okafor    | NexaTel Standard    | Roaming charge spike             |
| NXT-003    | Priya Sharma    | NexaTel Basic       | Data overage + SMS bundle        |
| NXT-004    | Carlos Mendes   | NexaTel Business    | Plan upgrade + late payment fee  |
| NXT-005    | Aisha Al-Rashid | NexaTel Standard    | Stable bill (no delta scenario)  |

Each customer has 5 months of invoice history (Jan–May 2026).

---

## 🔐 Authentication

Pass the API key in every request:
- **Header**: `X-API-Key: nexatel-test-key`
- **Query param**: `?api_key=nexatel-test-key`

| Key                             | Environment |
|---------------------------------|-------------|
| `nexatel-test-key`              | Test/Demo   |
| `nexatel-sprinklr-dev-key-2026` | Sandbox     |
| Set `API_KEY` env var           | Production  |

---

## 📡 API Endpoints

### Health Check (no auth)
```
GET /health
GET /
```

### Customer Lookup
```
GET /billing/v1/customers/:account_id
GET /billing/v1/lookup?mobile=0612345678
```

### Invoice Endpoints

| Webhook Name (from HLD)       | HTTP Call |
|-------------------------------|-----------|
| `WH_Fetch_Current_Invoice`    | `GET /billing/v1/invoices/NXT-001` |
| `WH_Fetch_Previous_Invoice`   | `GET /billing/v1/invoices/NXT-001?month=04&year=2026` |
| `WH_Fetch_Invoice_Range`      | `GET /billing/v1/invoices/NXT-001?from=2026-01&to=2026-03` |
| `WH_Fetch_LineItem_Detail`    | `GET /billing/v1/invoices/NXT-001/lineitems?charge_type=International%20Calls` |

---

## 🚀 Deployment

### Option 1: Render (Recommended – free tier available)

1. Push this folder to a GitHub repo (e.g. `nexatel-billing-api`)
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add environment variable:
   - `API_KEY` = `nexatel-sprinklr-dev-key-2026`
6. Deploy → copy the URL (e.g. `https://nexatel-billing-api.onrender.com`)

**Free tier note**: Render spins down after 15 mins of inactivity. First request after idle takes ~30s. Upgrade to Starter ($7/mo) for always-on.

---

### Option 2: Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
3. Select repo → Railway auto-detects Node.js
4. Add variable: `API_KEY = nexatel-sprinklr-dev-key-2026`
5. Railway assigns a URL like `nexatel-billing-api.up.railway.app`

---

### Option 3: Local (for initial testing)

```bash
npm install
npm start
# API available at http://localhost:3000
```

Test it:
```bash
curl -H "X-API-Key: nexatel-test-key" http://localhost:3000/billing/v1/invoices/NXT-001
```

---

## 🔧 Sprinklr Webhook Configuration

Once deployed, configure these 4 webhooks in Sprinklr → **Settings → Webhooks**:

### WH_Fetch_Current_Invoice
```
Method: GET
URL:    https://YOUR-DOMAIN/billing/v1/invoices/{{CF_Account_ID}}
Header: X-API-Key: nexatel-sprinklr-dev-key-2026
```
Map response fields to Custom Fields:
- `total_amount` → `CF_Current_Invoice_Amount`
- Full JSON → `CF_Current_Month_Invoice`

### WH_Fetch_Previous_Invoice
```
Method: GET
URL:    https://YOUR-DOMAIN/billing/v1/invoices/{{CF_Account_ID}}?month={{prev_month}}&year={{prev_year}}
Header: X-API-Key: nexatel-sprinklr-dev-key-2026
```
Map response → `CF_Previous_Month_Invoice`

### WH_Fetch_Invoice_Range
```
Method: GET
URL:    https://YOUR-DOMAIN/billing/v1/invoices/{{CF_Account_ID}}?from={{start_period}}&to={{end_period}}
Header: X-API-Key: nexatel-sprinklr-dev-key-2026
```

### WH_Fetch_LineItem_Detail
```
Method: GET
URL:    https://YOUR-DOMAIN/billing/v1/invoices/{{CF_Account_ID}}/lineitems?charge_type={{entity_charge_type}}
Header: X-API-Key: nexatel-sprinklr-dev-key-2026
```

### Customer Lookup (used during OTP auth)
```
Method: GET
URL:    https://YOUR-DOMAIN/billing/v1/lookup?mobile={{verified_mobile}}
Header: X-API-Key: nexatel-sprinklr-dev-key-2026
```
Map `account_id` → `CF_Account_ID`

---

## 🧪 Test Scenarios Coverage

| Test Case | Account | Query Type |
|-----------|---------|------------|
| TC-001: Simple invoice query | NXT-001 | Current month |
| TC-002: Bill higher than usual | NXT-001 | Comparative (intl calls +€32.50) |
| TC-003: Line item – international calls | NXT-001 | LineItem with charge_type |
| TC-006: No significant delta | NXT-005 | Comparative (stable bill) |
| TC-008: Multiple charges increased | NXT-003 | Comparative (data overage + SMS) |
| TC-009: 3-month history | NXT-001 | Range Jan–Mar 2026 |
| Roaming scenario | NXT-002 | Comparative (roaming +€38) |
| Plan upgrade + late fee | NXT-004 | Comparative (plan +€20 + late fee) |

---

## 📋 Response Schema

```json
{
  "account_id": "NXT-001",
  "billing_period": "2026-05",
  "total_amount": 85.40,
  "currency": "EUR",
  "due_date": "2026-06-15",
  "status": "Due",
  "line_items": [
    { "category": "Base Plan",           "description": "...", "amount": 29.99 },
    { "category": "International Calls", "description": "...", "amount": 32.50 },
    { "category": "Data",                "description": "...", "amount": 15.00 },
    { "category": "Taxes & Fees",        "description": "...", "amount": 7.91 }
  ]
}
```

Line item `category` values match the Explanation Mapping Table in the HLD doc exactly:
`Base Plan`, `International Calls`, `Data`, `Data Overage`, `Roaming`, `SMS Bundle`, `Late Payment Fee`, `Plan Upgrade`, `Taxes & Fees`, `Premium Services`
