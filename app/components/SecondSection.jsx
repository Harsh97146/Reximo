"use client";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const SecondSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 2xl:py-24 bg-white w-full">
      <div className="ct-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-0 items-center w-full">
          {/* Right Image - Static (shown first on mobile) */}
          <div className="relative order-1 lg:order-2 w-full">
            <div className="w-full overflow-hidden rounded-lg sm:rounded-xl lg:rounded-none">
              <Image
                src="/img/home/3.png"
                alt="Rexino"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Left Content Centered */}
          <div className="order-2 lg:order-1 w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 md:py-12 lg:py-14 bg-white space-y-6 sm:space-y-8 md:space-y-10">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 leading-tight">
                Three Decades of Excellence
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  Rexino has been playing an integral role in your homes,
                  offices, and lives. It is a name synonymous with severe or
                  strong with around experience of 3 decades in the ceramic and
                  construction chemicals field.
                </p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 md:pt-6">
              <Link
                href="/about-us"
                className="inline-flex items-center space-x-2 border-2 border-gray-300 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-brand-red transition-all duration-300 font-medium text-xs sm:text-sm md:text-base lg:text-lg"
              >
                <span>READ MORE</span>
                <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
