import { Request, Response } from "express";
import { validateZod } from "../../utils/validationHandler";
import { commentSchema } from "./comment.schema";
import commentService from "./comment.service";

class CommentController {
  async create(req: Request, res: Response) {
    const validationResult = validateZod(commentSchema, req.body);
    const result = await commentService.create(validationResult);
    return res.status(200).json({
      data: result,
      message: "success",
    });
  }

  async getByNewId(req: Request, res: Response) {
    const newsId = req.params.newsId;
    const result = await commentService.getCommentByNewsId(newsId);
    return res.status(200).json({
      data: result,
      message: "success",
    });
  }
}
export const commentController = new CommentController();
