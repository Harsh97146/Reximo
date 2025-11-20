"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import CommonButton from "../ul/Button";
import { FiDownload } from "react-icons/fi";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Products", href: "/product" },
    { label: "Blogs", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_4px_10px_0_rgba(0,0,0,0.10)] py-6 sm:py-3 md:py-7 lg:py-6 xl:py-5 2xl:py-6">
      <div className="ct-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-[10px] xl:gap-3"
          >
            <div className="relative flex flex-col justify-center items-center w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[52px] md:h-[52px] lg:w-[58px] lg:h-[58px] xl:w-[64px] xl:h-[64px] 2xl:w-[72px] 2xl:h-[72px] ">
              <img
                src="/img/logo.png"
                alt="Rexino Logo"
                className="w-full h-full object-cover"
              />
              <span className="text-green-primary font-bold text-[9px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] leading-tight font-dm-sans">
                Chemical
              </span>
              <div className="absolute inset-0 rounded-[120px] bg-blue-secondary mix-blend-hue" />
            </div>
            <div className="flex flex-col">
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#111112] text-sm lg:text-base xl:text-lg 2xl:text-xl font-normal leading-[27px] hover:text-[var(--primary)] transition-all duration-300 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 align-items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-green-primary hover:text-[var(--primary)] transition-all duration-300 flex-shrink-0"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Download Button - Render only on desktop */}
            {isDesktop && (
              <div className="">
                <CommonButton
                  label="Download Brochure"
                  href="/brochure/1-1.pdf"
                  download
                  onClick={() => setMobileMenuOpen(false)}
                  leadingIcon={<FiDownload className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 sm:px-6 py-4 sm:py-5">
          <nav className="flex flex-col gap-3 sm:gap-4 border-t border-gray-200 pt-4 sm:pt-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#111112] text-base sm:text-lg font-normal leading-[27px] hover:text-[var(--primary)] transition-all duration-300 py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 sm:mt-8">
            <CommonButton
              label="Download Brochure"
              href="/brochure/1-1.pdf"
              download
              onClick={() => setMobileMenuOpen(false)}
              leadingIcon={<FiDownload className="w-5 h-5" />}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      )}
    </header>
  );
}
