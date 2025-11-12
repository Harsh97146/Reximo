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
    <section className="w-full relative py-10 sm:py-14 md:py-16 lg:py-20 xl:py-[100px]">
      <div className="ct-container">
        <div className="gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-[30px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full p-5 sm:p-6 md:p-7 lg:p-8 xl:p-[30px] rounded-xl sm:rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.06)] relative transition-all duration-300 hover:shadow-lg"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-[108px] xl:h-[108px] absolute top-3 sm:top-4 opacity-10 right-3 sm:right-4 object-contain"
              />
              <div className="border border-[#909eb8] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-[74px] xl:h-[74px] rounded-full flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 object-contain"
                />
              </div>
              <h2 className="text-[#111112] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 mt-4 sm:mt-5">
                {item.title}
              </h2>
              <p className="font-normal text-sm sm:text-base md:text-lg lg:text-xl text-[#111112] m-0 leading-relaxed">
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
