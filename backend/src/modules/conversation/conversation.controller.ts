import { Request, Response } from "express";
import { validateZod } from "../../utils/validationHandler";
import authService from "../auth/auth.service";
import { createConversationSchema } from "./conversation.schema";
import conversationService from "./conversation.service";

class ConversationController {
  async create(req: Request, res: Response) {
    const validationResult = validateZod(createConversationSchema, req.body);
    const userId = await authService.getUserIdFromToken(req);
    const result = conversationService.save(validationResult, userId);
    return res.status(200).json({ data: result, message: "success" });
  }

  async getConversationByToken(req: Request, res: Response) {
    const userId = await authService.getUserIdFromToken(req);

    const conversation = await conversationService.getConversationById(
      userId,
      parseInt(req.query.page as string) ?? 1,
      parseInt(req.query.limit as string) ?? 10
    );

    return res.json({ data: conversation, message: "success" });
  }
}

const conversationController = new ConversationController();
export default conversationController;
