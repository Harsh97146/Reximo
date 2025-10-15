"use client";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const SecondSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center w-full">
          {/* Right Image - Static (shown first on mobile) */}
          <div className="relative order-1 lg:order-2 w-full">
            <div className="w-full overflow-hidden">
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
          <div className="order-2 lg:order-1 w-full flex flex-col justify-center items-center text-center px-4 sm:px-10 lg:px-20 py-10 bg-white space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Three Decades of Excellence
              </h2>

              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Rexino has been playing an integral role in your homes,
                  offices, and lives. It is a name synonymous with severe or
                  strong with around experience of 3 decades in the ceramic and
                  construction chemicals field.
                </p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <Link
                href="/about-us"
                className="inline-flex items-center space-x-2 border-2 border-gray-300 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-brand-red transition-all duration-300 font-medium"
              >
                <span>READ MORE</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
