import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rexino: Trusted Name in Ceramic & Construction Chemicals",
  description:
    "Rexino has over 3 decades of experience in the ceramic and construction chemicals field, delivering a comprehensive range of Tile Fixing, Stone Fixing, Building Repair, Grouting Solutions, and Waterproofing products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brandRed`}
      >
        {children}
      </body>
    </html>
  );
}
