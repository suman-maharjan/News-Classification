import bcrypt from "bcrypt";
import { Request } from "express";
import mailer from "../../services/mail";
import {
  accessTokenPayload,
  refreshTokenPayload,
} from "../../types/tokenTypes";
import { ApiError } from "../../utils/ApiError";
import {
  generateAccessToken,
  generateRefreshToken,
  getUsersFromTokens,
  verifyAccessToken,
} from "../../utils/jwt";
import { generateOTP } from "../../utils/otp";
import UserModel, { IUser } from "../user/user.model";
import AuthModel from "./auth.model";
import {
  forgotPasswordSchemaType,
  userLoginSchemaType,
  userRegisterSchemaType,
  verifyEmailSchemaType,
} from "./auth.schema";

class AuthService {
  async getUserIdFromToken(req: Request) {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
      throw new ApiError(401, "Unauthorized");
    }
    const tokenData = verifyAccessToken(accessToken);
    return tokenData.data.id;
  }

  async create(payload: userRegisterSchemaType) {
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
    await UserModel.create(sanitizedPayload);

    const otp = generateOTP();

    const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    await AuthModel.create({ email, otp, token_expiry: expiryDate });

    await mailer(payload.email, otp);
    const result = "OTP sent to your email";
    return result;
  }

  async verifyEmail(payload: verifyEmailSchemaType) {
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

    return true;
  }

  async regenerate(emailPayload: string) {
    // Check Email Exists
    const user = await AuthModel.findOne({ email: emailPayload });
    if (!user) {
      throw new ApiError(404, "Email not found");
    }
    await UserModel.findOne({
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
    return result;
  }

  async login(payload: userLoginSchemaType) {
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
      await this.generateAccessAndRefreshToken(user);

    const result = {
      user: { name: user?.name, email: user?.email, roles: user?.roles },
    };

    return { result, accessToken, refreshToken };
  }

  async forgotPasswordToken(email: string) {
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
    return true;
  }

  async verifyAbleEmail(email: string) {
    const user = await UserModel.findOne({ email });
    let result = false;
    if (user && !user.isEmailVerified) {
      result = true;
    }

    return result;
  }

  async generateAccessAndRefreshToken(user: IUser) {
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
  }

  async checkTokens(access_token: string, refresh_token: string) {
    const { accessToken, refreshToken } = await getUsersFromTokens(
      access_token,
      refresh_token
    );

    return { accessToken, refreshToken };
  }

  getUserFromToken(accessToken: string, refreshToken: string) {
    if (!accessToken || !refreshToken) {
      throw new ApiError(401, "Unauthorized");
    }

    const tokenData = verifyAccessToken(accessToken);
    return tokenData.data;
  }
}

const authService = new AuthService();

export default authService;
