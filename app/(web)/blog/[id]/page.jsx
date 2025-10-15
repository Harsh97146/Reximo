"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading blog...</div>;
  if (!blog) return <div className="p-6 text-center text-red-500">Blog not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      {blog.featuredImage && (
        <img
          src={`${blog.featuredImage}`}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-t-xl mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-4">By {blog.author}</p>
      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: blog.content }} />
      {blog.tags && (
        <div className="mt-6">
          <strong>Tags:</strong>{" "}
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-gray-200 text-gray-700 px-2 py-1 mr-2 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={() => router.push("/blog")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Blogs
      </button>
    </div>
  );
}
