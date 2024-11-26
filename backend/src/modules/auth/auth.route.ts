import { Router } from "express";

import authService from "./auth.controller";
import {
  emailSchema,
  forgotPasswordSchema,
  regenerateCodeSchema,
  userLoginSchema,
  userRegisterSchema,
  verifyEmailSchema,
} from "./auth.schema";
import { asyncHandler } from "../../utils/asyncHandler";
import { validateZod } from "../../utils/validationHandler";
const Controller = authService;

const router = Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const validationResult = validateZod(userRegisterSchema, req.body);
    await Controller.create(validationResult.data, res);
  })
);

router.post(
  "/verify",
  asyncHandler(async (req, res) => {
    const validationResult = validateZod(verifyEmailSchema, req.body);

    if (!validationResult.success) throw new Error("Invalid Request Body");
    await Controller.verifyEmail(validationResult.data, res);
  })
);

router.post(
  "/regenerate",
  asyncHandler(async (req, res) => {
    const validationResult = validateZod(regenerateCodeSchema, req.body);
    await Controller.regenerate(validationResult.data.email, res);
  })
);

router.post(
  "/verifyable-email",
  asyncHandler(async (req, res) => {
    const validEmail = emailSchema.parse(req.body.email);
    await Controller.verifyAbleEmail(validEmail, res);
  })
);

router.post(
  "/forgot-password-generator",
  asyncHandler(async (req, res, next) => {
    const validEmail = emailSchema.parse(req.body.email);
    await Controller.forgotPasswordToken(validEmail, res);
  })
);

router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const validationResult = validateZod(forgotPasswordSchema, req.body);
    await Controller.forgotPassword(validationResult.data, res);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const validationResult = validateZod(userLoginSchema, req.body);
    await Controller.login(validationResult.data, res);
  })
);

// TODO: Implement the /me route
// router.get("/me", async (req, res, next) => {
//   const access_token = req.cookies.access_token;
//   const refresh_token = req.cookies.refresh_token;

//   try {
//     if (!access_token || !refresh_token) {
//       throw new Error("Unauthorized");
//     }
//     const verifiedAccessToken = verifyAccessToken(access_token);

//     console.log({ verifiedAccessToken });
//     if (verifiedAccessToken === "expired") {
//       // regenerate the tokens
//     }
//     if (verifiedAccessToken === "invalid") {
//       res.status(401).json({ message: "Unauthorized" });
//     }

//     // Check the refresh token
//     return res.json({ message: "success" });
//   } catch (error) {
//     next(error);
//   }

//   console.log({ access_token });
// });

// router.get("/logout", async (req, res, next) => {
//   res.clearCookie("access_token");
//   res.clearCookie("refresh_token");
//   return res.status(200).json({ message: "success" });
// });

export const authRouter = router;
