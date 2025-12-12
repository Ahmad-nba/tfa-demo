export interface Policy {
  id: string;
  name: string;
  description: string;
  interestRate: number; // Annual percentage rate
  minimumAmount: number;
  currentValue?: number;
  enrolledAt?: string;
  dividendYield?: number; // For investment policies only
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface Wallet {
  id: string;
  type: 'savings' | 'investment' | 'total';
  balance: number;
  policy?: Policy;
  growth: number; // Percentage growth
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'dividend' | 'interest';
  date: string;
  description: string;
}