"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductTitle from "./ul/ProductTitle";

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  const defaultProducts = [
    {
      _id: "default-1",
      title: "Why Construction Chemicals Matter",
      description:
        "Learn how construction chemicals improve durability, strength, and safety in modern construction. ",
        featuredImage: "/img/home/construction-worker-pouring-wet-concret-road-construction-site-1-e1703238135389.jpg",
      date: "20 Oct, 2025",
    },
    {
      _id: "default-2",
      title: "Ultimate Guide to Tiling Solutions",
      description:
        "Confused about tile adhesives or grouts? This blog explains different types, how to choose the ..",
        featuredImage: "/img/home/worker-painting-wall-with-roller-construction-site_1048258-11576.jpg",
      date: "20 Oct, 2025",
    },
    {
      _id: "default-3",
      title: "Stop Leakage Forever! Best Waterproofing ",
      description:
        "Water damage is the biggest enemy of buildings. Discover the latest waterproofing methods for roofs",
        featuredImage: "/img/home/pexels-rezwan-1216589.jpg",
      date: "20 Oct, 2025",
    },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/blogs`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();

        // Take only 3 blogs
        const sliced = data?.slice(0, 3) || [];
        setBlogs(sliced);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);

  const displayedBlogs = blogs.length > 0 ? blogs : defaultProducts;

  // handle click
  const handleBlogClick = (id) => {
    router.push(`/blog/${id}`);
  };

  return (
    <section className="w-full relative py-10 sm:py-14 md:py-16 lg:py-20 xl:py-[100px] bg-[#F8F9FA]">
      <div className="ct-container">
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14">
          <ProductTitle
            heading="Our Latest Blog"
            subHeading="Blog"
            align="center"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-[30px]">
          {displayedBlogs.map((blog, index) => (
            <div
              key={index}
              // onClick={() => handleBlogClick(blog._id)}
              className="cursor-pointer w-full rounded-xl sm:rounded-2xl bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.06)] relative overflow-hidden h-full transition-all duration-300 hover:shadow-lg [&:hover_.card-img]:scale-[1.05]"
            >
              <div className="w-full rounded-sm h-[140px] sm:h-[180px] md:h-[220px] lg:h-[260px] xl:h-[280px] 2xl:h-[320px] bg-[#f9f9f9] overflow-hidden">
                <img
                  src={blog.featuredImage || "/img/home/blog-1.png"}
                  alt={blog.title}
                  className="w-full h-full object-cover card-img transition-all duration-300"
                />
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <div className="w-full mb-3 sm:mb-4 flex items-center gap-2">
                  <img
                    src="./img/home/calendar.png"
                    alt="calendar"
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain shrink-0"
                  />
                  <span className="block text-xs sm:text-sm md:text-base font-normal text-[#111112]">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "20 Oct, 2025"}
                  </span>
                </div>
                <h3 className="block mb-2 text-[#111112] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-tight">
                  {blog.title}
                </h3>
                <span className="block text-sm sm:text-base md:text-lg font-normal text-[#111112] leading-relaxed">
                  {blog.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
