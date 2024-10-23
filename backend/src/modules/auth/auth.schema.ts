import * as z from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be atleast 6 character"),
});

export const userRegisterSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  password: z.string().min(6, "Password must be atleast 6 character"),
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username must not contain special characters"),
});

export const regenerateCodeSchema = z.object({
  email: z.string().email(),
});

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  token: z.string().length(6, "Token must be 6 digits"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  token: z.string().length(6, "Token must be 6 digits"),
  password: z.string().min(6, "Password must be atleast 6 character"),
});

export const emailSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email address"
  );

export type userLoginSchemaType = z.infer<typeof userLoginSchema>;
export type userRegisterSchemaType = z.infer<typeof userRegisterSchema>;
export type verifyEmailSchemaType = z.infer<typeof verifyEmailSchema>;
export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
