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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading blogs...</div>;

  if (blogs.length === 0)
    return <div className="p-6 text-center text-gray-500">No blogs available.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            onClick={() => router.push(`/blog/${blog._id}`)}
          >
            {blog.featuredImage && (
              <img
                src={`${blog.featuredImage}`}
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
