const customers = {
  "NXT-001": { account_id: "NXT-001", name: "Sophie Dubois",   mobile: "0612345678", plan: "NexaTel Basic",   currency: "EUR" },
  "NXT-002": { account_id: "NXT-002", name: "James Okafor",    mobile: "0623456789", plan: "NexaTel Basic",   currency: "EUR" },
  "NXT-003": { account_id: "NXT-003", name: "Priya Sharma",    mobile: "0634567890", plan: "NexaTel Basic",   currency: "EUR" },
  "NXT-004": { account_id: "NXT-004", name: "Carlos Mendes",   mobile: "0645678901", plan: "NexaTel Premium", currency: "EUR" },
  "NXT-005": { account_id: "NXT-005", name: "Aisha Al-Rashid", mobile: "0656789012", plan: "NexaTel Premium", currency: "EUR" }
};

const invoices = {

  "NXT-001": {
    "2025-12": { account_id: "NXT-001", billing_period: "2025-12", total_amount: 32.10, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 8.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 4.11 }
    ]},
    "2026-01": { account_id: "NXT-001", billing_period: "2026-01", total_amount: 32.20, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 8.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 4.21 }
    ]},
    "2026-02": { account_id: "NXT-001", billing_period: "2026-02", total_amount: 33.40, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 9.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 4.41 }
    ]},
    "2026-03": { account_id: "NXT-001", billing_period: "2026-03", total_amount: 34.50, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 10.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 4.51 }
    ]},
    "2026-04": { account_id: "NXT-001", billing_period: "2026-04", total_amount: 33.30, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 9.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 4.31 }
    ]},
    "2026-05": { account_id: "NXT-001", billing_period: "2026-05", total_amount: 68.70, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 32.50 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 10.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 6.21 }
    ]}
  },

  "NXT-002": {
    "2025-12": { account_id: "NXT-002", billing_period: "2025-12", total_amount: 28.50, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 5.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.51 }
    ]},
    "2026-01": { account_id: "NXT-002", billing_period: "2026-01", total_amount: 29.10, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 5.50 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.61 }
    ]},
    "2026-02": { account_id: "NXT-002", billing_period: "2026-02", total_amount: 27.90, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 4.50 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.41 }
    ]},
    "2026-03": { account_id: "NXT-002", billing_period: "2026-03", total_amount: 29.70, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 6.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.71 }
    ]},
    "2026-04": { account_id: "NXT-002", billing_period: "2026-04", total_amount: 30.30, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 6.50 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.81 }
    ]},
    "2026-05": { account_id: "NXT-002", billing_period: "2026-05", total_amount: 69.90, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 38.00 },
      { category: "Data",              amount: 6.50 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 5.41 }
    ]}
  },

  "NXT-003": {
    "2025-12": { account_id: "NXT-003", billing_period: "2025-12", total_amount: 26.20, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 3.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.21 }
    ]},
    "2026-01": { account_id: "NXT-003", billing_period: "2026-01", total_amount: 26.20, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 3.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.21 }
    ]},
    "2026-02": { account_id: "NXT-003", billing_period: "2026-02", total_amount: 25.60, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 2.50 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.11 }
    ]},
    "2026-03": { account_id: "NXT-003", billing_period: "2026-03", total_amount: 26.20, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 3.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.21 }
    ]},
    "2026-04": { account_id: "NXT-003", billing_period: "2026-04", total_amount: 27.40, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 4.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 3.41 }
    ]},
    "2026-05": { account_id: "NXT-003", billing_period: "2026-05", total_amount: 51.00, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 19.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 4.00 },
      { category: "Data Overage",      amount: 18.00 },
      { category: "SMS Bundle",        amount: 4.70 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 4.31 }
    ]}
  },

  "NXT-004": {
    "2025-12": { account_id: "NXT-004", billing_period: "2025-12", total_amount: 55.80, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 10.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 5.81 }
    ]},
    "2026-01": { account_id: "NXT-004", billing_period: "2026-01", total_amount: 57.10, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 11.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 6.11 }
    ]},
    "2026-02": { account_id: "NXT-004", billing_period: "2026-02", total_amount: 58.40, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 12.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 6.41 }
    ]},
    "2026-03": { account_id: "NXT-004", billing_period: "2026-03", total_amount: 60.80, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 14.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 6.81 }
    ]},
    "2026-04": { account_id: "NXT-004", billing_period: "2026-04", total_amount: 61.50, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 15.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 6.51 }
    ]},
    "2026-05": { account_id: "NXT-004", billing_period: "2026-05", total_amount: 103.90, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 59.99 },
      { category: "International Calls", amount: 15.50 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 14.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 5.00 },
      { category: "Taxes & Fees",      amount: 9.41 }
    ]}
  },

  "NXT-005": {
    "2025-12": { account_id: "NXT-005", billing_period: "2025-12", total_amount: 50.50, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 5.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 5.51 }
    ]},
    "2026-01": { account_id: "NXT-005", billing_period: "2026-01", total_amount: 51.10, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 5.50 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 5.61 }
    ]},
    "2026-02": { account_id: "NXT-005", billing_period: "2026-02", total_amount: 51.70, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 6.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 5.71 }
    ]},
    "2026-03": { account_id: "NXT-005", billing_period: "2026-03", total_amount: 52.30, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 6.50 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 5.81 }
    ]},
    "2026-04": { account_id: "NXT-005", billing_period: "2026-04", total_amount: 51.70, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 6.00 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 5.71 }
    ]},
    "2026-05": { account_id: "NXT-005", billing_period: "2026-05", total_amount: 52.30, currency: "EUR", line_items: [
      { category: "Base Plan",         amount: 39.99 },
      { category: "International Calls", amount: 0 },
      { category: "Roaming",           amount: 0 },
      { category: "Data",              amount: 6.50 },
      { category: "Data Overage",      amount: 0 },
      { category: "SMS Bundle",        amount: 0 },
      { category: "Late Payment Fee",  amount: 0 },
      { category: "Taxes & Fees",      amount: 5.81 }
    ]}
  }

};

const mobileIndex = Object.fromEntries(
  Object.values(customers).map(c => [c.mobile, c.account_id])
);

module.exports = { customers, invoices, mobileIndex };
