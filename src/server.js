/**
 * NexaTel Connect – Mock Billing API
 * 
 * REST API that simulates a telecom billing system for the
 * Sprinklr Invoice Explanation Bot (Accenture implementation).
 *
 * Endpoints match the Webhook design in the HLD doc exactly:
 *   GET /billing/v1/invoices/:account_id                          → current invoice
 *   GET /billing/v1/invoices/:account_id?month=&year=             → specific month
 *   GET /billing/v1/invoices/:account_id?from=&to=                → date range
 *   GET /billing/v1/invoices/:account_id/lineitems?month=&year=   → line item detail
 *   GET /billing/v1/customers/:account_id                         → account lookup
 *   GET /billing/v1/lookup?mobile=                                → mobile → account
 *
 * NEW – Mobile-first endpoint (v2):
 *   GET /billing/v1/customer/invoice?mobile=&month=&year=         → name + invoice by mobile
 *
 * Auth: API key via X-API-Key header or ?api_key= query param
 */

const express = require("express");
const cors = require("cors");
const { customers, invoices, mobileIndex } = require("../data/db");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── API Key Auth ───────────────────────────────────────────────────────────────
const VALID_API_KEYS = new Set([
  process.env.API_KEY || "nexatel-sprinklr-dev-key-2026",
  "nexatel-test-key"   // secondary key for test environment
]);

function authenticate(req, res, next) {
  const key = req.headers["x-api-key"] || req.query.api_key;
  if (!key || !VALID_API_KEYS.has(key)) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Valid API key required. Pass via X-API-Key header or api_key query param."
    });
  }
  next();
}

// ─── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Helpers ────────────────────────────────────────────────────────────────────
function getCurrentPeriod() {
  // Fixed to May 2026 — the spike month for all demo customers.
  // The DB contains data through 2026-05 only; using real current date
  // would return a 404 for any month beyond May 2026.
  return "2026-05";
}

function getPreviousPeriod(period, monthsBack = 1) {
  const [year, month] = period.split("-").map(Number);
  const d = new Date(year, month - 1 - monthsBack, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getPeriodsInRange(from, to) {
  const periods = [];
  const [fy, fm] = from.split("-").map(Number);
  const [ty, tm] = to.split("-").map(Number);
  let year = fy, month = fm;
  while (year < ty || (year === ty && month <= tm)) {
    periods.push(`${year}-${String(month).padStart(2, "0")}`);
    month++;
    if (month > 12) { month = 1; year++; }
  }
  return periods;
}

function invoiceNotFound(account_id, period, res) {
  return res.status(404).json({
    error: "Invoice not found",
    account_id,
    billing_period: period,
    message: `No invoice found for account ${account_id} for period ${period}.`
  });
}

// ─── Health Check (no auth needed) ─────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "NexaTel Mock Billing API",
    version: "2.0.0",
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.json({
    service: "NexaTel Connect – Mock Billing API",
    version: "2.0.0",
    description: "Simulated telecom billing API for Sprinklr Invoice Explanation Bot",
    docs: "/docs",
    endpoints: [
      "GET /billing/v1/customer/invoice?mobile=&month=&year=  ← NEW: mobile-first",
      "GET /billing/v1/customers/:account_id",
      "GET /billing/v1/lookup?mobile=:mobile",
      "GET /billing/v1/invoices/:account_id",
      "GET /billing/v1/invoices/:account_id?month=&year=",
      "GET /billing/v1/invoices/:account_id?from=&to=",
      "GET /billing/v1/invoices/:account_id/lineitems",
      "GET /billing/v1/invoices/:account_id/lineitems?month=&year="
    ],
    auth: "X-API-Key header or ?api_key= query param",
    test_key: "nexatel-test-key"
  });
});

// ─── NEW: Mobile-First Unified Endpoint ─────────────────────────────────────────
// GET /billing/v1/customer/invoice?mobile=&month=&year=
// GET /billing/v1/customer/invoice?mobile=&from=YYYY-MM&to=YYYY-MM
// Returns customer name + full invoice in a single call.
// Supports single month fetch (month+year or default) and range fetch (from+to).
app.get("/billing/v1/customer/invoice", authenticate, (req, res) => {
  const { mobile, month, year, from, to } = req.query;

  if (!mobile) {
    return res.status(400).json({ error: "Missing required query param: mobile" });
  }

  // Step 1: resolve mobile → account_id
  const account_id = mobileIndex[mobile];
  if (!account_id) {
    return res.status(404).json({
      error: "No account found for this mobile number",
      mobile
    });
  }

  // Step 2: fetch customer name & plan
  const customer = customers[account_id];

  // Step 3: range fetch (from + to)
  if (from && to) {
    const periods = getPeriodsInRange(from, to);
    const results = periods
      .map(p => invoices[account_id]?.[p])
      .filter(Boolean);

    if (results.length === 0) {
      return res.status(404).json({
        error: "No invoices found in range",
        account_id,
        from,
        to
      });
    }

    return res.json({
      name: customer.name,
      mobile: customer.mobile,
      plan: customer.plan,
      account_id: customer.account_id,
      currency: customer.currency,
      from,
      to,
      invoice_count: results.length,
      invoices: results
    });
  }

  // Step 4: single month fetch
  let period;
  if (month && year) {
    period = `${year}-${String(month).padStart(2, "0")}`;
  } else if (month && month.includes("-")) {
    period = month; // accept YYYY-MM directly
  } else {
    period = getCurrentPeriod();
  }

  // Step 5: fetch invoice
  const invoice = invoices[account_id]?.[period];
  if (!invoice) {
    return invoiceNotFound(account_id, period, res);
  }

  // Step 6: return everything in one response
  res.json({
    name: customer.name,
    mobile: customer.mobile,
    plan: customer.plan,
    account_id: customer.account_id,
    billing_period: invoice.billing_period,
    total_amount: invoice.total_amount,
    currency: invoice.currency,
    line_items: invoice.line_items
  });
});

// ─── Customer Lookup (used during bot auth) ─────────────────────────────────────
// GET /billing/v1/customers/:account_id
app.get("/billing/v1/customers/:account_id", authenticate, (req, res) => {
  const { account_id } = req.params;
  const customer = customers[account_id.toUpperCase()];
  if (!customer) {
    return res.status(404).json({
      error: "Customer not found",
      account_id,
      message: `No customer found with account ID ${account_id}.`
    });
  }
  res.json({
    account_id: customer.account_id,
    name: customer.name,
    plan: customer.plan,
    currency: customer.currency
  });
});

// GET /billing/v1/lookup?mobile=:mobile
app.get("/billing/v1/lookup", authenticate, (req, res) => {
  const { mobile } = req.query;
  if (!mobile) {
    return res.status(400).json({ error: "Missing required query param: mobile" });
  }
  const account_id = mobileIndex[mobile];
  if (!account_id) {
    return res.status(404).json({
      error: "No account found for this mobile number",
      mobile
    });
  }
  res.json({ account_id, mobile });
});

// ─── Invoice Endpoints ──────────────────────────────────────────────────────────

app.get("/billing/v1/invoices/:account_id", authenticate, (req, res) => {
  const account_id = req.params.account_id.toUpperCase();
  const { month, year, from, to } = req.query;

  if (!customers[account_id]) {
    return res.status(404).json({ error: "Customer not found", account_id });
  }

  // Range fetch
  if (from && to) {
    const periods = getPeriodsInRange(from, to);
    const results = periods
      .map(p => invoices[account_id]?.[p])
      .filter(Boolean);

    if (results.length === 0) {
      return res.status(404).json({
        error: "No invoices found in range",
        account_id,
        from,
        to
      });
    }
    return res.json({
      account_id,
      from,
      to,
      invoice_count: results.length,
      invoices: results
    });
  }

  // Specific month or current
  let period;
  if (month && year) {
    period = `${year}-${String(month).padStart(2, "0")}`;
  } else if (month && month.includes("-")) {
    period = month;
  } else {
    period = getCurrentPeriod();
  }

  const invoice = invoices[account_id]?.[period];
  if (!invoice) {
    return invoiceNotFound(account_id, period, res);
  }

  res.json(invoice);
});

app.get("/billing/v1/invoices/:account_id/lineitems", authenticate, (req, res) => {
  const account_id = req.params.account_id.toUpperCase();
  const { month, year, charge_type } = req.query;

  if (!customers[account_id]) {
    return res.status(404).json({ error: "Customer not found", account_id });
  }

  let period;
  if (month && year) {
    period = `${year}-${String(month).padStart(2, "0")}`;
  } else if (month && month.includes("-")) {
    period = month;
  } else {
    period = getCurrentPeriod();
  }

  const invoice = invoices[account_id]?.[period];
  if (!invoice) {
    return invoiceNotFound(account_id, period, res);
  }

  const line_items = invoice.line_items;
  res.json({
    account_id,
    billing_period: period,
    total_amount: invoice.total_amount,
    currency: invoice.currency,
    line_items
  });
});

// ─── 404 Catch-all ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.path,
    available_endpoints: [
      "GET /health",
      "GET /billing/v1/customer/invoice?mobile=&month=&year=",
      "GET /billing/v1/customers/:account_id",
      "GET /billing/v1/lookup?mobile=",
      "GET /billing/v1/invoices/:account_id",
      "GET /billing/v1/invoices/:account_id/lineitems"
    ]
  });
});

// ─── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`NexaTel Billing API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
