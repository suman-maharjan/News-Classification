import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "./axios.types";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  roles: string[];
}

export type TLoginResponse = ApiResponse<{ user: IUser }> | ApiError;
export type TRegisterResponse = ApiResponse<{ user: IUser }>;
export type IMeResponse = ApiResponse<IUser>;
