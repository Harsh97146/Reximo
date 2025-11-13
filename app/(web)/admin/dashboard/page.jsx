"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();

  const quickActions = [
    {
      icon: "📝",
      label: "New Blog Post",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      iconColor: "text-blue-600",
      path: "/admin/dashboard/blog/add-blog",
    },
    {
      icon: "🏗️",
      label: "Add Project",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      iconColor: "text-green-600",
      path: "/admin/dashboard/projects",
    },
    {
      icon: "📦",
      label: "Add Product",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      iconColor: "text-purple-600",
      path: "/admin/dashboard/products",
    },
    {
      icon: "👥",
      label: "Add Dealer",
      bgColor: "bg-yellow-50",
      hoverColor: "hover:bg-yellow-100",
      iconColor: "text-yellow-600",
      path: "/admin/dashboard/dealers",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Quick Actions</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Get started by creating new content or managing existing items</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => router.push(action.path)}
              className={`${action.bgColor} ${action.hoverColor} p-6 sm:p-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md text-left group`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <span className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-gray-900">
                  {action.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}