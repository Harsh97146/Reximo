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
    <div className="w-full lg:flex grid sm:grid-cols-2 grid-cols-1 lg:gap-0 gap-7 flex-row items-start">
      {galleryImages.map((src, index) => (
        <div
          key={index}
          onMouseEnter={() => isDesktop && setHovered(index)}
          onMouseLeave={() => isDesktop && setHovered(0)}
          className={`transition-all duration-500 overflow-hidden lg:px-3 ${
            isDesktop
              ? hovered === index
                ? "w-full"
                : "min-w-[200px] w-[30%]"
              : "w-full"
          }`}
        >
          <div
            className="bg-cover bg-no-repeat bg-center rounded-xl shadow-md h-[260px] sm:h-[300px] lg:h-[523px]"
            style={{ backgroundImage: `url(${src})` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ImageGalleryImage;
