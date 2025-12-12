"use client";

import { useState } from "react";
import { useWalletStore } from "../../../features/wallet/store/walletStore";
import { TrendingUp, Calendar, CheckCircle, PieChart } from "lucide-react";

export default function InvestmentWallet() {
  const {
    investmentWallet,
    availableInvestmentPolicies,
    enrollInInvestmentPolicy,
    depositToWallet,
    withdrawFromWallet
  } = useWalletStore();

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const safeNumber = (value: string) => {
    const n = parseFloat(value);
    return isNaN(n) || n <= 0 ? null : n;
  };

  const handleDeposit = () => {
    if (!investmentWallet) return;
    const amount = safeNumber(depositAmount);
    if (!amount) return;

    depositToWallet(investmentWallet.id, amount);
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    if (!investmentWallet) return;
    const amount = safeNumber(withdrawAmount);
    if (!amount) return;

    if (investmentWallet.balance < amount) return;
    withdrawFromWallet(investmentWallet.id, amount);
    setWithdrawAmount("");
  };

  return (
    <div className="rounded-xl text-text-primary border border-white/5 bg-card/80 p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        
        <div className="flex-wrap sm:flex items-center gap-3">
          {/* logo */}
          <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
   
          <div>
            <h2 className="text-lg font-semibold">Investment Wallet</h2>
            <p className="text-sm text-muted-foreground">
              Manage your investment portfolio and dividends
            </p>
          </div>
        </div>

        {investmentWallet && (
          <div
            className={`text-sm font-medium px-3 py-1 rounded-full 
            ${investmentWallet.growth >= 0
              ? "bg-blue-500/10 text-blue-400"
              : "bg-rose-500/10 text-rose-400"}`}
          >
            {investmentWallet.growth >= 0 ? "+" : ""}
            {investmentWallet.growth.toFixed(1)}%
          </div>
        )}
      </div>

      {/* If wallet exists */}
      {investmentWallet ? (
        <>
          {/* Current Policy */}
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-blue-400">Current Portfolio</h3>
                <p className="text-lg font-bold mt-1">{investmentWallet.policy?.name}</p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{investmentWallet.policy?.interestRate}% projected growth</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <PieChart className="h-4 w-4" />
                    <span>{investmentWallet.policy?.dividendYield}% dividend yield</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Enrolled {investmentWallet.policy?.enrolledAt}</span>
                  </div>
                </div>
              </div>

              <CheckCircle className="h-6 w-6 text-blue-400" />
            </div>

            {/* Risk Bar */}
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Risk Level</div>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 flex-1 rounded-full 
                  ${
                    investmentWallet.policy?.riskLevel === "low"
                      ? "bg-emerald-500"
                      : investmentWallet.policy?.riskLevel === "medium"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium 
                  ${
                    investmentWallet.policy?.riskLevel === "low"
                      ? "text-emerald-400"
                      : investmentWallet.policy?.riskLevel === "medium"
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {investmentWallet.policy?.riskLevel?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Balance */}
          <div>
            <div className="text-sm text-muted-foreground">Portfolio Value</div>
            <div className="text-3xl font-bold">UGX {investmentWallet.balance.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">
              Last updated: {investmentWallet.lastUpdated}
            </div>
          </div>

          {/* Action Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Deposit */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Invest More</label>
              <div className="flex-wrap space-y-2 space-x-2 gap-2">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-white/5 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  onClick={handleDeposit}
                  disabled={!safeNumber(depositAmount)}
                  className="px-4 py-2 bg-accent2 text-white rounded-lg 
                  disabled:opacity-50 disabled:cursor-not-allowed 
                  hover:bg-blue-600 transition-colors"
                >
                  Invest
                </button>
              </div>
            </div>
 
            {/* Withdraw */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Divest Amount</label>
              <div className="flex-wrap space-y-2 space-x-2 gap-2">
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-white/5
                  focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <button
                  onClick={handleWithdraw}
                  disabled={!safeNumber(withdrawAmount)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:bg-amber-600 transition-colors"
                >
                  Divest
                </button>
              </div>
            </div>
          </div>

          {/* Returns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <div className="text-sm text-muted-foreground">Annual Growth</div>
              <div className="text-xl font-bold text-blue-400">
                {investmentWallet.policy?.interestRate}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">Projected</div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <div className="text-sm text-muted-foreground">Dividend Yield</div>
              <div className="text-xl font-bold text-emerald-400">
                {investmentWallet.policy?.dividendYield}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">Quarterly</div>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/10">
              <div className="text-sm text-muted-foreground">Total Returns</div>
              <div className="text-xl font-bold text-purple-400">
                UGX{" "}
                {(
                  (investmentWallet.balance *
                    (investmentWallet.policy?.interestRate || 0)) /
                  100
                ).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Annual</div>
            </div>

          </div>
        </>
      ) : (
        /* No investment policy */
        <div className="space-y-6">
          <div className="text-center py-8 border border-dashed border-white/10 rounded-lg">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">No Active Investment Portfolio</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Invest in company shares to earn dividends and participate in business growth.
            </p>
          </div>

          <h3 className="text-lg font-semibold">Available Investment Policies</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableInvestmentPolicies.map((policy) => (
              <div
                key={policy.id}
                className="border border-white/10 rounded-lg p-4 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
              >
                <h4 className="font-semibold group-hover:text-blue-400 transition-colors">
                  {policy.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{policy.description}</p>

                <div className="mt-3">
                  <div className="text-sm text-muted-foreground">
                    Minimum: UGX {policy.minimumAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Growth: {policy.interestRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dividends: {policy.dividendYield}%
                  </div>
                </div>

                <button
                  onClick={() => enrollInInvestmentPolicy(policy.id)}
                  className="mt-4 w-full px-3 py-2 rounded-lg bg-blue-500 text-white
                  hover:bg-blue-600 transition-colors"
                >
                  Enroll
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
