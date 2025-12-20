"use client";
import React, { useState, useEffect, useRef } from "react";

const SearchableSelect = ({ label, name, value, onChange, options = [], placeholder, className = "", required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const dropdownRef = useRef(null);

  // Sync searchTerm with value prop
  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  const filteredOptions = options.filter((option) => 
    option.name && option.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    // Call parent onChange with event-like object
    onChange({ target: { name, value: option.name } });
    setSearchTerm(option.name);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setSearchTerm(newVal);
    setIsOpen(true);
    onChange({ target: { name, value: newVal } });
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`} ref={dropdownRef}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          id={name}
          name={name}
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
          required={required}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
            {filteredOptions.map((option) => (
              <li
                key={option._id}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
         {isOpen && filteredOptions.length === 0 && searchTerm && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg">
                <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
            </ul>
        )}
      </div>
    </div>
  );
};

export default SearchableSelect;
