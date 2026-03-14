import { MongooseCommentRepository } from "./mongoose.comment.repository";

export interface Comment {
  id: string;
  newsId: string;
  userId: string;
  comment: string;
  createdAt: Date;
}
export interface CommentRepository {
  createComment: ({
    newsId,
    userId,
    comment,
  }: {
    newsId: string;
    userId: string;
    comment: string;
  }) => Promise<Comment | null>;
  getCommentsByNewsId(newsId: string): Promise<any>;
}

export const commentRepository = new MongooseCommentRepository();
