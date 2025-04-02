// Handle Main WebSocket server logic
import { Server } from "socket.io";
import newsGateway from "../modules/news/news.gateway";
import authenticateSocket from "./socket.middleware";
import conversationGateway from "../modules/conversation/conversation.gateway";

export function initializeSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true, // Allow credentials (cookies)
    },
  });

  io.of("/classify").use(authenticateSocket);
  io.of("/classify").on("connection", (socket) => {
    newsGateway.registerHandler(io, socket);
  });

  conversationGateway.registerHandler();
  return io;
}
