"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ProjectDetailsSection = () => {
  const params = useParams();
  const id = params?.id;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading project details...
      </div>
    );

  if (!project)
    return (
      <div className="text-center mt-20 text-gray-600">
        Project not found 😕
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
      <Link
        href="/projects"
        className="inline-block mb-6 text-blue-600 font-medium hover:underline"
      >
        ← Back to Projects
      </Link>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-0">
            {project.title}
          </h1>
          <span className="text-gray-500 text-sm md:text-base">
            Done by: <strong>{project.doneBy}</strong>
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-lg md:text-xl mb-8">{project.description}</p>

        {/* Image Gallery */}
        {project.images?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl cursor-pointer group shadow-lg"
              >
                <img
                  src={img}
                  alt={project.title}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        )}

        {/* Project Info */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Products */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.products?.filter(p => p.trim() !== "").map((p, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {p.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Address</h2>
            <div className="bg-gray-50 p-4 rounded-xl shadow-inner text-gray-700 space-y-1">
              <p><strong>City:</strong> {project.address?.city || "-"}</p>
              <p><strong>State:</strong> {project.address?.state || "-"}</p>
              <p><strong>Country:</strong> {project.address?.country || "-"}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-right text-gray-500 text-sm">
          Created at: {new Date(project.createdAt).toLocaleDateString()}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsSection;
