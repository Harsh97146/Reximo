"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="ct-container py-20 sm:py-24 md:py-28 text-center text-gray-500" style={{ marginTop: "100px" }}>
        <p className="text-base sm:text-lg md:text-xl">Loading blogs...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-100" style={{ marginTop: "100px" }}>
        <div className="ct-container text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
            All Blogs
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium">
            No blogs available right now. Please check back later!
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="ct-container py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20" style={{ marginTop: "100px", minHeight: "calc(100vh - 200px)" }}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 mx-auto my-2 text-center px-4">
        All Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/blog/${blog._id}`)}
          >
            {blog.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px] xl:h-[320px] w-full object-cover"
              />
            )}
            <div className="p-4 sm:p-5 md:p-6">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2">{blog.title}</h2>
              <p
                className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-3 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
