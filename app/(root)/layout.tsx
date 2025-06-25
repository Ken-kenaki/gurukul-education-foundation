import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "../globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "Gurukul Education",
    template: "%s | Gurukul Education",
  },
  description:
    "Your trusted partner for global education opportunities. We guide students to study in South Korea, Australia, Japan, UK, and more.",
  keywords: [
    "study abroad",
    "education consultancy",
    "study in South Korea",
    "study in Australia",
    "IELTS preparation",
    "visa assistance",
  ],
  authors: [{ name: "Gurukul Education Foundation" }],
  metadataBase: new URL("https://www.gurukuleducation.com"),
  openGraph: {
    title: "Gurukul Education | Study Abroad Consultants",
    description: "Your trusted partner for global education opportunities",
    url: "https://www.gurukuleducation.com",
    siteName: "Gurukul Education",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurukul Education | Study Abroad Consultants",
    description: "Your trusted partner for global education opportunities",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900 overflow-x-hidden">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
