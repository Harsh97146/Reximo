"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "./Layout/Header";
import DetailSectionItem from "./DetailSectionItem";
import { FaArrowLeft, FaBoxOpen, FaTags, FaInfoCircle, FaDownload } from "react-icons/fa";

const ProductPackingCard = ({ pack }) => {
  const hasDiscount = !!pack.discountPrice;

  return (
    <div className="">
      <p className="font-semibold text-lg">{pack.packing}</p>

      <div className="flex items-center gap-2">
        {hasDiscount ? (
          <>
            <span className="text-xl font-bold text-brand-red">₹{pack.discountPrice}</span>
            <span className="text-sm text-green-600 line-through">₹{pack.price}</span>
          </>
        ) : (
          <span className="text-xl font-bold text-brand-red">₹{pack.price}</span>
        )}
      </div>

      <button className="inline-block mt-2 bg-brand-red text-white px-5 py-1.5 rounded hover:bg-brand-red/90 transition font-medium">
        Enquire
      </button>
    </div>
  );
};

const DetailSection = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/products/${id}`);
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
      <div className="sticky top-0 z-20 max-w-3xl mx-auto bg-white px-4 py-3 flex items-center border-b" style={{ margin: "100 auto" }}>
        <button onClick={() => router.back()} className="p-2 rounded hover:bg-gray-100">
          <FaArrowLeft className="inline mr-2" />Back
        </button>
        <h1 className="font-bold text-lg ml-6">{product.name}</h1>
      </div>

      {/* Main Images Gallery */}
      {product.endImage && product.endImage.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 my-10 py-20">
          <h3 className="flex items-center text-2xl font-semibold mb-3">
            <span className="bg-[#3A9FA8]" style={{ width: "20%", paddingLeft: "10px", borderRadius: "30px", color: "white", paddingTop: "5px", paddingBottom: "5px", textAlign: "center" }}>Product:</span> <span className="ps-2">{product.name}</span>
          </h3>
          <div className="h-1 w-16 bg-brand-red rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.endImage.map((img, idx) =>
              <div key={idx} className="relative w-full h-64 md:h-72 rounded-lg shadow-lg overflow-hidden">
                <Image src={img} alt={`Product Image ${idx + 1}`} fill className="object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* <div className="flex"> */}
      {product.standards?.length > 0 && (
        <section className="max-w-2xl mx-auto px-4 my-10">
          <div className="flex flex-col md:flex-row gap-10">

            {/* LEFT SIDE – Standards */}
            <div className="w-full md:w-1/2">
              <h3 className="flex items-center text-2xl font-semibold mb-3 -mt-3 bg-[#3A9FA8]" style={{ width: "50%", paddingLeft: "10px", borderRadius: "30px", color: "white", paddingTop: "5px", paddingBottom: "5px", textAlign: "center" }}>
                Standards
              </h3>
              <div className="h-1 w-16 bg-brand-red rounded mb-3"></div>

              <ul className="space-y-1">
                {product.standards.map((standard, idx) => (
                  <li key={idx} className="text-lg font-medium text-gray-700">
                    {standard}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE – Packaging */}
            {product.packingDetails?.length > 0 && (
              <div className="w-full md:w-1/2">
                <h3 className="flex items-center text-2xl font-semibold mb-3 -mt-3 bg-[#3A9FA8]" style={{ width: "100%", paddingLeft: "10px", borderRadius: "30px", color: "white", paddingTop: "5px", paddingBottom: "5px", textAlign: "center" }}>
                  <FaTags className="mr-2" /> Packaging Sizes
                </h3>
                <div className="h-1 w-16 bg-brand-red rounded mb-6"></div>

                <div className="">
                  {product.packingDetails.map((pack, idx) => (
                    <ProductPackingCard key={idx} pack={pack} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}


      {/* Packing Details as cards */}
      {/* {product.packingDetails && product.packingDetails.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 my-10">
          <h3 className="flex items-center text-2xl font-semibold mb-3 mt -3">
            <FaTags className="mr-2" /> Packging Sizes
          </h3>
          <div className="h-1 w-16 bg-brand-red rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {product.packingDetails.map((pack, idx) =>
              <ProductPackingCard key={idx} pack={pack} />
            )}
          </div>
        </section>
      )} */}
      {/* </div> */}

      {/* Collapsible product specs */}
      <div className="max-w-3xl mx-auto px-4 my-6">
        <DetailSectionItem title="Description" data={product.description} />
        <DetailSectionItem title="Advantages" data={product.advantages} />
        <DetailSectionItem title="Key Factors" data={product.keyFactors} />
        <DetailSectionItem title="Application" data={product.application} />
        <DetailSectionItem title="Areas Of Application" data={product.areasOfApplication} />
        <DetailSectionItem title="Methods Of Application" data={product.methodOfApplication} />
        <DetailSectionItem title="Precautions" data={product.precautions} />
        <DetailSectionItem title="How To Apply" data={product.howToApply} />
        <DetailSectionItem title="Use" data={product.uses} />
        <DetailSectionItem title="Use By" data={product.useBy} />
        <DetailSectionItem title="Coverage" data={product.coverage} />
        <DetailSectionItem title="Colour" data={product.colour} />
        <DetailSectionItem title="Storage" data={product.storage} />
        <DetailSectionItem title="Shelf Life" data={product.shelfLife} />
      </div>

      {product.datasheet && product.datasheet.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 my-10">
          <h3 className="flex items-center text-2xl font-semibold mb-3">
            <FaInfoCircle className="mr-2" /> Documents
          </h3>
          <div className="h-1 w-16 bg-brand-red rounded mb-6"></div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.datasheet.map((file, idx) => {
              const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
              const url = file.startsWith("http") ? file : `${base}${file.startsWith("/") ? file : `/${file}`}`;
              const name = (file || "").split("/").pop();
              return (
                <li key={idx} className="flex items-center justify-between p-3 bg-white">
                  <a
                    href={url}
                    download
                    className=""
                  >
                    <span className="text-sm font-medium truncate mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 15 15"><path fill="#d1b56c" d="M2.5 6.5V6H2v.5zm4 0V6H6v.5zm0 4H6v.5h.5zm7-7h.5v-.207l-.146-.147zm-3-3l.354-.354L10.707 0H10.5zM2.5 7h1V6h-1zm.5 4V8.5H2V11zm0-2.5v-2H2v2zm.5-.5h-1v1h1zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 5 7.5zM3.5 7a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 3.5 6zM6 6.5v4h1v-4zm.5 4.5h1v-1h-1zM9 9.5v-2H8v2zM7.5 6h-1v1h1zM9 7.5A1.5 1.5 0 0 0 7.5 6v1a.5.5 0 0 1 .5.5zM7.5 11A1.5 1.5 0 0 0 9 9.5H8a.5.5 0 0 1-.5.5zM10 6v5h1V6zm.5 1H13V6h-2.5zm0 2H12V8h-1.5zM2 5V1.5H1V5zm11-1.5V5h1V3.5zM2.5 1h8V0h-8zm7.646-.146l3 3l.708-.708l-3-3zM2 1.5a.5.5 0 0 1 .5-.5V0A1.5 1.5 0 0 0 1 1.5zM1 12v1.5h1V12zm1.5 3h10v-1h-10zM14 13.5V12h-1v1.5zM12.5 15a1.5 1.5 0 0 0 1.5-1.5h-1a.5.5 0 0 1-.5.5zM1 13.5A1.5 1.5 0 0 0 2.5 15v-1a.5.5 0 0 1-.5-.5z" /></svg></span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Sticky Bottom Action Bar for Mobile */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white shadow flex justify-around py-2 px-3 z-50">
        <button className="bg-brand-red text-white px-5 py-2 rounded-lg font-bold">Enquire</button>
        <button className="bg-gray-100 text-brand-red px-5 py-2 rounded-lg font-bold">Share</button>
      </div>
    </div>
  );
};

export default DetailSection;
