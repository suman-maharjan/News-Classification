import { NextFunction, Request, Response, Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import secureAPI from "../../utils/secure";
import { RoleEnum } from "../user/user.model";
import { newsController } from "./news.controller";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post(
  "/create",
  secureAPI([RoleEnum.ADMIN]),
  asyncHandler(newsController.createNews)
);
router.get("/all", asyncHandler(newsController.getAllNews));
router.get("/:id", asyncHandler(newsController.getById));

router.post(
  "/edit/:id",
  secureAPI([RoleEnum.ADMIN]),
  asyncHandler(newsController.editById)
);

router.post(
  "/delete/:id",
  secureAPI([RoleEnum.ADMIN]),
  asyncHandler(newsController.deleteById)
);

router.post(
  "/classify",
  secureAPI([RoleEnum.ADMIN]),
  asyncHandler(newsController.classifyNews)
);

export const newsRouter = router;
