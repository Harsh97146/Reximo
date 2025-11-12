"use client";
import React from "react";
import Image from "next/image";
import {
  Shield,
  Award,
  Lightbulb,
  Leaf,
  Users,
  Heart,
  CheckCircle2,
  Star,
  Building2,
} from "lucide-react";

const AboutSecondSection = () => {
  const values = [
    {
      icon: "/img/about/integrity.png",
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices in everything we do.",
      lucideIcon: Shield,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "/img/about/excellence.png",
      title: "Excellence",
      description: "We strive for the highest standards in quality, service, and customer satisfaction.",
      lucideIcon: Award,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: "/img/about/innovation.png",
      title: "Innovation",
      description: "We continuously invest in R&D to bring cutting-edge solutions to the market.",
      lucideIcon: Lightbulb,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "/img/about/sustainability.png",
      title: "Sustainability",
      description: "We are committed to environmental responsibility and sustainable business practices.",
      lucideIcon: Leaf,
      color: "from-green-500 to-green-600",
    },
    {
      icon: "/img/about/accountability.png",
      title: "Accountability",
      description: "We take responsibility for our actions and deliver on our promises.",
      lucideIcon: CheckCircle2,
      color: "from-red-500 to-red-600",
    },
    {
      icon: "/img/about/collaboration.png",
      title: "Collaboration",
      description: "We work closely with partners, customers, and stakeholders to achieve mutual success.",
      lucideIcon: Users,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="ct-container">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-[var(--primary)] uppercase tracking-wider px-4 py-2 bg-blue-50 rounded-full">
              Our Values
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            What Drives Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            For over three decades, Rexino has been shaping homes, offices, and industries with world-class 
            ceramic and construction chemicals. Our core values guide everything we do.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, index) => {
            const LucideIcon = value.lucideIcon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-[var(--primary)] transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <LucideIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-gray-50 shadow-md flex items-center justify-center">
                    <Image
                      src={value.icon}
                      alt={value.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary)] transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="bg-gradient-to-r from-[var(--primary)] to-blue-700 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 text-white shadow-2xl">
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Star className="w-5 h-5" />
                <span className="text-sm sm:text-base font-semibold">Why Choose Rexino</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Trusted by Professionals Nationwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: Award, text: "ISO Certified Quality" },
                { icon: Users, text: "Expert Technical Team" },
                { icon: Building2, text: "Wide Distribution Network" },
                { icon: Heart, text: "Customer-Centric Approach" },
              ].map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <FeatureIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <p className="text-sm sm:text-base font-semibold">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSecondSection;
