import z from "zod";
import { emailSchema } from "../base/base.schema";

export const registerUserSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be atleast 6 character"),
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username must not contain special characters"),
});

export type TRegisterUserSchema = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be atleast 6 character"),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.number().min(6, "OTP shoud be 6 digit"),
});

export type TVerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export const resendOtpSchema = z.object({
  email: z.string().email(),
});
export type TResendOtpSchema = z.infer<typeof resendOtpSchema>;
