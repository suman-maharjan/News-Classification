import cookieParser from "cookie-parser";
import express from "express";

import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { indexRouter } from "./routes/index";

import http from "http";
import initMongoDatabase from "./config/mongoDb";
import { initRedis } from "./config/redis";
import { FRONTEND_URL, PORT } from "./constants/envConstants";
import { initializeSocket } from "./sockets/socket.gateway";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL || "", // Frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);

// Error Handling Middleware, It is taking err in params
app.use(errorHandler);

const startServer = async () => {
  try {
    // Mongo DB Initialization
    await initMongoDatabase();
    // Redis Initialization
    await initRedis();

    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error Starting Server:`, error);
    process.exit(1);
  }
};

startServer();
