import { Socket } from "socket.io";
import { parse } from "cookie";
import authService from "../modules/auth/auth.service";

export function authenticateSocket(socket: Socket, next: (err?: any) => void) {
  try {
    const cookies = socket.handshake.headers.cookie;
    const parsedCookie = parse(cookies);

    const accessToken = parsedCookie.access_token;
    const refreshToken = parsedCookie.refresh_token;

    const userData = authService.getUserFromToken(accessToken, refreshToken);
    if (!userData) {
      return next(new Error("Invalid or expired tokens"));
    }

    socket.user = userData;

    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
}

export default authenticateSocket;
