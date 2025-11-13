"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  // Get page title based on current path
  const getPageTitle = () => {
    if (pathname === "/admin/dashboard") return "Admin Dashboard";
    if (pathname.includes("/blog/add-blog")) return "Add New Blog";
    if (pathname.includes("/blog/edit/")) return "Edit Blog";
    if (pathname.includes("/blog")) return "Blog Management";
    if (pathname.includes("/projects")) return "Projects Management";
    if (pathname.includes("/products")) return "Products Management";
    if (pathname.includes("/dealers")) return "Dealers Management";
    return "Admin Dashboard";
  };

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 sticky top-0 z-30 w-full">
      <div className="flex-1 min-w-0 pr-4">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
          {getPageTitle()}
        </h1>
      </div>
      
      <div className="relative flex-shrink-0">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <span className="hidden sm:inline text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap">
            {user?.name || 'Admin'}
          </span>
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {showDropdown && (
          <>
            <div 
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Settings</a>
              <button 
                onClick={() => {
                  logout();
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}