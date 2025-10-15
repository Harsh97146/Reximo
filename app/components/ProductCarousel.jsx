"use client";

import ProductTitle from "./ul/ProductTitle";
import TestimonialCarousel from "./ul/TestimonialCarousel";

const ProductCarousel = () => {
  return (
    <>
      <section className="w-full relative sm:py-20 py-10">
        <div className="ct-container">
          <div className="mb-8">
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
