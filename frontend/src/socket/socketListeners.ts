import { TNewsResult } from "@/types/socketTypes";
import socket from "./socket";
import { SOCKET_EVENTS } from "./socketEvents";

type NewsResultHandler = (data: TNewsResult) => void;

export const registerNewsResultListener = (callback: NewsResultHandler) => {
  socket.on(SOCKET_EVENTS.NEWS_RESULT, callback);
};

export const removeNewsResultListener = (callback: NewsResultHandler) => {
  socket.off(SOCKET_EVENTS.NEWS_RESULT, callback);
};
