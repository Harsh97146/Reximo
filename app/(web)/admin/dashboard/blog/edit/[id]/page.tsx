"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`http://localhost:3001/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data);
      setPreview(`http://localhost:3001/uploads/${data.featuredImage}`);
    };
    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, featuredImage: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(blog).forEach(([key, value]) => data.append(key, value));

    await fetch(`http://localhost:3001/api/blogs/${id}`, {
      method: "PUT",
      body: data,
    });

    router.push("/admin/dashboard/blog");
  };

  if (!blog) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={blog.author}
          onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={blog.tags}
          onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <CKEditor
          editor={ClassicEditor as any}
          data={blog.content}
          onChange={(event, editor) =>
            setBlog({ ...blog, content: editor.getData() })
          }
        />

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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
