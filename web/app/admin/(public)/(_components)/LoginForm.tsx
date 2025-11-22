"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/services/authService";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(3, {
    message: "Password must be at least 6 characters.",
  }),
});

export function AdminLoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = useLogin();

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      await login.mutateAsync(values);
      router.push("/admin/dashboard");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="max-w-lg mx-auto border-4 p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          {login.isError && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{login.error?.message || "Something went wrong"}</p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
