"use client";
import List from "./../../components/List";
import ProductFirstSection from "./../../components/ProductFirstSection";
import React, { useEffect } from "react";

const ProductPage = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#product-list") {
      const el = document.getElementById("product-list");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
    }
  }, []);
  return (
    <div>
      <ProductFirstSection />
      <Suspense>
        <List />
      </Suspense>
    </div>
  );
};

export default ProductPage;
