"use client";

import React, { useState } from "react";
import { contactInfo, socialLinks } from "./Layout/helper";
import CommonButton from "./ul/Button";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const ContactUsSection = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("submitted");
    setTimeout(() => {
      setStatus("idle");
      setFormValues(initialFormState);
    }, 2500);
  };

  return (
    <section className="relative bg-[#F5F7FC] pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">
      <div className="ct-container">
        <div className="grid gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="uppercase tracking-[6px] text-brand-red text-xs sm:text-sm font-semibold">
                Contact Rexino
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] leading-tight">
                Let’s Build Long-Lasting Surfaces Together
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Share your requirements and the Rexino Chemical Industries team will connect you
                with the right adhesive, grouting, or waterproofing solution. We partner with
                contractors, architects, and distributors across India to deliver premium project
                outcomes.
              </p>
            </div>

            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 sm:p-7 flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red text-xl">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[2px] text-[#1D1D1F] mb-1">
                      {info.label}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-base sm:text-lg text-gray-700 hover:text-brand-red transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-base sm:text-lg text-gray-700">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-semibold text-[#1D1D1F]">Working Hours</h2>
              <p className="text-gray-600">
                Monday to Saturday, 9:30 AM – 6:30 PM IST. For urgent on-site support, please reach
                out to your dedicated Rexino representative or call our helpline.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 lg:mt-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.494491862561!2d72.8651103753632!3d21.24845487921168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f94583ebc79%3A0x42aae82b621c312d!2sSachin%20GIDC!5e0!3m2!1sen!2sin!4v1699796640942!5m2!1sen!2sin"
          title="Rexino Chemical Industries Location"
          className="w-full h-[300px] sm:h-[380px] lg:h-[420px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default ContactUsSection;
