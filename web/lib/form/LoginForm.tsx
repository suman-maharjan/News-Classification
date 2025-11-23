"use client";
import InputField from "@/components/form/InputField";
import LogoSVG from "@/public/svg/LogoSVG";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  loginInitialValues,
  TLoginFormSchema,
} from "./userForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";

const LoginForm = ({
  handleSubmit,
  isLoading,
  title,
  description,
  admin = false,
}: {
  title: string;
  description: string;
  handleSubmit: (data: TLoginFormSchema) => void;
  isLoading: boolean;
  admin?: boolean;
}) => {
  const form = useForm<TLoginFormSchema>({
    defaultValues: loginInitialValues,
    reValidateMode: "onBlur",
    resolver: zodResolver(loginFormSchema),
  });
  const router = useRouter();
  return (
    <div
      className={`${
        admin ? "h-screen" : "h-[calc(100vh-100px)]"
      } bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4`}
    >
      <div className="w-full max-w-lg grid grid-cols-1 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        <Form {...form}>
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <LogoSVG />
                </div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  NewsHub
                </h1>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {title}
              </h2>
              <p className="text-gray-600 text-lg">{description}</p>
            </div>

            <div className="space-y-6">
              <InputField
                name="email"
                control={form.control}
                placeholder="john@gmail.com"
                label="Email"
              />
              <InputField
                name="password"
                control={form.control}
                placeholder="******"
                label="Password"
              />

              <div className="flex items-center justify-between">
                <Button
                  variant={"link"}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Forgot password?
                </Button>
              </div>

              {/* Sign In Button */}
              <Button
                onClick={() => handleSubmit(form.getValues())}
                disabled={isLoading}
                className="w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>

              {/* Sign Up Link */}
              {!admin && (
                <p className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <button
                    onClick={() => router.push("/get-started")}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Sign up for free
                  </button>
                </p>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
