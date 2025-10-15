"use client";

import { useEffect, useState } from "react";
import ListItem from "./ListItem";

const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/products"); // your API endpoint
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-100 text-center">
        <p className="text-gray-600">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
          <p className="mt-2 text-gray-600">
            Explore our range of high-quality products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <ListItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default List;
