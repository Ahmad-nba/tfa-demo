"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Wallet, Policy, Loan } from "../type-safety/wallets";

/* -----------------------------------------------------
   Types
----------------------------------------------------- */

interface WalletStore {
  // State
  savingsWallet: Wallet | null;
  investmentWallet: Wallet | null;
  totalWallet: Wallet | null;

  loans: Loan[]; // NEW: Loans array

  availableSavingsPolicies: Policy[];
  availableInvestmentPolicies: Policy[];

  // Actions
  setSavingsWallet: (wallet: Wallet) => void;
  setInvestmentWallet: (wallet: Wallet) => void;

  enrollInSavingsPolicy: (policyId: string) => void;
  enrollInInvestmentPolicy: (policyId: string) => void;

  depositToWallet: (walletId: string, amount: number) => void;
  withdrawFromWallet: (walletId: string, amount: number) => void;

  addLoan: (amount: number, interestRate: number, dueDate: string) => void;
  repayLoan: (loanId: string, amount: number) => void;

  updateTotalWallet: () => void;

  calculateTotalBalance: () => number;
  calculateBreakdown: () => { savings: number; investment: number; total: number };
}

/* -----------------------------------------------------
   Mock Data
----------------------------------------------------- */

const mockSavingsPolicies: Policy[] = [
  { id: "sav-001", name: "Standard Savings Plan", description: "Basic savings account with daily interest compounding", interestRate: 5.5, minimumAmount: 50000, riskLevel: "low" },
  { id: "sav-002", name: "Premium Savings Plus", description: "Higher interest rate for long-term commitments", interestRate: 7.2, minimumAmount: 200000, riskLevel: "low" },
  { id: "sav-003", name: "Youth Savings Account", description: "Special plan for young savers under 25", interestRate: 6.0, minimumAmount: 10000, riskLevel: "low" },
];

const mockInvestmentPolicies: Policy[] = [
  { id: "inv-001", name: "Company Shares A", description: "Basic equity shares with quarterly dividends", interestRate: 8.5, minimumAmount: 100000, dividendYield: 4.2, riskLevel: "medium" },
  { id: "inv-002", name: "Growth Investment Plan", description: "High-growth potential with annual dividends", interestRate: 12.0, minimumAmount: 500000, dividendYield: 6.5, riskLevel: "high" },
  { id: "inv-003", name: "Balanced Portfolio", description: "Mixed investment with moderate risk", interestRate: 9.0, minimumAmount: 250000, dividendYield: 5.0, riskLevel: "medium" },
];

/* -----------------------------------------------------
   Store
----------------------------------------------------- */

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => {
      const calculateCombinedGrowth = (savingsWallet: Wallet | null, investmentWallet: Wallet | null): number => {
        const sGrowth = savingsWallet?.growth ?? 0;
        const iGrowth = investmentWallet?.growth ?? 0;
        const sBal = savingsWallet?.balance ?? 0;
        const iBal = investmentWallet?.balance ?? 0;
        const total = sBal + iBal;
        if (total === 0) return 0;
        return (sGrowth * sBal + iGrowth * iBal) / total;
      };

      return {
        // Initial State
        savingsWallet: null,
        investmentWallet: null,
        totalWallet: null,
        loans: [],

        availableSavingsPolicies: mockSavingsPolicies,
        availableInvestmentPolicies: mockInvestmentPolicies,

        // Wallet actions
        setSavingsWallet: (wallet) => { set({ savingsWallet: wallet }); get().updateTotalWallet(); },
        setInvestmentWallet: (wallet) => { set({ investmentWallet: wallet }); get().updateTotalWallet(); },
        enrollInSavingsPolicy: (policyId) => {
          const policy = get().availableSavingsPolicies.find(p => p.id === policyId);
          if (!policy) return;
          const wallet: Wallet = {
            id: `sav-${Date.now()}`, type: "savings", balance: 0, growth: 0,
            lastUpdated: new Date().toISOString().split("T")[0],
            policy: { ...policy, enrolledAt: new Date().toISOString().split("T")[0] },
          };
          set({ savingsWallet: wallet }); get().updateTotalWallet();
        },
        enrollInInvestmentPolicy: (policyId) => {
          const policy = get().availableInvestmentPolicies.find(p => p.id === policyId);
          if (!policy) return;
          const wallet: Wallet = {
            id: `inv-${Date.now()}`, type: "investment", balance: 0, growth: 0,
            lastUpdated: new Date().toISOString().split("T")[0],
            policy: { ...policy, enrolledAt: new Date().toISOString().split("T")[0] },
          };
          set({ investmentWallet: wallet }); get().updateTotalWallet();
        },
        depositToWallet: (walletId, amount) => {
          const { savingsWallet, investmentWallet } = get();
          if (walletId === savingsWallet?.id) set({ savingsWallet: { ...savingsWallet, balance: savingsWallet.balance + amount, lastUpdated: new Date().toISOString().split("T")[0] } });
          if (walletId === investmentWallet?.id) set({ investmentWallet: { ...investmentWallet, balance: investmentWallet.balance + amount, lastUpdated: new Date().toISOString().split("T")[0] } });
          get().updateTotalWallet();
        },
        withdrawFromWallet: (walletId, amount) => {
          const { savingsWallet, investmentWallet } = get();
          if (walletId === savingsWallet?.id && savingsWallet.balance >= amount) set({ savingsWallet: { ...savingsWallet, balance: savingsWallet.balance - amount, lastUpdated: new Date().toISOString().split("T")[0] } });
          if (walletId === investmentWallet?.id && investmentWallet.balance >= amount) set({ investmentWallet: { ...investmentWallet, balance: investmentWallet.balance - amount, lastUpdated: new Date().toISOString().split("T")[0] } });
          get().updateTotalWallet();
        },
        updateTotalWallet: () => {
          const { savingsWallet, investmentWallet } = get();
          const total = (savingsWallet?.balance ?? 0) + (investmentWallet?.balance ?? 0);
          set({ totalWallet: { id: "total-001", type: "total", balance: total, growth: calculateCombinedGrowth(savingsWallet, investmentWallet), lastUpdated: new Date().toISOString().split("T")[0] } });
        },
        calculateTotalBalance: () => {
          const { savingsWallet, investmentWallet } = get();
          return (savingsWallet?.balance ?? 0) + (investmentWallet?.balance ?? 0);
        },
        calculateBreakdown: () => {
          const { savingsWallet, investmentWallet } = get();
          const s = savingsWallet?.balance ?? 0;
          const i = investmentWallet?.balance ?? 0;
          return { savings: s, investment: i, total: s + i };
        },

        // -------------------
        // Loan Actions
        // -------------------
        addLoan: (amount, interestRate, dueDate) => {
          const newLoan: Loan = {
            id: `loan-${Date.now()}`,
            amount,
            interestRate,
            balance: amount, // remaining balance
            status: "active",
            createdAt: new Date().toISOString(),
            dueDate,
          };
          set({ loans: [...get().loans, newLoan] });
        },
        repayLoan: (loanId, amount) => {
          const loans = get().loans.map((loan) => {
            if (loan.id === loanId) {
              const newBalance = Math.max(loan.balance - amount, 0);
              return { ...loan, balance: newBalance, status: newBalance === 0 ? "paid" : loan.status };
            }
            return loan;
          });
          set({ loans });
        },
      };
    },
    {
      name: "wallet-store-demo",
      partialize: (s) => ({ savingsWallet: s.savingsWallet, investmentWallet: s.investmentWallet, totalWallet: s.totalWallet, loans: s.loans }),
    }
  )
);
