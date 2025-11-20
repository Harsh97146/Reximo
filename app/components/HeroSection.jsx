import React from "react";
import CommonButton from "./ul/Button";

const HeroSection = () => {
  return (
    <>
      <section className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[724px] xl:min-h-[800px] 2xl:min-h-[900px] pt-[100px] sm:pt-[120px] md:pt-[140px] lg:pt-[160px] xl:pt-[180px] pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28 flex items-center justify-center bg-[url('/img/home/hero-img.png')] bg-no-repeat bg-cover bg-center sm:bg-bottom">
        <div className="ct-container">
          <div className="flex w-fit justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mx-auto mb-3 sm:mb-4 md:mb-5">
            <div
              className="w-12 sm:w-16 md:w-20 lg:w-[96px] xl:w-[120px] h-[2px] sm:h-[3px] rounded-2xl"
              style={{
                background:
                  "linear-gradient(276deg, rgb(225 199 115 / 47%) 9%, rgb(251 230 130 / 10%) 100%);",
              }}
            ></div>
            <span className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl uppercase text-[#d1b56c]">
              <img
                src="/img/logo.png"
                alt="Rexino"
                className="w-80 aspect-square object-cover"
              />
            </span>
            <div
              className="w-12 sm:w-16 md:w-20 lg:w-[96px] xl:w-[120px] h-[2px] sm:h-[3px] rounded-2xl"
              style={{
                background:
                  "linear-gradient(111deg, rgb(225 199 115 / 47%) 9%, rgb(251 230 130 / 10%) 100%);",
              }}
            ></div>
          </div>
          <h1 className="text-white font-semibold leading-[32px] sm:leading-[40px] md:leading-[50px] lg:leading-[60px] xl:leading-[70px] 2xl:leading-[80px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] 2xl:text-[72px] text-center mb-6 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 px-2 sm:px-4">
            Construction Chemicals <br className="hidden sm:block" />
            Tiling Solution & Waterproofing Solution
          </h1>
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

export default HeroSection;
