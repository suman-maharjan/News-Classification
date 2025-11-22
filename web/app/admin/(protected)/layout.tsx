"use client";
import { useUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Fragment, PropsWithChildren, useEffect } from "react";

const AdminProtectedLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { data: user, isLoading, isFetched } = useUser();

  useEffect(() => {
    if (isFetched && user?.message !== "success") {
      router.push("/admin/");
    }
  }, [user, router, isFetched]);

  if (!isFetched || isLoading) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export default AdminProtectedLayout;
