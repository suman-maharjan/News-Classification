import { checkEmail } from "@/services/authService";
import z from "zod";

export type TCreateUserForm = {
  name: string;
  email: string;
  password: string;
  interests: string[];
};

export const getNewsResolver = (step: number) => {
  switch (step) {
    case 1:
      return z.object({
        name: z
          .string()
          .min(3, "Title must be at least 3 characters")
          .max(150, "Title cannot exceed 150 characters"),
        email: z.email().refine(
          async (email) => {
            try {
              if (email) {
                const res = await checkEmail(email);
                console.log(res);
                return !res.data;
              }
              // return false;
            } catch (error) {
              return true;
            }
          },
          {
            message: "Email already Exists",
          }
        ),
        password: z
          .string()
          .min(3, "Title must be at least 3 characters")
          .max(150, "Title cannot exceed 150 characters"),
      });
    case 2:
      return z.object({
        interest: z.array(z.string()).min(1, "Add at least one interest"),
      });
    case 3:
      return z.object({});
  }
};

export const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(3, {
    message: "Password must be at least 6 characters.",
  }),
});

export const loginInitialValues = {
  email: "",
  password: "",
};

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;
