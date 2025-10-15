"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
      path: "/admin/dashboard",
    },
    {
      name: "Blog",
      icon: "📝",
      path: "/admin/dashboard/blog",
    },
    {
      name: "Projects",
      icon: "🏗️",
      path: "/admin/dashboard/projects",
    },
    {
      name: "Products",
      icon: "📦",
      path: "/admin/dashboard/products",
    },
    {
      name: "Dealers",
      icon: "👥",
      path: "/admin/dashboard/dealers",
    },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } fixed left-0 top-0`}
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
          {!collapsed && <span className="ml-2 font-bold text-xl">Admin</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-gray-400 hover:text-white ${collapsed ? "hidden" : ""}`}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <div className="py-4">
        {menuItems.map((item) => (
          <Link
            href={item.path}
            key={item.name}
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
          </div>
        )}
        <button
          onClick={logout}
          className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">🚪</span>
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}