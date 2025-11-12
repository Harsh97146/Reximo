"use client";
import React, { useState, useEffect } from "react";

const galleryImages = [
  "/img/home/blog-1.png",
  "/img/home/blog-2.png",
  "/img/home/blog-3.png",
  "/img/home/blog-1.png",
];

const ImageGalleryImage = () => {
  const [hovered, setHovered] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full lg:flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 gap-4 sm:gap-5 md:gap-6 lg:gap-2 xl:gap-3 flex-row items-start">
      {galleryImages.map((src, index) => (
        <div
          key={index}
          onMouseEnter={() => isDesktop && setHovered(index)}
          onMouseLeave={() => isDesktop && setHovered(0)}
          className={`transition-all duration-500 overflow-hidden lg:px-2 xl:px-3 ${
            isDesktop
              ? hovered === index
                ? "w-full"
                : "min-w-[150px] sm:min-w-[200px] lg:min-w-[200px] xl:min-w-[250px] w-[30%]"
              : "w-full"
          }`}
        >
          <div
            className="bg-cover bg-no-repeat bg-center rounded-lg sm:rounded-xl shadow-md h-[200px] sm:h-[240px] md:h-[280px] lg:h-[400px] xl:h-[523px] 2xl:h-[600px]"
            style={{ backgroundImage: `url(${src})` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ImageGalleryImage;
