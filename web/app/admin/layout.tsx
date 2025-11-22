"use client";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import { useUser } from "@/services/authService";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <main>
      <AdminNavbar />
      {children}
    </main>
  );
};

export default AdminLayout;
