import * as z from "zod";

export const newsClassifySchema = z.object({
  news: z.string().min(4),
  type: z.string(),
});
export type NewsClassifySchemaType = z.infer<typeof newsClassifySchema>;
