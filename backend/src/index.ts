import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec as swaggerDocument } from "./utils/swagger";

import cors from "cors";

import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware";
import { indexRouter } from "./routes/index";

import http from "http";
import { initializeSocket } from "./sockets/socket.gateway";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL!;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database is running...");
  })
  .catch((err) => {
    console.log("Database not connected...");
  });

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "", // Frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRouter);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error Handling Middleware, It is taking err in params
app.use(errorHandler);
