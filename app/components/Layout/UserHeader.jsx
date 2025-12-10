"use client";

import { useRouter } from "next/navigation";

export default function UserHeader() {
  const router = useRouter();

  const handleHomeClick = () => {
    // Logout user
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to home
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 sticky top-0 z-30 w-full">
      <div className="flex-1 min-w-0 pr-4">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          Product Catalog
        </h1>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </button>
      </div>
    </header>
  );
}
