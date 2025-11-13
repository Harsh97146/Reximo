"use client";
import React from "react";
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
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-5 mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-white p-4 sm:p-5 md:p-6 lg:p-[30px] border border-[rgba(0,0,0,0.10)] rounded-xl sm:rounded-2xl shadow-sm">
          <h3 className="m-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#282828] font-semibold text-center lg:text-left">
            Download Our Latest Brochure
          </h3>
          <CommonButton
            label="Download Brochure"
            href="/brochure/1-1.pdf"
            download
            className="w-full sm:w-auto text-sm sm:text-base md:text-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
