"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Rexino known for?",
      answer:
        "Rexino is known for its strong legacy of over 3 decades in the ceramic and construction chemicals field, delivering high-quality products for homes, offices, and industrial utilities.",
    },
    {
      question: "What types of products does Rexino offer?",
      answer:
        "Rexino offers a comprehensive range of products including Tile Fixing and Care, Stone Fixing and Care, Building Repair, Grouting Solutions, and Waterproofing.",
    },
    {
      question: "What makes Rexino products unique?",
      answer:
        "Rexino combines beauty with endurance, offering products that are reliable and designed to deliver long-lasting results, while also supporting innovative applications like tile-on-tile installation with its Non-Skid Adhesive (NSA) solution.",
    },
    {
      question: "Where are Rexino products used?",
      answer:
        "Rexino products are used in residential properties, commercial establishments, industrial projects, and infrastructural utilities across India and other parts of the world.",
    },
    {
      question: "How does Rexino ensure product quality?",
      answer:
        "Rexino invests in extensive research and development to ensure high-quality products, and maintains a wide network of dealers and stockists to deliver timely solutions to customers.",
    },
    {
      question: "What is Rexino's commitment to its customers?",
      answer:
        "Rexino shares a strong bond of trust with its customers and aims to fulfill their vision by providing world-class products that allow homeowners, architects, and builders to execute their ideas flawlessly.",
    },
  ];

  return (
    <section className="py-12 px-4 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* First Column */}
        <div className="space-y-4">
          {faqData.slice(0, 3).map((faq, index) => (
            <div key={index} className=" overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-200 cursor-pointer rounded-2xl ${
                  openIndex === index
                    ? "bg-brand-red text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200"
                }`}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium pr-4">
                  {index + 1}. {faq.question}
                </span>
                <span className="flex-shrink-0">
                  {openIndex === index ? (
                    <FaMinus className="w-4 h-4" />
                  ) : (
                    <FaPlus className="w-4 h-4" />
                  )}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 py-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Second Column */}
        <div className="space-y-4">
          {faqData.slice(3).map((faq, index) => (
            <div key={index + 3} className=" overflow-hidden">
              <button
                onClick={() => toggleItem(index + 3)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-200 cursor-pointer rounded-2xl ${
                  openIndex === index + 3
                    ? "bg-brand-red text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200"
                }`}
                aria-expanded={openIndex === index + 3}
              >
                <span className="font-medium pr-4">
                  {index + 4}. {faq.question}
                </span>
                <span className="flex-shrink-0">
                  {openIndex === index + 3 ? (
                    <FaMinus className="w-4 h-4" />
                  ) : (
                    <FaPlus className="w-4 h-4" />
                  )}
                </span>
              </button>

              {openIndex === index + 3 && (
                <div className="px-6 py-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
