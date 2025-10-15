"use client";

import { useState, useEffect } from "react";

export default function DealersManagement() {
  const [dealers, setDealers] = useState([]);
  const [formData, setFormData] = useState({
    dealer: "",
    email: "",
    number: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3001/api/dealers";

  // ✅ Fetch all dealers
  const fetchDealers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDealers(data);
    } catch (err) {
      console.error("Failed to fetch dealers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update dealer
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${editId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save dealer");

      setFormData({ dealer: "", email: "", number: "", location: "" });
      setIsEditing(false);
      setEditId(null);
      fetchDealers();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Edit dealer
  const handleEdit = (dealer) => {
    setFormData(dealer);
    setIsEditing(true);
    setEditId(dealer._id || null);
  };

  // ✅ Delete dealer
  const handleDelete = async (id) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this dealer?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete dealer");
      fetchDealers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dealers Management</h1>
      </div>

      {/* ✅ Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg shadow"
      >
        <input
          type="text"
          name="dealer"
          placeholder="Dealer Name"
          value={formData.dealer}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors col-span-1 md:col-span-4"
        >
          {isEditing ? "Update Dealer" : "Add Dealer"}
        </button>
      </form>

      {/* ✅ Dealers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Dealer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dealers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No dealers found
                  </td>
                </tr>
              ) : (
                dealers.map((dealer) => (
                  <tr key={dealer._id}>
                    <td className="px-6 py-4">{dealer.dealer}</td>
                    <td className="px-6 py-4">{dealer.email}</td>
                    <td className="px-6 py-4">{dealer.number}</td>
                    <td className="px-6 py-4">{dealer.location}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(dealer)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dealer._id)}
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
        )}
      </div>
    </div>
  );
}
