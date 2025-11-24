import { INews } from "@/types/news.types";

export type TNewsCardProps = Pick<
  INews,
  "title" | "description" | "image" | "type" | "publishedAt" | "place"
> & { id: string };
