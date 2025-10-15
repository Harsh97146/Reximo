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

  const API_URL = "http://localhost:3001/api/products";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
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

      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, { method: "PUT", body: formData });
      } else {
        await fetch(API_URL, { method: "POST", body: formData });
      }

      // Reset form
      setForm({ category: "" });
      setFiles([]);
      setPreviewImages([]);
      setDatasheetFiles([]);
      setDatasheetPreviews([]);
      setEditingId(null);
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
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
      product.images?.map((img) => (img.startsWith("http") ? img : `http://localhost:3001${img}`)) || [];

    const endImagePreviews =
      product.endImage?.map((img) => (img.startsWith("http") ? img : `http://localhost:3001${img}`)) || [];

    setPreviewImages([...backendImages, ...endImagePreviews]);

    // Optional: load existing datasheets if available
    const existingDatasheets = product.datasheet || [];
    setDatasheetPreviews(existingDatasheets.map((f) => f.split("/").pop()));
    setDatasheetFiles([]);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ["Ceramic", "Waterproofing", "Repairs", "Maintenance", "Stonecare"];

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
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
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[80%] max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Product" : "Add Product"}</h2>

            <input
              type="text"
              placeholder="Product Name"
              value={form.name || ""}
              onChange={(e) => handleInputChange(e, "name")}
              className="border p-2 rounded w-full mb-2"
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

            <textarea
              placeholder="Other Data (HTML/notes)"
              value={form.otherData || ""}
              onChange={(e) => handleInputChange(e, "otherData")}
              className="border p-2 rounded w-full mb-4"
            />

            {/* Packing Details */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Packing Details</h3>
              {(form.packingDetails || []).map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Packing (e.g. 1kg, 5L)"
                    value={item.packing || ""}
                    onChange={(e) => handleInputChange(e, "packingDetails", idx, "packing")}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price || ""}
                    onChange={(e) => handleInputChange(e, "packingDetails", idx, "price")}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Discount Price"
                    value={item.discountPrice || ""}
                    onChange={(e) => handleInputChange(e, "packingDetails", idx, "discountPrice")}
                    className="border p-2 rounded"
                  />
                  <button
                    onClick={() => removePackingDetail(idx)}
                    className="bg-red-500 text-white px-2 rounded col-span-3"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={addPackingDetail} className="bg-green-500 text-white px-3 py-1 rounded">
                + Add Packing Detail
              </button>
            </div>

            {/* Array Fields */}
            {[
              "description",
              "advantages",
              "precautions",
              "howToApply",
              "shelfLife",
              "colour",
              "coverage",
              "application",
              "areasOfApplication",
              "methodOfApplication",
              "uses",
              "standards",
              "storage",
              "useBy",
            ].map((key) => (
              <div key={key} className="mb-4">
                <h3 className="font-semibold">{key}</h3>
                {(form[key] || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-1">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInputChange(e, key, idx)}
                      className="border p-1 rounded flex-1"
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

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddOrUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                {editingId ? "Update" : "Add"}
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
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Other Data</th>
              <th className="px-6 py-3">Packing Details</th>
              <th className="px-6 py-3">Images</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p._id}>
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4">{p.otherData}</td>
                <td className="px-6 py-4">
                  {Array.isArray(p.packingDetails)
                    ? p.packingDetails.map((pd, i) => (
                        <div key={i}>
                          {pd.packing} — ₹{pd.price}{" "}
                          {pd.discountPrice && <span className="text-sm text-green-600">(₹{pd.discountPrice} discounted)</span>}
                        </div>
                      ))
                    : null}
                </td>
                <td className="px-6 py-4 flex gap-1">
                  {p.images?.map((img, i) => (
                    <div key={i} className="w-16 h-16 relative">
                      <Image src={img.startsWith("http") ? img : `http://localhost:3001${img}`} alt={p.name} fill className="object-cover rounded" />
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-900 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
