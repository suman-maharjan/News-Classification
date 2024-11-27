import { Request, Response, NextFunction } from "express";
import secureAPI from "../../utils/secure";
import { RoleEnum } from "../user/user.model";
import conversationController from "./conversation.controller";
import { Router } from "express";
import { createConversationSchema } from "./conversation.schema";
import { asyncHandler } from "../../utils/asyncHandler";
import { validateZod } from "../../utils/validationHandler";
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
  asyncHandler(async (req: Request, res: Response) => {
    const validationResult = validateZod(req.body, createConversationSchema);
    await Controller.create(req, validationResult, res);
  })
);

router.get(
  "/user",
  secureAPI([RoleEnum.USER]),
  asyncHandler(async (req: Request, res: Response) => {
    const conversation = await Controller.getConversationByToken(req);
    if (conversation) {
      return res.json({ data: conversation, message: "success" });
    } else {
      return res.json({ data: [], message: "success" });
    }
  })
);

export const conversationRouter = router;
