import { Request, Response } from "express";
import Express from "express";

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec as swaggerDocument } from "./utils/swagger";

import cors from "cors";

import dotenv from "dotenv";
import { indexRouter } from "./routes/index";
import { errorHandler } from "./middlewares/error.middleware";

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

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "", // Frontend URL
    credentials: true, // Allow credentials (cookies)
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error Handling Middleware, It is taking err in params
app.use(errorHandler);
