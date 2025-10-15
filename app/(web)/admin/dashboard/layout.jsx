"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../../components/Layout/AdminSidebar";
import AdminHeader from "../../../components/Layout/AdminHeader";
import { AuthProvider, useAuth } from "../../../context/AuthContext";

function DashboardLayoutContent({ children }) {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    // Check authentication
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminSidebar />
      <div className="ml-64 min-h-screen">
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </AuthProvider>
  );
}