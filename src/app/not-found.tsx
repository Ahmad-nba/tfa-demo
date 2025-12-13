"use client";

import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function DemoUnavailablePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8 shadow-lg">
        
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-warning-background text-warning">
          <ShieldAlert className="h-7 w-7" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Demo Access Limited
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          This section is unavailable in the demo environment.  
          Some features are intentionally restricted to keep the experience
          focused, secure, and representative.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm text-text-secondary hover:bg-surface-2 transition"
          >
            View Demo Sections
          </Link>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-xs text-text-muted">
          This limitation applies only to the demo version.
        </p>
      </div>
    </main>
  );
}
