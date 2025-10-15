import React from "react";
import CommonButton from "./ul/Button";

const DecadesExcellence = () => {
  return (
    <>
      <section className="relative w-full sm:py-[100px] py-14 flex items-center justify-center bg-[url('/img/home/building-bg.png')] bg-no-repeat bg-cover bg-bottom">
        <div className="ct-container">
          <h1 className="text-white font-semibold lg:leading-[54px] lg:text-[40px] sm:text-4xl text-3xl text-center mb-4">
            Building Trust with <span className="text-[var(--primary)]">3 Decades of Excellence</span>
          </h1>
          <p className="block font-normal text-lg text-white text-center sm:mb-16 mb-10 mx-auto max-w-[1225px] w-full">
            Rexino has been an integral part of homes, offices, and industries for over 30 years. A trusted name in ceramic and construction chemicals, we deliver innovative solutions in Tile Fixing & Care, Stone Care, Building Repair, Grouting, and Waterproofing. Our Non-Skid Adhesive (NSA) is revolutionizing tile-on-tile application in India. With a strong focus on research, development, and a wide distribution network, Rexino continues to combine beauty with endurance—ensuring lasting results and peace of mind for homeowners, architects, and builders alike.

          </p>
          <div className="flex items-center justify-center">
            <CommonButton label="Contact Us" className="mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default DecadesExcellence;
