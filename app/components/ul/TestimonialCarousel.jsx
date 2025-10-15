"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // <- updated import

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Mal G",
    designation: "Engineer Plus Construction Chemicals",
    review:
      "We have been associated with rexino for a while. They are indeed the best construction material and products manufacturer and supplier in India and their products and services vouch for it.",
    img: "/img/home/blog-1.png",
  },
  {
    name: "Salma M",
    designation: "Engineer Plus Construction Chemicals",
    review:
      "I have been using rexino, sealants, and waterproofing for a while now. They are of unmatched quality and offer value for money.",
    img: "/img/home/blog-2.png",
  },
  {
    name: "Mal G",
    designation: "Engineer Plus Construction Chemicals",
    review:
      "We have been associated with rexino for a while. They are indeed the best construction material and products manufacturer and supplier in India and their products and services vouch for it.",
    img: "/img/home/blog-3.png",
  },
];

const TestimonialCarousel = () => {
  return (
    <div className="w-full ">
      <Swiper
        modules={[Pagination]}
        spaceBetween={15}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-3 h-full relative z-0">
              <div className="bg-white sm:p-[30px] p-5 shadow-[0_0_20px_0_rgba(0,0,0,0.06)] rounded-2xl h-full min-h-[270px]">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      src="./img/home/star.png"
                      alt="star"
                      className="w-6 h-6"
                    />
                  ))}
                </div>
                <div className="flex items-center mb-4 gap-4">
                  <div className="w-11 h-10 sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-full flex-1">
                    <h3 className="text-lg font-semibold text-[#1A1818] mb-0.5">
                      {item.name}
                    </h3>
                    <span className="block font-normal sm:text-lg text-base text-[#454748]">
                      {item.designation}
                    </span>
                  </div>
                </div>
                <p className="text-[#333333] font-normal sm:text-lg text-base">
                  "{item.review}"
                </p>
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-1 bg-[var(--primary)] w-[90%] h-9 rounded-2xl opacity-30 z-[-1]"></span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCarousel;
