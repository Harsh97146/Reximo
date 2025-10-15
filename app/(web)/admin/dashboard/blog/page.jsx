"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogManagement() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:3001/api/blogs");
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await fetch(`http://localhost:3001/api/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Manage Blogs</h1>
        <button
          onClick={() => router.push("/admin/dashboard/blog/add-blog")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          + Add New
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500">No blogs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
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
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() =>
                      router.push(`/admin/dashboard/blog/edit/${blog._id}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
