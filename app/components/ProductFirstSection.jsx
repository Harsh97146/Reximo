import Image from "next/image";

const ProductFirstSection = () => {
  return (
    <section className="relative bg-gray-50 py-16 ct-container sm:px-6 lg:px-8" style={{ marginTop: "200px" }}>
      <div className="mb-8 text-center py-10">
        <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
        <p className="mt-2 text-gray-600">
          Explore our range of high-quality products
        </p>
      </div>
      <div className="relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p className="text-base sm:text-lg">
                For over three decades, <strong>Rexino</strong> has been a
                trusted name in ceramic and construction chemicals. We deliver a
                wide range of solutions in{" "}
                <strong>Tile & Stone Fixing, Building Repair, Grouting</strong>,
                and <strong>Waterproofing</strong>.
              </p>
              <p className="text-base sm:text-lg">
                Our innovative <strong>Non-Skid Adhesive (NSA)</strong> is
                revolutionizing tile-on-tile applications in India. Backed by
                research, a strong dealer network, and a commitment to quality,
                Rexino ensures durability and reliability for homes, offices,
                and industrial projects alike.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/img/home/1.jpg"
                alt="Rexino Tile & Construction Products"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFirstSection;
