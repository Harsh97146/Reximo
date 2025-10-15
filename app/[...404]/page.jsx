import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center">
      <div className="max-w-md w-full">
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src="/img/404.png"
            alt="Page Not Found"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-3 text-gray-600 text-base">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-brand-red text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-brand-red/90 transition-colors duration-200"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
