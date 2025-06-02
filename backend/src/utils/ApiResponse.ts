import { Response } from "express";

class ApiResponse<T> {
  public statusCode: number;
  public message: string;
  public data: T;
  public success: boolean;

  constructor(statusCode: number, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

const sendApiResponse = <T>(
  res: Response,
  statusCode: number,
  result: T,
  message: string = "success"
) => {
  return res.status(statusCode).json({
    data: result,
    message,
  });
};
export { ApiResponse, sendApiResponse };
