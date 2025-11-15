"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useRouter } from "next/navigation";


const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/product" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Dealers", href: "/dealers" },
];

const informationLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-condition" },
  { label: "Download Brochure", href: "/brochure/1-1.pdf", download: true },
];

const contactInfo = [
  // { label: "Facebook", icon: "/img/items/facebook.png", href: "https://www.facebook.com/" },
  { label: "Instagram", icon: "/img/items/instagram.png", href: "https://www.instagram.com/rexino_chemical/" },
  { label: "Google", icon: "/img/items/google-map-icon.webp", href: "https://maps.app.goo.gl/6j2azcdUGt5YYWag7?g_st=awb" },
];

const categories = ["Ceramic", "Waterproofing", "Repairs", "Maintenance", "Stonecare"];

// 🏭 New static data for Manufacturing & Warehouse
const infraData = {
  Manufacturing: ["Unit - 1 Gujarat", "Unit - 2 Maharashtra"],
  Warehouse: ["Surat"],
};

const Footer = () => {
  const router = useRouter();
  const [open, setOpen] = useState(null);
  const [infraOpen, setInfraOpen] = useState(null);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(null);
  const [year, setYear] = useState("");

  useEffect(() => setYear(new Date().getFullYear()), []);

  const fetchProducts = async (category) => {
    try {
      setLoadingCategory(category);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${category}`);
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
    <footer className="bg-[#222427] text-white mt-8 sm:mt-12 md:mt-16 lg:mt-20 pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16">
      <div className="ct-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 sm:gap-8 md:gap-10 lg:gap-x-5 xl:gap-x-8 gap-y-8 sm:gap-y-10">
          {/* Logo */}
          <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 lg:gap-[10px] xl:gap-3">
              <div className="relative w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[52px] md:h-[52px] lg:w-[58px] lg:h-[58px] xl:w-[64px] xl:h-[64px]">
                <img src="/img/logo.png" alt="Rexino Logo" className="w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-[120px] bg-blue-secondary mix-blend-hue" />
              </div>
              <div className="flex flex-col">
                <span className="text-green-primary font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[21px] xl:text-[24px] 2xl:text-[28px] leading-tight font-dm-sans">
                  Rexino
                </span>
                <span className="text-green-primary font-normal text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] leading-tight font-dm-sans">
                  Chemical Industries
                </span>
              </div>
            </Link>
            <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg font-normal text-white w-full max-w-full sm:max-w-[373px] lg:max-w-[400px] xl:max-w-[450px]">
              Rexino Chemical Industries delivers innovative tile fixing, stone care, maintenance, and waterproofing solutions trusted by architects, engineers, and homeowners across India for over three decades.
            </p>
          </div>

          {/* Quick & Info Links */}
          <div className="w-full">
            <h3 className="text-[#d1b56c] mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-semibold">Quick Links</h3>
            <ul className="flex flex-col gap-2 sm:gap-2.5">
              {[...quickLinks, ...informationLinks].map((link) => (
                <li key={link.label}>
                  {link.download ? (
                    <a
                      href={link.href}
                      download
                      className="text-sm sm:text-base md:text-lg text-white font-normal transition-all duration-300 hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base md:text-lg text-white font-normal transition-all duration-300 hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Products */}
          <div className="">
            <h3 className="text-[#d1b56c] mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-semibold">Our Products</h3>
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
            <h3 className="text-[#d1b56c] mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-semibold">Infrastructure</h3>
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
                      <li onClick={() => router.push('/contact-us')} key={item} className="text-sm cursor-pointer text-white font-normal hover:text-[var(--primary)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-[#d1b56c] mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-semibold">Social Media</h3>
            <ul className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.10)] transition-all duration-300 hover:bg-[var(--primary)] cursor-pointer"
                    aria-label={item.label}
                  >
                    <img src={item.icon} alt={item.label} className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px] object-contain" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-5 w-full text-xs sm:text-sm md:text-base text-white font-normal text-center bg-[rgba(255,255,255,0.04)] mt-8 sm:mt-12 md:mt-14 lg:mt-16">
        Copyright @2007 rexino. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
