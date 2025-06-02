import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { userController } from "./user.controller";

const router = Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "v2 is working",
  });
});

router.post("/register", asyncHandler(userController.registerUser));
router.post("/login", asyncHandler(userController.loginUser));
router.post("/logout", asyncHandler(userController.logoutUser));
router.post("/me", asyncHandler(userController.logoutUser));
router.post("/verify-email", asyncHandler(userController.verifyEmail));
router.post("/resend-otp", asyncHandler(userController.resendOtp));

export const userRouter = router;
