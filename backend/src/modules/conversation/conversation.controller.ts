import { Request, Response } from "express";
import { validateZod } from "../../utils/validationHandler";
import authService from "../auth/auth.service";
import { createConversationSchema } from "./conversation.schema";
import conversationService from "./conversation.service";

class ConversationController {
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
