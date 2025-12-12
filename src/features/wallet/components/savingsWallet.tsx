"use client";

import { useState } from "react";
import { useWalletStore } from "../store/walletStore";
import {
  Wallet,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";

export default function SavingsWallet() {
  const {
    savingsWallet,
    availableSavingsPolicies,
    enrollInSavingsPolicy,
    depositToWallet,
    withdrawFromWallet,
  } = useWalletStore();

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0 && savingsWallet) {
      depositToWallet(savingsWallet.id, amount);
      setDepositAmount("");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && savingsWallet && savingsWallet.balance >= amount) {
      withdrawFromWallet(savingsWallet.id, amount);
      setWithdrawAmount("");
    }
  };

  return (
    <div className="rounded-xl text-text-primary border border-white/5 bg-card/80 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span className="text-sm font-medium text-green-600">Savings Wallet</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="sm:flex flex-wrap items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Savings Wallet</h2>
            <p className="text-sm text-muted-foreground">
              Manage your savings policies and funds
            </p>
          </div>
        </div>

        {savingsWallet && (
          <div
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              savingsWallet.growth >= 0
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-rose-500/10 text-rose-400"
            }`}
          >
            {savingsWallet.growth >= 0 ? "+" : ""}
            {savingsWallet.growth.toFixed(1)}%
          </div>
        )}
      </div>

      {savingsWallet ? (
        <>
          {/* Current Savings Policy */}
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-emerald-400">
                  Current Policy
                </h3>
                <p className="text-lg font-bold mt-1">
                  {savingsWallet.policy?.name}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{savingsWallet.policy?.interestRate}% interest</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Enrolled {savingsWallet.policy?.enrolledAt}</span>
                  </div>
                </div>
              </div>
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            </div>
          </div>

          {/* Balance Display */}
          <div className="mb-8">
            <div className="text-sm text-muted-foreground mb-2">
              Current Balance
            </div>
            <div className="text-3xl font-bold">
              UGX {savingsWallet.balance.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Last updated: {savingsWallet.lastUpdated}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Deposit Amount</label>
              <div className="flex-wrap space-y-2 space-x-2 gap-2">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <button
                  onClick={handleDeposit}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Deposit
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Withdraw Amount</label>
              <div className="flex-wrap space-y-2 space-x-2 gap-2">
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                />
                <button
                  onClick={handleWithdraw}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="text-sm font-medium">View History</div>
              <div className="text-xs text-muted-foreground mt-1">
                Transactions
              </div>
            </button>
            <button className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="text-sm font-medium">Project Growth</div>
              <div className="text-xs text-muted-foreground mt-1">
                Calculator
              </div>
            </button>
            <button className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="text-sm font-medium">Policy Details</div>
              <div className="text-xs text-muted-foreground mt-1">
                View terms
              </div>
            </button>
            <button className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="text-sm font-medium">Switch Policy</div>
              <div className="text-xs text-muted-foreground mt-1">Options</div>
            </button>
          </div>
        </>
      ) : (
        /* No Savings Policy - Show available policies */
        <div>
          <div className="text-center py-8 border border-dashed border-white/10 rounded-lg mb-6">
            <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">
              No Active Savings Policy
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Enroll in a savings policy to start growing your money with secure
              returns.
            </p>
          </div>

          {/* Available Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Available Savings Policies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableSavingsPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="border border-white/10 rounded-lg p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold group-hover:text-emerald-400 transition-colors">
                        {policy.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-emerald-400 font-bold">
                          {policy.interestRate}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          interest rate
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {policy.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      Min: UGX {policy.minimumAmount.toLocaleString()}
                    </div>
                    <button
                      onClick={() => enrollInSavingsPolicy(policy.id)}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
