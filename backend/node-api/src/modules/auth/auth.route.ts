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
router.post(
  "/login",
  asyncHandler((req, res) => authController.login(req, res, false))
);
router.post(
  "/login/admin",
  asyncHandler((req, res) => authController.login(req, res, true))
);
router.post("/verifyable-email", asyncHandler(authController.verifyAbleEmail));
router.post("/check-email", asyncHandler(authController.checkEmailExists));
router.post(
  "/forgot-password-generator",
  asyncHandler(authController.forgotPasswordToken)
);
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.get("/me", asyncHandler(authController.me));
router.post("/logout", authController.logout);

export const authRouter = router;
