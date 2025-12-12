import { Wallet, PiggyBank, TrendingUp, Landmark } from "lucide-react";
import { useWalletStore } from "@/features/wallet/store/walletStore";
export const summaryCards = [
  {
    label: "Total balance",
    value: useWalletStore.getState().totalWallet,
    change: "-2% last month",
    changeType: "down",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    label: "Savings",
    value: "UGX 000.000.000",
    change: "+2% last month",
    changeType: "up",
    href: "/dashboard/savings",
    icon: PiggyBank,
  },
  {
    label: "Loans",
    value: "UGX 000.000.000",
    change: "-1% pending",
    changeType: "down",
    href: "/dashboard/loans",
    icon: Landmark
  },
  {
    label: "Investments",
    value: "UGX 000.000.000",
    change: "+2% last month",
    changeType: "up",
    href: "/dashboard/investments",
    icon: TrendingUp
  },
];