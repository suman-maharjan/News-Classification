import socket from "./socket";
import { SOCKET_EVENTS } from "./socketEvents";

type TNewsEmit = {
  news: string;
  type: string;
};

export const emitNews = (payload: TNewsEmit) => {
  socket.emit(SOCKET_EVENTS.NEWS_SEND, payload);
};
