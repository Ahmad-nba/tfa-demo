"use client";

import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function DashboardHeader() {
  return (
    <section className="pb-4 pt-2 md:pt-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Title + subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold leading-tight md:text-4xl">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Your finances at a glance.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition sm:w-auto sm:px-5 sm:py-2.5">
            <ArrowDownCircle className="h-4 w-4" />
            <span>Request Deposit</span>
          </button>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-600 transition sm:w-auto sm:px-5 sm:py-2.5">
            <ArrowUpCircle className="h-4 w-4" />
            <span>Request Withdraw</span>
          </button>
        </div>
      </div>
    </section>
  );
}
