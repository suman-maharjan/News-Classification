import bcrypt from "bcrypt";

import { AppDataSource } from "../../config/datasource";
import { ApiError } from "../../utils/ApiError";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} from "../../utils/jwt";
import { TAccessTokenSchema } from "../base/base.schema";
import { OtpTypeEnum } from "../otp/otpToken.entity";
import OtpTokenService from "../otp/otpToken.service";
import { UserResponseDTO } from "./user.dto";
import { User } from "./user.entity";
import {
  TLoginUserSchema,
  TResendOtpSchema,
  TVerifyEmailSchema,
} from "./user.schema";

class UserService {
  private userRepositoy = AppDataSource.getRepository(User);
  private otpService = new OtpTokenService();

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = +process.env.SALT_ROUNDS || 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async generateAccessTokenRefreshToken(user: User) {
    const accessTokenPayload = {
      id: user?.id,
      email: user?.email,
      username: user?.name,
      roles: user?.role,
    };
    const refreshTokenPayload = {
      id: user?.id,
    };

    const accessToken = generateAccessToken(accessTokenPayload);
    const refreshToken = generateRefreshToken(refreshTokenPayload);

    return { accessToken, refreshToken };
  }

  private async findUserByAccessToken(accessToken: string) {
    const verifiedAccessToken = await verifyAccessToken(accessToken);
    const id = verifiedAccessToken.data.id;
    const user = this.userRepositoy.findOneBy({ id });
    if (!user) {
      throw new ApiError(404, "User Don't Exists.");
    }
    return user;
  }

  async create(payload: User) {
    const { name, email, password } = payload;
    let user: User;

    // Check if email is already taken
    const userExist = await this.userRepositoy.findOne({ where: { email } });

    if (userExist) {
      if (userExist.isEmailVerified) {
        throw new ApiError(409, "Email already exist");
      } else {
        // If email exists but not verified, update name and password
        userExist.name = name;
        userExist.password = await this.hashPassword(password);
        user = await this.userRepositoy.save(userExist);
      }
    } else {
      // If email doesn't exist, create a new user
      user = await this.userRepositoy.save({
        name,
        email,
        password: await this.hashPassword(password),
      });
    }
    // TODO: GET THE OTP AND SEND EMAIL
    await this.otpService.create({
      email: user.email,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });
    return new UserResponseDTO(user);
  }

  async login(payload: TLoginUserSchema) {
    const { email, password } = payload;
    const user = await this.userRepositoy.findOne({
      where: { email },
      select: [
        "id",
        "email",
        "name",
        "password",
        "isActive",
        "isEmailVerified",
      ],
    });

    if (!user) {
      throw new ApiError(401, "Email or Password is Invalid");
    } else if (!user.isEmailVerified) {
      throw new ApiError(401, "Email not verified");
    } else if (!user.isActive) {
      throw new ApiError(401, "User is blocked. Please contact Admin.");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new ApiError(401, "Email or Password is Invalid");
    }

    // Generate Access token and Refresh Token
    const { accessToken, refreshToken } =
      await this.generateAccessTokenRefreshToken(user);

    const savedUser = await this.userRepositoy.save({
      ...user,
      accessToken,
      refreshToken,
    });

    return {
      id: savedUser.id,
      name: savedUser.name,
      accessToken: savedUser.accessToken,
      email: savedUser.email,
      refreshToken: savedUser.refreshToken,
    };
  }

  async logout(payload: TAccessTokenSchema) {
    const { accessToken } = payload;
    const user = await this.findUserByAccessToken(accessToken);

    user.accessToken = "";
    user.refreshToken = "";

    this.userRepositoy.save(user);

    return null;
  }

  async me(payload: TAccessTokenSchema) {
    const { accessToken } = payload;
    const user = await this.findUserByAccessToken(accessToken);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
  }

  async verifyEmail(payload: TVerifyEmailSchema) {
    const { email, otp } = payload;
    const otpToken = await this.otpService.get({ email: payload.email });
    if (otp !== otpToken.token) {
      throw new ApiError(401, "Token Expired or Invalid Input");
    }
    const user = await this.userRepositoy.findOne({ where: { email } });
    user.isEmailVerified = true;

    await this.otpService.delete({ email, type: OtpTypeEnum.VERIFY_EMAIL });

    this.userRepositoy.save(user);
    return {
      success: true,
    };
  }

  async resendOtp(payload: TResendOtpSchema) {
    // TODO: GET THE OTP AND SEND EMAIL
    await this.otpService.regenerate(payload);
    return { success: true };
  }
}

export const userService = new UserService();
