import mongoose, { Document, Schema, Types } from "mongoose";

export enum MessageTypeEnum {
  SUCCESS = "success",
  ERROR = "error",
}

export enum ModelsEnum {
  SVM_MODEL = "SVM_Model",
  SVM_PROBABILITY = "SVM_Probability",
  NAIVE_BAYES = "Naive_Bayes",
}

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  input: string;
  response?: string;
  algorithm: ModelsEnum;
  type: MessageTypeEnum;
  timestamp: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: [true, "Conversation Id is required"],
  },
  input: { type: String, required: [true, "Input is require"] },
  response: { type: String },
  algorithm: {
    type: String,
    enum: Object.values(ModelsEnum),
    required: [true, "Algorithm is required"],
  },
  type: { type: String, default: MessageTypeEnum.SUCCESS },
  timestamp: { type: Date, default: Date.now },
});

const MessageModel =
  (mongoose.models.Message as mongoose.Model<IMessage>) ||
  mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
