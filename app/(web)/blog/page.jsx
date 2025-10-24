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
        const res = await fetch("http://localhost:3001/api/blogs");
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
      <div className="p-6 text-center text-gray-500">
        Loading blogs...
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="py-20 bg-gray-100" style={{ marginTop: "150px" }}>
        <div className="ct-container text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            All Blogs
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            No blogs available right now. Please check back later!
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="p-6 ct-container mx-20" style={{ marginTop: "150px" }}>
      <h1 className="text-3xl font-bold mb-6 mx-auto my-2 text-center">
        All Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            onClick={() => router.push(`/blog/${blog._id}`)}
          >
            {blog.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
              <p
                className="text-gray-600 text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
