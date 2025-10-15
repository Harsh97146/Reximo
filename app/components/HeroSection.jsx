import React from "react";
import CommonButton from "./ul/Button";

const HeroSection = () => {
  return (
    <>
      <section className="relative w-full sm:min-h-[724px] pt-[140px] pb-20 flex items-center justify-center bg-[url('/img/home/hero-img.png')] bg-no-repeat bg-cover bg-bottom">
        <div className="ct-container">
          <div className="flex w-fit justify-center items-center gap-6 mx-auto mb-3">
            <div
              className="sm:w-[96px] w-16 h-[3px] rounded-2xl"
              style={{
                background:
                  "linear-gradient(276deg, rgb(225 199 115 / 47%) 9%, rgb(251 230 130 / 10%) 100%);",
              }}
            ></div>
            <span className="font-semibold sm:text-2xl text-xl uppercase text-[#d1b56c]">
              Rexino
            </span>
            <div
              className="sm:w-[96px] w-16 h-[3px] rounded-2xl"
              style={{
                background:
                  "linear-gradient(111deg, rgb(225 199 115 / 47%) 9%, rgb(251 230 130 / 10%) 100%);",
              }}
            ></div>
          </div>
          <h1 className="text-white font-semibold lg:leading-[74px] lg:text-[60px] sm:text-4xl text-3xl text-center sm:mb-16 mb-10">
            Construction Chemicals <br />
            Tiling Solution & Waterproofing Solution
          </h1>
          <div className="flex items-center justify-center">
            <CommonButton label="Contact Us" className="mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
