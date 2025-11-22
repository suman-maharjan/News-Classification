import { EContentType, ENewsType } from "@/types/news.types";
import z from "zod";

export const createNewsFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title cannot exceed 150 characters"),

  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(300, "Summary cannot exceed 300 characters"),

  category: z
    .string()
    .min(2, "Category is required")
    .max(50, "Category too long"),

  description: z.string().min(20, "Description must be at least 20 characters"),

  content: z
    .array(
      z.object({
        type: z.enum([EContentType.TEXT, EContentType.IMAGE], "Select one"),
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

  type: z.enum(ENewsType),

  location: z.string().min(2, "Location must be at least 2 characters"),
});

export type TCreateNewsForm = z.infer<typeof createNewsFormSchema>;
