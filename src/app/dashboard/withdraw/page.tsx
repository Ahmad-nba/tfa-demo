"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useWalletStore } from "@/features/wallet/store/walletStore";
import ProviderRadioGroup from "@/features/deposit/components/providerSelect";
import LabeledInput from "@/features/deposit/components/inputs";
export type Provider = "mtn" | "airtel";

export default function WithdrawalPage() {
  const { savingsWallet, investmentWallet, withdrawFromWallet } =
    useWalletStore();

  const [provider, setProvider] = useState<Provider>("mtn");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const walletId = savingsWallet?.id || investmentWallet?.id;
  const walletBalance =
    savingsWallet?.balance || investmentWallet?.balance || 0;

  const handleWithdraw = () => {
    if (!walletId || !phoneNumber || !amount) {
      toast.error("Please fill all fields.");
      return;
    }

    if (Number(amount) > walletBalance) {
      toast.error("Insufficient balance.");
      return;
    }

    setLoading(true);
    toast.loading("Processing withdrawal...");

    setTimeout(() => {
      withdrawFromWallet(walletId, Number(amount));

      toast.dismiss();
      toast.success(
        `Withdrawal of UGX ${Number(amount).toLocaleString()} successful!`
      );

      setLoading(false);
      setAmount("");
      setPhoneNumber("");
    }, 1500);
  };

  return (
    <div className="max-w-xl text-text-primary mx-auto py-8 space-y-8">

      {/* Provider */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Choose Provider</h2>
        <ProviderRadioGroup value={provider} onChange={setProvider} />
      </section>

      {/* Mobile Number */}
      <section>
        <LabeledInput
          label="Mobile Number"
          placeholder="07XXXXXXXX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </section>

      {/* Withdrawal limits */}
      <section className="p-4 rounded-xl bg-card text-sm">
        <p>Minimum withdrawal: UGX 1,000</p>
        <p>Maximum withdrawal: UGX 4,000,000</p>
      </section>

      {/* Amount */}
      <section>
        <LabeledInput
          label="Amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </section>

      {/* CTA */}
      <button
        onClick={handleWithdraw}
        disabled={loading}
        className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold disabled:opacity-50"
      >
        {loading ? "Processing..." : "Complete Withdrawal"}
      </button>
    </div>
  );
}
