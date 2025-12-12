"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Wallet, Policy } from "../type-safety/wallets";

/* -----------------------------------------------------
   Types
----------------------------------------------------- */

interface WalletStore {
  // State
  savingsWallet: Wallet | null;
  investmentWallet: Wallet | null;
  totalWallet: Wallet | null;

  availableSavingsPolicies: Policy[];
  availableInvestmentPolicies: Policy[];

  // Actions
  setSavingsWallet: (wallet: Wallet) => void;
  setInvestmentWallet: (wallet: Wallet) => void;

  enrollInSavingsPolicy: (policyId: string) => void;
  enrollInInvestmentPolicy: (policyId: string) => void;

  depositToWallet: (walletId: string, amount: number) => void;
  withdrawFromWallet: (walletId: string, amount: number) => void;

  updateTotalWallet: () => void;

  calculateTotalBalance: () => number;
  calculateBreakdown: () => { savings: number; investment: number; total: number };
}

/* -----------------------------------------------------
   Mock Data
----------------------------------------------------- */

const mockSavingsPolicies: Policy[] = [
  {
    id: "sav-001",
    name: "Standard Savings Plan",
    description: "Basic savings account with daily interest compounding",
    interestRate: 5.5,
    minimumAmount: 50000,
    riskLevel: "low",
  },
  {
    id: "sav-002",
    name: "Premium Savings Plus",
    description: "Higher interest rate for long-term commitments",
    interestRate: 7.2,
    minimumAmount: 200000,
    riskLevel: "low",
  },
  {
    id: "sav-003",
    name: "Youth Savings Account",
    description: "Special plan for young savers under 25",
    interestRate: 6.0,
    minimumAmount: 10000,
    riskLevel: "low",
  },
];

const mockInvestmentPolicies: Policy[] = [
  {
    id: "inv-001",
    name: "Company Shares A",
    description: "Basic equity shares with quarterly dividends",
    interestRate: 8.5,
    minimumAmount: 100000,
    dividendYield: 4.2,
    riskLevel: "medium",
  },
  {
    id: "inv-002",
    name: "Growth Investment Plan",
    description: "High-growth potential with annual dividends",
    interestRate: 12.0,
    minimumAmount: 500000,
    dividendYield: 6.5,
    riskLevel: "high",
  },
  {
    id: "inv-003",
    name: "Balanced Portfolio",
    description: "Mixed investment with moderate risk",
    interestRate: 9.0,
    minimumAmount: 250000,
    dividendYield: 5.0,
    riskLevel: "medium",
  },
];

/* -----------------------------------------------------
   Zustand Store
----------------------------------------------------- */

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => {
      /* -----------------------------------------------
         Internal Helper: Calculate Combined Growth
      ----------------------------------------------- */
      const calculateCombinedGrowth = (
        savingsWallet: Wallet | null,
        investmentWallet: Wallet | null
      ): number => {
        const sGrowth = savingsWallet?.growth ?? 0;
        const iGrowth = investmentWallet?.growth ?? 0;
        const sBal = savingsWallet?.balance ?? 0;
        const iBal = investmentWallet?.balance ?? 0;
        const total = sBal + iBal;

        if (total === 0) return 0;

        return (sGrowth * sBal + iGrowth * iBal) / total;
      };

      /* -----------------------------------------------
         Store Object Begins
      ----------------------------------------------- */
      return {
        // Initial State
        savingsWallet: null,
        investmentWallet: null,
        totalWallet: null,

        availableSavingsPolicies: mockSavingsPolicies,
        availableInvestmentPolicies: mockInvestmentPolicies,

        /* -----------------------------------------------
           Action: Set Savings Wallet
        ----------------------------------------------- */
        setSavingsWallet: (wallet) => {
          set({ savingsWallet: wallet });
          get().updateTotalWallet();
        },

        /* -----------------------------------------------
           Action: Set Investment Wallet
        ----------------------------------------------- */
        setInvestmentWallet: (wallet) => {
          set({ investmentWallet: wallet });
          get().updateTotalWallet();
        },

        /* -----------------------------------------------
           Action: Enroll in Savings Policy
        ----------------------------------------------- */
        enrollInSavingsPolicy: (policyId) => {
          const policy = get().availableSavingsPolicies.find(
            (p) => p.id === policyId
          );
          if (!policy) return;

          const wallet: Wallet = {
            id: `sav-${Date.now()}`,
            type: "savings",
            balance: 0,
            growth: 0,
            lastUpdated: new Date().toISOString().split("T")[0],
            policy: { ...policy, enrolledAt: new Date().toISOString().split("T")[0] },
          };

          set({ savingsWallet: wallet });
          get().updateTotalWallet();
        },

        /* -----------------------------------------------
           Action: Enroll in Investment Policy
        ----------------------------------------------- */
        enrollInInvestmentPolicy: (policyId) => {
          const policy = get().availableInvestmentPolicies.find(
            (p) => p.id === policyId
          );
          if (!policy) return;

          const wallet: Wallet = {
            id: `inv-${Date.now()}`,
            type: "investment",
            balance: 0,
            growth: 0,
            lastUpdated: new Date().toISOString().split("T")[0],
            policy: { ...policy, enrolledAt: new Date().toISOString().split("T")[0] },
          };

          set({ investmentWallet: wallet });
          get().updateTotalWallet();
        },

        /* -----------------------------------------------
           Action: Deposit
        ----------------------------------------------- */
        depositToWallet: (walletId, amount) => {
          const { savingsWallet, investmentWallet } = get();

          if (walletId === savingsWallet?.id) {
            set({
              savingsWallet: {
                ...savingsWallet,
                balance: savingsWallet.balance + amount,
                lastUpdated: new Date().toISOString().split("T")[0],
              },
            });
          }

          if (walletId === investmentWallet?.id) {
            set({
              investmentWallet: {
                ...investmentWallet,
                balance: investmentWallet.balance + amount,
                lastUpdated: new Date().toISOString().split("T")[0],
              },
            });
          }

          get().updateTotalWallet();
        },

        /* -----------------------------------------------
           Action: Withdraw
        ----------------------------------------------- */
        withdrawFromWallet: (walletId, amount) => {
          const { savingsWallet, investmentWallet } = get();

          if (walletId === savingsWallet?.id && savingsWallet.balance >= amount) {
            set({
              savingsWallet: {
                ...savingsWallet,
                balance: savingsWallet.balance - amount,
                lastUpdated: new Date().toISOString().split("T")[0],
              },
            });
          }

          if (
            walletId === investmentWallet?.id &&
            investmentWallet.balance >= amount
          ) {
            set({
              investmentWallet: {
                ...investmentWallet,
                balance: investmentWallet.balance - amount,
                lastUpdated: new Date().toISOString().split("T")[0],
              },
            });
          }

          get().updateTotalWallet();
        },

        /* -----------------------------------------------
           Action: Update Total Wallet
        ----------------------------------------------- */
        updateTotalWallet: () => {
          const { savingsWallet, investmentWallet } = get();
          const sBal = savingsWallet?.balance ?? 0;
          const iBal = investmentWallet?.balance ?? 0;

          set({
            totalWallet: {
              id: "total-001",
              type: "total",
              balance: sBal + iBal,
              growth: calculateCombinedGrowth(savingsWallet, investmentWallet),
              lastUpdated: new Date().toISOString().split("T")[0],
            },
          });
        },

        /* -----------------------------------------------
           Selector: Total Balance
        ----------------------------------------------- */
        calculateTotalBalance: () => {
          const { savingsWallet, investmentWallet } = get();
          return (savingsWallet?.balance ?? 0) + (investmentWallet?.balance ?? 0);
        },

        /* -----------------------------------------------
           Selector: Breakdown
        ----------------------------------------------- */
        calculateBreakdown: () => {
          const { savingsWallet, investmentWallet } = get();
          const savings = savingsWallet?.balance ?? 0;
          const investment = investmentWallet?.balance ?? 0;
          return { savings, investment, total: savings + investment };
        },
      };
    },
    {
      name: "wallet-store-demo",
      partialize: (s) => ({
        savingsWallet: s.savingsWallet,
        investmentWallet: s.investmentWallet,
        totalWallet: s.totalWallet,
      }),
    }
  )
);
