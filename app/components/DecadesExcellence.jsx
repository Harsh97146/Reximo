import React from "react";
import CommonButton from "./ul/Button";

const DecadesExcellence = () => {
  return (
    <>
      <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[100px] flex items-center justify-center bg-[url('/img/home/building-bg.png')] bg-no-repeat bg-cover bg-center sm:bg-bottom">
        <div className="ct-container">
          <h1 className="text-white font-semibold leading-[28px] sm:leading-[36px] md:leading-[44px] lg:leading-[54px] xl:leading-[64px] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-5xl 2xl:text-6xl text-center mb-4 sm:mb-6 md:mb-8 px-4">
            Building Trust with <span className="text-[var(--primary)]">3 Decades of Excellence</span>
          </h1>
          <p className="block font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-20 mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[1225px] w-full px-4 leading-relaxed">
            Rexino has been an integral part of homes, offices, and industries for over 30 years. A trusted name in ceramic and construction chemicals, we deliver innovative solutions in Tile Fixing & Care, Stone Care, Building Repair, Grouting, and Waterproofing. Our Non-Skid Adhesive (NSA) is revolutionizing tile-on-tile application in India. With a strong focus on research, development, and a wide distribution network, Rexino continues to combine beauty with endurance—ensuring lasting results and peace of mind for homeowners, architects, and builders alike.
          </p>
          <div className="flex items-center justify-center px-4">
            <CommonButton 
              label="Contact Us" 
              href="/contact-us"
              className="mx-auto text-sm sm:text-base md:text-lg lg:text-xl" 
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DecadesExcellence;
