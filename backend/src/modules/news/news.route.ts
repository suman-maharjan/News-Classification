import secureAPI from "../../utils/secure";
import { Request, Response, NextFunction, Router } from "express";
import { newsController } from "./news.controller";
import { RoleEnum } from "../user/user.model";
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = newsClassifySchema.safeParse(req.body);
      if (!validationResult.success) {
        throw new Error("Error Validating");
      }
      const result = await Controller.classify(validationResult.data);
      res.json({
        data: result,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  }
);

export const newsRouter = router;
