import { DeleteResult } from "mongoose";
import { authSchemaType } from "./auth.model";
import { MongooseAuthRepository } from "./mongoose.auth.repository";

export interface Auth {
  id: string;
  email: string;
  otp: number;
  tokenExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRepository {
  getOtpByEmail(email: string): Promise<Auth | null>;
  getValidOtpByEmail(email: string): Promise<Auth | null>;
  createOtp(ail: string, otp: number, token_expiry: Date): Promise<Auth | null>;
  updateOtpByEmail(
    email: string,
    otp: number,
    token_expiry: Date,
  ): Promise<Auth | null>;
  deleteOtpByEmail(email: string): Promise<boolean>;
  deleteOtpsByEmail(email: string): Promise<number>;
}

export const authRepository = new MongooseAuthRepository();
