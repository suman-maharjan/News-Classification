import Express, { Request, Response } from "express";
import { userRouter } from "../modules2/user/user.route";
import { ApiError } from "../utils/ApiError";

const router = Express.Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "V2 API is working",
  });
});

router.use("/user", userRouter);

router.all("*", (req: Request, res: Response, next: Express.NextFunction) => {
  throw new ApiError(404, "Routes not found");
});

export const apiRouterV2 = router;
