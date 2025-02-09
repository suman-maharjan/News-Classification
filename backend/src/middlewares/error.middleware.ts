import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import mongoose from "mongoose";
import { z } from "zod";
import path from "path";

interface IAPIError extends Error {
  statusCode: number;
  errors: any[];
  message: string;
  success: boolean;
  data?: any;
}

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let error: IAPIError = err;

  if (error instanceof z.ZodError) {
    const validationErrors = err.errors.map((error) => ({
      message: error.message,
      path: error.path,
      code: error.code,
    }));

    error = new ApiError(400, "Validation Error", validationErrors, err.stack);
  } else if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};
