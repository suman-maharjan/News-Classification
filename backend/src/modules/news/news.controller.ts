import { Request, Response } from "express";
import { validateZod } from "../../utils/validationHandler";
import newsService from "./news.service";
import { newsClassifySchema } from "./newsSchema";

class NewsController {
  async classifyNews(req: Request, res: Response) {
    // validate request body
    const validationResult = validateZod(newsClassifySchema, req.body);
    // call service to classify news
    const result = await newsService.classify(validationResult);

    res.status(200).json({ data: result, message: "success" });
  }
}
export const newsController = new NewsController();
