export interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  direction: "in" | "out";
  category?: string;
  description?: string;
  status?: "completed" | "pending" | "failed";
  reference?: string;
}

export const transactions: Transaction[] = [
  // Initial 5 transactions
  { id: 1, type: "Deposit", amount: 50000, date: "2025-09-01", direction: "in", category: "Savings", description: "Monthly savings deposit", status: "completed", reference: "DEP001" },
  { id: 2, type: "Withdrawal", amount: 20000, date: "2025-09-02", direction: "out", category: "Personal", description: "ATM withdrawal", status: "completed", reference: "WDL001" },
  { id: 3, type: "Loan Payment", amount: 10000, date: "2025-09-03", direction: "out", category: "Loan", description: "Monthly loan repayment", status: "completed", reference: "LNP001" },
  { id: 4, type: "Deposit", amount: 75000, date: "2025-09-04", direction: "in", category: "Investment", description: "Dividend payout", status: "completed", reference: "DEP002" },
  { id: 5, type: "Dividend", amount: 15000, date: "2025-09-05", direction: "in", category: "Investment", description: "Quarterly dividend", status: "completed", reference: "DIV001" },
  
  // Additional transactions
  { id: 6, type: "Transfer", amount: 30000, date: "2025-08-28", direction: "out", category: "Transfer", description: "Transfer to John", status: "completed", reference: "TRF001" },
  { id: 7, type: "Deposit", amount: 25000, date: "2025-08-25", direction: "in", category: "Salary", description: "Monthly salary", status: "completed", reference: "DEP003" },
  { id: 8, type: "Withdrawal", amount: 5000, date: "2025-08-20", direction: "out", category: "Personal", description: "ATM withdrawal", status: "completed", reference: "WDL002" },
  { id: 9, type: "Loan Disbursement", amount: 200000, date: "2025-08-15", direction: "in", category: "Loan", description: "Personal loan", status: "completed", reference: "LND001" },
  { id: 10, type: "Investment", amount: 50000, date: "2025-08-10", direction: "out", category: "Investment", description: "T-Bill purchase", status: "completed", reference: "INV001" },
  { id: 11, type: "Interest", amount: 5000, date: "2025-08-05", direction: "in", category: "Savings", description: "Monthly interest", status: "completed", reference: "INT001" },
  { id: 12, type: "Deposit", amount: 100000, date: "2025-08-01", direction: "in", category: "Business", description: "Client payment", status: "completed", reference: "DEP004" },
  { id: 13, type: "Withdrawal", amount: 15000, date: "2025-07-28", direction: "out", category: "Personal", description: "Shopping", status: "completed", reference: "WDL003" },
  { id: 14, type: "Deposit", amount: 45000, date: "2025-07-25", direction: "in", category: "Salary", description: "Monthly salary", status: "completed", reference: "DEP005" },
  { id: 15, type: "Loan Payment", amount: 15000, date: "2025-07-20", direction: "out", category: "Loan", description: "Loan installment", status: "completed", reference: "LNP002" },
  { id: 16, type: "Dividend", amount: 8000, date: "2025-07-15", direction: "in", category: "Investment", description: "Stock dividend", status: "completed", reference: "DIV002" },
  { id: 17, type: "Transfer", amount: 25000, date: "2025-07-10", direction: "out", category: "Transfer", description: "School fees", status: "completed", reference: "TRF002" },
  { id: 18, type: "Deposit", amount: 30000, date: "2025-07-05", direction: "in", category: "Freelance", description: "Freelance work", status: "completed", reference: "DEP006" },
  { id: 19, type: "Withdrawal", amount: 10000, date: "2025-07-01", direction: "out", category: "Personal", description: "Medical", status: "completed", reference: "WDL004" },
  { id: 20, type: "Investment", amount: 75000, date: "2025-06-25", direction: "out", category: "Investment", description: "Mutual fund", status: "completed", reference: "INV002" },
  { id: 21, type: "Deposit", amount: 55000, date: "2025-06-20", direction: "in", category: "Savings", description: "Savings top-up", status: "completed", reference: "DEP007" },
  { id: 22, type: "Interest", amount: 3200, date: "2025-06-15", direction: "in", category: "Savings", description: "Quarterly interest", status: "completed", reference: "INT002" },
  { id: 23, type: "Loan Payment", amount: 20000, date: "2025-06-10", direction: "out", category: "Loan", description: "Loan installment", status: "completed", reference: "LNP003" },
  { id: 24, type: "Transfer", amount: 18000, date: "2025-06-05", direction: "out", category: "Transfer", description: "Utility bills", status: "completed", reference: "TRF003" },
  { id: 25, type: "Deposit", amount: 120000, date: "2025-06-01", direction: "in", category: "Business", description: "Business revenue", status: "completed", reference: "DEP008" }
];

// Get recent transactions (sorted by date, most recent first)
export const getRecentTransactions = (count: number = 5): Transaction[] => {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

// Get all transactions sorted by date (most recent first)
export const getAllTransactions = (): Transaction[] => {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};