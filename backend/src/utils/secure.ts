import { Request, Response, NextFunction } from "express";
import { RoleEnum } from "../modules/user/user.model";
import { getUsersFromTokens } from "./jwt";
import { ApiError } from "./ApiError";
import { asyncHandler } from "./asyncHandler";

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

const secureAPI = (roles: RoleEnum[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { access_token, refresh_token } = req.cookies;
      const { user } = await getUsersFromTokens(access_token, refresh_token);
      const isAllowed = compareRoles(roles, user.roles);
      if (!isAllowed) {
        throw new ApiError(403, "Forbidden");
      }
      next();
    }
  );
};

export default secureAPI;
