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
    default: "Gurukul Education Foundation",
    template: "%s | Gurukul Education",
  },
  description:
    "Your trusted partner for global education opportunities. We guide students to study in South Korea, Japan, Australia, UK, Malta and more. Offering test preparations for IELTS, PTE, and language courses.",
  keywords: [
    "study abroad",
    "education consultancy Nepal",
    "study in South Korea",
    "counsaltancy in lalitpur",
    "consultancy in kumaripati",
    "Gurukul Education Foundation",
    "study in Japan",
    "study in Australia",
    "study in UK",
    "study in Malta",
    "IELTS preparation",
    "PTE preparation",
    "Japanese language course",
    "Korean language course",
    "visa assistance",
    "Gurukul Education",
    "study abroad consultants",
  ],
  authors: [{ name: "Gurukul Education Foundation" }],
  metadataBase: new URL("https://www.gurukuleduc.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gurukul Education Foundation | Study Abroad Consultants",
    description:
      "Your trusted partner for global education opportunities with offices in Kathmandu, Nepal",
    url: "https://www.gurukuleduc.com",
    siteName: "Gurukul Education Foundation",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gurukul Education Foundation Logo",
      },
    ],
    locale: "en_US",
    type: "website",
    emails: ["info@gurukuleduc.com", "gurukuleducation44@gmail.com"],
    phoneNumbers: ["+977-985-1349350", "+977-986-7818090"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurukul Education Foundation | Study Abroad Consultants",
    description: "Your trusted partner for global education opportunities",
    images: ["/logo.png"],
    creator: "@gurukuleducation",
  },
  other: {
    "facebook-domain-verification": "your_verification_code_here", // If you have one
    contact: "info@gurukuleduc.com, gurukuleducation44@gmail.com",
    telephone: "+977 (01) 5916232, +977 985-1349350, +977 986-7818090",
    address: "Gurukul Education Foundation, Kathmandu, Nepal",
    "opening-hours": "Mo-Fr 09:00-18:00; Sa 10:00-16:00",
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
