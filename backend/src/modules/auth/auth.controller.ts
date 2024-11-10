import { HTTPErrorType } from "../../types/HTTPErrorType";

import bcrypt from "bcrypt";
import UserModel, { IUser } from "../user/user.model";
import AuthModel from "./auth.model";
import {
  generateAccessToken,
  generateRefreshToken,
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

class AuthController {
  async getUserIdFromToken(req: Request) {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenData = verifyToken(token);
    const { data } = tokenData;
    const { email } = data;

    const user = await UserModel.findOne({ email });
    return user._id;
  }

  async create(payload: userRegisterSchemaType) {
    try {
      const { name, email, password } = payload;
      const emailExist = await UserModel.findOne({ email });

      if (emailExist && emailExist.isEmailVerified) {
        const error: HTTPErrorType = new Error("Email already exist");
        error.status = 404;
        throw error;
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
        return "OTP sent to your email";
      }

      const sanitizedPayload = { email, password: hashedPassword, name };
      const user = await UserModel.create(sanitizedPayload);

      const otp = generateOTP();

      const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

      await AuthModel.create({ email, otp, token_expiry: expiryDate });

      const info = await mailer(payload.email, otp);
      return "OTP sent to your email";
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async verifyEmail(payload: verifyEmailSchemaType) {
    // Check Email Exists
    const { email: emailPayload, token: tokenPayload } = payload;
    const authUser = await AuthModel.findOne({
      email: emailPayload,
      token_expiry: { $gt: new Date() },
    });

    if (!authUser) {
      throw new Error("Token Expired or Invalid Input");
    }

    if (authUser.otp !== tokenPayload) {
      throw new Error("Invalid OTP");
    }

    const userValid = await UserModel.findOne({ email: emailPayload });

    if (userValid && userValid.isEmailVerified)
      throw new Error("Email already verified");

    await UserModel.findOneAndUpdate(
      { email: emailPayload },
      { isEmailVerified: true },
      { new: true }
    );

    await AuthModel.deleteOne({ email: emailPayload });

    return true;
  }

  async regenerate(emailPayload: string) {
    // Check Email Exists
    const user = await AuthModel.findOne({ email: emailPayload });
    if (!user) throw new Error("Email not found");

    const userValid = await UserModel.findOne({ email: emailPayload });

    if (userValid && userValid.isEmailVerified)
      throw new Error("Email already verified");

    const token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    const otp = generateOTP();
    await AuthModel.findOneAndUpdate(
      { email: emailPayload },
      { otp, token_expiry },
      { new: true }
    );
    await mailer(emailPayload, otp);
    return "OTP sent to your email";
  }

  async login(payload: userLoginSchemaType, res: Response) {
    const { email, password } = payload;
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      const error: HTTPErrorType = new Error("User not found");
      error.status = 404;
      throw error;
    }
    if (!user.isActive)
      throw new Error("User is blocked. Please contact Admin");

    if (!user.isEmailVerified) {
      const error: HTTPErrorType = new Error("Email not verified");
      error.status = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Email or Password is invalid");

    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshToken(user, res);

    return {
      user: { name: user?.name, email: user?.email, roles: user?.roles },
    };
  }

  async forgotPasswordToken(email: string) {
    const user = await UserModel.findOne({ email, isActive: true });
    if (!user) throw new Error("User not found");

    if (!user.isEmailVerified) {
      throw new Error("Email not verified");
    }
    const authUser = await AuthModel.findOne({ email });
    if (authUser) {
      await AuthModel.deleteMany({ email });
    }

    const otp = generateOTP();
    const token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    await AuthModel.create({ email, otp, token_expiry });
    mailer(email, otp);
    return "OTP sent to your email";
  }

  async forgotPassword(payload: forgotPasswordSchemaType) {
    const { email, token, password } = payload;
    // Check Email Exists
    const authUser = await AuthModel.findOne({
      email,
      token_expiry: { $gt: new Date() },
    });

    if (!authUser) {
      throw new Error("Token Expired or Invalid Input");
    }

    if (authUser.otp !== token) {
      throw new Error("Invalid OTP");
    }
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");
    if (!user.isActive)
      throw new Error("User is blocked. Please contact Admin");
    if (!user.isEmailVerified) throw new Error("Email not verified");

    const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    await UserModel.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );

    await AuthModel.deleteOne({ email });
    return true;
  }

  async verifyAbleEmail(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    if (!user.isEmailVerified) {
      return true;
    }
    return false;
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

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        // secure: true,
        // path: "/",
      });
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        // secure: true,
        // path: "/",
      });

      return { accessToken, refreshToken };
    } catch (e) {
      throw new Error(e);
    }
  }
}

const authService = new AuthController();

export default authService;
