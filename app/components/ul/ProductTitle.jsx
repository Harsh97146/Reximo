"use client";
import React from "react";

const ProductTitle = ({
  heading = "Products We Provide",
  subHeading = "Products",
  align = "center",
  className = "",
}) => {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  return (
    <div className={` ${alignClass} ${className}`}>
      <h2 className="mb-1 sm:mb-2 font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#d1b56c]">{subHeading}</h2>
      <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-4xl 2xl:text-5xl text-[#161616] leading-tight">{heading} </p>
    </div>
  );
};

export default ProductTitle;
