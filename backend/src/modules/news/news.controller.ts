import { Request, Response } from "express";
import { validateZod } from "../../utils/validationHandler";
import newsService from "./news.service";
import { newsClassifySchema, newsCreateSchema } from "./newsSchema";

class NewsController {
  async createNews(req: Request, res: Response) {
    const validationResult = validateZod(newsCreateSchema, req.body);
    const result = await newsService.create(validationResult);
    res.status(200).json({ data: result, message: "success" });
  }

  async getAllNews(req: Request, res: Response) {
    const result = await newsService.all();
    res.status(200).json({ data: result, message: "success" });
  }

  async getById(req: Request, res: Response) {
    const result = await newsService.getById(req.params.id);
    res.status(200).json({ data: result, message: "success" });
  }

  async editById(req: Request, res: Response) {
    const result = await newsService.editById(req.params.id, req.body);
    res.status(200).json({ data: result, message: "success" });
  }

  async deleteById(req: Request, res: Response) {
    const result = await newsService.deleteById(req.params.id);
    res.status(200).json({ data: result, message: "success" });
  }

  async classifyNews(req: Request, res: Response) {
    // validate request body
    const validationResult = validateZod(newsClassifySchema, req.body);
    // call service to classify news
    const result = await newsService.classifyUsingWorker(validationResult);
    res.status(200).json({ data: result, message: "success" });
  }
}
export const newsController = new NewsController();
