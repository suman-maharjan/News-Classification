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
import { z } from "zod";
import { HTTPErrorType } from "../../types/HTTPErrorType";
const Controller = authService;

const router = Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "",
    message: "API is working",
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const validationResult = userRegisterSchema.safeParse(req.body);
    if (!validationResult.success) throw new Error("Invalid Request Body");

    const result = await Controller.create(validationResult.data);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/regenerate", async (req, res, next) => {
  try {
    const validationResult = regenerateCodeSchema.safeParse(req.body);
    if (!validationResult.success) throw new Error("Email Validation Failed");

    const result = await Controller.regenerate(validationResult.data.email);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const validationResult = verifyEmailSchema.safeParse(req.body);

    if (!validationResult.success) throw new Error("Invalid Request Body");
    const result = await Controller.verifyEmail(validationResult.data);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/verifyable-email", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is required");
    const result = await Controller.verifyAbleEmail(email);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/forgot-password-generator", async (req, res, next) => {
  try {
    const validEmail = emailSchema.parse(req.body.email);
    const result = await Controller.forgotPasswordToken(validEmail);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const error: HTTPErrorType = new Error("Invalid Email");
      error.status = 400;
    }
    next(error);
  }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    const validationResult = forgotPasswordSchema.safeParse(req.body);
    if (!validationResult.success) throw new Error("Invalid Request Body");
    const result = await Controller.forgotPassword(validationResult.data);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const validationResult = userLoginSchema.safeParse(req.body);
    if (!validationResult.success) throw new Error("Invalid Request Body");

    const result = await Controller.login(validationResult.data);
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
});

export const authRouter = router;
