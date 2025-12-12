"use client";

import { useEffect, useState } from "react";
import { useWalletStore } from "@/features/wallet/store/walletStore";
import { Wallet, TrendingUp, ArrowUpRight } from "lucide-react";
import { GrowthCardProps, SummaryCardProps, WalletBarProps } from "@/features/wallet/type-safety/walletCardTypes";

/* ──────────────────────────────────────────────── */
/*    MAIN WRAPPER TO HANDLE HYDRATION SAFELY      */
/* ──────────────────────────────────────────────── */
export default function TotalWalletWrapper() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? <TotalWallet /> : (
    <div className="p-6 text-center text-muted-foreground">
      Loading wallet...
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/*       ACTUAL TOTAL WALLET COMPONENT             */
/* ──────────────────────────────────────────────── */
function TotalWallet() {
  // Always call the store hooks
  const { savingsWallet, investmentWallet, totalWallet, calculateBreakdown } = useWalletStore();
  const { savings, investment, total } = calculateBreakdown();

  const savingsPercent = total > 0 ? (savings / total) * 100 : 0;
  const investmentPercent = total > 0 ? (investment / total) * 100 : 0;

  return (
    <div className="rounded-xl text-text-primary border border-white/5 bg-linear-to-br from-card/80 to-purple-500/5 p-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-linear-to-r from-accent2/20 to-surface2/20 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Wallet</h2>
            <p className="text-sm text-muted-foreground">Combined view of all assets</p>
          </div>
        </div>

        {totalWallet?.growth !== undefined && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              totalWallet.growth >= 0
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-rose-500/10 text-accent2"
            }`}
          >
            {totalWallet.growth >= 0 ? "+" : ""}
            {totalWallet.growth.toFixed(1)}%
          </span>
        )}
      </div>

      {/* Total Balance */}
      <div className="mb-8 text-center md:text-left">
        <p className="text-sm text-muted-foreground mb-1">Total Combined Balance</p>
        <p className="text-4xl md:text-5xl font-bold bg-linear-to-r from-accent2 to-green-700 bg-clip-text text-transparent">
          UGX {total.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground mt-1">Updated in real-time from all wallets</p>
      </div>

      {/* Breakdown */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between gap-2 mb-3">
          <h3 className="font-semibold">Balance Breakdown</h3>
          <p className="text-sm text-muted-foreground">
            {savingsPercent.toFixed(1)}% Savings • {investmentPercent.toFixed(1)}% Investment
          </p>
        </div>

        <WalletBar label="Savings Wallet" amount={savings} percentage={savingsPercent} color="bg-emerald-500" />
        <WalletBar label="Investment Wallet" amount={investment} percentage={investmentPercent} color="bg-blue-500" />
      </div>

      {/* Growth Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <GrowthCard title="Savings Growth" growth={savingsWallet?.growth} policy={savingsWallet?.policy?.name} color="emerald" />
        <GrowthCard title="Investment Growth" growth={investmentWallet?.growth} policy={investmentWallet?.policy?.name} color="blue" />
      </div>

      {/* Financial Summary */}
      <SummaryCard
        savings={savings}
        investment={investment}
        savingsPolicy={savingsWallet?.policy}
        investmentPolicy={investmentWallet?.policy}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/*   SMALL SUBCOMPONENTS                            */
/* ──────────────────────────────────────────────── */
function WalletBar({ label, amount, percentage, color }: WalletBarProps) {
  return (
    <div className="mb-4 text-text-primary">
      <div className="flex justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${color}`} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-medium">UGX {amount.toLocaleString()}</span>
      </div>

      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function GrowthCard({ title, growth, policy, color }: GrowthCardProps) {
  return (
    <div className={`p-4 rounded-lg bg-${color}-500/5 text-text-primary border border-${color}-500/10`}>
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 bg-${color}-500/10 rounded-full flex items-center justify-center`}>
          <ArrowUpRight className={`h-5 w-5 text-${color}-400`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={`text-xl font-bold text-${color}-400`}>
            {growth ? `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%` : "0%"}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        {policy ? `From ${policy}` : "No active policy"}
      </p>
    </div>
  );
}

function SummaryCard({ savings, investment, savingsPolicy, investmentPolicy }: SummaryCardProps) {
  const totalInterest =
    (savings * (savingsPolicy?.interestRate || 0)) / 100 +
    (investment * (investmentPolicy?.interestRate || 0)) / 100;

  const totalDividends = (investment * (investmentPolicy?.dividendYield || 0)) / 100;

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
      <h4 className="font-semibold mb-3">Financial Summary</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Active Policies:</span>
          <span className="font-medium">
            {[savingsPolicy, investmentPolicy].filter(Boolean).length} of 2
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Annual Interest:</span>
          <span className="font-medium text-emerald-400">
            UGX {totalInterest.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Projected Dividends:</span>
          <span className="font-medium text-blue-400">
            UGX {totalDividends.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
