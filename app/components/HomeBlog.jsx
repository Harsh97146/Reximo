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
      img: "/img/home/blog-1.png",
      date: "20 Oct, 2025",
    },
    {
      _id: "default-2",
      title: "Ultimate Guide to Tiling Solutions",
      description:
        "Confused about tile adhesives or grouts? This blog explains different types, how to choose the ..",
      img: "/img/home/blog-2.png",
      date: "20 Oct, 2025",
    },
    {
      _id: "default-3",
      title: "Stop Leakage Forever! Best Waterproofing ",
      description:
        "Water damage is the biggest enemy of buildings. Discover the latest waterproofing methods for roofs",
      img: "/img/home/blog-3.png",
      date: "20 Oct, 2025",
    },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/blogs");
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
    <section className="w-full relative sm:py-[100px] py-10 bg-[#F8F9FA]">
      <div className="ct-container">
        <div className="sm:mb-14 mb-8">
          <ProductTitle
            heading="Our Latest Blog"
            subHeading="Blog"
            align="center"
          />
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-[30px] gap-5">
          {displayedBlogs.map((blog, index) => (
            <div
              key={index}
              onClick={() => handleBlogClick(blog._id)}
              className="cursor-pointer w-full rounded-2xl bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.06)] relative overflow-hidden h-full transition-all duration-300 hover:shadow-lg [&:hover_.card-img]:scale-[1.05]"
            >
              <div className="w-full rounded-sm md:h-[280px] sm:h-[200px] h-[160px] bg-[#f9f9f9] overflow-hidden">
                <img
                  src={blog.featuredImage || "/img/home/blog-1.png"}
                  alt={blog.title}
                  className="w-full h-full object-cover card-img transition-all duration-300"
                />
              </div>
              <div className="sm:p-6 p-4">
                <div className="w-full mb-4 flex items-center gap-2">
                  <img
                    src="./img/home/calendar.png"
                    alt="calendar"
                    className="sm:w-6 sm:h-6 w-4 h-4 object-contain shrink-0"
                  />
                  <span className="block text-base font-normal text-[#111112]">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "20 Oct, 2025"}
                  </span>
                </div>
                <h3 className="block mb-1 text-[#111112] text-lg font-semibold">
                  {blog.title}
                </h3>
                <span className="block text-base font-normal text-[#111112]">
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
