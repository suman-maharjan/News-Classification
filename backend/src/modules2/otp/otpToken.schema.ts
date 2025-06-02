import { z } from "zod";
import { emailSchema } from "../base/base.schema";
import { OtpTypeEnum } from "./otpToken.entity";

const createOtpSchema = z.object({
  email: emailSchema,
  type: z.enum(Object.values(OtpTypeEnum) as [string, ...string[]]),
});

export type TCreateOtpSchema = z.infer<typeof createOtpSchema>;
