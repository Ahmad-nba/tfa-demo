"use client";

import Link from "next/link";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { summaryCards } from "../lib/summaryCArds";

export default function OverviewCards() {
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
              {card.changeType === "up" ? <FaCaretUp /> : <FaCaretDown />}{" "}
              {card.change}
            </span>
          </p>
        </Link>
      ))}
    </section>
  );
}
