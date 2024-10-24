import mongoose, { Document, Schema } from "mongoose";

export interface authSchemaType extends Document {
  email: string;
  otp: string;
  token_expiry: Date;
  created_at: Date;
  updated_at: Date;
}

const authSchema: Schema<authSchemaType> = new Schema({
  email: String,
  otp: String,

  token_expiry: { type: Date },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const AuthModel =
  (mongoose.models.Auth as mongoose.Model<authSchemaType>) ||
  mongoose.model("Auth", authSchema);
export default AuthModel;
