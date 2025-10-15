"use client";
import React from "react";

const CommonButton = ({
  label = "Click Me",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer font-semibold sm:text-lg text-base text-white border border-[var(--primary)] bg-[var(--primary)]  sm:py-[14px] py-2.5 sm:px-[64px] px-10 w-fit transition-all duration-300 hover:bg-white hover:text-[var(--primary)] rounded-4xl ${className}`}
    >
      {label}
    </button>
  );
};

export default CommonButton;
