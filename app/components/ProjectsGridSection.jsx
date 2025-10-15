"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProjectsGridSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading projects...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 text-gray-800">
        Our Projects
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project._id}`}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
          >
            <div className="relative">
              {project.images?.[0] ? (
                <img
                  src={project.images[0]}
                  alt={project.projectTitle}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {project.description}
              </p>
              <span className="text-blue-600 text-sm font-medium">
                View Details →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGridSection;
