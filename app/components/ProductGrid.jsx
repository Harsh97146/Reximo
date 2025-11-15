"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductTitle from "./ul/ProductTitle";
import CommonButton from "./ul/Button";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/products?isFeatured=true`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="w-full relative sm:py-20 py-10 text-center">
        <p className="text-gray-600">Loading featured products...</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full relative sm:py-20 py-10 text-center">
        <p className="text-gray-600">No featured products available.</p>
      </section>
    );
  }

  return (
    <section className="w-full relative py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-[url('/img/home/bg-line.png')] bg-no-repeat bg-cover bg-top-center">
      <div className="ct-container">
        <ProductTitle
          heading="Products We Provide"
          subHeading="Products"
          align="center"
        />
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-[30px]">
          {products.map((product, index) => (
            <Link
              key={product._id || index}
              href={`/product/${product._id}`}
              className="w-full p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.06)] relative overflow-hidden hover:[&:hover_.hover-none]:opacity-5 transition-all duration-300 hover:shadow-lg cursor-pointer block"
            >
              <div className="w-full rounded-xl sm:rounded-2xl h-[140px] sm:h-[180px] md:h-[220px] lg:h-[260px] xl:h-[280px] 2xl:h-[320px] bg-[#f9f9f9] overflow-hidden mb-4 sm:mb-5">
                <img
                  src={product.endImage?.[0] || "/img/home/product-img.png"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-2 sm:px-3 mb-2">
                <h3 className="block mb-1 sm:mb-2 text-[#111112] text-lg sm:text-xl md:text-[22px] lg:text-2xl xl:text-3xl font-semibold leading-tight">
                  {product.name}
                </h3>
                <span className="block text-sm sm:text-base md:text-lg font-normal text-[#595959] leading-relaxed">
                  {product.description?.[0] || "Premium quality product from Rexino"}
                </span>
              </div>
              <span
                className="block absolute z-[1] bottom-0 left-0 w-full h-3 opacity-85 hover-none transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(0deg,rgba(60, 126, 205, 0.35) 0%, rgba(60, 126, 205, 0.18) 33%, rgba(255, 255, 255, 1) 95%)",
                }}
              ></span>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16">
          <CommonButton 
            label="View more products" 
            href="/products"
            className="w-fit text-sm sm:text-base md:text-lg" 
          />
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
