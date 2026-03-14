import { ApiError } from "../../utils/ApiError";
import { newsRepository } from "../news/news.type";
import { userRepository } from "../user/user.types";
import { CommentSchemaType } from "./comment.schema";
import { commentRepository } from "./comment.type";

class CommentService {
  async create(payload: CommentSchemaType) {
    const [user, news] = await Promise.all([
      userRepository.getUserById(payload.userId),
      newsRepository.newsIdExists(payload.newsId),
    ]);

    if (!user || !news) {
      throw new ApiError(400, "Not Allowed");
    }
    const { userId, newsId, comment } = payload;
    const result = await commentRepository.createComment({
      newsId,
      userId,
      comment,
    });
    return result;
  }

  async getCommentByNewsId(newsId: string) {
    const news = await newsRepository.newsIdExists(newsId);
    if (!news) {
      throw new ApiError(404, "News Not Found");
    }
    const result = await commentRepository.getCommentsByNewsId(newsId);
    return result;
  }
}

const commentService = new CommentService();
export default commentService;
