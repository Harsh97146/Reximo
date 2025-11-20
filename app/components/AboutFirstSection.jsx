"use client";
import React from "react";
import Image from "next/image";
import { Award, Users, Building2, TrendingUp, CheckCircle2, Target, Eye, Lightbulb } from "lucide-react";

const AboutFirstSection = () => {
  const stats = [
    {
      number: "30+",
      label: "Years of Experience",
      description: "Decades of trust and innovation",
      icon: Award,
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "500+",
      label: "Dealers & Stockists",
      description: "Strong distribution network",
      icon: Building2,
      color: "from-green-500 to-green-600",
    },
    {
      number: "1000+",
      label: "Successful Projects",
      description: "Trusted across industries",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      number: "1M+",
      label: "Happy Customers",
      description: "Building lasting relationships",
      icon: Users,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const milestones = [
    {
      year: "1990s",
      title: "Foundation",
      description: "Rexino was established with a vision to revolutionize construction chemicals in India.",
    },
    {
      year: "2000s",
      title: "Expansion",
      description: "Expanded product range and established a nationwide dealer network.",
    },
    {
      year: "2010s",
      title: "Innovation",
      description: "Introduced revolutionary Non-Skid Adhesive (NSA) technology.",
    },
    {
      year: "2020s",
      title: "Leadership",
      description: "Became a trusted leader in Tiles Adhesive , Waterproofing & all type Construction Chemicals across India.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 sm:py-16 md:py-20 lg:py-24" style={{ marginTop: "100px" }}>
      <div className="ct-container">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-[var(--primary)] uppercase tracking-wider px-4 py-2 bg-blue-50 rounded-full">
              About Rexino
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Three Decades of
            <br />
            <span className="text-[var(--primary)]">Excellence & Innovation</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            For over three decades, Rexino has been an integral part of homes, offices, and industries across India and beyond.
            We are a trusted name in the Tiles Adhesive , Waterproofing & all type Construction Chemicals field, combining beauty with endurance and a legacy built on trust.
          </p>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 md:mb-24">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Excellence in Ceramic & Construction Chemicals
              </h2>
              <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Our comprehensive range includes <strong className="text-gray-900">Tile Fixing & Care</strong>,{" "}
                  <strong className="text-gray-900">Stone Fixing & Care</strong>,{" "}
                  <strong className="text-gray-900">Building Repair</strong>,{" "}
                  <strong className="text-gray-900">Grouting Solutions</strong>, and{" "}
                  <strong className="text-gray-900">Waterproofing</strong>. With our ground-breaking{" "}
                  <strong className="text-gray-900">Non-Skid Adhesive (NSA)</strong>, we are revolutionizing
                  the concept of tile-on-tile applications in India.
                </p>
                <p>
                  Backed by continuous research and development, and supported by a wide network of dealers and stockists,
                  Rexino delivers timely, high-quality solutions for residential, commercial, industrial, and infrastructural projects.
                  We are committed to helping homeowners, architects, and builders turn their vision into reality with confidence and durability.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: CheckCircle2, text: "ISO Certified Quality" },
                { icon: Target, text: "R&D Driven Innovation" },
                { icon: Users, text: "Expert Technical Support" },
                { icon: Building2, text: "Pan-India Network" },
              ].map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                      <FeatureIcon className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-gray-900">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/img/home/about-home-img.png"
                alt="Rexino Excellence"
                fill
                className="object-contain p-4 bg-gradient-to-br from-gray-100 to-gray-200"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <div className="bg-gradient-to-br from-[var(--primary)] to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-6">
              <Target className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Mission</h3>
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
              To deliver world-class Tiles Adhesive , Waterproofing & all type Construction Chemicals chemical solutions that combine beauty with endurance,
              helping our customers build lasting structures with confidence and reliability.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-6">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Vision</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              To be India's most trusted and innovative leader in Tiles Adhesive , Waterproofing & all type Construction Chemicals,
              setting new standards for quality, sustainability, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        {/* <div className="mb-16 sm:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Three decades of growth, innovation, and excellence
            </p>
          </div>
          <div className="relative">
            Timeline Line
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--primary)] to-blue-600"></div>

            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                      <div className="text-sm sm:text-base font-semibold text-[var(--primary)] mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  Timeline Dot
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-white shadow-lg z-10"></div>
                  </div>

                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    Empty space for alignment
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AboutFirstSection;
