"use client";
import LoginForm from "@/lib/form/LoginForm";
import { TLoginFormSchema } from "@/lib/form/userForm";
import { useAdminLogin } from "@/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const router = useRouter();
  const login = useAdminLogin();

  const onSubmit = async (values: TLoginFormSchema) => {
    login.mutate(values, {
      onSuccess: (response) => {
        toast.success("Login Successfull");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <LoginForm
        title="Admin Login"
        description=""
        handleSubmit={onSubmit}
        isLoading={login.isPending}
        admin={true}
      />
    </>
  );
};

export default AdminLoginPage;
