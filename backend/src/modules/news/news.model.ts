import mongoose, { Schema } from "mongoose";

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
export interface NewsSchemaType extends Document {
  title: string;
  author: string;
  image: string;
  descripton: string;
  content: INewsContent[];
  publishedAt: Date;
  type: ENewsType;
  from: string;
}

const newsContentSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(EContentType),
      required: true,
    },
    data: {
      type: String,
      required: true, // text or image URL
    },
  },
  { _id: false } // optional: prevents creation of subdocument IDs
);

const newsSchema: Schema<NewsSchemaType> = new Schema({
  title: String,
  author: String,
  image: String,
  descripton: String,
  content: { type: [newsContentSchema], required: true },
  type: {
    type: String,
    enum: Object.values(ENewsType),
    required: [true, "News Type is required"],
  },
  from: String,
  publishedAt: { type: Date, default: Date.now() },
});

const NewsModel =
  (mongoose.models.News as mongoose.Model<NewsSchemaType>) ||
  mongoose.model("News", newsSchema);

export default NewsModel;
