"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CommonButton from "./ul/Button";

const ProjectsGridSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/projects`);
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

  const hasProjects = useMemo(() => projects.length > 0, [projects]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading projects...
      </div>
    );
  }

  if (!hasProjects) {
    return (
      <section className="relative overflow-hidden bg-[#0F172A] text-white">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(241,95,67,0.35),_transparent_55%)]" />
        <div className="relative z-10 py-24 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Our Projects</h2>
          <p className="text-base sm:text-lg text-white/80">
            We are curating recent projects to showcase Rexino’s tile fixing, grouting, and
            waterproofing expertise. Please check back shortly or contact our team to request a
            customised portfolio.
          </p>
          <CommonButton
            label="Download Brochure"
            href="/brochure/1-1.pdf"
            download
            className="mx-auto bg-white text-brand-red border-white hover:bg-brand-red hover:text-white hover:border-brand-red"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#F5F7FC] pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">
      <div className="absolute inset-x-0 top-0 h-72 sm:h-80 lg:h-96 bg-gradient-to-b from-[#0F172A] via-[#0F172A] to-transparent z-0" />
      <div className="relative z-10 ct-container">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 px-4 sm:px-6">
          <div className="relative z-20">
            <p className="uppercase tracking-[6px] text-xs sm:text-sm font-semibold text-brand-red mb-2">
              Featured Work
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              Transformations Powered by Rexino
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 drop-shadow-md mt-4">
              Discover how our tile fixing, stone care, and waterproofing systems bring lasting beauty
              and performance to residential, commercial, and infrastructure projects across India.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const coverImage = project.images?.[0] || "/img/home/1.jpg";
            return (
              <Link
                key={project._id}
                href={`/projects/${project._id}`}
                className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 text-white">
                    <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[3px] text-white/80">
                      {project.address?.city || project.category || "Completed Project"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold leading-tight line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col gap-4 px-6 py-6 flex-1">
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                    {project.description || "Explore this Rexino success story to learn which systems delivered performance and aesthetics."}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.products?.filter((item) => item?.trim()).slice(0, 3).map((product) => (
                      <span
                        key={product}
                        className="rounded-full bg-brand-red/10 text-brand-red text-xs font-semibold px-3 py-1"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs uppercase tracking-[2px] text-gray-400">
                      View Case Study
                    </span>
                    <span className="text-brand-red font-semibold group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGridSection;
