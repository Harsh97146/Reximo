"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  brandingLinks,
  contactInfo,
  informationLinks,
  quickLinks,
  socialLinks,
} from "./helper";
import { products } from "../../utils/products";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-cover bg-center bg-no-repeat bg-brand-red text-white">
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          backgroundImage:
            "linear-gradient(150deg, #000000 0%, #FFFFFF00 100%)",
          opacity: 1,
        }}
      ></div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="space-y-4">
              <div className="mb-6 flex flex-col items-center justify-center">
                <Link href="/" passHref>
                  <div className="inline-block">
                    <Image
                      src="/img/logo.png"
                      alt="Logo"
                      width={135}
                      height={135}
                      className="z-40"
                    />
                  </div>
                </Link>
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-white">
                    Rexino Chemical Industries
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {informationLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition duration-300"
                      target={link.newTab ? "_blank" : undefined}
                      rel={link.newTab ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 lg:col-span-2">
              {/* Mobile dropdown */}
              <div className="sm:hidden">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex justify-between items-center w-full text-lg font-semibold text-white mb-2 bg-gray-800 px-4 py-2 rounded-lg shadow-md"
                >
                  <span>Our Products</span>
                  {open ? (
                    <FaChevronUp className="text-gray-300" />
                  ) : (
                    <FaChevronDown className="text-gray-300" />
                  )}
                </button>

                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    open ? "opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="space-y-2 bg-gray-900 rounded-lg p-3 shadow-lg">
                    {products.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/product/${item.id}`}
                          className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-300 pb-3"
                          onClick={() => setOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Desktop grid */}
              <div className="hidden sm:block">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Our Products
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {products.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/product/${item.id}`}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start space-x-3">
                    {item.icon}
                    {item.href ? (
                      item.href.startsWith("/") ? (
                        <Link
                          href={item.href}
                          className="text-gray-300 text-sm hover:text-white transition"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="text-gray-300 text-sm hover:text-white transition"
                        >
                          {item.value}
                        </a>
                      )
                    ) : (
                      <p className="text-gray-300 text-sm">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              {/* Copyright */}
              <div className="text-sm text-white">
                © 2007, All Rights Reserved | Rexino Chemical Industries
              </div>
              {/* Branding Icons */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 lg:space-x-10">
                {brandingLinks.map((item) => (
                  <div key={item.alt} className="relative w-[80px] h-[60px]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex items-center space-x-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-3 border rounded-full transition duration-300 hover:bg-white hover:text-black"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
