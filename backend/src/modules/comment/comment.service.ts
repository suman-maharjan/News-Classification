import { Request } from "express";
import { ApiError } from "../../utils/ApiError";
import NewsModel from "../news/news.model";
import UserModel from "../user/user.model";
import CommentModel from "./comment.model";
import { CommentSchemaType } from "./comment.schema";

class CommentService {
  async create(payload: CommentSchemaType) {
    const [user, news] = await Promise.all([
      UserModel.findById(payload.userId),
      NewsModel.findById(payload.newsId),
    ]);

    if (!user || !news) {
      throw new ApiError(400, "Not Allowed");
    }
    return CommentModel.create(payload);
  }

  async getCommentByNewsId(newsId: string) {
    const news = await NewsModel.findById(newsId);
    if (!news) {
      throw new ApiError(404, "News Not Found");
    }
    const comments = await CommentModel.find({ newsId }).populate<{
      userId: { _id: string; name: string };
    }>("userId", "name");

    const result = comments.map((c) => ({
      _id: c._id,
      newsId: c.newsId,
      name: c.userId?.name,
      comment: c.comment,
      createdAt: c.createdAt,
    }));
    return result;
  }
}

const commentService = new CommentService();
export default commentService;
