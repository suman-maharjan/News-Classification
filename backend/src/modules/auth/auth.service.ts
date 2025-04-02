import { ApiError } from "../../utils/ApiError";
import { verifyAccessToken } from "../../utils/jwt";

class AuthService {
  getUserFromToken(accessToken: string, refreshToken: string) {
    if (!accessToken || !refreshToken) {
      throw new ApiError(401, "Unauthorized");
    }

    const tokenData = verifyAccessToken(accessToken);
    return tokenData.data;
  }
}

export default new AuthService();
