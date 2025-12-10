import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const transactions = [
  { id: 1, type: "Deposit", amount: 50000, date: "2025-09-01", direction: "in" },
  { id: 2, type: "Withdrawal", amount: 20000, date: "2025-09-02", direction: "out" },
  { id: 3, type: "Loan Payment", amount: 10000, date: "2025-09-03", direction: "out" },
  { id: 4, type: "Deposit", amount: 75000, date: "2025-09-04", direction: "in" },
  { id: 5, type: "Dividend", amount: 15000, date: "2025-09-05", direction: "in" },
];

export default function TransactionsCard() {
  return (
    <section className="mt-6 rounded-xl bg-card/80 border border-white/5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h2 className="text-lg font-semibold">Transactions History</h2>
        <Link href="/dashboard/transactions" className="text-xs font-medium text-text-muted underline hover:underline">
          View all
        </Link>
      </div>

      {/* Column labels */}
      <div className="hidden md:grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] px-6 pt-3 pb-2 text-xs uppercase tracking-wide text-muted-foreground">
        <span>Type</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Date</span>
      </div>

      {/* Rows */}
      <ul className="px-3 md:px-6 pb-4 divide-y divide-white/5">
        {transactions.map((t) => {
          const isIn = t.direction === "in";
          return (
            <li
              key={t.id}
              className="flex flex-col gap-1 py-3 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-center text-sm"
            >
              {/* Type + icon */}
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
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
                <div className="flex flex-col">
                  <span className="font-medium">{t.type}</span>
                  <span className="text-xs text-muted-foreground md:hidden">
                    {t.date}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <span className="md:text-right font-medium tabular-nums text-sm">
                UGX {t.amount.toLocaleString()}
              </span>

              {/* Date (desktop) */}
              <span className="hidden md:block md:text-right text-xs text-muted-foreground tabular-nums">
                {t.date}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
