import { Request, Response } from "express";
import { validateZod } from "../../utils/validationHandler";
import authService from "./auth.service";
import {
  emailSchema,
  forgotPasswordSchema,
  regenerateCodeSchema,
  userLoginSchema,
  userRegisterSchema,
  verifyEmailSchema,
} from "./auth.schema";
import { ApiResponse } from "../../utils/ApiResponse";

class AuthController {
  private authService;
  async register(req: Request, res: Response) {
    const validationResult = validateZod(userRegisterSchema, req.body);
    const result = await authService.create(validationResult);
    return res.status(201).json(new ApiResponse(201, result, "User Created"));
  }

  async verifyEmail(req: Request, res: Response) {
    const validationResult = validateZod(verifyEmailSchema, req.body);
    const result = await authService.verifyEmail(validationResult);
    return res.status(200).json({
      data: result,
      message: "success",
    });
  }
  async regenerate(req: Request, res: Response) {
    const validationResult = validateZod(regenerateCodeSchema, req.body);
    const result = await authService.regenerate(validationResult);
    return res.status(200).json({
      data: result,
      message: "success",
    });
  }

  async login(req: Request, res: Response) {
    const validationResult = validateZod(userLoginSchema, req.body);

    const options = {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: true, // Set to true in production with HTTPS
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days expiration
      sameSite: "none" as const, // Allow cross-origin requests
    };

    const { result, accessToken, refreshToken } = await authService.login(
      validationResult
    );
    return res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", refreshToken, options)
      .json({
        data: result,
        message: "success",
      });
  }

  async verifyAbleEmail(req: Request, res: Response) {
    const validEmail = emailSchema.parse(req.body.email);
    const result = await authService.verifyAbleEmail(validEmail);

    res.json({
      data: result,
      message: "success",
    });
  }

  async forgotPasswordToken(req: Request, res: Response) {
    const validEmail = emailSchema.parse(req.body.email);
    const result = await authService.forgotPasswordToken(validEmail);
    return res.json({
      data: result,
      message: "success",
    });
  }

  async forgotPassword(req: Request, res: Response) {
    const validationResult = validateZod(forgotPasswordSchema, req.body);
    const result = await authService.forgotPassword(validationResult);
    return res.json({
      data: result,
      message: "success",
    });
  }

  async me(req: Request, res: Response) {
    const { access_token, refresh_token } = req.cookies;
    const { accessToken, refreshToken } = await authService.checkTokens(
      access_token,
      refresh_token
    );
    // resend the cookie
    const options = {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: true, // Set to true in production with HTTPS
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days expiration
      sameSite: "none" as const, // Allow cross-origin requests
    };

    return res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", refreshToken, options)
      .json({
        message: "success",
        data: [],
      });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "success" });
  }
}
export const authController = new AuthController();
