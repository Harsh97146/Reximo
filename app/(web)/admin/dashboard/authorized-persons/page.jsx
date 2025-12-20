"use client";

import { useState, useEffect } from "react";

export default function AuthorizedPersonsManagement() {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/authorized-persons`;

  // ✅ Fetch all persons
  const fetchPersons = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPersons(data);
    } catch (err) {
      console.error("Failed to fetch authorized persons", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update person
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${editId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save authorized person");
      }

      setFormData({ name: "" });
      setIsEditing(false);
      setEditId(null);
      await fetchPersons();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save authorized person. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit person
  const handleEdit = (person) => {
    setFormData({ name: person.name });
    setIsEditing(true);
    setEditId(person._id || null);
  };

  // ✅ Delete person
  const handleDelete = async (id) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this authorized person?")) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete authorized person");
      }
      await fetchPersons();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete authorized person. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Authorized Company Person Management</h1>
      </div>

      {/* ✅ Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-4 sm:mb-6 bg-gray-50 p-4 sm:p-6 rounded-lg shadow space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 sm:p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 col-span-2"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 sm:py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {isEditing ? "Update Person" : "Add Person"}
        </button>
      </form>

      {/* ✅ Persons Table - Desktop View */}
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {persons.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="text-center py-8 text-gray-500 italic"
                    >
                      No authorized persons found
                    </td>
                  </tr>
                ) : (
                  persons.map((person) => (
                    <tr key={person._id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {person.name}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(person)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(person._id)}
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

      {/* ✅ Persons Cards - Mobile/Tablet View */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="p-4 text-center bg-white rounded-lg shadow">Loading...</div>
        ) : persons.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow text-gray-500 italic">
            No authorized persons found
          </div>
        ) : (
          persons.map((person) => (
            <div key={person._id} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="text-base font-semibold text-gray-900">{person.name}</p>
                </div>
                <div className="flex gap-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(person)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(person._id)}
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
