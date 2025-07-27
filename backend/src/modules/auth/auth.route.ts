import { Router } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { authController } from "./auth.controller";

const router = Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post("/register", asyncHandler(authController.register));
router.post("/verify", asyncHandler(authController.verifyEmail));
router.post("/regenerate", asyncHandler(authController.regenerate));
router.post("/login", asyncHandler(authController.login));
router.post("/verifyable-email", asyncHandler(authController.verifyAbleEmail));
router.post(
  "/forgot-password-generator",
  asyncHandler(authController.forgotPasswordToken)
);
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.get("/me", asyncHandler(authController.me));
router.post("/logout", authController.logout);

export const authRouter = router;
