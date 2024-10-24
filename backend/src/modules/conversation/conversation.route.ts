import { Request, Response, NextFunction } from "express";
import secureAPI from "../../utils/secure";
import { RoleEnum } from "../user/user.model";
import conversationController from "./conversation.controller";
import { Router } from "express";
import { createConversationSchema } from "./conversation.schema";
const Controller = conversationController;

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post(
  "/save",
  secureAPI([RoleEnum.USER]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = createConversationSchema.safeParse(req.body);
      if (!validationResult.success) {
        throw new Error("Error Validating");
      }
      const savedConversation = await Controller.create(
        req,
        validationResult.data
      );
      return res.json({ data: savedConversation, message: "success" });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/user", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversation = await Controller.getConversationByToken(req);
    if (conversation) {
      return res.json({ data: conversation, message: "success" });
    } else {
      return res.json({ data: [], message: "success" });
    }
  } catch (error) {
    next(error);
  }
});

export const conversationRouter = router;
