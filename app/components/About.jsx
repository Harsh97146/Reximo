"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductTitle from "./ul/ProductTitle";
import CommonButton from "./ul/Button";

const About = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/about-us"); // 👈 change this to your target route
  };

  return (
    <>
      <section className="w-full relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="ct-container">
          <div className="py-8 sm:py-12 md:py-14 lg:py-16 xl:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 bg-[#B9CFE921] rounded-xl sm:rounded-2xl">
            <div className="grid xl:grid-cols-[1fr_500px] lg:grid-cols-[1fr_400px] grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
              <img
                src="./img/home/about-home-img.png"
                alt="about-home-img"
                className="w-full h-auto object-contain order-2 lg:order-1"
              />
              <div className="w-full order-1 lg:order-2">
                <ProductTitle
                  heading="Three Decades of Excellence"
                  subHeading="About Us"
                  align="left"
                />
                <div className="flex items-start gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-[30px] mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <img
                    src="./img/home/success.png"
                    alt="icon"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 mt-1"
                  />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#111112] font-normal leading-relaxed">
                    Rexino has been playing an integral role in your homes,
                    offices, and lives. It is a name synonymous with excellence
                    and reliability, with around 3 decades of experience in the
                    Tiles Adhesive , Waterproofing & all type Construction Chemicals field.
                  </p>
                </div>
                <CommonButton
                  label="Learn More"
                  className="text-sm sm:text-base md:text-lg"
                  onClick={handleRedirect}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
