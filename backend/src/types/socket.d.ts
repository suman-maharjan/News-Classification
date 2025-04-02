import { Socket } from "socket.io";
import { accessTokenPayload } from "./tokenTypes";

// Extend the default Socket type to include user data
declare module "socket.io" {
  interface Socket {
    user?: accessTokenPayload;
  }
}
