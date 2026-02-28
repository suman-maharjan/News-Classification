"use client";
import { getNewsResolver, TCreateUserForm } from "@/lib/form/userForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ChooseInterestForm from "./(_components)/ChooseInterestForm";
import CreateAccountForm from "./(_components)/CreateAccountForm";
import CreateAccountWelcomeForm from "./(_components)/CreateAccountWelcomeForm";
import { useRegisterUser } from "@/services/authService";

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
    mutation.mutate(formData, {
      onSuccess: () => {
        console.log("registration successfull");
        router.push("/login");
      },
    });
  };

  return (
    <FormProvider {...form}>
      <div className="h-[calc(100vh-100px)] bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {step === 1 && (
              <CreateAccountForm
                onSubmit={form.handleSubmit(() => {
                  setStep(2);
                })}
              />
            )}
            {step === 2 && (
              <ChooseInterestForm
                onPrev={() => {
                  setStep(1);
                }}
                onNext={() => {
                  setStep(3);
                }}
              />
            )}
            {step === 3 && (
              <CreateAccountWelcomeForm
                onNext={() => handleSubmit()}
                onPrev={() => setStep(2)}
              />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default GetStartedPage;
