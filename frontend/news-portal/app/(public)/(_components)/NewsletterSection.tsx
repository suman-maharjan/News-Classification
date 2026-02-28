"use client";

import EmailField from "@/components/form/EmailField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MessageSVG from "@/public/svg/MessageSVG";
import { useAddSubscriber } from "@/services/subscriberService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type TNewsLetterForm = {
  email: string;
};

const emailSchema = z.object({
  email: z.email(),
});
// Newsletter Subscription Section
export const NewsletterSection = () => {
  const form = useForm<TNewsLetterForm>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailSchema),
    reValidateMode: "onSubmit",
  });
  const mutation = useAddSubscriber();
  const handleSubmit = (data: TNewsLetterForm) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.info("Subscribed to News Hub!!");
        form.reset();
      },
    });
  };
  return (
    <section className="py-20 bg-linear-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <MessageSVG />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">Never Miss a Story</h2>
          <p className="text-xl text-blue-100">
            Subscribe to our newsletter and get the latest news delivered
            straight to your inbox every morning.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto text-white items-baseline">
                <EmailField
                  name="email"
                  placeholder="Email"
                  control={form.control}
                />
                <Button
                  size="lg"
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 shadow-xl hover:shadow-2xl transition-all whitespace-nowrap"
                >
                  Subscribe Now
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-sm text-blue-200">
            Join readers groups who trust us for daily updates
          </p>
        </div>
      </div>
    </section>
  );
};
