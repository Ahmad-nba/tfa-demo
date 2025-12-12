// wallet.types.ts

export interface WalletBarProps {
  label: string;
  amount: number;
  percentage: number; // 0–100
  /** Tailwind utility color classes, e.g., "bg-blue-500" */
  color: string;
}

export interface GrowthCardProps {
  title: string;
  growth: number | undefined; // allow null or undefined to mean “no data”
  policy?: string | null;
  /** Color key for building tailwind classes dynamically, e.g. "blue", "emerald" */
  color: string;
}

export interface PolicyInfo {
  name: string;
  interestRate?: number;
  dividendYield?: number;
}

export interface SummaryCardProps {
  savings: number;
  investment: number;
  savingsPolicy?: PolicyInfo | null;
  investmentPolicy?: PolicyInfo | null;
}
