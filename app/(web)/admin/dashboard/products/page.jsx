"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminProductsWithModal() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ category: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [datasheetFiles, setDatasheetFiles] = useState([]);
  const [datasheetPreviews, setDatasheetPreviews] = useState([]);

  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  const API_URL = `${BASE_API_URL}/products`;

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
  const handleInputChange = (e, key, index = null, field = null) => {
    const value = e.target.value;

    if (key === "packingDetails" && index !== null && field) {
      const arr = form[key] ? [...form[key]] : [];
      arr[index] = { ...arr[index], [field]: value };
      setForm({ ...form, [key]: arr });
      return;
    }

    if (index !== null) {
      const arr = form[key] ? [...form[key]] : [];
      arr[index] = value;
      setForm({ ...form, [key]: arr });
    } else {
      setForm({ ...form, [key]: value });
    }
  };

  // Add packing detail row
  const addPackingDetail = () => {
    const arr = form.packingDetails ? [...form.packingDetails] : [];
    arr.push({ packing: "", price: "", discountPrice: "" });
    setForm({ ...form, packingDetails: arr });
  };

  const removePackingDetail = (index) => {
    const arr = [...(form.packingDetails || [])];
    arr.splice(index, 1);
    setForm({ ...form, packingDetails: arr });
  };

  // Add new field in array (for other fields)
  const addArrayField = (key) => {
    const arr = form[key] ? [...form[key]] : [];
    arr.push("");
    setForm({ ...form, [key]: arr });
  };

  const removeArrayField = (key, index) => {
    const arr = [...form[key]];
    arr.splice(index, 1);
    setForm({ ...form, [key]: arr });
  };

  // Image file upload
  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Datasheet file upload
  const handleDatasheetChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setDatasheetFiles((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => file.name);
      setDatasheetPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveDatasheet = (index) => {
    setDatasheetFiles((prev) => prev.filter((_, i) => i !== index));
    setDatasheetPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Add or update product
  const handleAddOrUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name ?? "");
      formData.append("category", form.category ?? "");
      formData.append("otherData", form.otherData ?? "");
      formData.append("isFeatured", form.isFeatured ? "true" : "false");

      [
        "advantages",
        "application",
        "areasOfApplication",
        "methodOfApplication",
        "precautions",
        "uses",
        "standards",
        "storage",
        "shelfLife",
        "colour",
        "coverage",
        "endImage",
        "useBy",
        "howToApply",
        "description",
      ].forEach((key) => {
        if (form[key]) {
          form[key].forEach((item) => formData.append(key, item));
        }
      });

      if (form.packingDetails) {
        formData.append("packingDetails", JSON.stringify(form.packingDetails));
      }

      // Append image files
      files.forEach((file) => formData.append("images", file));

      // Append datasheet files
      datasheetFiles.forEach((file) => formData.append("datasheet", file));

      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to ${editingId ? "update" : "create"} product`);
      }

      // Reset form
      setForm({ category: "", isFeatured: false });
      setFiles([]);
      setPreviewImages([]);
      setDatasheetFiles([]);
      setDatasheetPreviews([]);
      setEditingId(null);
      setShowModal(false);
      await fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert(err.message || "Failed to save product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    let packingDetails = product.packingDetails;
    if (typeof packingDetails === "string") {
      try {
        packingDetails = JSON.parse(packingDetails);
      } catch {
        packingDetails = [];
      }
    }

    setForm({ ...product, packingDetails, category: product.category ?? "" });
    setEditingId(product._id);
    setShowModal(true);

    const backendImages =
      product.images?.map((img) => (img.startsWith("http") ? img : `${BASE_API_URL}${img.startsWith("/") ? img : `/${img}`}`)) || [];

    const endImagePreviews =
      product.endImage?.map((img) => (img.startsWith("http") ? img : `${BASE_API_URL}${img.startsWith("/") ? img : `/${img}`}`)) || [];

    setPreviewImages([...backendImages, ...endImagePreviews]);

    // Optional: load existing datasheets if available
    const existingDatasheets = product.datasheet || [];
    setDatasheetPreviews(existingDatasheets.map((f) => f.split("/").pop()));
    setDatasheetFiles([]);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete product");
      }
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(err.message || "Failed to delete product. Please try again.");
    }
  };

  const categories = ["Tiling Solution", "Waterproofing", "Repairs", "Maintenance", "Stonecare"];

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Products Management</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setForm({ category: "" });
            setFiles([]);
            setPreviewImages([]);
            setDatasheetFiles([]);
            setDatasheetPreviews([]);
            setEditingId(null);
          }}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Add New Product
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-y-auto">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto my-4">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <h2 className="text-lg sm:text-xl font-semibold">{editingId ? "Edit Product" : "Add Product"}</h2>
              <button
                onClick={() => {
                  setForm({ category: "" });
                  setFiles([]);
                  setPreviewImages([]);
                  setDatasheetFiles([]);
                  setDatasheetPreviews([]);
                  setEditingId(null);
                  setShowModal(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <input
              type="text"
              placeholder="Product Name"
              value={form.name || ""}
              onChange={(e) => handleInputChange(e, "name")}
              className="border border-gray-300 p-2 sm:p-3 rounded-md w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Category</label>
              <select
                value={form.category ?? ""}
                onChange={(e) => handleInputChange(e, "category")}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Packing Details */}
            <div className="mb-6">
              <h3 className="font-semibold text-base sm:text-lg mb-3">Packing Size</h3>
              <div className="space-y-3">
                {(form.packingDetails || []).map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Packing (e.g. 1kg, 5L)"
                        value={item.packing || ""}
                        onChange={(e) => handleInputChange(e, "packingDetails", idx, "packing")}
                        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price || ""}
                        onChange={(e) => handleInputChange(e, "packingDetails", idx, "price")}
                        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Discount Price"
                        value={item.discountPrice || ""}
                        onChange={(e) => handleInputChange(e, "packingDetails", idx, "discountPrice")}
                        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => removePackingDetail(idx)}
                      className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addPackingDetail}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
              >
                + Add Packing Detail
              </button>
            </div>

            {/* Array Fields */}
            {[
              "standards",
              "description",
              "advantages",
              "application",
              "areasOfApplication",
              "methodOfApplication",
              "precautions",
              "howToApply",
              "uses",
              "useBy",
              "coverage",
              "colour",
              "storage",
              "shelfLife",
            ].map((key) => (
              <div key={key} className="mb-4">
                <h3 className="font-semibold">{key}</h3>
                {(form[key] || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-1">
                    <textarea
                      value={item}
                      onChange={(e) => handleInputChange(e, key, idx)}
                      className="border p-1 rounded flex-1"
                      rows={3}
                    />
                    <button
                      onClick={() => removeArrayField(key, idx)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button onClick={() => addArrayField(key)} className="bg-green-500 text-white px-2 py-1 rounded mt-1">
                  + Add {key}
                </button>
              </div>
            ))}

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Images</label>
              <input type="file" multiple onChange={handleFileChange} />
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {previewImages.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 group">
                    <Image src={img} alt={`Preview ${i}`} fill className="object-cover rounded-md border" />
                    <button
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Datasheet Upload */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Datasheets</label>
              <input type="file" multiple onChange={handleDatasheetChange} accept=".pdf,.doc,.docx,.xls,.xlsx" />
            </div>

            {/* Datasheet Previews */}
            {datasheetPreviews.length > 0 && (
              <div className="flex flex-col gap-1 mb-4">
                {datasheetPreviews.map((fileName, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>{fileName}</span>
                    <button onClick={() => handleRemoveDatasheet(i)} className="bg-red-500 text-white px-2 rounded">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Featured Checkbox */}
            <div className="mb-4 flex items-center gap-2 p-3 bg-gray-50 rounded-md">
              <input
                type="checkbox"
                checked={form.isFeatured || false}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                id="isFeatured"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isFeatured" className="font-medium text-sm sm:text-base cursor-pointer">
                Mark as Featured Product
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t">
              <button
                onClick={handleAddOrUpdate}
                className="flex-1 bg-green-600 text-white px-4 py-2 sm:py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>
              <button
                onClick={() => {
                  setForm({ category: "" });
                  setFiles([]);
                  setPreviewImages([]);
                  setDatasheetFiles([]);
                  setDatasheetPreviews([]);
                  setEditingId(null);
                  setShowModal(false);
                }}
                className="flex-1 sm:flex-initial bg-gray-400 text-white px-4 py-2 sm:py-3 rounded-md hover:bg-gray-500 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table - Desktop View */}
      <div className="bg-white rounded-lg shadow overflow-hidden mt-4 hidden lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Data</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packing Details</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{p.otherData || "-"}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                      {Array.isArray(p.packingDetails)
                        ? p.packingDetails.slice(0, 2).map((pd, i) => (
                          <div key={i} className="mb-1">
                            {pd.packing} — ₹{pd.price}{" "}
                            {pd.discountPrice && <span className="text-xs text-green-600">(₹{pd.discountPrice})</span>}
                          </div>
                        ))
                        : "-"}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex gap-1">
                        {p.images?.slice(0, 2).map((img, i) => (
                          <div key={i} className="w-12 h-12 relative">
                            <Image
                              src={img.startsWith("http") ? img : `${BASE_API_URL}${img.startsWith("/") ? img : `/${img}`}`}
                              alt={p.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Cards - Mobile/Tablet View */}
      <div className="lg:hidden space-y-4 mt-4">
        {products.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow text-gray-500 italic">
            No products found
          </div>
        ) : (
          products.map((p) => (
            <div key={p._id} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Product Name</h3>
                  <p className="text-base font-semibold text-gray-900">{p.name}</p>
                </div>
                {p.otherData && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Other Data</h3>
                    <p className="text-sm text-gray-900 line-clamp-2">{p.otherData}</p>
                  </div>
                )}
                {Array.isArray(p.packingDetails) && p.packingDetails.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Packing Details</h3>
                    <div className="space-y-1">
                      {p.packingDetails.map((pd, i) => (
                        <div key={i} className="text-sm text-gray-900">
                          {pd.packing} — ₹{pd.price}{" "}
                          {pd.discountPrice && <span className="text-green-600">(₹{pd.discountPrice} discounted)</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {p.images && p.images.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Images</h3>
                    <div className="flex gap-2 flex-wrap">
                      {p.images.slice(0, 3).map((img, i) => (
                        <div key={i} className="w-20 h-20 relative">
                          <Image
                            src={img.startsWith("http") ? img : `${BASE_API_URL}${img.startsWith("/") ? img : `/${img}`}`}
                            alt={p.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
