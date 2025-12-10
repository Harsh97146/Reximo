"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Package, Search, Eye, ArrowRight } from "lucide-react";

const DealerDashboard = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    // Get user info and fetch products
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchDealerProducts(token);
    } catch (e) {
        router.push("/login");
    }
  }, []);

  const fetchDealerProducts = async (token) => {
    try {
      const response = await fetch(`${BASE_API_URL}/products/dealer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login?error=Session expired or unauthorized");
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching dealer products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.otherData && p.otherData.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="font-dm-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
              <h2 className="text-3xl font-bold text-gray-900">Your Products</h2>
              <p className="text-gray-500 mt-1">
                  Exclusive pricing for {Array.isArray(user?.assignedCategory) ? <span className="text-blue-600 font-medium">{user.assignedCategory.join(", ")}</span> : (user?.assignedCategory ? <span className="text-blue-600 font-medium">{user.assignedCategory}</span> : "you")}
              </p>
          </div>
          
          <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
              </div>
              <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
              />
          </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or check back later.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 gap-8">
              {filteredProducts.map((product) => (
                  <div 
                      key={product._id} 
                      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col md:flex-row cursor-pointer group"
                      onClick={() => router.push(`/dashboard/products/${product._id}`)}
                  >
                      {/* Image Section */}
                      <div className="w-full md:w-1/4 h-64 md:h-auto relative bg-gray-50">
                           {product.images && product.images.length > 0 ? (
                              <Image 
                                  src={product.images[0].startsWith("http") ? product.images[0] : `http://localhost:8000${product.images[0]}`} 
                                  alt={product.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                           ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                  <Package size={40} />
                              </div>
                           )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                          <div>
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                                  {product.isFeatured && (
                                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                                          Featured
                                      </span>
                                  )}
                              </div>
                              
                              {product.otherData && (
                                  <p className="text-gray-600 mb-4 text-sm">{product.otherData}</p>
                              )}

                              {/* Pricing Information Table */}
                              <div className="mt-6">
                                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Pricing & Packing</h4>
                                  <div className="overflow-x-auto ring-1 ring-gray-200 rounded-lg">
                                      <table className="min-w-full divide-y divide-gray-200">
                                          <thead className="bg-gray-50">
                                              <tr>
                                                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packing</th>
                                                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">BPL</th>
                                                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">MRP</th>
                                                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase</th>
                                                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Selling</th>
                                              </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                              {Array.isArray(product.packingDetails) && product.packingDetails.map((pd, idx) => (
                                                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                                                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                          {pd.packing}
                                                      </td>
                                                      <td className="px-4 py-3 text-sm text-right text-gray-600 font-mono">
                                                          {pd.bpl ? `₹${pd.bpl}` : '-'}
                                                      </td>
                                                      <td className="px-4 py-3 text-sm text-right text-gray-600 font-mono">
                                                          {pd.mrp_price ? `₹${pd.mrp_price}` : '-'}
                                                      </td>
                                                      <td className="px-4 py-3 text-sm text-right text-gray-600 font-mono">
                                                          {pd.purchase_price ? `₹${pd.purchase_price}` : '-'}
                                                      </td>
                                                      <td className="px-4 py-3 text-sm text-right font-bold text-blue-600 font-mono">
                                                          {pd.selling_price ? `₹${pd.selling_price}` : '-'}
                                                      </td>
                                                  </tr>
                                              ))}
                                              {(!product.packingDetails || product.packingDetails.length === 0) && (
                                                  <tr>
                                                      <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                                                          Pricing details available on request
                                                      </td>
                                                  </tr>
                                              )}
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                          </div>
                          
                          {/* View Details Button */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                                  <Eye size={18} />
                                  <span>View Full Details</span>
                                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default DealerDashboard;

