import { Request, Response } from "express";
import { accessTokenSchema } from "../base/base.schema";
import { sendApiResponse } from "../../utils/ApiResponse";
import { validateZod } from "../../utils/validationHandler";
import {
  loginUserSchema,
  registerUserSchema,
  resendOtpSchema,
  verifyEmailSchema,
} from "./user.schema";
import { userService } from "./user.service";

class UserController {
  async registerUser(req: Request, res: Response) {
    const validationResult = validateZod(registerUserSchema, req.body);
    const user = await userService.create(validationResult);
    return sendApiResponse(res, 200, user, "Registration Successful");
  }

  async loginUser(req: Request, res: Response) {
    const validationResult = validateZod(loginUserSchema, req.body);
    const result = await userService.login(validationResult);
    return sendApiResponse(res, 200, result, "Login Successful");
  }

  async logoutUser(req: Request, res: Response) {
    const validationResult = validateZod(accessTokenSchema, req.headers);
    const result = await userService.logout(validationResult);
    return sendApiResponse(res, 200, result, "Logout Successful");
  }

  async me(req: Request, res: Response) {
    const validationResult = validateZod(accessTokenSchema, req.headers);
    const result = await userService.me(validationResult);
    return sendApiResponse(res, 200, result, "Logout Successful");
  }

  async verifyEmail(req: Request, res: Response) {
    const validationResult = validateZod(verifyEmailSchema, req.body);
    const result = await userService.verifyEmail(validationResult);
    return sendApiResponse(res, 200, result, "Email Verified");
  }

  async resendOtp(req: Request, res: Response) {
    const validationResult = validateZod(resendOtpSchema, req.body);
    const result = await userService.resendOtp(validationResult);
    return sendApiResponse(res, 200, result, "Email Verified");
  }
}

export const userController = new UserController();
