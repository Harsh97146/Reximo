"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import CommonButton from "../ul/Button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_4px_10px_0_rgba(0,0,0,0.10)] sm:py-4 py-3">
      <div className="ct-container">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-[10px]">
            <div className="relative w-[48px] h-[48px] sm:w-[58px] sm:h-[58px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/316cb117ddbaffc9ee9b85a6286b81a6217f2006?width=116"
                alt="Rexino Logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-[120px] bg-blue-secondary mix-blend-hue" />
            </div>
            <div className="flex flex-col">
              <span className="text-green-primary font-bold text-[16px] sm:text-[21px] leading-tight font-dm-sans">
                Rexino
              </span>
              <span className="text-green-primary font-normal text-[11px] sm:text-[14px] leading-tight font-dm-sans">
                Chemical Industries
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#111112]  text-base font-normal leading-[27px] hover:text-[var(--primary)] transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-green-primary hover:text-[var(--primary)] transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <CommonButton
              label="Download Brochure"
              className="sm:!py-[10px] sm:!px-8 lg:block hidden"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 py-4">
          <nav className="flex flex-col gap-4 border-t border-gray-200 pt-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#111112] text-lg font-normal leading-[27px] hover:text-[var(--primary)] transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <CommonButton
            label="Download Brochure"
            className="sm:!py-[10px] sm:!px-8 mt-8"
          />
        </div>
      )}
    </header>
  );
}
