"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import router from "next/router";

// Dynamically import react-quill-new and image resize module to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const ImageResizeModule = dynamic(
  () => import("quill-image-resize-module-react"),
  { ssr: false }
);

export default function AddBlog() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    featuredImage: null,
  });
  const [preview, setPreview] = useState("");

  // Register image resize module when both ReactQuill and ImageResizeModule have loaded
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-quill-new").then(({ Quill }) => {
        import("quill-image-resize-module-react").then((mod) => {
          Quill.register("modules/imageResize", mod.default);
        });
      });
    }
  }, []);

  // Quill editor modules and formats configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    imageResize: {},
  }), []);

  const formats = [
    "header", "bold", "italic", "underline", "strike",
    "list", "bullet", "link", "image",
  ];

  // Handle featured image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlog({ ...blog, featuredImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle content change in editor
  const handleContentChange = (content) => {
    setBlog({ ...blog, content });
  };

  // Submit blog form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(blog).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    try {
      await fetch("http://localhost:3001/api/blogs", {
        method: "POST",
        body: formData,
      });
      // Navigate after success
      router.push("/admin/dashboard/blog");
    } catch (err) {
      console.error("Error submitting blog:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        {/* Author */}
        <input
          type="text"
          placeholder="Author"
          value={blog.author}
          onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          className="w-full border p-2 rounded"
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={blog.tags}
          onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
          className="w-full border p-2 rounded"
        />

        {/* React Quill Editor */}
        <div className="border rounded p-1">
          <ReactQuill
            theme="snow"
            value={blog.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            style={{ height: "300px" }}
          />
        </div>

        {/* Featured Image */}
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-cover mt-3 rounded-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
