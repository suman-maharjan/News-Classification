"use client";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import LoginForm from "@/lib/form/LoginForm";
import { TLoginFormSchema } from "@/lib/form/userForm";
import { useLogin } from "@/services/authService";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const router = useRouter();
  const login = useLogin();

  const onSubmit = async (values: TLoginFormSchema) => {
    try {
      await login.mutateAsync(values);
      router.push("/admin/news/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <LoginForm
        title="Welcome Admin"
        description="Sign in to manage news portal"
        handleSubmit={onSubmit}
        isLoading={login.isPending}
        admin={true}
      />
    </>
  );
};

export default AdminLoginPage;
