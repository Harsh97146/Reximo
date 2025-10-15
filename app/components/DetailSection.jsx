"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "./Layout/Header";
import DetailSectionItem from "./DetailSectionItem";
import { FaArrowLeft, FaBoxOpen, FaTags, FaInfoCircle } from "react-icons/fa";

const ProductPackingCard = ({pack}) => (
  <div className="group border rounded-xl p-4 shadow bg-white flex flex-col items-start gap-3 transition-all hover:shadow-lg">
    <p className="font-semibold text-lg">{pack.packing}</p>
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold text-brand-red">₹{pack.price}</span>
      {!!pack.discountPrice &&
        <span className="text-sm text-green-600 line-through">₹{pack.discountPrice}</span>}
    </div>
    <button className="inline-block mt-2 bg-brand-red text-white px-5 py-1.5 rounded hover:bg-brand-red/90 transition font-medium">
      Enquire
    </button>
  </div>
);

const DetailSection = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        router.back();
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id, router]);

  if (loading) return (
    <div className="py-16 text-center">
      <p className="text-gray-500">Loading product...</p>
    </div>
  );
  if (!product) return (
    <div className="py-16 text-center">
      <p className="text-red-500">Product not found</p>
    </div>
  );

  return (
    <div>
      <Header
        image={product.mainImage || "/img/home1.png"}
        imageAlt={product.name}
        title={[product.name, product.notes]}
      />

      {/* Sticky back button and title */}
      <div className="sticky top-0 z-20 max-w-3xl mx-auto bg-white px-4 py-3 flex items-center border-b">
        <button onClick={() => router.back()} className="p-2 rounded hover:bg-gray-100">
          <FaArrowLeft className="inline mr-2" />Back
        </button>
        <h1 className="font-bold text-lg ml-6">{product.name}</h1>
      </div>

      {/* Main Images Gallery */}
      {product.endImage && product.endImage.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 my-10">
          <h3 className="flex items-center text-2xl font-semibold mb-3">
            <FaBoxOpen className="mr-2" /> Images
          </h3>
          <div className="h-1 w-16 bg-brand-red rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.endImage.map((img, idx) =>
              <div key={idx} className="relative w-full h-64 md:h-72 rounded-lg shadow-lg overflow-hidden">
                <Image src={img} alt={`Product Image ${idx+1}`} fill className="object-cover"/>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Packing Details as cards */}
      {product.packingDetails && product.packingDetails.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 my-10">
          <h3 className="flex items-center text-2xl font-semibold mb-3">
            <FaTags className="mr-2" /> Packing Details
          </h3>
          <div className="h-1 w-16 bg-brand-red rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {product.packingDetails.map((pack, idx) =>
              <ProductPackingCard key={idx} pack={pack}/>
            )}
          </div>
        </section>
      )}

      {/* Collapsible product specs */}
      <div className="max-w-3xl mx-auto px-4 my-6">
        <DetailSectionItem title="Description" data={product.description}/>
        <DetailSectionItem title="Use" data={product.uses}/>
        <DetailSectionItem title="Use By" data={product.useBy}/>
        <DetailSectionItem title="Advantages" data={product.advantages}/>
        <DetailSectionItem title="Application" data={product.application}/>
        <DetailSectionItem title="How To Apply" data={product.howToApply}/>
        <DetailSectionItem title="Areas Of Application" data={product.areasOfApplication}/>
        <DetailSectionItem title="Methods Of Application" data={product.methodOfApplication}/>
        <DetailSectionItem title="Precautions" data={product.precautions}/>
        <DetailSectionItem title="Standards" data={product.standards}/>
        <DetailSectionItem title="Storage" data={product.storage}/>
        <DetailSectionItem title="Colour" data={product.colour}/>
        <DetailSectionItem title="Coverage" data={product.coverage}/>
        <DetailSectionItem title="Shelf Life" data={product.shelfLife}/>
      </div>

      {/* Sticky Bottom Action Bar for Mobile */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white shadow flex justify-around py-2 px-3 z-50">
        <button className="bg-brand-red text-white px-5 py-2 rounded-lg font-bold">Enquire</button>
        <button className="bg-gray-100 text-brand-red px-5 py-2 rounded-lg font-bold">Share</button>
      </div>
    </div>
  );
};

export default DetailSection;
