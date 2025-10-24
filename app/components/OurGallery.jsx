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
          <a
            href="/brochure/1-1.pdf"
            download
            className="bg-brand-red hover:bg-brand-red/90 text-white font-medium px-6 py-3 rounded-2xl inline-flex items-center gap-2 transition"
          >
            <CommonButton
              label="Download Brochure"
              className="sm:!py-[10px] sm:!px-8 lg:block hidden"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
