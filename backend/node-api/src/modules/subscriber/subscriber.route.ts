import { Request, Response, Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import secureAPI from "../../utils/secure";
import { RoleEnum } from "../user/user.model";
import { subscriberController } from "./subscriber.controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ data: "", message: "API is working" });
});
router.get(
  "/all",
  secureAPI([RoleEnum.ADMIN]),
  asyncHandler(subscriberController.getAllSubscriber)
);

router.post("/add", asyncHandler(subscriberController.addSubscriber));

export const subscriberRouter = router;
