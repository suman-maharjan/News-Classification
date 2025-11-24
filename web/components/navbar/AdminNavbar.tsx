"use client";
import { useLogout } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const AdminNavbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push("/admin");
      },
    });
  };

  return (
    <nav className="w-full p-4 border-b-2 bg-white sticky top-0">
      {/* <SidebarTrigger className="absolute z-11" /> */}
      <div className="container mx-auto text-center flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer w-full text-center"
          onClick={() => {
            if (isAuthenticated) {
              router.push("/admin/news");
            } else {
              router.push("/admin");
            }
          }}
        >
          Admin News Portal
        </h1>

        {isAuthenticated && (
          <div className="flex gap-4">
            <Button size={"lg"} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
