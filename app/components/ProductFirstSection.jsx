"use client";
import Image from "next/image";

const ProductFirstSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28" style={{ marginTop: "100px" }}>
      <div className="ct-container">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight">
            Premium Construction
            <br className="hidden sm:block" />
            <span className="text-[var(--primary)]"> Chemical Solutions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover our comprehensive range of high-quality Tiles Adhesive , Waterproofing & all type Construction Chemicals,
            trusted by professionals for over three decades
          </p>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-2">30+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">Years Experience</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-2">500+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">Products</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-2">1000+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-2">50+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">Cities Served</div>
          </div>
        </div> */}

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Excellence in Every Solution
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                For over three decades, <strong className="text-gray-900">Rexino</strong> has been a
                trusted name in Tiles Adhesive , Waterproofing & all type Construction Chemicals. We deliver a
                wide range of solutions in{" "}
                <strong className="text-gray-900">Tile & Stone Fixing, Building Repair, Grouting</strong>,
                and <strong className="text-gray-900">Waterproofing</strong>.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Our innovative <strong className="text-gray-900">Non-Skid Adhesive (NSA)</strong> is
                revolutionizing tile-on-tile applications in India. Backed by
                research, a strong dealer network, and a commitment to quality,
                Rexino ensures durability and reliability for homes, offices,
                and industrial projects alike.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-gray-900">Quality Assured</div>
                  <div className="text-xs sm:text-sm text-gray-600">ISO Certified</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-gray-900">Expert Support</div>
                  <div className="text-xs sm:text-sm text-gray-600">Technical Guidance</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-gray-900">Wide Network</div>
                  <div className="text-xs sm:text-sm text-gray-600">Pan-India Delivery</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-gray-900">Innovation</div>
                  <div className="text-xs sm:text-sm text-gray-600">R&D Driven</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/img/home/1.jpg"
                alt="Rexino Tile & Construction Products"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFirstSection;
