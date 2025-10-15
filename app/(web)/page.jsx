import React from "react";
import SecondSection from "../components/SecondSection";
import ThirdSection from "../components/ThirdSection";
import ProductCarousel from "../components/ProductCarousel";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ProductCarousel />
      <SecondSection />
      <ThirdSection />
    </div>
  );
};

export default HomePage;
