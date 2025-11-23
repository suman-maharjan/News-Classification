import { AxiosError, AxiosResponse } from "axios";

export interface ApiResponse<T> extends AxiosResponse {
  data: T;
  message: string;
}

export interface ApiError<T> extends AxiosError {
  data: null;
  errors: any[];
  statusCode: number;
  success: false;
  message: string;
}
