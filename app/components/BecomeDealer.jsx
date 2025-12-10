"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductTitle from "./ul/ProductTitle";
import CommonButton from "./ul/Button";

const BecomeDealer = () => {
  const router = useRouter();

  const handleDealerLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <section className="w-full relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#B9CFE921] to-[#E8F1FF]">
        <div className="ct-container">
          <div className="py-8 sm:py-12 md:py-14 lg:py-16 xl:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 bg-white rounded-xl sm:rounded-2xl shadow-lg">
            <div className="grid xl:grid-cols-[500px_1fr] lg:grid-cols-[400px_1fr] grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
              <div className="w-full order-1">
                <ProductTitle
                  heading="Become a Dealer"
                  subHeading="Join Our Network"
                  align="left"
                />
                <div className="mt-6 sm:mt-8 md:mt-[30px] mb-6 sm:mb-8 md:mb-10 lg:mb-12 space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src="./img/home/success.png"
                      alt="icon"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 mt-1"
                    />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#111112] font-normal leading-relaxed">
                      Partner with Rexino and expand your business with our premium range of construction chemicals and waterproofing solutions.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src="./img/home/success.png"
                      alt="icon"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 mt-1"
                    />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#111112] font-normal leading-relaxed">
                      Get access to exclusive dealer benefits, competitive pricing, and comprehensive support.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src="./img/home/success.png"
                      alt="icon"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 mt-1"
                    />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#111112] font-normal leading-relaxed">
                      Join a trusted network backed by three decades of excellence in the industry.
                    </p>
                  </div>
                </div>
                <CommonButton
                  label="Dealer Login"
                  className="text-sm sm:text-base md:text-lg"
                  onClick={handleDealerLogin}
                />
              </div>
              <img
                src="./img/home/dealer-section.png"
                alt="become-dealer"
                className="w-full h-auto max-h-[400px] lg:max-h-[500px] object-cover order-2 rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BecomeDealer;
