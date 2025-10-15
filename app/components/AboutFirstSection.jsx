import React from "react";

const AboutFirstSection = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Excellence in Ceramic &amp; Construction Chemicals
            </h1>

            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              <p>
                For over three decades, Rexino has been an integral part of
                homes, offices, and industries across India and beyond. We are a
                trusted name in the ceramic and construction chemicals field,
                combining beauty with endurance and a legacy built on trust.
              </p>

              <p>
                Our comprehensive range includes Tile Fixing &amp; Care, Stone
                Fixing &amp; Care, Building Repair, Grouting Solutions, and
                Waterproofing. With our ground-breaking Non-Skid Adhesive (NSA),
                we are revolutionizing the concept of tile-on-tile applications
                in India.
              </p>

              <p>
                Backed by continuous research and development, and supported by
                a wide network of dealers and stockists, Rexino delivers timely,
                high-quality solutions for residential, commercial, industrial,
                and infrastructural projects. We are committed to helping
                homeowners, architects, and builders turn their vision into
                reality with confidence and durability.
              </p>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                30+
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Years of Experience
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                Decades of trust and innovation in ceramic &amp; construction
                chemicals.
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                500+
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Dealers &amp; Stockists
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                A strong and growing distribution network across India and
                overseas.
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                1000+
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Successful Projects
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                Trusted in residential, commercial, industrial, and
                infrastructural applications.
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                1M+
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Happy Customers
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                Strengthening lives with reliable and long-lasting solutions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFirstSection;
