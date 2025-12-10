import { FaSackDollar } from "react-icons/fa6";

import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdLogout,
  MdSupport,
  MdSettings,
  MdPayment,
  MdListAlt,
} from "react-icons/md";

export const navConfig = {
  // roles to be defined soon
//   ADMIN: [
//     { label: "Home", path: "/" },
//     { label: "Patient Information", path: "/Dashboard/admin" },
//     { label: "Status Update", path: "/Dashboard/doctor/PatientStatusUpdate" },
//     { label: "Status Board", path: "/Dashboard/statusboard" },
//   ],
  USER: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Wallet", path: "/wallet" },
    { label: "Savings", path: "/savings" },
    { label: "Investments", path: "/investments" },
    { label: "Loans", path: "/loans" },
    { label: "Withdraws", path: "/withdrawals" },
    { label: "Transactions", path: "/transactions" },
    { label: "Policies", path: "/policies" },
  ],
  GUEST: [
    { label: "Home", path: "/" },
    { label: "Policies", path: "/" },
  ],
};

export const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
  { label: "My wallet", href: "/wallet", icon: <MdAccountBalanceWallet /> },
  { label: "Investments", href: "/investments", icon: <MdTrendingUp /> },
  { label: "Loans", href: "/loans", icon: <FaSackDollar /> },
  { label: "Withdrawals", href: "/withdrawals", icon: <MdPayment /> },
  { label: "Transactions", href: "/transactions", icon: <MdListAlt /> },
  
];
export const secondaryNavLinks = [
  { label: "Settings", href: "/", icon: <MdSettings /> },
  { label: "Help & support", href: "/", icon: <MdSupport /> },
  { label: "Logout", href: "/", icon: <MdLogout /> },
];