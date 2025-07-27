import { z } from "zod";

const createAnalysisSchema = z.object({
  userId: z.string(),
  inputText: z.string(),
  result: z.string(),
});

export type TCreateAnalysisSchema = z.infer<typeof createAnalysisSchema>;

const findByUserIdSchema = z.object({
  accessToken: z.string(),
  page: z.number().optional(),
  limit: z.number().optional(),
});
export type TFindByUserIdSchema = z.infer<typeof findByUserIdSchema>;
