// opted for this header - UI friendly and functional
"use client";

import { TrendingUp, Calendar, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  userName?: string;
}

export default function DashboardHeader({ 
  userName = "Rootwipaa"
}: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <section className="py-6 md:py-8">
      {/* Main header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-green-600">Dashboard</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
            Welcome back,{" "}
            <span className="text-text-secondary">{userName}</span>
          </h1>
          
          <div className="flex items-center gap-2 mt-2 text-text-secondary">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{currentDate}</span>
          </div>
        </div>
        
        {/* Right side - Status indicator and CTAs */}
        <div className="flex flex-col gap-3">
          {/* Status indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-50 to-amber-100 border border-amber-200 w-fit md:w-auto">
            <TrendingUp className="h-4 w-4 text-amber-700" />
            <span className="text-sm font-medium text-amber-800">Your finances at a glance.</span>
          </div>
          
          {/* CTAs - Responsive layout */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/dashboard/deposit" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition active:scale-[0.98] w-full sm:w-auto">
              <ArrowDownCircle className="h-4 w-4" />
              <span>Request Deposit</span>
            </Link>

            <Link href="/dashboard/withdraw" className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600 transition active:scale-[0.98] w-full sm:w-auto">
              <ArrowUpCircle className="h-4 w-4" />
              <span>Request Withdraw</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}