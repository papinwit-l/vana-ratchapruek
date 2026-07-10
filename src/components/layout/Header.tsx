// components/layout/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

const NAV_LEFT = [
  { label: "CONCEPT", href: "#concept" },
  { label: "PROJECT INFO", href: "#project-info" },
  { label: "HOUSE TYPES", href: "#house-types" },
];

const NAV_RIGHT = [
  { label: "FACILITIES", href: "#facilities" },
  { label: "GALLERY", href: "#gallery" },
  { label: "LOCATION", href: "#location" },
  { label: "CONTACT", href: "#lead-form" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  const navTextClass =
    scrolled || mobileOpen
      ? "text-on-primary hover:text-accent"
      : "text-on-primary/70 hover:text-accent";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${
        scrolled || mobileOpen
          ? "bg-primary/95 backdrop-blur-sm border-accent-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Left nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LEFT.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-[11px] font-normal tracking-[0.15em] transition-colors duration-300 ${navTextClass}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <Link
            href="#hero"
            className="flex items-center gap-3 lg:absolute lg:left-1/2 lg:-translate-x-1/2 h-full"
            onClick={handleNavClick}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-base font-bold bg-gradient-to-br from-accent to-accent-hover text-primary">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold tracking-[3px] text-on-primary">
                VANA
              </span>
              <span className="text-[9px] tracking-[2px] uppercase text-accent">
                RATCHAPRUEK
              </span>
            </div>
          </Link>

          {/* Right nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_RIGHT.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-[11px] font-normal tracking-[0.15em] transition-colors duration-300 ${navTextClass}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-6 h-[1.5px] bg-on-primary transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-on-primary transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-on-primary transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </button>
        </nav>
      </div>
      {/* Theme switcher — absolute positioned, outside nav flow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-3 pr-6">
        <div className="w-px h-5 bg-on-primary/20" />
        <ThemeSwitcher />
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-primary transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-8 py-16 bg-primary/95">
          {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-display text-lg tracking-[0.25em] text-on-primary hover:text-accent transition-colors duration-300"
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {/* Theme switcher in mobile menu */}
          <li className="pt-4 border-t border-accent-border">
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
}
