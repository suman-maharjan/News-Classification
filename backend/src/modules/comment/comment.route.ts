import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { secureAPISelf } from "../../utils/secure";
import { commentController } from "./comment.controller";

const router = Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post("/create", secureAPISelf(), asyncHandler(commentController.create));
router.get("/:newsId", asyncHandler(commentController.getByNewId));

export const commentRouter = router;
