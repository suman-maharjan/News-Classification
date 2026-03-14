import mongoose, { Schema, model, Document, HydratedDocument } from "mongoose";
import { validateEmail } from "./user.validation";

export enum RoleEnum {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: RoleEnum[];
  isActive: boolean;
  created_at: Date;
  updated_at: Date;
  isEmailVerified: boolean;
  interests: string[];
  accessToken?: string;
  refreshToken?: string;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: [true, "Full Name is required"] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is require"],
    select: false,
  },
  roles: {
    type: [String],
    required: true,
    enum: Object.values(RoleEnum),
    default: [RoleEnum.USER],
  },
  interests: { type: [String], require: [true, "Interest is required"] },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  isEmailVerified: { type: Boolean, default: false },
  accessToken: { type: String },
  refreshToken: { type: String },
});

export type UserDocument = HydratedDocument<IUser>;

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  model<IUser>("User", userSchema);
export default UserModel;
