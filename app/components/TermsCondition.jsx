import React from "react";

const TermsCondition = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-10 text-gray-700 leading-relaxed">
      <header className="space-y-4 text-center">
        <p className="uppercase tracking-[4px] text-brand-red font-semibold text-sm">
          Terms & Conditions
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F]">
          Rexino Chemical Industries Website Usage Terms
        </h1>
        <p>
          By visiting{" "}
          <a href="https://inochemical.com" className="text-brand-red underline">
            inochemical.com
          </a>{" "}
          or engaging with our digital services, you agree to comply with and be bound by the
          following terms. Please review them carefully before using our website.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Use of Website Content</h2>
        <p>
          The information, imagery, product descriptions, brochures, and downloadable resources
          provided on this site are owned by Rexino Chemical Industries. You may print or download
          extracts for personal reference, but you must not reproduce, distribute, or modify any
          material for commercial purposes without written consent from Rexino.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Product Information</h2>
        <p>
          Rexino continuously innovates, and specifications may change without prior notice. While
          we strive to ensure accuracy, slight variations may occur between the digital description
          and actual product performance depending on application conditions. Always consult our
          technical team for project-specific guidance.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Limitation of Liability</h2>
        <p>
          We aim to maintain uninterrupted access to the website; however, Rexino is not liable for
          temporary unavailability due to maintenance or technical issues beyond our control. We are
          not responsible for any loss or damage arising from reliance on the information provided
          here. Always verify technical data sheets and application guidelines with our experts.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">User Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Provide accurate information when submitting enquiries or brochure requests.</li>
          <li>Use the website for lawful purposes related to evaluating Rexino solutions.</li>
          <li>Refrain from uploading malicious code, attempting unauthorised data access, or disrupting site performance.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Third-Party Links</h2>
        <p>
          Our site may reference partner or dealer websites for your convenience. Rexino does not
          control the content on those sites and is not responsible for their privacy practices or
          terms. Visiting such links is at your own discretion.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes arising from the use of this
          website will be subject to the exclusive jurisdiction of the courts in Surat, Gujarat.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Changes to the Terms</h2>
        <p>
          We may revise these Terms & Conditions periodically. Updated terms are effective once
          posted on this page. Your continued use of the website signifies acceptance of the revised
          terms.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Contact Information</h2>
        <p>
          For clarifications regarding these terms, reach us at{" "}
          <a href="mailto:info@ino-chemical.com" className="text-brand-red font-semibold">
            info@ino-chemical.com
          </a>{" "}
          or{" "}
          <a href="tel:+919879566968" className="text-brand-red font-semibold">
            +91 98795 66968
          </a>
          . Our registered office is Plot No. 29, Vraj Industrial Park, Sachin GIDC, Surat, India.
        </p>
      </section>
    </div>
  );
};

export default TermsCondition;
