import { Request, Response, NextFunction } from "express";
import userModel, { IUser, RoleEnum } from "../modules/user/user.model";
import { verifyAccessToken, verifyRefreshToken, verifyToken } from "./jwt";
import jwt from "jsonwebtoken";
import authService from "../modules/auth/auth.controller";

const compareRoles = (user_perm: RoleEnum[], access_perm: RoleEnum[]) => {
  // Ensure user_perm is an array
  if (!Array.isArray(user_perm)) {
    user_perm = [user_perm];
  }

  // If no specific access permissions are required, allow access
  if (access_perm.length === 0) return true;

  // Check if any of the user permissions match the access permissions
  return user_perm.some((v) => access_perm.indexOf(v) !== -1);
};

const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const incomingRefreshToken = req.cookies.refresh_token;

  if (!incomingRefreshToken) {
    return next(new Error("Refresh Token is required"));
  }
  try {
    const decodedToken = verifyRefreshToken(incomingRefreshToken);
    const user = await userModel.findById(decodedToken.data.id);
    if (!user) {
      throw new Error("User not found");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new Error("Invalid Token");
    }
    const { accessToken } = await authService.generateAccessAndRefreshToken(
      user,
      res
    );
    return { accessToken };
  } catch (error) {
    next(error);
  }
};
const secureAPI = (roles: RoleEnum[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.access_token;
      if (!accessToken) throw new Error("Access Token is required");

      let tokenData = verifyAccessToken(accessToken);

      if (tokenData === "expired") {
        const tokenResult = await refreshAccessToken(req, res, next);
        if (!tokenResult) throw new Error("Failed to refresh access token");
        const { accessToken } = tokenResult;
        const newtokenData = await verifyAccessToken(accessToken);
        tokenData = newtokenData;
      }

      if (!tokenData) throw new Error("Invalid Token");

      const { data } = tokenData;

      // Find the user, check the user and get is role
      const user = await userModel.findOne({
        _id: data.id,
        isActive: true,
      });

      if (!user) throw new Error("User not found");
      const isAllowed = compareRoles(roles, user.roles);
      if (!isAllowed) throw new Error("Access Denied");
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default secureAPI;
