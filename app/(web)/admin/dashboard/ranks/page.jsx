"use client";

import { useState, useEffect } from "react";

export default function RanksManagement() {
  const [ranks, setRanks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    minPoints: 0,
    color: "#FFD700",
    benefits: [""], // Changed to array
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/ranks`;

  // ✅ Fetch all ranks
  const fetchRanks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRanks(data);
    } catch (err) {
      console.error("Failed to fetch ranks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanks();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Benefit Handlers
  const handleBenefitChange = (index, value) => {
      const newBenefits = [...formData.benefits];
      newBenefits[index] = value;
      setFormData({ ...formData, benefits: newBenefits });
  };

  const addBenefit = () => {
      setFormData({ ...formData, benefits: [...formData.benefits, ""] });
  };

  const removeBenefit = (index) => {
      const newBenefits = formData.benefits.filter((_, i) => i !== index);
      setFormData({ ...formData, benefits: newBenefits });
  };

  // ✅ Add or Update rank
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty benefits
    const benefitsArray = formData.benefits.map(b => b.trim()).filter(b => b);

    const payload = {
      ...formData,
      benefits: benefitsArray,
    };

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${editId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save rank");
      }

      setFormData({ name: "", minPoints: 0, color: "#FFD700", benefits: [""] });
      setIsEditing(false);
      setEditId(null);
      await fetchRanks();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save rank. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit rank
  const handleEdit = (rank) => {
    setFormData({
      name: rank.name,
      minPoints: rank.minPoints,
      color: rank.color,
      benefits: (rank.benefits && rank.benefits.length > 0) ? rank.benefits : [""],
    });
    setIsEditing(true);
    setEditId(rank._id || null);
  };

  // ✅ Delete rank
  const handleDelete = async (id) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this rank?")) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete rank");
      }
      await fetchRanks();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete rank. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Ranks Management</h1>
      </div>

      {/* ✅ Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-4 sm:mb-6 bg-gray-50 p-4 sm:p-6 rounded-lg shadow space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rank Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Gold"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 sm:p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min. Points Required</label>
            <input
              type="number"
              name="minPoints"
              placeholder="0"
              value={formData.minPoints}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 sm:p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

           <div className="flex flex-col justify-start">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tag Color</label>
            <div className="flex items-center space-x-2 h-full">
                <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="h-10 w-12 p-0 border border-gray-300 rounded-md cursor-pointer"
                />
                 <span className="text-gray-500 text-sm">{formData.color}</span>
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
            <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={benefit}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                            placeholder={`Benefit ${index + 1}`}
                            className="flex-1 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                         <button
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                            title="Remove Benefit"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
             <button
                type="button"
                onClick={addBenefit}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
                + Add Benefit
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 sm:py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {isEditing ? "Update Rank" : "Add Rank"}
        </button>
      </form>

      {/* ✅ Ranks Table - Desktop View */}
      <div className="bg-white rounded-lg shadow overflow-hidden hidden lg:block">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points Req
                  </th>

                   <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Color
                  </th>
                   <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Benefits
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ranks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-gray-500 italic"
                    >
                      No ranks found
                    </td>
                  </tr>
                ) : (
                  ranks.map((rank) => (
                    <tr key={rank._id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {rank.name}
                      </td>
                       <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rank.minPoints}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded border shadow-sm" style={{ backgroundColor: rank.color }}></div>
                             <span>{rank.color}</span>
                        </div>
                      </td>
                       <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                        {rank.benefits && rank.benefits.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {rank.benefits.map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(rank)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(rank._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Ranks Cards - Mobile/Tablet View */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="p-4 text-center bg-white rounded-lg shadow">Loading...</div>
        ) : ranks.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow text-gray-500 italic">
            No ranks found
          </div>
        ) : (
          ranks.map((rank) => (
            <div key={rank._id} className="bg-white rounded-lg shadow p-4 sm:p-6" style={{ borderLeft: `5px solid ${rank.color}`}}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">{rank.name}</h3>
                   <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">Min: {rank.minPoints} pts</span>
                </div>
                


                {rank.benefits && rank.benefits.length > 0 && (
                     <div>
                        <h4 className="text-xs font-semibold uppercase text-gray-500 mb-1">Benefits</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            {rank.benefits.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                     </div>
                )}
               
                <div className="flex gap-3 pt-3 border-t border-gray-200 mt-2">
                  <button
                    onClick={() => handleEdit(rank)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rank._id)}
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
