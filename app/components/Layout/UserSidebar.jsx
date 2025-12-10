"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function UserSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Products",
      icon: "📦",
      path: "/dashboard",
    },
    {
      name: "My Profile",
      icon: "👤",
      path: "/dashboard/profile",
    },
  ];

  const getUserInfo = () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const user = getUserInfo();

  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } fixed left-0 top-0 z-50 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className={`flex items-center ${collapsed ? "justify-center w-full" : ""}`}>
            <Image
              src="/img/logo.png"
              alt="Reximo Logo"
              width={collapsed ? 40 : 120}
              height={collapsed ? 40 : 40}
              className="h-auto"
            />
            {!collapsed && <span className="ml-2 font-bold text-xl">Dealer</span>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`text-gray-400 hover:text-white hidden lg:block ${collapsed ? "" : ""}`}
            >
              {collapsed ? "→" : "←"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="py-4 overflow-y-auto h-[calc(100vh-180px)]">
          {menuItems.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 ${
                pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 w-full border-t border-gray-700">
          {!collapsed && user && (
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-medium truncate">{user.name}</p>
              {user.assignedCategory && (
                <p className="text-xs text-blue-400 mt-1">
                  {Array.isArray(user.assignedCategory) 
                    ? user.assignedCategory.join(", ") 
                    : user.assignedCategory}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 text-white p-2 rounded-md"
      >
        ☰
      </button>
    </>
  );
}
