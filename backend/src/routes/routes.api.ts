import Express, { Request, Response } from "express";
import { authRouter, conversationRouter, newsRouter } from "../modules";
import { ApiError } from "../utils/ApiError";

const router = Express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     description: Returns API status
 *     responses:
 *       200:
 *         description: API is working
 */

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.use("/auth", authRouter);
router.use("/news", newsRouter);
router.use("/conversation", conversationRouter);

router.all("*", (req: Request, res: Response, next: Express.NextFunction) => {
  throw new ApiError(404, "Routes not found");
});

export const apiRouter = router;
