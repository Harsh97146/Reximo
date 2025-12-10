"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Package, ArrowLeft, Box, FileText, 
  CheckCircle, AlertTriangle, Droplet, Palette, 
  Calendar, Archive, Wrench, Target, Shield, Star,
  ClipboardList, Layers, Info, ImageIcon
} from "lucide-react";

const ProductDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    if (params.id) {
      fetchProductDetails(params.id);
    }
  }, [params.id]);

  const fetchProductDetails = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${BASE_API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login?error=Session expired");
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setProduct(data);
      } else {
        setError(data.message || "Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith("http") ? imagePath : `${BACKEND_URL}${imagePath}`;
  };

  const renderArraySection = (title, data, icon) => {
    if (!data || (Array.isArray(data) && data.length === 0)) return null;
    
    const items = Array.isArray(data) ? data : [data];
    
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-700">
              <span className="text-blue-600 mt-1">•</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        Product not found
      </div>
    );
  }


  // Only show images from endImage array
  const allImages = product.endImage || [];



  return (
    <div className="font-dm-sans pb-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Products</span>
      </button>

      {/* Product Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 mb-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            {product.category && (
              <div className="flex flex-wrap gap-2 mt-4">
                {(Array.isArray(product.category) ? product.category : [product.category]).map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
          {product.isFeatured && (
            <span className="px-4 py-2 bg-amber-400 text-amber-900 text-sm font-semibold rounded-full border-2 border-amber-300">
              ⭐ Featured Product
            </span>
          )}
        </div>
      </div>

      {/* Image Gallery Section */}
      {allImages.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package size={24} className="text-blue-600" />
            Product Gallery
          </h3>
          
          <div>
            {/* Main Image */}
            <div className="relative h-[500px] bg-gray-50 rounded-lg overflow-hidden mb-4">
              <img
                src={getImageUrl(allImages[currentImageIndex])}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative h-20 bg-gray-50 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-blue-600 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`${product.name} - Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing & Packing Details */}
      {product.packingDetails && product.packingDetails.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Box size={24} className="text-blue-600" />
            Pricing & Packing Details
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Packing
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    BPL
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    MRP
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Purchase
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Selling
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {product.packingDetails.map((pd, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {pd.packing}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-600 font-mono">
                      {pd.bpl ? `₹${pd.bpl}` : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-600 font-mono">
                      {pd.mrp_price ? `₹${pd.mrp_price}` : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-600 font-mono">
                      {pd.purchase_price ? `₹${pd.purchase_price}` : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-bold text-blue-600 font-mono">
                      {pd.selling_price ? `₹${pd.selling_price}` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {renderArraySection("Description", product.description, <FileText size={24} className="text-blue-600" />)}
        {renderArraySection("Key Features", product.keyFactors, <Star size={24} className="text-blue-600" />)}
        {renderArraySection("Advantages", product.advantages, <CheckCircle size={24} className="text-green-600" />)}
        {renderArraySection("Uses", product.uses, <Target size={24} className="text-purple-600" />)}
        {renderArraySection("Application", product.application, <Wrench size={24} className="text-orange-600" />)}
        {renderArraySection("Areas of Application", product.areasOfApplication, <Layers size={24} className="text-indigo-600" />)}
        {renderArraySection("Method of Application", product.methodOfApplication, <ClipboardList size={24} className="text-teal-600" />)}
        {renderArraySection("How to Apply", product.howToApply, <Info size={24} className="text-cyan-600" />)}
        {renderArraySection("Use By", product.useBy, <Calendar size={24} className="text-pink-600" />)}
        {renderArraySection("Precautions", product.precautions, <AlertTriangle size={24} className="text-red-600" />)}
        {renderArraySection("Standards", product.standards, <Shield size={24} className="text-blue-600" />)}
        {renderArraySection("Storage", product.storage, <Archive size={24} className="text-gray-600" />)}
        {renderArraySection("Shelf Life", product.shelfLife, <Calendar size={24} className="text-amber-600" />)}
        {renderArraySection("Colour", product.colour, <Palette size={24} className="text-pink-600" />)}
        {renderArraySection("Coverage", product.coverage, <Droplet size={24} className="text-blue-600" />)}
      </div>

      {/* Datasheets */}
      {product.datasheet && product.datasheet.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={24} className="text-blue-600" />
            Datasheets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.datasheet.map((sheet, idx) => (
              <a
                key={idx}
                href={getImageUrl(sheet)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <FileText size={20} className="text-blue-600" />
                <span className="text-gray-700 font-medium">Datasheet {idx + 1}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
