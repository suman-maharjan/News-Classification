import * as z from "zod";

export const newsClassifySchema = z.object({
  news: z.string().min(4),
  type: z.string(),
});
export type NewsClassifySchemaType = z.infer<typeof newsClassifySchema>;

export enum EContentType {
  TEXT = "text",
  IMAGE = "image",
}
export enum ENewsType {
  NORMAL = "normal",
  BREAKING = "breaking",
  TRENDING = "trending",
  ALERT = "alert",
  READ = "read",
}

export const newsCreateSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title cannot exceed 150 characters"),

  author: z
    .string()
    .min(2, "Category is required")
    .max(50, "Category too long"),

  category: z
    .string()
    .min(2, "Category is required")
    .max(50, "Category too long"),

  description: z.string().min(20, "Description must be at least 20 characters"),

  content: z
    .array(
      z.object({
        type: z.string(),
        data: z
          .string()
          .min(1, "Content data cannot be empty")
          .refine(
            (value) => {
              // Image block must be a URL
              if (value.startsWith("http")) return true;
              return true; // text can be anything
            },
            { message: "Image block must contain a valid URL" }
          ),
      })
    )
    .min(1, "Add at least one content block"),

  image: z.string().url("Main image must be a valid URL"),

  type: z.string(),

  place: z.string().min(2, "Location must be at least 2 characters"),
});
export type NewsCreateSchemaType = z.infer<typeof newsCreateSchema>;
