import React from "react";
import { FiDownload } from "react-icons/fi";

const BrochureSection = () => {
  return (
    <section className="py-16 bg-white w-full text-center">
      <a
        href="/brochure/1-1.pdf"
        download
        className="bg-brand-red hover:bg-brand-red/90 text-white font-medium px-6 py-3 rounded-2xl inline-flex items-center gap-2 transition"
      >
        <FiDownload className="text-lg" />
        Download Brochure
      </a>
    </section>
  );
};

export default BrochureSection;
