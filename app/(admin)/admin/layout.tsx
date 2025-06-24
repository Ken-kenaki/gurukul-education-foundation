import "@/app/globals.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/server/appwrite";
import AdminNavbar from "@/Components/admin/AdminNavbar";
import AdminFooter from "@/Components/admin/AdminFooter";

interface LayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");

  return (
    <html lang="en" className="min-h-screen bg-gray-50">
      <body className="min-h-screen bg-gray-50">
        <AdminNavbar
          user={{
            email: user.email,
            name: user.name,
            $id: user.$id,
          }}
        />

        <div className="lg:ml-16 flex flex-col min-h-screen transition-all duration-300">
          <main className="flex-1 p-6 pt-20 lg:pt-6">{children}</main>
          <AdminFooter />
        </div>
      </body>
    </html>
  );
}