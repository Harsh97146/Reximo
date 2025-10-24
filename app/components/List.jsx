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
    <section className="py-16 bg-gray-100" style={{ marginTop: "50px" }}>
      <div className="ct-containers px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg font-medium">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <ListItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default List;
