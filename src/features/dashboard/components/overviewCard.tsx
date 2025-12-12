"use client";

import Link from "next/link";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Wallet, PiggyBank, TrendingUp, Landmark } from "lucide-react";
import { useWalletStore } from "@/features/wallet/store/walletStore";

export default function OverviewCards() {
  const { savingsWallet, investmentWallet, totalWallet, loans } = useWalletStore();

  const summaryCards = [
    {
      label: "Total balance",
      value: totalWallet ? `UGX ${totalWallet.balance.toLocaleString()}` : "UGX 0",
      change: "-2% last month",
      changeType: "down",
      href: "/dashboard/wallet",
      icon: Wallet,
    },
    {
      label: "Savings",
      value: savingsWallet ? `UGX ${savingsWallet.balance.toLocaleString()}` : "UGX 0",
      change: "+2% last month",
      changeType: "up",
      href: "/dashboard/savings",
      icon: PiggyBank,
    },
    {
      label: "Loans",
      value: loans ? `UGX ${loans.reduce((sum, loan) => sum + loan.balance, 0).toLocaleString()}` : "UGX 0",
      change: "-1% pending",
      changeType: "down",
      href: "/dashboard/loans",
      icon: Landmark,
    },
    {
      label: "Investments",
      value: investmentWallet ? `UGX ${investmentWallet.balance.toLocaleString()}` : "UGX 0",
      change: "+2% last month",
      changeType: "up",
      href: "/dashboard/investments",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card) => (
        <Link
          key={card.label}
          href={card.href}
          className="block rounded-xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2">
              <card.icon className="h-6 w-6 text-text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary">{card.label}</p>
              <p className="text-lg font-bold">{card.value}</p>
            </div>
          </div>
          <p
            className={`mt-2 text-sm ${
              card.changeType === "up" ? "text-success" : "text-destructive"
            }`}
          >
            <span className="flex items-center gap-1">
              {card.changeType === "up" ? <FaCaretUp /> : <FaCaretDown />} {card.change}
            </span>
          </p>
        </Link>
      ))}
    </section>
  );
}
