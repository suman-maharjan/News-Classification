import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { accessTokenPayload, refreshTokenPayload } from "../types/tokenTypes";
import { ApiError } from "./ApiError";
import UserModel from "../modules/user/user.model";
import authService from "../modules/auth/auth.service";
dotenv.config();

const generateToken = (payload) => {
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const generateRefreshToken = (payload: refreshTokenPayload) => {
  return jwt.sign({ data: payload }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });
};

const generateAccessToken = (payload: accessTokenPayload) => {
  return jwt.sign({ data: payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION,
  });
};

const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return "expired";
    }
    throw new ApiError(400, "Invalid Token");
  }
};

const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return "expired";
    }
    throw new ApiError(400, "Invalid Token");
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new Error(e);
  }
};

const getUsersFromTokens = async (
  accessToken: string,
  refreshToken: string
) => {
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
      const user = await UserModel.findOne({ _id: userId, isActive: true });
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

export {
  getUsersFromTokens,
  generateToken,
  verifyToken,
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
  verifyAccessToken,
};
