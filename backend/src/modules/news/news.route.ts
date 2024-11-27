import secureAPI from "../../utils/secure";
import { Request, Response, NextFunction, Router } from "express";
import { newsController } from "./news.controller";
import { RoleEnum } from "../user/user.model";
import { newsClassifySchema } from "./newsSchema";
import { asyncHandler } from "../../utils/asyncHandler";
import { validateZod } from "../../utils/validationHandler";

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
  asyncHandler(async (req: Request, res: Response) => {
    const validationResult = validateZod(newsClassifySchema, req.body);
    await Controller.classify(validationResult.data, res);
  })
);

export const newsRouter = router;
