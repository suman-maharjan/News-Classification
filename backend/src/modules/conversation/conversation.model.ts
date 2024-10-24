import mongoose, { Schema, Document, Types } from "mongoose";

export enum MessageTypeEnum {
  SUCCESS = "success",
  ERROR = "error",
}

export interface IMessage extends Document {
  sender: string;
  message: string;
  type: MessageTypeEnum;
  timestamp: Date;
}

export interface IConversation extends Document {
  userId: Types.ObjectId;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
  sender: { type: String, required: [true, "Sender is require"] },
  message: { type: String, required: [true, "Message is require"] },
  type: { type: String, default: MessageTypeEnum.SUCCESS },
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema: Schema<IConversation> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ConversationModel =
  (mongoose.models.Conversation as mongoose.Model<IConversation>) ||
  mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;
