import { BASE_URL } from "@/constants";
import { io } from "socket.io-client";

const socket = io(BASE_URL + "/classify", {
  withCredentials: true,
});

export default socket;
