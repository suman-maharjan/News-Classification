// Handle Main WebSocket server logic
import { Server } from "socket.io";
import { corsConfig } from "../middlewares/cors.middleware";
import newsGateway from "../modules/news/news.gateway";
import authenticateSocket from "./socket.middleware";
// import conversationGateway from "../modules/conversation/conversation.gateway";

export function initializeSocket(server: any) {
  const io = new Server(server, {
    cors: corsConfig,
  });

  io.of("/classify").use(authenticateSocket);
  io.of("/classify").on("connection", (socket) => {
    newsGateway.registerHandler(io, socket);
  });

  return io;
}
