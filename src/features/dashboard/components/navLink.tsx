"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <a
      href={href}
      className={clsx(
        "flex items-center gap-4 px-4 py-3 rounded-xl text-[16px] font-medium transition-colors",
        active
          ? "bg-[#1A2433] text-white shadow-sm"
          : "text-gray-400 hover:bg-[#141C27] hover:text-white"
      )}
    >
      <span className="flex items-center text-[20px]">{icon}</span>
      {children}
    </a>
  );
}

export function SecondaryNavLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <a
      href={href}
      className={clsx(
        "flex  items-center gap-4 px-4 sm:py-1.5 py-0.5 rounded-lg text-[15px] transition-colors",
        active
          ? "bg-[#141C27] text-white"
          : "text-gray-500 hover:bg-[#141C27] hover:text-white"
      )}
    >
      <span className="flex items-center opacity-70 text-[20px]">
        {icon}
      </span>
      {children}
    </a>
  );
}
