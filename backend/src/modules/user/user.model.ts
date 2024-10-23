import mongoose, { Schema, model, Document } from "mongoose";
import { validateEmail } from "./user.validation";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
  isActive: boolean;
  created_at: Date;
  updated_at: Date;
  isEmailVerified: boolean;
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
  roles: { type: [String], required: true, default: ["user"] },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  isEmailVerified: { type: Boolean, default: false },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  model<IUser>("User", userSchema);
export default UserModel;
