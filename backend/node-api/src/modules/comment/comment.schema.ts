import { z } from "zod";

export const commentSchema = z.object({
  newsId: z.string(),
  userId: z.string(),
  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(20, "Comment must be at most 20 characters"),
});
export type CommentSchemaType = z.infer<typeof commentSchema>;
