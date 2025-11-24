"use client";
import { getNewsResolver, TCreateUserForm } from "@/lib/form/userForm";
import { useRegisterUser } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreateAccountForm from "./(_components)/CreateAccountForm";
import { toast } from "sonner";

const GetStartedPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const form = useForm<TCreateUserForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      interests: [] as string[],
    },
    reValidateMode: "onSubmit",
    resolver: zodResolver(getNewsResolver(step) as any),
  });

  const mutation = useRegisterUser();
  const handleSubmit = () => {
    const formData = form.getValues();
    const interests = [
      "politics",
      "technology",
      "sports",
      "business",
      "entertainment",
    ];
    mutation.mutate(
      { ...formData, interests },
      {
        onSuccess: () => {
          console.log("registration successfull");
          router.push("/login");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <FormProvider {...form}>
      <div className="h-[calc(100vh-100px)] bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {step === 1 && (
              <CreateAccountForm onSubmit={form.handleSubmit(handleSubmit)} />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default GetStartedPage;
