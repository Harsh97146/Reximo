"use client";

import ProductTitle from "./ul/ProductTitle";
import TestimonialCarousel from "./ul/TestimonialCarousel";

const ProductCarousel = () => {
  return (
    <>
      <section className="w-full relative py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24">
        <div className="ct-container">
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <ProductTitle
              heading="What People Say"
              subHeading="Testimonials"
              align="center"
            />
          </div>
          <TestimonialCarousel  />
        </div>
      </section>
    </>
  );
};

export default ProductCarousel;
