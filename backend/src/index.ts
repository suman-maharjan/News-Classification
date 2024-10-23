import { Request, Response } from "express";
import Express from "express";

import express from "express";
import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";
import { indexRouter } from "./routes/index";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL!;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is running...");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err: any, req: Request, res: Response, next: Express.NextFunction) => {
  const errMsg = err ? err.message : "Something went wrong";
  console.log(errMsg);
  res.status(err.status || 500).json({ data: "", msg: errMsg });
});
