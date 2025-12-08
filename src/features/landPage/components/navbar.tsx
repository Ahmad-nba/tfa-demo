"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import { navItems } from "@/features/landPage/lib/navItems";
import Image from "next/image";
import logo from "../../../../public/android-chrome-192x192.png";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fullName = "John Doe";
  const userRole = "Guest";
  const pathname = usePathname();

  // helper function to controll the scroll behavior for same-page hash links
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    // same-page hash like "#features"
    if (path.startsWith("#")) {
      e.preventDefault();
      const id = path.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" }); // smooth slide
      }
      setIsOpen(false);
    } else {
      // normal navigation for real routes
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full fixed top-0 px-4 py-4 shadow-md bg-background text-text-primary flex justify-between items-center  z-40">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <span className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={logo}
              alt="TFA Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </span>

          <span className="font-bold leading-tight">
            Trust Friend&apos;s <br /> Association
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-3">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              scroll={false}
              onClick={(e) => handleNavClick(e, path)}
              className={clsx(
                "px-3 py-1 text-base transition cursor-pointer flex items-center space-x-1",
                pathname === path
                  ? "text-text-primary font-semibold border-b-2 border-accent2"
                  : "hover:border-b-2 text-text-secondary"
              )}
            >
              <span>{label}</span>
            </Link>
          ))}

          {/* User section */}
          {isLoggedIn && (
            <section className="flex items-center space-x-2">
              <RxDividerVertical className="size-6 text-text-muted" />
              <FaUser />
              <p>
                {fullName} ({userRole})
              </p>

              <IoLogOutOutline
                className="size-6 cursor-pointer hover:text-accent2 transition"
                onClick={() => setIsLoggedIn(false)}
              />
            </section>
          )}

          {!isLoggedIn && (
            <button className="bg-success text-text-primary px-4 py-2 rounded-lg hover:bg-success/80 transition">
              Login
            </button>
          )}
        </div>

        {/* Hamburger button */}
        <button
          className="sm:hidden text-2xl cursor-pointer focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* === Mobile Overlay (Tailwind-only blur) === */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* === Mobile Drawer === */}
      <div
        className={clsx(
          "fixed top-0 right-0 w-3/4 h-full bg-background p-6 shadow-lg flex flex-col justify-between transform transition-transform duration-300 z-50 sm:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg text-accent2 font-bold tracking-wide">
              Menu
            </h2>
            <FaTimes
              className="text-2xl cursor-pointer hover:text-accent2 transition"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col space-y-5 text-base">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                scroll={false}
                onClick={(e) => handleNavClick(e, path)}
                className={clsx(
                  "transition duration-150 pb-1",
                  pathname === path
                    ? "text-text-primary font-semibold border-b-2 border-accent2"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Auth Section */}
        <div className="mt-10 border-t border-text-muted/20 pt-6">
          {isLoggedIn ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaUser />
                <p>
                  {fullName} ({userRole})
                </p>
              </div>
              <IoLogOutOutline
                className="text-2xl cursor-pointer hover:text-accent2 transition"
                onClick={() => setIsLoggedIn(false)}
              />
            </div>
          ) : (
            <button className="w-full bg-success text-text-primary py-2 rounded-lg hover:bg-success/80 transition">
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
