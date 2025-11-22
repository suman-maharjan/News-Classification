// API shape, not UI props

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

export interface INews {
  id: string;
  title: string;
  author?: string;
  source?: {
    name: string;
    url: string;
  };
  description: string;
  summary: string;
  content: INewsContent[]; // updated to handle multiple types
  image?: string; // main/cover image
  publishedAt: string;
  type: ENewsType;
  location?: string;
}
