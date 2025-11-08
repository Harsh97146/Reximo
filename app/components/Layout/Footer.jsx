"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const informationLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const contactInfo = [
  { label: "./img/items/facebook.png" },
  { label: "./img/items/instagram.png" },
  { label: "./img/items/twet.png" },
];

const categories = ["Ceramic", "Waterproofing", "Repairs", "Maintenance", "Stonecare"];

// 🏭 New static data for Manufacturing & Warehouse
const infraData = {
  Manufacturing: ["Unit - 1 Gujarat", "Unit - 2 Maharashtra"],
  Warehouse: ["Surat"],
};

const Footer = () => {
  const [open, setOpen] = useState(null);
  const [infraOpen, setInfraOpen] = useState(null);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(null);
  const [year, setYear] = useState("");

  useEffect(() => setYear(new Date().getFullYear()), []);

  const fetchProducts = async (category) => {
    try {
      setLoadingCategory(category);
      const res = await fetch(`http://localhost:3001/api/products?category=${category}`);
      const data = await res.json();
      setProductsByCategory((prev) => ({ ...prev, [category]: data }));
    } catch (err) {
      console.error(`Error fetching products for ${category}:`, err);
      setProductsByCategory((prev) => ({ ...prev, [category]: [] }));
    } finally {
      setLoadingCategory(null);
    }
  };

  const handleCategoryClick = (category) => {
    if (open === category) setOpen(null);
    else {
      setOpen(category);
      if (!productsByCategory[category]) fetchProducts(category);
    }
  };

  const handleInfraClick = (section) => {
    setInfraOpen(infraOpen === section ? null : section);
  };

  return (
    <footer className="bg-[#222427] text-white sm:mt-16 mt-12 sm:pt-14 pt-10">
      <div className="ct-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
          {/* Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 lg:gap-[10px]">
              <div className="relative w-[48px] h-[48px] sm:w-[58px] sm:h-[58px]">
                <img src="./img/logo.png" alt="Rexino Logo" className="w-full h-full object-cover" />
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
            </p>
          </div>

          {/* Quick & Info Links */}
          <div className="w-full">
            <h3 className="text-[#d1b56c] mb-4 text-xl font-semibold">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {[...quickLinks, ...informationLinks].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white font-normal transition-all duration-300 hover:text-[var(--primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Products */}
          <div className="">
            <h3 className="text-[#d1b56c] mb-4 text-xl font-semibold">Our Products</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className="w-full text-left text-white font-medium text-base flex justify-between items-center transition-all duration-300 hover:text-[var(--primary)]"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                    <span>{open === category ? <FaChevronUp /> : <FaChevronDown />}</span>
                  </button>

                  {open === category && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {loadingCategory === category ? (
                        <li className="text-sm text-gray-400">Loading...</li>
                      ) : productsByCategory[category]?.length > 0 ? (
                        productsByCategory[category].slice(0, 3).map((item) => (
                          <li key={item._id}>
                            <Link
                              href={`/product/${item._id}`}
                              className="text-sm text-white font-normal transition-all duration-300 hover:text-[var(--primary)]"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-gray-400">No products</li>
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure Section */}
          <div className="space-y-2">
            <h3 className="text-[#d1b56c] mb-4 text-xl font-semibold">Infrastructure</h3>
            {Object.entries(infraData).map(([section, items]) => (
              <div key={section}>
                <button
                  className="w-full text-left text-white font-medium text-base flex justify-between items-center transition-all duration-300 hover:text-[var(--primary)]"
                  onClick={() => handleInfraClick(section)}
                >
                  {section}
                  <span>{infraOpen === section ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>

                {infraOpen === section && (
                  <ul className="mt-1 ml-4 space-y-1">
                    {items.map((item) => (
                      <li key={item} className="text-sm text-white font-normal hover:text-[var(--primary)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-[#d1b56c] mb-4 text-xl font-semibold">Social Media</h3>
            <ul className="flex items-center gap-3">
              {contactInfo.map((item) => (
                <li
                  key={item.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.10)] transition-all duration-300 hover:bg-[var(--primary)] cursor-pointer"
                >
                  <img src={item.label} alt="icon" className="w-[18px] h-[18px] object-contain" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-3 w-full text-sm text-white font-normal text-center bg-[rgba(255,255,255,0.04)] sm:mt-16 mt-10">
        Copyright @{year} rexino. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
