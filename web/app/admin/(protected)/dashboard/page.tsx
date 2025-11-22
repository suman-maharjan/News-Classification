"use client";

import { useAuthStore } from "@/store/authStore";

const AdminDashboard = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      This is admin dashboard
      {user?.email}
    </div>
  );
};

export default AdminDashboard;
