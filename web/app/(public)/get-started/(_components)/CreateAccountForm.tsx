"use client";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import CreateAccountLayout from "./CreateAccountLayout";

const CreateAccountForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const form = useFormContext();
  return (
    <CreateAccountLayout
      title="Create Your Account"
      description="Join thousands of readers staying informed daily"
    >
      <div className="space-y-6 max-w-md mx-auto">
        <Form {...form}>
          <form className="space-y-4">
            <InputField
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Name"
            />

            <InputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="john@gmail.com"
            />

            <InputField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />

            <Button
              onClick={form.handleSubmit(() => onSubmit())}
              className="w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all mt-8"
            >
              Continue
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Button
            variant={"link"}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign In
          </Button>
        </p>
      </div>
    </CreateAccountLayout>
  );
};

export default CreateAccountForm;
