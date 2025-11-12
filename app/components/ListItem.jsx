import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Tag } from "lucide-react";

const ListItem = ({ item, viewMode = "grid" }) => {
  const { _id, name, notes, path, category, endImage } = item;
  const productImage = endImage?.[0] || path || "/img/home/product-img.png";

  if (viewMode === "list") {
    return (
      <Link href={`/product/${_id}`}>
        <article className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative w-full sm:w-64 md:w-80 lg:w-96 h-48 sm:h-auto flex-shrink-0 bg-gray-50">
              <Image
                src={productImage}
                alt={name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 320px"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-4 sm:p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  {category && (
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[var(--primary)] bg-blue-50 px-3 py-1 rounded-full mb-2">
                      <Tag className="w-3 h-3" />
                      {category}
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {name}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-[var(--primary)] transition-colors flex-shrink-0 mt-1" />
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2 mb-4">
                {notes || "Premium quality construction chemical solution"}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                  <Package className="w-4 h-4" />
                  <span>View Details</span>
                </div>
                <span className="text-sm sm:text-base font-semibold text-[var(--primary)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Grid View
  return (
    <Link href={`/product/${_id}`}>
      <article className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
            <span className="text-sm font-semibold text-[var(--primary)]">View Details</span>
          </div>
          <Image
            src={productImage}
            alt={name}
            fill
            className="object-contain p-4 sm:p-6 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[var(--primary)] px-3 py-1 rounded-full shadow-md">
                <Tag className="w-3 h-3" />
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight mb-2 sm:mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {name}
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3 mb-4 sm:mb-5 flex-grow">
            {notes || "Premium quality construction chemical solution designed for professional applications."}
          </p>

          {/* Action Button */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-500 font-medium">View Product</span>
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[var(--primary)] group-hover:gap-3 transition-all">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ListItem;
