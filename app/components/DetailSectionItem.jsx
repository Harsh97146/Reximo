"use client";
import React from "react";

const DetailSectionItem = ({ title, data, isBtn = false }) => {
  if (!data || data.length === 0) return null;
  console.log(data, "data");
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      {/* Red underline */}
      <div className="h-1 w-16 bg-brand-red rounded mb-6"></div>

      <ul
        className={`${
          isBtn
            ? "flex flex-wrap gap-3 list-none"
            : "list-disc list-inside space-y-3 text-gray-700"
        }`}
      >
        {data.map((item, index) => (
          <li
            key={index}
            className={
              isBtn
                ? `inline-flex items-center justify-center 
             px-6 py-2.5 rounded-xl font-medium border border-[#0f172b]
             bg-white text-[#0f172b]
             shadow-sm cursor-pointer select-none 
             hover:bg-[#f3f6fc] hover:text-[#0f172b]
             hover:shadow-lg hover:border-[#1a2850]
             hover:scale-[1.03]
             transition-all duration-300 ease-out`
                : "pl-1 text-gray-700"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DetailSectionItem;
