import React from "react";
import Image from "next/image";

const AboutSecondSection = () => {
  const values = [
    {
      icon: "/img/about/integrity.png",
      title: "Quality Assurance",
      alt: "Integrity icon",
    },
    {
      icon: "/img/about/excellence.png",
      title: "Reliability",
      alt: "Excellence icon",
    },
    {
      icon: "/img/about/innovation.png",
      title: "Innovation",
      alt: "Innovation icon",
    },
    {
      icon: "/img/about/sustainability.png",
      title: "Sustainability",
      alt: "Sustainability icon",
    },
    {
      icon: "/img/about/accountability.png",
      title: "Trust & Legacy",
      alt: "Accountability icon",
    },
    {
      icon: "/img/about/collaboration.png",
      title: "Customer Support",
      alt: "Collaboration icon",
    },
  ];

  return (
    <section className="bg-brand-red py-12 px-4 sm:px-6 lg:px-8 mt-20" style={{color: "black"}}>
      <div className="max-w-7xl mx-auto">
        {/* Header Text */}
        <div className="text-center mb-12">
          <p className=" text-base sm:text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto">
            For over three decades, Rexino has been shaping homes, offices, and
            industries with world-class ceramic and construction chemicals. From
            Tile &amp; Stone Care to Building Repair, Grouting, and
            Waterproofing, we deliver solutions that combine beauty with
            endurance. Our revolutionary Non-Skid Adhesive (NSA) and strong
            network ensure trust, innovation, and lasting results.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                <Image
                  src={value.icon}
                  alt={value.alt}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain "
                />
              </div>

              {/* Title */}
              <h3 className=" text-sm sm:text-base lg:text-lg font-medium">
                {value.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSecondSection;
