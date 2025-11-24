import { z } from "zod";

export const addSubscriberSchema = z.object({
  email: z.string().email(),
});
export type TAddSubscriberSchema = z.infer<typeof addSubscriberSchema>;
