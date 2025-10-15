"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fallbackPages, navLinks } from "./helper";
import { FaBars, FaRegCalendarAlt, FaTimes } from "react-icons/fa";
import useIsMobile from "./../../hooks/useIsMobile";
import { formatDate } from "./../../utils/date";

const Header = ({ image, imageAlt, title, date }) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const currentPage = useMemo(() => {
    return (
      navLinks.find((link) => link.href === pathname) || fallbackPages[pathname]
    );
  }, [pathname]);

  const pageTitle = title || currentPage?.title || "";
  const bgImage = currentPage?.bgImage || "/img/home.png";
  const bgVideo = isMobile
    ? currentPage?.bgMobileVideo || currentPage?.bgVideo || null
    : currentPage?.bgVideo || null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (bgVideo) {
      window.scrollTo({ top: 0 });
    }
  }, [bgVideo]);

  return (
    <header
      className={`relative w-full ${
        bgVideo ? "h-screen" : "h-[60vh]"
      } overflow-hidden`}
    >
      <div className="absolute inset-0">
        {bgVideo ? (
          <>
            <video
              src={bgVideo}
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <>
            <Image
              src={image || bgImage}
              alt={imageAlt || pageTitle || "Header Background"}
              fill
              priority
              className="object-cover w-full"
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        )}
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-30 w-full px-4 sm:px-6">
        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex items-center justify-between w-full px-2 py-2 lg:px-10">
          {/* Logo */}
          <Link href="/" passHref>
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={135}
              height={135}
              className="z-40 cursor-pointer"
            />
          </Link>

          {/* Centered Nav */}
          <ul className="flex justify-center flex-1 space-x-3 lg:space-x-6 text-white font-medium ml-10">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`transition text-sm lg:text-base whitespace-nowrap px-2 ${
                      isActive
                        ? "font-bold text-brand-red"
                        : "hover:text-brand-red"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Brochure Button */}
          <div className="ml-auto">
            <Link
              href="/brochure"
              className="bg-brand-red hover:bg-brand-red/90 text-white px-5 py-2 rounded-full transition"
            >
              Brochure
            </Link>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden relative z-50 flex justify-between items-center py-2">
          <Link
            href="/"
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 50);
            }}
          >
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={135}
              height={135}
              className="z-40 cursor-pointer"
            />
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
            >
              {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
            <Link
              href="/brochure"
              className="bg-brand-red text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Brochure
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-brand-red text-white text-sm font-medium flex flex-col md:hidden z-20 shadow-lg"
          >
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-6 py-4 ${
                    isActive ? "bg-black text-white" : "bg-brand-red/90"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      <div className="absolute inset-0 z-10 flex items-end justify-center mb-20 text-center px-4">
        <div>
          <h1 className="text-white text-2xl md:text-4xl font-semibold leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {Array.isArray(pageTitle)
              ? pageTitle.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx !== pageTitle.length - 1 && <br />}
                  </span>
                ))
              : pageTitle}
          </h1>
          {date && (
            <div className="flex justify-center items-center gap-2 mt-3 text-white text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <FaRegCalendarAlt />
              <span>{formatDate(date)}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
