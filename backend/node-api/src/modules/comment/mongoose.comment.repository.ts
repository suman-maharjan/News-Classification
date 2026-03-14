import CommentModel, { CommentDocument } from "./comment.model";
import { Comment, CommentRepository } from "./comment.type";

export class MongooseCommentRepository implements CommentRepository {
  private toDomain(doc: CommentDocument): Comment {
    return {
      id: doc._id.toString(),
      newsId: doc.newsId.toString(),
      userId: doc.userId.toString(),
      comment: doc.comment,
      createdAt: doc.createdAt,
    };
  }
  async createComment(data: {
    newsId: string;
    comment: string;
    userId: string;
  }) {
    const doc = await CommentModel.create(data);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async getCommentsByNewsId(newsId: string) {
    const comments = await CommentModel.find({ newsId }).populate<{
      userId: { _id: string; name: string };
    }>("userId", "name");
    const result = comments.map((c) => ({
      newsId: c.newsId,
      name: c.userId?.name,
      comment: c.comment,
      createdAt: c.createdAt,
    }));
    return result;
  }
}
