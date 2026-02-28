"use client";
import LoginForm from "@/lib/form/LoginForm";
import { TLoginFormSchema } from "@/lib/form/userForm";
import { useLogin } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const login = useLogin();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: TLoginFormSchema) => {
    try {
      const response = await login.mutateAsync(values);
      setUser(response.data.user);
      router.push("/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      isLoading={login.isPending}
      title="Welcome Back"
      description="Sign in to continue reading your personalized news feed"
    />
  );
};

export default LoginPage;
