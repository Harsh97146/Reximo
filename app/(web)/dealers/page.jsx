"use client";

import { useEffect, useState } from "react";

export default function DealersList() {
  const [dealers, setDealers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3001/api/dealers";

  // ✅ Fetch all dealers
  const fetchDealers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDealers(data);
      setFiltered(data);
    } catch (err) {
      console.error("Error fetching dealers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  // ✅ Filter by search term
  useEffect(() => {
    const filteredList = dealers.filter(
      (d) =>
        d.dealer?.toLowerCase().includes(search.toLowerCase()) ||
        d.location?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  }, [search, dealers]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Our Dealers
      </h1>

      {/* ✅ Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading dealers...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 italic">
          No dealers found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((dealer) => (
            <div
              key={dealer._id}
              className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition-all duration-200"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {dealer.dealer}
              </h2>
              <p className="text-sm text-gray-600">📍 {dealer.location}</p>
              <p className="text-sm text-gray-600">📞 {dealer.number}</p>
              <p className="text-sm text-gray-600">✉️ {dealer.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
