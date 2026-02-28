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

export enum ENewsCategory {
  SPORT = "Sport",
  BUSINESS = "Business",
  TECHNOLOGY = "Technology",
  POLITICS = "Politics",
  ENTERTAINMENT = "Entertainment",
}

export interface INews {
  _id: string;
  title: string;
  author?: string;
  source?: {
    name: string;
    url: string;
  };
  description: string;
  content: INewsContent[]; // updated to handle multiple types
  image?: string; // main/cover image
  publishedAt: string;
  type: ENewsType;
  place?: string;
  category: ENewsCategory;
}
