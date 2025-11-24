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
      <div className="w-full max-w-md grid grid-cols-1 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="mb-8">
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
                  type="password"
                />

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <Button
                      type="button"
                      variant={"link"}
                      onClick={() => router.push("/get-started")}
                    >
                      Sign up for free
                    </Button>
                  </p>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
