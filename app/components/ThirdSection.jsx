"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    src: "/img/home/5.jpg",
    title: "Tile Fixing & Care",
    keywords:
      "tile adhesive application, tiler applying adhesive, tile installation closeup",
  },
  {
    src: "/img/home/6.jpg",
    title: "Stone Fixing & Care",
    keywords: "marble installation, granite stone fixing, stone care products",
  },
  {
    src: "/img/home/7.jpg",
    title: "Building Repair",
    keywords:
      "construction worker repairing wall, concrete repair chemicals, structural repair",
  },
  {
    src: "/img/home/8.jpg",
    title: "Grouting Solutions",
    keywords:
      "worker applying grout, ceramic tile grouting, waterproof grout closeup",
  },
  {
    src: "/img/home/9.jpg",
    title: "Waterproofing",
    keywords:
      "basement waterproofing, roof waterproof coating, waterproof chemical application",
  },
  {
    src: "/img/home/10.jpg",
    title: "Non-Skid Adhesive (NSA)",
    keywords:
      "tile on tile adhesive, anti-skid tile adhesive, modern tile fixing solution",
  },
];

export default function ThirdSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
        <h2 className="text-center text-3xl font-semibold mb-6">
          Building Trust with 3 Decades of Excellence
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
          Rexino has been an integral part of homes, offices, and industries for
          over 30 years. A trusted name in ceramic and construction chemicals,
          we deliver innovative solutions in Tile Fixing &amp; Care, Stone Care,
          Building Repair, Grouting, and Waterproofing. Our Non-Skid Adhesive
          (NSA) is revolutionizing tile-on-tile application in India. With a
          strong focus on research, development, and a wide distribution
          network, Rexino continues to combine beauty with endurance—ensuring
          lasting results and peace of mind for homeowners, architects, and
          builders alike.
        </p>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="relative w-full">
        <div className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2">
          <button
            ref={prevRef}
            className="p-1 bg-black/60 hover:bg-black transition rounded-full shadow-lg backdrop-blur-sm cursor-pointer ms-2"
          >
            <FiChevronLeft className="text-white text-3xl" />
          </button>
        </div>

        <div className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2">
          <button
            ref={nextRef}
            className="p-1 bg-black/60 hover:bg-black transition rounded-full shadow-lg backdrop-blur-sm cursor-pointer me-2"
          >
            <FiChevronRight className="text-white text-3xl" />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={4}
          spaceBetween={10}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
            renderBullet: (index, className) => {
              return `<span class="${className}"></span>`;
            },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 0 },
            640: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
          }}
          speed={1000}
          className="w-full pb-16"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide
              key={idx}
              className="flex flex-col items-center justify-start"
            >
              <div className="w-full flex justify-center">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  width={280}
                  height={320}
                  className="object-contain w-full h-auto"
                />
              </div>
              <h3 className="text-center text-sm font-bold tracking-tight mt-2 mb-4">
                {slide.title}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
