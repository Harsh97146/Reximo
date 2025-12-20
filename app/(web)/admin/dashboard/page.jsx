"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

import { Crown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/admin/stats`);
        if (res.ok) {
            const data = await res.json();
            setStats(data);
        }
    } catch (e) {
        console.error(e);
    }
  };

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
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Stats Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Dealer Insights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {stats.map((stat, i) => (
                 <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                      <div className="bg-yellow-100 p-2 rounded-full mb-2">
                        <Crown size={20} className="text-yellow-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.count}</h3>
                      <p className="text-sm text-gray-500 font-medium">{stat.rank} Dealers</p>
                 </div>
             ))}
             {stats.length === 0 && (
                 <div className="col-span-full text-center py-8 text-gray-500 bg-white rounded-xl border border-dashed">
                     No dealer stats available yet.
                 </div>
             )}
        </div>
      </div>


      <div>
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
    </div>
  );
}