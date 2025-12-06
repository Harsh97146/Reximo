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
  metadataBase: new URL("https://rexinochemical.com"),
  title: "Rexino Chemical: Trusted Name in tiling, Waterproofing & construction chemicals",
  description:
    "Rexino has over 3 decades of experience in the Tiles Adhesive , Waterproofing & all type Construction Chemicals field, delivering a comprehensive range of Tile Fixing, Stone Fixing, Building Repair, Grouting Solutions, and Waterproofing products.",
  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Rexino Chemical: Trusted Name in tiling, Waterproofing & construction chemicals",
    description: "Rexino has over 3 decades of experience in the Tiles Adhesive , Waterproofing & all type Construction Chemicals field.",
    url: "https://rexinochemical.com",
    siteName: "Rexino Chemical",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Rexino Chemical Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rexino Chemical",
    description: "Rexino has over 3 decades of experience in the Tiles Adhesive , Waterproofing & all type Construction Chemicals field.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🔥 Google Organization Logo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rexino Chemical",
              url: "https://rexinochemical.com",
              logo: "https://rexinochemical.com/logo.png", // ← change to your main square logo
            }),
          }}
        />

        {/* Optional but recommended */}
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brandRed`}
      >
        {children}
      </body>
    </html>
  );
}
