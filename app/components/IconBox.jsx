"use client";
import React from "react";

// Example props data structure
const defaultItems = [
  {
    title: "Quality Policy",
    description:
      "Being a quality oriented organization, we provide our core concern towards offering quality products to our clients.",
    icon: "/img/home/check.png",
  },
  {
    title: "Infrastructure",
    description:
      "We are well equipped with a sound infrastructure and systematic warehouse in one organization.",
    icon: "/img/home/home.png",
  },
  {
    title: "Research And Development",
    description:
      "We streamline our research process in compliance with market’s specific product.",
    icon: "/img/home/search.png",
  },
];

const IconBox = ({ items = defaultItems }) => {
  return (
    <section className="w-full relative sm:py-[100px] py-10">
      <div className="ct-container">
        <div className="sm:gap-[30px] gap-5 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full sm:p-[30px] p-5 rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.06)] relative transition-all duration-300 hover:shadow-none"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="sm:w-[108px] sm:h-[108px] absolute top-4 opacity-10 right-4 w-12 h-12 object-contain"
              />
              <div className="border border-[#909eb8] sm:w-[74px] sm:h-[74px] w-14 h-14 rounded-full flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="sm:w-12 sm:h-12 w-9 h-9 object-contain"
                />
              </div>
              <h2 className="text-[#111112] text-xl font-semibold mb-2 mt-5">
                {item.title}
              </h2>
              <p className="font-normal text-base text-[#111112] m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconBox;
