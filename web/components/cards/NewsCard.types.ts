import { INews } from "@/types/news.types";

export type TNewsCardProps = Pick<
  INews,
  "id" | "title" | "description" | "image" | "type" | "publishedAt" | "location"
>;
