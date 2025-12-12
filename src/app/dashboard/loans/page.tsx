"use client";

import { useWalletStore } from "@/features/wallet/store/walletStore";

export default function LoansPage() {
  const { loans, addLoan, repayLoan } = useWalletStore();

  return (
    <div className="space-y-6 text-text-primary">
      <h2 className="text-2xl font-bold">Your Loans</h2>

      {loans.length === 0 ? (
        <p>No active loans</p>
      ) : (
        <ul className="space-y-4">
          {loans.map((loan) => (
            <li key={loan.id} className="p-4 border border-border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">Loan ID: {loan.id}</p>
                <p>Balance: UGX {loan.balance.toLocaleString()}</p>
                <p>Interest Rate: {loan.interestRate}%</p>
                <p>Status: {loan.status}</p>
                <p>Due Date: {loan.dueDate}</p>
              </div>
              {loan.status === "active" && (
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => repayLoan(loan.id, 50000)}
                >
                  Pay 50,000
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Demo Add Loan Button */}
      <button
        className="px-4 py-2 bg-accent2 text-white rounded"
        onClick={() => addLoan(100000, 5.5, "2026-12-31")}
      >
        Take Demo Loan of 100,000 UGX
      </button>
    </div>
  );
}
