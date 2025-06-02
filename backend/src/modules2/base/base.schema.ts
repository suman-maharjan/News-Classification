import z from "zod";

export const emailSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email address"
  );

const tokenSchema = z.string().min(1, "Unauthorized");

export const accessTokenSchema = z
  .object({
    "x-access-token": tokenSchema,
  })
  .transform((data) => ({
    accessToken: data["x-access-token"],
  }));

export type TAccessTokenSchema = z.infer<typeof accessTokenSchema>;
