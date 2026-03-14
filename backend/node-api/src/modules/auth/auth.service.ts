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
  verifyAccessToken,
  verifyRefreshToken,
} from "../../utils/jwt";
import { generateOTP } from "../../utils/otp";
import { RoleEnum, User, userRepository } from "../user/user.types";
import {
  forgotPasswordSchemaType,
  userLoginSchemaType,
  userRegisterSchemaType,
  verifyEmailSchemaType,
} from "./auth.schema";
import { authRepository } from "./auth.type";

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
    const { name, email, password, interests } = payload;
    const emailExist = await userRepository.getUserByEmail(email);

    if (emailExist && emailExist.isEmailVerified) {
      throw new ApiError(409, "Email already exist");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS,
    );

    // if (emailExist && !emailExist.isEmailVerified) {
    //   // Update Name and Password, if email is not verified
    //   emailExist.name = name;
    //   emailExist.password = hashedPassword;
    //   await emailExist.save();
    // }

    const sanitizedPayload = {
      email,
      password: hashedPassword,
      name,
      interests,
      isEmailVerified: true,
    };
    await userRepository.createUser(sanitizedPayload);

    // const otp = generateOTP();

    // const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration
    // await authRepository.createOtp(email, otp, expiryDate);
    // await mailer(payload.email, otp);
    // const result = "OTP sent to your email";
    const result = "User Created";
    return result;
  }

  async verifyEmail(payload: verifyEmailSchemaType) {
    // Check Email Exists
    const { email: emailPayload, token: tokenPayload } = payload;
    const authUser = await authRepository.getValidOtpByEmail(emailPayload);

    if (!authUser) {
      throw new ApiError(401, "Token Expired or Invalid Input");
    } else if (authUser.otp !== Number(tokenPayload)) {
      throw new ApiError(401, "Invalid OTP");
    }

    const userValid = await userRepository.getUserByEmail(emailPayload);

    if (userValid && userValid.isEmailVerified) {
      throw new ApiError(401, "Email already verified");
    }
    await userRepository.updateEmailVerifiedByUser(emailPayload, true);
    await authRepository.deleteOtpByEmail(emailPayload);

    return true;
  }

  async regenerate(emailPayload: string) {
    // Check Email Exists
    const user = await authRepository.getOtpByEmail(emailPayload);
    if (!user) {
      throw new ApiError(404, "Email not found");
    }
    await userRepository.getNonVerifiedUserByEmail(emailPayload);

    const token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration

    const otp = generateOTP();
    await authRepository.updateOtpByEmail(emailPayload, otp, token_expiry);
    await mailer(emailPayload, otp);
    const result = "OTP sent to your email";
    return result;
  }

  async login(payload: userLoginSchemaType, admin: boolean) {
    const { email, password } = payload;

    const user = await userRepository.getUserWithPasswordByEmail(email);

    if (!user) {
      throw new ApiError(404, "User not found");
    } else if (!user.isActive) {
      throw new ApiError(401, "User is blocked. Please contact Admin");
    } else if (!user.isEmailVerified) {
      throw new ApiError(401, "Email not verified");
    }

    if (admin && !user.roles.includes(RoleEnum.ADMIN)) {
      throw new ApiError(404, "User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new ApiError(401, "Email or Password is invalid");
    }

    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshToken(user);
    await userRepository.updateAccessRefreshToken(
      user.email,
      accessToken,
      refreshToken,
    );
    const result = {
      user: { name: user?.name, email: user?.email, roles: user?.roles },
    };

    return { result, accessToken, refreshToken };
  }

  async forgotPasswordToken(email: string) {
    const user = await userRepository.getActiveUserByEmail(email);
    if (!user) {
      throw new ApiError(404, "User not found");
    } else if (!user.isEmailVerified) {
      throw new ApiError(401, "Email not verified");
    }
    const authUser = await authRepository.getOtpByEmail(email);
    if (authUser) {
      await authRepository.deleteOtpsByEmail(email);
    }

    const otp = generateOTP();
    const token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration
    await authRepository.createOtp(email, otp, token_expiry);
    mailer(email, otp);
    return "OTP sent to your email";
  }

  async forgotPassword(payload: forgotPasswordSchemaType) {
    const { email, token, password } = payload;
    // Check Email Exists
    const authUser = await authRepository.getValidOtpByEmail(email);

    if (!authUser) {
      throw new ApiError(401, "Token Expired or Invalid Input");
    }

    if (authUser.otp !== Number(token)) {
      throw new ApiError(401, "Invalid OTP");
    }
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new ApiError(404, "User not found");
    if (!user.isActive) {
      throw new ApiError(401, "User is blocked. Please contact Admin");
    } else if (!user.isEmailVerified) {
      throw new ApiError(401, "Email not verified");
    }

    const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    await userRepository.updateUserPasswordByEmail(email, hashPassword);

    await authRepository.deleteOtpByEmail(email);
    return true;
  }

  async verifyAbleEmail(email: string) {
    const user = await userRepository.getUserByEmail(email);
    let result = false;
    if (user && !user.isEmailVerified) {
      result = true;
    }

    return result;
  }
  async checkEmailExist(email: string) {
    const user = await userRepository.getUserByEmail(email);

    let result = false;
    if (user) {
      result = true;
    }

    return result;
  }

  async generateAccessAndRefreshToken(user: User) {
    // JWT ACCESS TOKEN GENERATION
    const accessTokenPayload: accessTokenPayload = {
      id: user.id,
      email: user?.email,
      username: user?.name,
      roles: user?.roles,
    };

    // JWT REFRESH TOKEN GENERATION
    const refreshTokenPayload: refreshTokenPayload = {
      id: user.id,
    };

    const accessToken = generateAccessToken(accessTokenPayload);
    const refreshToken = generateRefreshToken(refreshTokenPayload);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    // await user.save();

    return { accessToken, refreshToken };
  }

  async checkTokens(access_token: string, refresh_token: string) {
    const { accessToken, refreshToken } = await this.getUsersFromTokens(
      access_token,
      refresh_token,
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

  async getUserById(id: string) {
    const user = await userRepository.getUserById(id);
    return user;
  }

  getUsersFromTokens = async (accessToken: string, refreshToken: string) => {
    if (!accessToken || !refreshToken) {
      throw new ApiError(401, "Unauthorized");
    }
    let tokenData = verifyAccessToken(accessToken);
    if (tokenData === "expired") {
      const refreshTokenData = verifyRefreshToken(refreshToken);
      if (refreshTokenData === "expired") {
        throw new ApiError(401, "Unauthorized");
      }
      if (refreshTokenData) {
        const userId = refreshTokenData.data.id;
        const user = await userRepository.getActiveUserById(userId);
        if (!user) {
          throw new ApiError(404, "User not found");
        }

        const { accessToken, refreshToken } =
          await authService.generateAccessAndRefreshToken(user);

        return { user, accessToken, refreshToken };
      }
    }
    if (tokenData === "invalid") {
      throw new ApiError(401, "Unauthorized");
    }

    return { user: tokenData.data, accessToken, refreshToken };
  };
}

const authService = new AuthService();

export default authService;
