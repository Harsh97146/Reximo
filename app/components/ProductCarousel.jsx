"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { products } from "../utils/products";

const ProductCarousel = () => {
  return (
    <div className="w-full overflow-hidden py-6 mt-20">
      {/* Header */}
      <h2 className="text-[34px] font-bold leading-[72px] tracking-[-0.5px] text-black text-center mb-6">
        Our Products
      </h2>

      {/* Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 2000 }}
        speed={1200}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 50 },
        }}
        className="!overflow-visible cursor-grab"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.path}
                  alt={product.name}
                  className="object-contain w-full h-[200px] transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
