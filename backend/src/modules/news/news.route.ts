import { NextFunction, Request, Response, Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import secureAPI from "../../utils/secure";
import { RoleEnum } from "../user/user.model";
import { newsController } from "./news.controller";
import { validateZod } from "../../utils/validationHandler";
import { newsClassifySchema } from "./newsSchema";

const Controller = newsController;

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post(
  "/classify",
  secureAPI([RoleEnum.USER]),
  asyncHandler(newsController.classifyNews)
);

export const newsRouter = router;
