"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListItem from "./ListItem";
import { Search, X, Grid3x3, List as ListIcon } from "lucide-react";

const categories = ["All", "Tiling Solution", "Waterproofing", "Repairs", "Maintenance", "Stonecare"];

const List = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldScrollTop = typeof window !== "undefined" && window.location.hash !== "#product-list";
    if (shouldScrollTop) {
      window.scrollTo({ top: 0 });
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/products`);
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Filter by category (handle string or array categories safely)
    if (selectedCategory !== "All") {
      const sel = selectedCategory.toLowerCase();
      filtered = filtered.filter((product) => {
        const cat = product.category;
        if (Array.isArray(cat)) {
          return cat.some((c) => String(c || "").toLowerCase() === sel);
        }
        return String(cat || "").toLowerCase() === sel;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.some((desc) =>
            desc?.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-gray-50">
        <div className="ct-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="product-list" className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-gray-50">
      <div className="ct-container">
        {/* Search and Filter Bar */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          {/* Search Bar */}
          <div className="relative mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 sm:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-sm sm:text-base bg-white shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs and View Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[var(--primary)] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-[var(--primary)] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-[var(--primary)] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="List view"
              >
                <ListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
            {selectedCategory !== "All" && (
              <span className="ml-2">
                in <span className="font-semibold text-gray-900">{selectedCategory}</span>
              </span>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20 md:py-24 bg-white rounded-2xl border border-gray-200">
            <div className="max-w-md mx-auto px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                No products found
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {searchQuery
                  ? `We couldn't find any products matching "${searchQuery}"`
                  : `No products available in ${selectedCategory} category`}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-sm sm:text-base text-[var(--primary)] hover:underline font-medium"
                >
                  Clear filters and show all products
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
                : "space-y-4 sm:space-y-6"
            }
          >
            {filteredProducts.map((item) => (
              <ListItem key={item._id} item={item} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default List;
