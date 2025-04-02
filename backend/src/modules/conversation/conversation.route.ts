import { Request, Response, Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import secureAPI from "../../utils/secure";
import { RoleEnum } from "../user/user.model";
import conversationController from "./conversation.controller";
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
  asyncHandler(Controller.create)
);

router.get(
  "/user",
  secureAPI([RoleEnum.USER]),
  asyncHandler(Controller.getConversationByToken)
);

export const conversationRouter = router;
