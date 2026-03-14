import { MongooseNewsRepository } from "./mongoose.news.repository";
import { NewsCreateSchemaType } from "./newsSchema";

export enum EContentType {
  TEXT = "text",
  IMAGE = "image",
}
export interface INewsContent {
  type: EContentType;
  data: string; // text for TEXT, URL for IMAGE
}

export enum ENewsType {
  NORMAL = "normal",
  BREAKING = "breaking",
  TRENDING = "trending",
  ALERT = "alert",
  READ = "read",
}
export interface News {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  category: string;
  content: INewsContent[];
  publishedAt: Date;
  type: ENewsType;
  place: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
  search?: string;
}

export interface NewsRepository {
  newsIdExists(id: string): Promise<boolean>;
  getNewsById(id: string): Promise<any | null>;
  create(payload: NewsCreateSchemaType): Promise<News | null>;
}

export const newsRepository = new MongooseNewsRepository();
