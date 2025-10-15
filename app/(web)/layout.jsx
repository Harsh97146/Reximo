"use client";
import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { usePathname } from "next/navigation";

const WebLayout = ({ children }) => {
  const pathname = usePathname();

  const isBlogDetailPage = /^\/product\/[^/]+$/.test(pathname);
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      {!isBlogDetailPage && <Header />}
      {children}
      <Footer />
    </>
  );
};

export default WebLayout;
