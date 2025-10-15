"use client";

import React from "react";
import { contactInfo } from "./Layout/helper";

const ContactUsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-gray-800">

      {/* Rexino Description */}
      <p className="mb-6 text-gray-700">
        Rexino has been playing an integral role in your homes, offices, and
        lives. It is a name synonymous with strength and reliability, with
        around 3 decades of experience in the ceramic and construction chemicals
        field.
      </p>
      <p className="mb-6 text-gray-700">
        We focus on delivering a comprehensive range of Tile Fixing and Care,
        Stone Fixing and Care products. Rexino also offers products in the
        categories of Building Repair, Grouting Solutions, and Waterproofing. We
        combine beauty with endurance, ensuring high-quality solutions for
        residential, commercial, and industrial projects.
      </p>
      <p className="mb-6 text-gray-700">
        Our world-class products allow homeowners, architects, and builders to
        execute their vision with confidence. Our wide network of dealers and
        stockists across India and beyond ensures timely delivery and strong
        trust with our consumers.
      </p>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="flex items-center p-6 bg-brand-red rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="mr-4 text-2xl">{info.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-white">{info.label}</h3>
              {info.href ? (
                <a href={info.href} className="text-white hover:underline">
                  {info.value}
                </a>
              ) : (
                <p className="text-white">{info.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactUsSection;
