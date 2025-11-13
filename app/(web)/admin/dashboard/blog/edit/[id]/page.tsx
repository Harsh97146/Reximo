"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import react-quill-new to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${apiUrl}/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
        if (data.featuredImage) {
          setPreview(`${apiUrl}/uploads/${data.featuredImage}`);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  // Enhanced Quill editor modules with table, image resize, and more features
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          [{ script: "sub" }, { script: "super" }],
          [{ direction: "rtl" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link", "image", "video"],
          ["code-block"],
          ["table"],
          ["clean"],
        ],
        handlers: {
          image: function () {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (file) {
                // Convert image to base64 for embedding in HTML
                const reader = new FileReader();
                reader.onload = (e) => {
                  const quill = this.quill;
                  const range = quill.getSelection();
                  const index = range ? range.index : 0;
                  quill.insertEmbed(index, "image", e.target?.result);
                };
                reader.readAsDataURL(file);
              }
            };
          },
        },
      },
      table: true,
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "script",
    "direction",
    "color",
    "background",
    "align",
    "link",
    "image",
    "video",
    "code-block",
    "table",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlog({ ...blog, featuredImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (content) => {
    setBlog({ ...blog, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content); // HTML content from Quill
      formData.append("author", blog.author || "");
      formData.append("tags", blog.tags || "");
      if (blog.featuredImage instanceof File) {
        formData.append("featuredImage", blog.featuredImage);
      }

      const response = await fetch(`${apiUrl}/blogs/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        router.push("/admin/dashboard/blog");
      } else {
        alert("Error updating blog. Please try again.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Error updating blog. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading blog...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-6">
        <div className="text-red-600">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={blog.title || ""}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={blog.author || ""}
              onChange={(e) => setBlog({ ...blog, author: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              value={blog.tags || ""}
              onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* React Quill Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={blog.content || ""}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              className="bg-white"
              style={{ minHeight: "400px" }}
            />
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-md h-56 object-cover mt-3 rounded-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {submitting ? "Updating..." : "Update Blog"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard/blog")}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
