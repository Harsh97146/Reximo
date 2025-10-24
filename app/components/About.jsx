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
      <section className="w-full relative">
        <div className="ct-container">
          <div className="sm:py-16 lg:px-20 sm:px-14 p-6 bg-[#B9CFE921] rounded-2xl">
            <div className="grid xl:grid-cols-[auto_505px] lg:grid-cols-[auto_400px] grid-cols-1 xl:gap-20 sm:gap-10 gap-8 items-center">
              <img
                src="./img/home/about-home-img.png"
                alt="about-home-img"
                className="w-full h-full object-contain"
              />
              <div className="w-full">
                <ProductTitle
                  heading="Three Decades of Excellence"
                  subHeading="About Us"
                  align="left"
                />
                <div className="flex items-start gap-4 mt-[30px] sm:mb-12 mb-8">
                  <img
                    src="./img/home/success.png"
                    alt="icon"
                    className="w-6 h-6 shrink-0"
                  />
                  <p className="text-base text-[#111112] font-normal">
                    Rexino has been playing an integral role in your homes,
                    offices, and lives. It is a name synonymous with excellence
                    and reliability, with around 3 decades of experience in the
                    ceramic and construction chemicals field.
                  </p>
                </div>
                <CommonButton
                  label="Learn More"
                  className=""
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
