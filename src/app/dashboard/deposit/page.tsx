
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useWalletStore } from "@/features/wallet/store/walletStore";
import ProviderRadioGroup from "@/features/deposit/components/providerSelect";
import LabeledInput from "@/features/deposit/components/inputs";


export default function DepositPage() {
  const { savingsWallet, investmentWallet, depositToWallet } =
    useWalletStore();

  const [provider, setProvider] = useState<"mtn" | "airtel">("mtn");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const [loading, setLoading] = useState(false);

  const walletId = savingsWallet?.id || investmentWallet?.id;

  const handleDeposit = () => {
    if (!phoneNumber || !amount || !walletId) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    toast.loading("Processing deposit...");

    setTimeout(() => {
      // Update store
      depositToWallet(walletId, Number(amount));

      toast.dismiss();
      toast.success(`Deposit of UGX ${Number(amount).toLocaleString()} successful!`);

      setLoading(false);
      setAmount("");
      setPhoneNumber("");
    }, 2000);
  };

  return (
    <section className="max-w-xl mx-auto py-8 text-text-primary space-y-8">

      {/* Provider */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Choose Provider</h2>
        <ProviderRadioGroup value={provider} onChange={setProvider} />
      </section>

      {/* Phone Number */}
      <section>
        <LabeledInput
          label="Mobile Number"
          placeholder="07XXXXXXXX"
          className="bg-card border-border p-2 rounded" 
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        />
      </section>

      {/* Deposit Limits */}
      <section className="p-4 rounded-xl bg-card text-sm">
        <p>Minimum deposit: UGX 500</p>
        <p>Maximum deposit: UGX 5,000,000</p>
      </section>

      {/* Amount */}
      <section>
        <LabeledInput
          label="Amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
        />
      </section>

      {/* CTA */}
      <button
        onClick={handleDeposit}
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
      >
        {loading ? "Processing..." : "Complete Deposit"}
      </button>
    </section>
  );
}

