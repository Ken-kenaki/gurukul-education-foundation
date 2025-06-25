import "@/app/globals.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/server/appwrite";
import AdminNavbar from "@/Components/admin/AdminNavbar";
import AdminFooter from "@/Components/admin/AdminFooter";
import { GeistSans, GeistMono } from "geist/font";

interface LayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen`}
    >
      <body className="font-sans antialiased bg-gray-50 text-gray-900 min-h-screen">
        <div className="flex flex-col min-h-screen">
          <AdminNavbar
            user={{
              email: user.email,
              name: user.name,
              $id: user.$id,
            }}
          />

          <div className="lg:ml-16 flex flex-col flex-1 transition-all duration-300">
            <main className="flex-1 p-6 pt-20 lg:pt-6">{children}</main>
            <AdminFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
