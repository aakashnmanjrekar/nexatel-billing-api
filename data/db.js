/**
 * NexaTel Connect – Mock Billing Database
 * 
 * Simulates a telecom billing system for the Sprinklr Invoice Explanation Bot.
 * Covers all 5 intent types: Invoice_Simple, Invoice_Comparative,
 * Invoice_LineItem, Invoice_History, Out_of_Scope.
 *
 * Each customer has a consistent invoice history with realistic deltas
 * so comparative queries return meaningful explanations.
 */

// ─── Customer Master ───────────────────────────────────────────────────────────
const customers = {
  "NXT-001": {
    account_id: "NXT-001",
    name: "Sophie Dubois",
    email: "sophie.dubois@email.com",
    mobile: "0612345678",
    plan: "NexaTel Premium",
    currency: "EUR"
  },
  "NXT-002": {
    account_id: "NXT-002",
    name: "James Okafor",
    email: "james.okafor@email.com",
    mobile: "0623456789",
    plan: "NexaTel Standard",
    currency: "EUR"
  },
  "NXT-003": {
    account_id: "NXT-003",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    mobile: "0634567890",
    plan: "NexaTel Basic",
    currency: "EUR"
  },
  "NXT-004": {
    account_id: "NXT-004",
    name: "Carlos Mendes",
    email: "carlos.mendes@email.com",
    mobile: "0645678901",
    plan: "NexaTel Business",
    currency: "EUR"
  },
  "NXT-005": {
    account_id: "NXT-005",
    name: "Aisha Al-Rashid",
    email: "aisha.alrashid@email.com",
    mobile: "0656789012",
    plan: "NexaTel Standard",
    currency: "EUR"
  }
};

// ─── Invoice History ────────────────────────────────────────────────────────────
// Format: invoices[account_id][YYYY-MM] = invoice object
// Line item categories match the Explanation Mapping Table in the HLD doc.

const invoices = {

  // ── NXT-001: Sophie – bill spike due to international calls (classic Invoice_Comparative scenario)
  "NXT-001": {
    "2026-05": {
      account_id: "NXT-001",
      billing_period: "2026-05",
      total_amount: 85.40,
      currency: "EUR",
      due_date: "2026-06-15",
      status: "Due",
      line_items: [
        { category: "Base Plan",           description: "NexaTel Premium monthly subscription",   amount: 29.99 },
        { category: "International Calls", description: "International calls – 142 minutes",      amount: 32.50 },
        { category: "Data",                description: "Mobile data – 18 GB used (15 GB plan)",  amount: 15.00 },
        { category: "Taxes & Fees",        description: "VAT and regulatory fees",                 amount: 7.91 }
      ]
    },
    "2026-04": {
      account_id: "NXT-001",
      billing_period: "2026-04",
      total_amount: 47.90,
      currency: "EUR",
      due_date: "2026-05-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Premium monthly subscription", amount: 29.99 },
        { category: "Data",         description: "Mobile data – 14 GB used (15 GB plan)", amount: 12.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 5.91 }
      ]
    },
    "2026-03": {
      account_id: "NXT-001",
      billing_period: "2026-03",
      total_amount: 51.20,
      currency: "EUR",
      due_date: "2026-04-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Premium monthly subscription", amount: 29.99 },
        { category: "Data",         description: "Mobile data – 15 GB used (15 GB plan)", amount: 15.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 6.21 }
      ]
    },
    "2026-02": {
      account_id: "NXT-001",
      billing_period: "2026-02",
      total_amount: 48.30,
      currency: "EUR",
      due_date: "2026-03-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Premium monthly subscription", amount: 29.99 },
        { category: "Data",         description: "Mobile data – 12 GB used (15 GB plan)", amount: 12.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 6.31 }
      ]
    },
    "2026-01": {
      account_id: "NXT-001",
      billing_period: "2026-01",
      total_amount: 46.10,
      currency: "EUR",
      due_date: "2026-02-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Premium monthly subscription", amount: 29.99 },
        { category: "Data",         description: "Mobile data – 11 GB used (15 GB plan)", amount: 10.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 6.11 }
      ]
    }
  },

  // ── NXT-002: James – roaming charge spike
  "NXT-002": {
    "2026-05": {
      account_id: "NXT-002",
      billing_period: "2026-05",
      total_amount: 72.15,
      currency: "EUR",
      due_date: "2026-06-15",
      status: "Due",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Roaming",      description: "EU roaming – 8 days active",            amount: 38.00 },
        { category: "Data",         description: "Mobile data – 9 GB used (10 GB plan)",  amount: 8.50 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 5.66 }
      ]
    },
    "2026-04": {
      account_id: "NXT-002",
      billing_period: "2026-04",
      total_amount: 31.80,
      currency: "EUR",
      due_date: "2026-05-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 8 GB used (10 GB plan)",  amount: 8.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.81 }
      ]
    },
    "2026-03": {
      account_id: "NXT-002",
      billing_period: "2026-03",
      total_amount: 33.20,
      currency: "EUR",
      due_date: "2026-04-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 10 GB used (10 GB plan)", amount: 9.50 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.71 }
      ]
    },
    "2026-02": {
      account_id: "NXT-002",
      billing_period: "2026-02",
      total_amount: 28.50,
      currency: "EUR",
      due_date: "2026-03-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 7 GB used (10 GB plan)",  amount: 5.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.51 }
      ]
    },
    "2026-01": {
      account_id: "NXT-002",
      billing_period: "2026-01",
      total_amount: 29.80,
      currency: "EUR",
      due_date: "2026-02-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 8 GB used (10 GB plan)",  amount: 6.50 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.31 }
      ]
    }
  },

  // ── NXT-003: Priya – data overage charge
  "NXT-003": {
    "2026-05": {
      account_id: "NXT-003",
      billing_period: "2026-05",
      total_amount: 44.75,
      currency: "EUR",
      due_date: "2026-06-15",
      status: "Due",
      line_items: [
        { category: "Base Plan",      description: "NexaTel Basic monthly subscription",    amount: 9.99 },
        { category: "Data Overage",   description: "Extra data – 3 GB over 5 GB limit",    amount: 18.00 },
        { category: "Data",           description: "Mobile data – 5 GB included in plan",   amount: 9.00 },
        { category: "SMS Bundle",     description: "Extra SMS – 47 messages over bundle",   amount: 4.70 },
        { category: "Taxes & Fees",   description: "VAT and regulatory fees",                amount: 3.06 }
      ]
    },
    "2026-04": {
      account_id: "NXT-003",
      billing_period: "2026-04",
      total_amount: 16.80,
      currency: "EUR",
      due_date: "2026-05-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Basic monthly subscription",  amount: 9.99 },
        { category: "Data",         description: "Mobile data – 4 GB used (5 GB plan)", amount: 4.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",              amount: 2.81 }
      ]
    },
    "2026-03": {
      account_id: "NXT-003",
      billing_period: "2026-03",
      total_amount: 15.50,
      currency: "EUR",
      due_date: "2026-04-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Basic monthly subscription",  amount: 9.99 },
        { category: "Data",         description: "Mobile data – 3 GB used (5 GB plan)", amount: 3.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",              amount: 2.51 }
      ]
    },
    "2026-02": {
      account_id: "NXT-003",
      billing_period: "2026-02",
      total_amount: 14.90,
      currency: "EUR",
      due_date: "2026-03-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Basic monthly subscription",  amount: 9.99 },
        { category: "Data",         description: "Mobile data – 2 GB used (5 GB plan)", amount: 2.50 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",              amount: 2.41 }
      ]
    },
    "2026-01": {
      account_id: "NXT-003",
      billing_period: "2026-01",
      total_amount: 15.20,
      currency: "EUR",
      due_date: "2026-02-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Basic monthly subscription",  amount: 9.99 },
        { category: "Data",         description: "Mobile data – 3 GB used (5 GB plan)", amount: 3.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",              amount: 2.21 }
      ]
    }
  },

  // ── NXT-004: Carlos – plan upgrade + late payment fee
  "NXT-004": {
    "2026-05": {
      account_id: "NXT-004",
      billing_period: "2026-05",
      total_amount: 98.60,
      currency: "EUR",
      due_date: "2026-06-15",
      status: "Due",
      line_items: [
        { category: "Base Plan",         description: "NexaTel Business monthly subscription (upgraded)", amount: 59.99 },
        { category: "International Calls", description: "International calls – 68 minutes",               amount: 15.50 },
        { category: "Data",              description: "Mobile data – 28 GB used (30 GB plan)",             amount: 14.00 },
        { category: "Late Payment Fee",  description: "Late payment fee – April invoice settled after due date", amount: 5.00 },
        { category: "Taxes & Fees",      description: "VAT and regulatory fees",                           amount: 4.11 }
      ]
    },
    "2026-04": {
      account_id: "NXT-004",
      billing_period: "2026-04",
      total_amount: 61.30,
      currency: "EUR",
      due_date: "2026-05-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 39.99 },
        { category: "Data",         description: "Mobile data – 18 GB used (20 GB plan)", amount: 16.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 5.31 }
      ]
    },
    "2026-03": {
      account_id: "NXT-004",
      billing_period: "2026-03",
      total_amount: 58.90,
      currency: "EUR",
      due_date: "2026-04-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 39.99 },
        { category: "Data",         description: "Mobile data – 15 GB used (20 GB plan)", amount: 13.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 5.91 }
      ]
    },
    "2026-02": {
      account_id: "NXT-004",
      billing_period: "2026-02",
      total_amount: 55.40,
      currency: "EUR",
      due_date: "2026-03-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 39.99 },
        { category: "Data",         description: "Mobile data – 12 GB used (20 GB plan)", amount: 10.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 5.41 }
      ]
    },
    "2026-01": {
      account_id: "NXT-004",
      billing_period: "2026-01",
      total_amount: 54.10,
      currency: "EUR",
      due_date: "2026-02-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 39.99 },
        { category: "Data",         description: "Mobile data – 11 GB used (20 GB plan)", amount: 9.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 5.11 }
      ]
    }
  },

  // ── NXT-005: Aisha – stable bill (no-delta scenario for TC-006)
  "NXT-005": {
    "2026-05": {
      account_id: "NXT-005",
      billing_period: "2026-05",
      total_amount: 29.40,
      currency: "EUR",
      due_date: "2026-06-15",
      status: "Due",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 8 GB used (10 GB plan)",  amount: 6.00 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.41 }
      ]
    },
    "2026-04": {
      account_id: "NXT-005",
      billing_period: "2026-04",
      total_amount: 28.90,
      currency: "EUR",
      due_date: "2026-05-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 7 GB used (10 GB plan)",  amount: 5.60 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.31 }
      ]
    },
    "2026-03": {
      account_id: "NXT-005",
      billing_period: "2026-03",
      total_amount: 29.10,
      currency: "EUR",
      due_date: "2026-04-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 8 GB used (10 GB plan)",  amount: 5.80 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.31 }
      ]
    },
    "2026-02": {
      account_id: "NXT-005",
      billing_period: "2026-02",
      total_amount: 28.60,
      currency: "EUR",
      due_date: "2026-03-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 6 GB used (10 GB plan)",  amount: 5.30 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.31 }
      ]
    },
    "2026-01": {
      account_id: "NXT-005",
      billing_period: "2026-01",
      total_amount: 27.90,
      currency: "EUR",
      due_date: "2026-02-15",
      status: "Paid",
      line_items: [
        { category: "Base Plan",    description: "NexaTel Standard monthly subscription", amount: 19.99 },
        { category: "Data",         description: "Mobile data – 5 GB used (10 GB plan)",  amount: 4.60 },
        { category: "Taxes & Fees", description: "VAT and regulatory fees",                amount: 3.31 }
      ]
    }
  }
};

// ─── Mobile Number → Account ID lookup ──────────────────────────────────────────
const mobileIndex = Object.fromEntries(
  Object.values(customers).map(c => [c.mobile, c.account_id])
);

module.exports = { customers, invoices, mobileIndex };
