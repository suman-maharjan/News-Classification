// Handle Main WebSocket server logic
import { Server } from "socket.io";
import newsGateway from "../modules/news/news.gateway";
import authenticateSocket from "./socket.middleware";
// import conversationGateway from "../modules/conversation/conversation.gateway";

const allowedOrigins = process.env.FRONTEND_URL;
export function initializeSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error("Not allowed by cors"));
        }
      },
      credentials: true, // Allow credentials (cookies)
    },
  });

  io.of("/classify").use(authenticateSocket);
  io.of("/classify").on("connection", (socket) => {
    newsGateway.registerHandler(io, socket);
  });

  return io;
}
