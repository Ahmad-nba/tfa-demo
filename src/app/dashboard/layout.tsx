"use client";

import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import NavLink, { SecondaryNavLink } from "../../features/dashboard/components/navLink";
import {
  navLinks,
  secondaryNavLinks,
} from "@/features/dashboard/lib/navConfig";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = navLinks;
  const user = {
    name: "John Doe",
    accountType: "Premium Member",
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* ---------------- DESKTOP SIDEBAR ---------------- */}
      <aside className="hidden md:flex md:w-[25%] flex-col bg-card border-r rounded-r-2xl shadow-lg">
        {/* Fixed user block */}
        <div className="p-4 h-20 flex items-center border-b border-border shadow rounded-b-lg shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-text-primary font-semibold">{user.name}</p>
              <p className="text-xs text-text-secondary">{user.accountType}</p>
            </div>
          </div>
        </div>

        {/* NON-SCROLL content */}
        <div className="flex flex-col justify-between flex-1 py-3 px-4 overflow-hidden">
          {/* Primary nav */}
          <nav className="space-y-1 mt-4">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href} icon={item.icon}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Secondary nav */}
          <nav className="border-t border-t-text-muted pt-3">
            {secondaryNavLinks.map((item) => (
              <SecondaryNavLink key={item.label} href={item.href} icon={item.icon}>
                {item.label}
              </SecondaryNavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* MOBILE HEADER */}
        <div className="md:hidden h-16 px-4 flex items-center justify-between border-b bg-card">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="h-8 w-8 text-text-primary stroke-3" />
          </button>
        </div>

        {/* ---------------- MOBILE OVERLAY ---------------- */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}

        {/* ---------------- MOBILE SIDEBAR ---------------- */}
        <aside
          className={`fixed z-50 top-0 left-0 h-full w-64 bg-card border-r shadow-xl transform transition-transform duration-300 md:hidden 
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Close button */}
          <div className="h-16 flex items-center px-4 border-b border-border rounded-b-lg shadow justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-text-primary font-semibold">{user.name}</p>
                <p className="text-xs text-text-secondary">{user.accountType}</p>
              </div>
            </div>

            <button onClick={() => setMobileOpen(false)}>
              <X className="h-6 w-6 text-text-primary stroke-3" />
            </button>
          </div>

          <div className="flex flex-col justify-between flex-1 py-3 px-4 overflow-y-auto">
            {/* Primary nav */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Secondary nav */}
            <nav className="border-t border-t-text-muted pt-3 mt-3">
              {secondaryNavLinks.map((item) => (
                <SecondaryNavLink
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.label}
                </SecondaryNavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}