import { BASE_URL } from "@/constants";
import {
  TClientToServerEvents,
  TServerToClientEvents,
} from "@/types/socketTypes";
import { io, Socket } from "socket.io-client";

const socket: Socket<TServerToClientEvents, TClientToServerEvents> = io(
  BASE_URL + "/classify",
  {
    withCredentials: true,
  }
);

export default socket;
