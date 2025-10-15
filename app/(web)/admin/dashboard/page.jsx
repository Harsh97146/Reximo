"use client";

import { useAuth } from "../../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Total Blogs</h2>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <span className="text-2xl">🏗️</span>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Active Projects</h2>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Products</h2>
              <p className="text-2xl font-semibold">36</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Dealers</h2>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600">Today, 10:30 AM</p>
              <p>New product added: Premium Window Frame</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600">Yesterday, 2:15 PM</p>
              <p>Project status updated: Modern Office Building</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm text-gray-600">Yesterday, 11:45 AM</p>
              <p>New blog post published: "Trends in Modern Architecture"</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="block text-xl mb-2">📝</span>
              <span className="text-sm font-medium">New Blog Post</span>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="block text-xl mb-2">🏗️</span>
              <span className="text-sm font-medium">Add Project</span>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <span className="block text-xl mb-2">📦</span>
              <span className="text-sm font-medium">Add Product</span>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <span className="block text-xl mb-2">👥</span>
              <span className="text-sm font-medium">Add Dealer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}