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
      <h2 className="mb-1 font-semibold text-lg text-[#d1b56c]">{subHeading}</h2>
      <p className="font-semibold md:text-[36px] sm:text-2xl text-xl text-[#161616]">{heading} </p>
    </div>
  );
};

export default ProductTitle;
