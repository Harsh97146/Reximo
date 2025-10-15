"use client";

import React, { useState, useEffect } from "react";

const ProjectRoutes = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    doneBy: "",
    products: "",
    address: {
      city: "",
      state: "",
      country: "",
    },
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  const BASE_URL = "http://localhost:3001/api/projects";

  // Fetch Projects
  const fetchProjectsData = async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  // Handle Edit
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      doneBy: project.doneBy,
      products: project.products?.join(", ") || "",
      address: {
        city: project.address?.city || "",
        state: project.address?.state || "",
        country: project.address?.country || "",
      },
      images: [],
    });
    setImagePreviews(project.images || []);
    setShowForm(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleImageClick = (img) => {
    setPopupImage(img);
    setShowImagePopup(true);
  };

  // ✅ Handle Form Submit (fixed address format)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("doneBy", formData.doneBy);

      // Convert products string to array
      const productsArray = formData.products
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);
      fd.append("products", JSON.stringify(productsArray));

      // ✅ FIXED: Send address as JSON
      const addressObj = {
        city: formData.address.city,
        state: formData.address.state,
        country: formData.address.country,
      };
      fd.append("address", JSON.stringify(addressObj));

      // Append images
      formData.images.forEach((file) => fd.append("images", file));

      let res;
      if (editingProject) {
        res = await fetch(`${BASE_URL}/${editingProject._id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        res = await fetch(BASE_URL, {
          method: "POST",
          body: fd,
        });
      }

      if (!res.ok) throw new Error("Failed to save project");
      const savedProject = await res.json();

      if (editingProject) {
        setProjects(
          projects.map((p) => (p._id === editingProject._id ? savedProject : p))
        );
        setEditingProject(null);
      } else {
        setProjects([...projects, savedProject]);
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        doneBy: "",
        products: "",
        address: {
          city: "",
          state: "",
          country: "",
        },
        images: [],
      });
      setImagePreviews([]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save project");
    }
  };

  if (loading)
    return <p className="text-center py-8">Loading projects...</p>;
  if (error)
    return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProject(null);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                name="doneBy"
                placeholder="Done By"
                value={formData.doneBy}
                onChange={(e) =>
                  setFormData({ ...formData, doneBy: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                name="products"
                placeholder="Products (comma separated)"
                value={formData.products}
                onChange={(e) =>
                  setFormData({ ...formData, products: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  name="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  className="border p-2 rounded"
                />
                <input
                  name="state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value },
                    })
                  }
                  className="border p-2 rounded"
                />
                <input
                  name="country"
                  placeholder="Country"
                  value={formData.address.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value },
                    })
                  }
                  className="border p-2 rounded"
                />
              </div>

              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full border p-2 rounded"
              />

              {/* Image Previews */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                {imagePreviews.map((img, idx) => (
                  <img
                    key={idx}
                    src={img instanceof File ? URL.createObjectURL(img) : img}
                    alt={`preview-${idx}`}
                    className="w-full h-24 object-cover rounded border cursor-pointer"
                    onClick={() => handleImageClick(img)}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {editingProject ? "Update Project" : "Save Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Image Popup */}
      {showImagePopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={() => setShowImagePopup(false)}
        >
          <img
            src={
              popupImage instanceof File
                ? URL.createObjectURL(popupImage)
                : popupImage
            }
            alt="popup"
            className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
          />
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Projects Found
          </h3>
          <p className="text-gray-500 mb-4">
            Start by adding your first project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <p className="text-sm mb-2">
                  <strong>Done by:</strong> {project.doneBy}
                </p>
                {project.products && (
                  <p className="text-sm mb-2">
                    <strong>Products:</strong> {project.products.join(", ")}
                  </p>
                )}
                {project.address && (
                  <p className="text-sm mb-4">
                    <strong>Location:</strong> {project.address.city},{" "}
                    {project.address.state}, {project.address.country}
                  </p>
                )}

                {project.images && project.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {project.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`project-${idx}`}
                        className="w-full h-24 object-cover rounded border cursor-pointer"
                        onClick={() => handleImageClick(img)}
                      />
                    ))}
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100 transition-colors"
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
};

export default ProjectRoutes;
