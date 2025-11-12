"use client";
import React, { useState, useEffect } from "react";
import ImageGalleryImage from "./ul/OurGalleryImage";
import ProductTitle from "./ul/ProductTitle";
import CommonButton from "./ul/Button";

const ImageGallery = () => {
  return (
    <section className="w-full relative py-10 sm:py-14 md:py-16 lg:py-20 xl:py-[88px] bg-[#F5F7FC]">
      <div className="ct-container">
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14">
          <ProductTitle
            heading="Our Gallery"
            subHeading="Gallery"
            align="center"
          />
        </div>
        <ImageGalleryImage />
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-5 mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-white p-4 sm:p-5 md:p-6 lg:p-[30px] border border-[rgba(0,0,0,0.10)] rounded-xl sm:rounded-2xl">
          <h3 className="m-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#282828] font-semibold text-center sm:text-left">Download Brochure</h3>
          <a
            href="/brochure/1-1.pdf"
            download
            className="bg-brand-red hover:bg-brand-red/90 text-white font-medium px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-xl sm:rounded-2xl inline-flex items-center gap-2 transition text-sm sm:text-base md:text-lg"
          >
            <CommonButton
              label="Download Brochure"
              className="sm:!py-[10px] sm:!px-8 lg:block hidden"
            />
            <span className="lg:hidden">Download</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
