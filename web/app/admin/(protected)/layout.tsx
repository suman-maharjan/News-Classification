"use client";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { IUser } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const AdminProtectedLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { data: user, isLoading, isFetched } = useUser();

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (isFetched && user?.message !== "success") {
      router.push("/admin/");
    }

    setUser(user?.data as IUser);
  }, [user, router, isFetched]);

  if (!isFetched || isLoading) {
    return null;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full relative">
        <AdminNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminProtectedLayout;
