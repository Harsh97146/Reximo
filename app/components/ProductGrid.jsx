"use client";
import React from "react";
import ProductTitle from "./ul/ProductTitle";
import CommonButton from "./ul/Button";

// Example product data
const defaultProducts = [
  {
    title: "Elasto HS",
    description:
      "High Performance and Heavy Duty Reinforced Acrylic Waterproof Coating (700% Elongation)",
    img: "/img/home/product-img.png",
  },
  {
    title: "SBR Max",
    description: "Specialty SBR Max for Repairs & Waterproofing",
    img: "/img/home/product-img.png",
  },
  {
    title: "Elasto L",
    description:
      "High Performance and Heavy Duty Reinforced Acrylic Waterproof Coating (500% Elongation)",
    img: "/img/home/product-img.png",
  },
  {
    title: "PU Black",
    description:
      "Water Based Bitumen Modified UV Resistant Elastomeric PU Liquid Membrane (1350% Elongation)",
    img: "/img/home/product-img.png",
  },
  {
    title: "PU Sealant",
    description:
      "High-performance polyurethane sealant for versatile construction applications",
    img: "/img/home/product-img.png",
  },
  {
    title: "RX-100 PU Adhesive ",
    description:
      "High-shear and high-tensile PU-based cladding adhesive for tiles and natural stones.",
    img: "/img/home/product-img.png",
  },
];

const ProductGrid = ({ products = defaultProducts }) => {
  return (
    <>
      <section className="w-full relative sm:py-20 py-10 bg-[url('/img/home/bg-line.png')] bg-no-repeat bg-cover bg-top-center">
        <div className="ct-container">
          <ProductTitle
            heading="Products We Provide"
            subHeading="Products"
            align="center"
          />
          <div className="sm:mt-14 mt-9 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-[30px] gap-5 ">
            {products.map((product, index) => (
              <div
                key={index}
                className="w-full p-3 rounded-2xl bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.06)] relative overflow-hidden hover:[&:hover_.hover-none]:opacity-5"
              >
                <div className="w-full rounded-2xl md:h-[280px] sm:h-[200px] h-[160px] bg-[#f9f9f9] overflow-hidden mb-5">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="px-2 mb-2">
                  <h3 className="block mb-1 text-[#111112] sm:text-[22px] sm:leading-[33px] text-xl font-semibold">
                    {product.title}
                  </h3>
                  <span className="block text-base font-normal text-[#595959]">
                    {product.description}
                  </span>
                </div>
                <span
                  className="block absolute z-[1] bottom-0 left-0 w-full h-3 opacity-85 hover-none transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(0deg,rgba(60, 126, 205, 0.35) 0%, rgba(60, 126, 205, 0.18) 33%, rgba(255, 255, 255, 1) 95%)",
                  }}
                ></span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center m:mt-14 mt-10">
            <CommonButton label="Contact Us" className="w-fit" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;
