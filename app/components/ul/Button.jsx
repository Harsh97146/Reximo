"use client";
import React from "react";

const CommonButton = ({
  label = "Click Me",
  onClick,
  className = "",
  type = "button",
  disabled = false,
  href,
  download,
  target,
  rel,
  leadingIcon = null,
  trailingIcon = null,
}) => {
  const baseClasses =
    "cursor-pointer font-semibold sm:text-lg text-base text-white border border-[var(--primary)] bg-[var(--primary)] sm:py-[14px] py-2.5 sm:px-[64px] px-10 transition-all duration-300 hover:bg-white hover:text-[var(--primary)] rounded-4xl inline-flex items-center justify-center gap-2";

  const content = (
    <>
      {leadingIcon ? <span className="flex items-center">{leadingIcon}</span> : null}
      <span>{label}</span>
      {trailingIcon ? <span className="flex items-center">{trailingIcon}</span> : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${baseClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </button>
  );
};

export default CommonButton;
