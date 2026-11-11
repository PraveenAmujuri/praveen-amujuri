"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "/work", href: "#work", num: "01" },
    { label: "/services", href: "#services", num: "02" },
    { label: "/apps", href: "#apps", num: "03" },
    { label: "/lab", href: "#lab", num: "04" },
    { label: "/instrument", href: "#instrument", num: "05" },
    { label: "/contact", href: "#contact", num: "06" },
  ];

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-6 py-5 text-[#f4f5f7] md:px-14">
          <Link
            href="/"
            className="font-display pointer-events-auto inline-block py-2 text-[26px] font-thin leading-none tracking-[-0.03em] lowercase"
            aria-label="praveen — home"
          >
            praveen<sup className="text-[11px] font-normal">®</sup>
          </Link>

          <nav aria-label="Primary" className="pointer-events-auto hidden md:flex items-center">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="eyebrow ml-2 px-3 py-3.5 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#f4f5f7] hover:text-[#101113]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://praveenai.tech"
              target="_blank"
              rel="noreferrer"
              className="eyebrow ml-3 px-3 py-3.5 text-[#f4f5f7] transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#f4f5f7] hover:text-[#101113]"
            >
              praveenai.tech ↗
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`block h-px w-6 bg-[#f4f5f7] transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-[#f4f5f7] transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#101113] px-6 pt-28 text-[#f4f5f7] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display group flex items-baseline gap-5 border-b border-[#f4f5f7]/20 py-5 text-4xl"
            >
              <span className="eyebrow text-[#f4f5f7]/50">{item.num}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <a
          href="https://praveenai.tech"
          target="_blank"
          rel="noreferrer"
          className="eyebrow mt-10 inline-block bg-[#0037ff] px-5 py-3.5 text-white"
        >
          praveenai.tech ↗
        </a>
        <a
          href="mailto:contact@praveenai.tech"
          className="eyebrow link-underline mt-6 block w-fit text-[#f4f5f7]/70"
        >
          contact@praveenai.tech
        </a>
      </div>
    </>
  );
}
