"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronDown,
  FaChevronUp,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

// Sample data (replace with your real data or imports)
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const informationLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const products = [
  { id: 1, name: "sbr latex" },
  { id: 2, name: "rx-80 epoxy adhesive" },
  { id: 3, name: "sbr max" },
  { id: 4, name: "rx-300 tile adhesive" },
  { id: 5, name: "elasto l" },
  { id: 6, name: "rx-310 tiles adhesive" },
  { id: 7, name: "elasto hs" },
  { id: 8, name: "rx-320 tiles & stone adhesive" },
  { id: 9, name: "pu black" },
  { id: 10, name: "rx-330 stone adhesive" },
  { id: 11, name: "pu sealant" },
  { id: 12, name: "rx-340 heavy stone adhesive" },
];

const contactInfo = [
  { label: "./img/items/facebook.png" },
  { label: "./img/items/instagram.png" },
  { label: "./img/items/twet.png" },
];

const brandingLinks = [
  { src: "/img/brand1.png", alt: "Brand 1" },
  { src: "/img/brand2.png", alt: "Brand 2" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "F" },
  { label: "Twitter", href: "https://twitter.com", icon: "T" },
];

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");

  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="bg-[#222427] text-white sm:mt-16 mt-12  sm:pt-14 pt-10">
      <div className="ct-container ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
          {/* Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 lg:gap-[10px]">
              <div className="relative w-[48px] h-[48px] sm:w-[58px] sm:h-[58px]">
                <img
                  src="./img/logo.png"
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
            <p className="mt-4 text-base font-normal text-white w-full max-w-[373px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna.
            </p>
          </div>

          {/* Quick & Info Links */}
          <div className="w-full ">
            <h3 className="text-[#d1b56c] mb-4 text-xl font-semibold">
              Quick Links
            </h3>
            <ul className="flex flex-col  gap-2">
              {[...quickLinks, ...informationLinks].map((link) => (
                <li key={link.label} className="p-0 m-0">
                  <Link
                    href={link.href}
                    className="text-base text-white font-normal transition-all duration-300 hover:text-[var(--primary)]"
                    target={link.newTab ? "_blank" : undefined}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-2 ">
            <h3 className="text-[#d1b56c] mb-4 text-xl font-semibold">
              Our Products
            </h3>
            <ul className="grid sm:grid-cols-[100px_auto] gap-2">
              {products.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/product/${item.id}`}
                    className="text-base text-white font-normal transition-all duration-300 hover:text-[var(--primary)]"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-[#d1b56c] mb-4 text-xl font-semibold">
              Social Media
            </h3>
            <ul className="flex items-center gap-3">
              {contactInfo.map((item) => (
                <li
                  key={item.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.10)] transition-all duration-300 hover:bg-[var(--primary)] cursor-pointer"
                >
                  <img
                    src={item.label}
                    alt="icon"
                    className="w-[18px] h-[18px] object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="p-3 w-full text-sm text-white font-normal text-center bg-[rgba(255,255,255,0.04)] sm:mt-16 mt-10">
        Copyright @2007 rexino . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
