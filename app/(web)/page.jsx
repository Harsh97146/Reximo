import React from "react";
import SecondSection from "../components/SecondSection";
import HeroSection from "../components/HeroSection";
import IconBox from "../components/IconBox";
import About from "../components/About";
import ProductGrid from "../components/ProductGrid";
import DecadesExcellence from "../components/DecadesExcellence";
import HomeBlog from "../components/HomeBlog";
import PopularEvents from "../components/OurGallery";
import ProductCarousel from "../components/ProductCarousel";
import BecomeDealer from "../components/BecomeDealer";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <IconBox />
      <About />
      <ProductGrid />
      <DecadesExcellence />
      <PopularEvents/>
      <ProductCarousel/>
      <BecomeDealer/>
      <HomeBlog/>
    </div>
  );
};

export default HomePage;
