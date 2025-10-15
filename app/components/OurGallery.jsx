"use client";
import React, { useState, useEffect } from "react";
import ImageGalleryImage from "./ul/OurGalleryImage";
import ProductTitle from "./ul/ProductTitle";
import CommonButton from "./ul/Button";

const ImageGallery = () => {
  return (
    <section className="w-full relative md:py-[88px] sm:py-14 py-10 bg-[#F5F7FC]">
      <div className="ct-container">
        <div className="sm:mb-14 mb-8">
          <ProductTitle
            heading="Our Gallery"
            subHeading="Gallery"
            align="center"
          />
        </div>
        <ImageGalleryImage />
        <div className="flex items-center justify-between gap-5 sm:mt-12 mt-8 bg-white sm:p-[30px] p-5 border border-[rgba(0,0,0,0.10)] rounded-2xl max-[500px]:flex-col">
          <h3 className="m-0 sm:text-3xl text-[#282828] font-semibold">Download Brochure</h3>
            <CommonButton label="Download Brochure" className="sm:!px-[30px] !px-8 !bg-[#2A4168] !border-[#2A4168] hover:!bg-white hover:!text-[#2A4168]" />
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
