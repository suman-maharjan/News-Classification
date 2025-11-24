import Express, { Request, Response } from "express";
import {
  authRouter,
  conversationRouter,
  newsRouter,
  subscriberRouter,
} from "../modules";
import { ApiError } from "../utils/ApiError";

const router = Express.Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.use("/auth", authRouter);
router.use("/news", newsRouter);
router.use("/conversation", conversationRouter);
router.use("/subscriber", subscriberRouter);

router.all("*", (req: Request, res: Response, next: Express.NextFunction) => {
  throw new ApiError(404, "Routes not found");
});

export const apiRouter = router;
