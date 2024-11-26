import { HTTPErrorType } from "../../types/HTTPErrorType";

import bcrypt from "bcrypt";
import UserModel, { IUser } from "../user/user.model";
import AuthModel from "./auth.model";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyToken,
} from "../../utils/jwt";
import mailer from "../../services/mail";
import { Request, Response } from "express";
import {
  forgotPasswordSchemaType,
  userLoginSchemaType,
  userRegisterSchema,
  userRegisterSchemaType,
  verifyEmailSchemaType,
} from "./auth.schema";
import { generateOTP } from "../../utils/otp";
import {
  accessTokenPayload,
  refreshTokenPayload,
} from "../../types/tokenTypes";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";

class AuthController {
  async getUserIdFromToken(req: Request) {
    // const bearerToken = req?.headers?.authorization;
    // const token = bearerToken.split("Bearer ")[1];
    // const tokenData = verifyToken(token);
    // const { data } = tokenData;
    // const { email } = data;
    const accessToken = req.cookies.access_token;
    if (!accessToken) throw new Error("Access Token is required");
    console.log({ accessToken });
    const tokenData = verifyAccessToken(accessToken);
    const user = await UserModel.findOne({ email: tokenData.email });
    return user._id;
  }

  async create(payload: userRegisterSchemaType, res: Response) {
    const { name, email, password } = payload;
    const emailExist = await UserModel.findOne({
      email,
    });

    if (emailExist && emailExist.isEmailVerified) {
      throw new ApiError(409, "Email already exist");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS
    );

    if (emailExist && !emailExist.isEmailVerified) {
      // Update Name and Password, if email is not verified
      emailExist.name = name;
      emailExist.password = hashedPassword;
      await emailExist.save();
    }

    const sanitizedPayload = { email, password: hashedPassword, name };
    const user = await UserModel.create(sanitizedPayload);

    const otp = generateOTP();

    const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    await AuthModel.create({ email, otp, token_expiry: expiryDate });

    const info = await mailer(payload.email, otp);
    const result = "OTP sent to your email";
    return res.status(201).json(new ApiResponse(201, result, "User Created"));
  }

  async verifyEmail(payload: verifyEmailSchemaType, res: Response) {
    // Check Email Exists
    const { email: emailPayload, token: tokenPayload } = payload;
    const authUser = await AuthModel.findOne({
      email: emailPayload,
      token_expiry: { $gt: new Date() },
    });

    if (!authUser) {
      throw new ApiError(401, "Token Expired or Invalid Input");
    } else if (authUser.otp !== tokenPayload) {
      throw new ApiError(401, "Invalid OTP");
    }

    const userValid = await UserModel.findOne({ email: emailPayload });

    if (userValid && userValid.isEmailVerified) {
      throw new ApiError(401, "Email already verified");
    }

    await UserModel.findOneAndUpdate(
      { email: emailPayload },
      { isEmailVerified: true },
      { new: true }
    );

    await AuthModel.deleteOne({ email: emailPayload });

    const result = true;
    return res.status(200).json({
      data: result,
      message: "success",
    });
  }

  async regenerate(emailPayload: string, res: Response) {
    // Check Email Exists
    const user = await AuthModel.findOne({ email: emailPayload });
    if (!user) {
      throw new ApiError(404, "Email not found");
    }
    const userValid = await UserModel.findOne({
      email: emailPayload,
      isEmailVerified: false,
    });

    const token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    const otp = generateOTP();
    await AuthModel.findOneAndUpdate(
      { email: emailPayload },
      { otp, token_expiry },
      { new: true }
    );
    await mailer(emailPayload, otp);
    const result = "OTP sent to your email";
    return res.status(200).json({
      data: result,
      message: "success",
    });
  }

  async login(payload: userLoginSchemaType, res: Response) {
    const { email, password } = payload;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(404, "User not found");
    } else if (!user.isActive) {
      throw new ApiError(401, "User is blocked. Please contact Admin");
    } else if (!user.isEmailVerified) {
      throw new ApiError(401, "Email not verified");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new ApiError(401, "Email or Password is invalid");
    }

    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshToken(user, res);

    const options = {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days expiration
      sameSite: "none" as const, // Allow cross-origin requests
    };

    const result = {
      user: { name: user?.name, email: user?.email, roles: user?.roles },
    };

    return res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", accessToken, options)
      .json({
        data: result,
        message: "success",
      });
  }

  async forgotPasswordToken(email: string, res: Response) {
    const user = await UserModel.findOne({ email, isActive: true });
    if (!user) {
      throw new ApiError(404, "User not found");
    } else if (!user.isEmailVerified) {
      throw new ApiError(401, "Email not verified");
    }
    const authUser = await AuthModel.findOne({ email });
    if (authUser) {
      await AuthModel.deleteMany({ email });
    }

    const otp = generateOTP();
    const token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    await AuthModel.create({ email, otp, token_expiry });
    mailer(email, otp);
    const result = "OTP sent to your email";
    res.json({
      data: result,
      message: "success",
    });
  }

  async forgotPassword(payload: forgotPasswordSchemaType, res: Response) {
    const { email, token, password } = payload;
    // Check Email Exists
    const authUser = await AuthModel.findOne({
      email,
      token_expiry: { $gt: new Date() },
    });

    if (!authUser) {
      throw new ApiError(401, "Token Expired or Invalid Input");
    }

    if (authUser.otp !== token) {
      throw new ApiError(401, "Invalid OTP");
    }
    const user = await UserModel.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");
    if (!user.isActive) {
      throw new ApiError(401, "User is blocked. Please contact Admin");
    } else if (!user.isEmailVerified) {
      throw new ApiError(401, "Email not verified");
    }

    const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    await UserModel.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );

    await AuthModel.deleteOne({ email });
    const result = true;
    res.json({
      data: result,
      message: "success",
    });
  }

  async verifyAbleEmail(email: string, res: Response) {
    const user = await UserModel.findOne({ email });
    let result = false;
    if (user && !user.isEmailVerified) {
      result = true;
    }
    res.json({
      data: result,
      message: "success",
    });
  }

  async generateAccessAndRefreshToken(user: IUser, res: Response) {
    try {
      // JWT ACCESS TOKEN GENERATION
      const accessTokenPayload: accessTokenPayload = {
        id: user?._id as string,
        email: user?.email,
        username: user?.name,
        roles: user?.roles,
      };

      // JWT REFRESH TOKEN GENERATION
      const refreshTokenPayload: refreshTokenPayload = {
        id: user?._id as string,
      };

      const accessToken = generateAccessToken(accessTokenPayload);
      const refreshToken = generateRefreshToken(refreshTokenPayload);

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      await user.save();

      return { accessToken, refreshToken };
    } catch (e) {
      throw new Error(e);
    }
  }
}

const authService = new AuthController();

export default authService;
