"use client";

import { ArrowDownRight, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getRecentTransactions } from "../lib/transactions";

export default function TransactionsCard() {
  const recentTransactions = getRecentTransactions(5);

  return (
    <section className="mt-6 rounded-xl bg-card/80 border border-white/5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Recent Transactions</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Last 5 transactions
          </p>
        </div>
        <Link 
          href="/dashboard/transactions" 
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-text-muted hover:text-text-primary/80 transition-colors w-fit"
        >
          <span>View all</span>
          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </div>

      {/* Mobile Transactions List - Updated to match screenshot */}
      <div className="sm:hidden px-4 py-3 space-y-4">
        {recentTransactions.map((t) => {
          const isIn = t.direction === "in";
          
          return (
            <div
              key={t.id}
              className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-3"
            >
              {/* Header: Type and Category */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold">{t.type}</h3>
                  <div className="mt-1">
                    <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                      {t.category}
                    </span>
                  </div>
                </div>
                {/* Status Badge */}
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  t.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                  t.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                  "bg-rose-500/20 text-rose-400"
                }`}>
                  {t.status}
                </div>
              </div>

              {/* Description */}
              <div className="text-sm text-muted-foreground">
                {t.description}
              </div>

              {/* Amount and Date */}
              <div className="flex items-end justify-between pt-2">
                <div>
                  <div className={`text-xl font-bold ${isIn ? "text-emerald-400" : "text-rose-400"}`}>
                    {isIn ? "+" : "-"} UGX {t.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {t.date}
                  </div>
                </div>
                
                {/* Reference */}
                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-mono">
                    {t.reference}
                  </div>
                  {/* Icon in bottom right */}
                  <div className="mt-2 flex justify-end">
                    <div className={`p-2 rounded-lg ${isIn ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
                      {isIn ? (
                        <ArrowDownRight className={`h-4 w-4 ${isIn ? "text-emerald-400" : "text-rose-400"}`} />
                      ) : (
                        <ArrowUpRight className={`h-4 w-4 ${isIn ? "text-emerald-400" : "text-rose-400"}`} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Transactions Table */}
      <div className="hidden sm:block">
        {/* Column labels */}
        <div className="grid grid-cols-12 px-4 lg:px-6 pt-3 pb-2 text-xs uppercase tracking-wide text-muted-foreground">
          <div className="col-span-5 lg:col-span-4">Transaction</div>
          <div className="col-span-3 lg:col-span-2 text-right">Amount</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 lg:col-span-3 text-right">Date & Reference</div>
        </div>

        {/* Transaction Rows */}
        <div className="px-2 lg:px-6 pb-4">
          {recentTransactions.map((t) => {
            const isIn = t.direction === "in";
            const statusColor = t.status === "completed" ? "text-emerald-500" : 
                               t.status === "pending" ? "text-amber-500" : 
                               "text-rose-500";
            
            return (
              <div
                key={t.id}
                className="grid grid-cols-12 gap-2 py-3 px-2 lg:px-4 border-b border-white/5 last:border-0 text-sm hover:bg-white/5 transition-colors rounded-md items-center"
              >
                {/* Transaction Details */}
                <div className="col-span-5 lg:col-span-4 flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isIn
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {isIn ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{t.type}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {t.description}
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="col-span-3 lg:col-span-2 text-right">
                  <span className={`font-medium tabular-nums ${isIn ? "text-emerald-400" : "text-rose-400"}`}>
                    {isIn ? "+" : "-"} UGX {t.amount.toLocaleString()}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2 text-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColor} ${
                    t.status === "completed" ? "bg-emerald-500/10" : 
                    t.status === "pending" ? "bg-amber-500/10" : 
                    "bg-rose-500/10"
                  }`}>
                    {t.status}
                  </span>
                </div>

                {/* Date and Reference */}
                <div className="col-span-2 lg:col-span-3 text-right">
                  <div className="text-xs text-muted-foreground tabular-nums">
                    {t.date}
                  </div>
                  <div className="text-[10px] lg:text-xs text-muted-foreground truncate">
                    {t.reference}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-border bg-white/5 rounded-b-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
          <div className="text-text-muted text-center sm:text-left">
            Showing {recentTransactions.length} of 25 total transactions
          </div>
          <Link 
            href="/dashboard/transactions" 
            className="inline-flex items-center justify-center gap-1 sm:gap-2 text-text-muted hover:text-text-primary/80 font-medium text-sm sm:text-base px-4 py-2 sm:py-0 rounded-lg sm:rounded-none bg-primary/5 sm:bg-transparent hover:bg-primary/10 sm:hover:bg-transparent transition-colors"
          >
            <span>View full transaction history</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}