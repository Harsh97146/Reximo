import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-10 text-gray-700 leading-relaxed">
      <header className="space-y-4 text-center">
        <p className="uppercase tracking-[4px] text-brand-red font-semibold text-sm">
          Privacy Policy
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F]">
          How Rexino Chemical Industries Protects Your Information
        </h1>
        <p>
          This policy explains what data we collect when you explore Rexino products, why we
          collect it, and how we keep it secure. It applies to{" "}
          <a href="https://inochemical.com" className="text-brand-red underline">
            inochemical.com
          </a>{" "}
          and all digital touchpoints managed by Rexino Chemical Industries.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-semibold text-[#1D1D1F]">Contact details:</span> name, email
            address, phone number, company name, and city when you request a brochure or reach out
            to our team.
          </li>
          <li>
            <span className="font-semibold text-[#1D1D1F]">Project requirements:</span> details you
            share about product categories, application areas, or timelines to help us recommend the
            right solution.
          </li>
          <li>
            <span className="font-semibold text-[#1D1D1F]">Usage data:</span> technical information
            such as your IP address, browser type, device information, and pages visited, captured
            through analytics tools to improve site performance.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">How We Use Your Data</h2>
        <p>
          We process personal data only where it supports your experience with Rexino. Typical uses
          include:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Responding to enquiries and sending the brochure or project details you requested.</li>
          <li>Sharing product recommendations, technical sheets, and dealer information relevant to your project.</li>
          <li>Improving our website content, navigation, and campaigns based on aggregated analytics.</li>
          <li>Complying with legal and regulatory requirements that apply to our industry.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Cookies & Third-Party Tools</h2>
        <p>
          Rexino uses essential and performance cookies to remember your preferences and optimise
          browsing. We may also rely on trusted analytics and marketing partners to understand
          engagement trends. These partners are obligated to handle the information securely and may
          use it only for the purposes agreed with Rexino.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Data Security & Retention</h2>
        <p>
          We implement administrative, technical, and physical safeguards to protect your data.
          Access is limited to authorised Rexino team members and service providers who need the
          information to serve you. We retain personal information only for as long as it remains
          necessary to answer your queries, maintain business records, or meet legal obligations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Your Rights</h2>
        <p>
          You may request access, correction, or deletion of the personal information we store about
          you. You can also withdraw consent for marketing communications at any time by using the
          unsubscribe option within our emails or contacting us directly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Updates to This Policy</h2>
        <p>
          We review this policy periodically to reflect evolving regulations and our product
          portfolio. Any updates will be published on this page with an updated effective date.
        </p>
      </section>

      {/* <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">Contact Rexino</h2>
        <p>
          For questions about this policy or to exercise your data rights, contact our compliance
          team at{" "}
          <a href="mailto:info@ino-chemical.com" className="text-brand-red font-semibold">
            info@ino-chemical.com
          </a>{" "}
          or call{" "}
          <a href="tel:+919879566968" className="text-brand-red font-semibold">
            +91 98795 66968
          </a>
          . We are headquartered at Plot No. 29, Vraj Industrial Park, Sachin GIDC, Surat, India.
        </p>
      </section> */}
    </div>
  );
};

export default PrivacyPolicy;
